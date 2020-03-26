<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning'|localize}}</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length"> {{'NoCategories'|localize}}.
      <router-link to="/record">{{'AddFirst'|localize}}</router-link>
    </p>
    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{c.title}}:</strong>
          {{c.spend | currencyFilter('RUB')}} {{'Of'|localize}} {{c.limit | currencyFilter('RUB')}}
        </p>
        <div class="progress" v-toolTip="c.tooltip">
          <div
                  class="determinate" :class="c.progressColor"
                  :style="{width: c.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import localizeFilter from '@/filters/localize.filter'
    import {mapGetters} from 'vuex'
    import currencyFilter from "../filters/currency.filter";

    export default {
        metaInfo() {
            return {
                title: this.$title('Menu_Planning')
            }
        },
        name: 'planning',
        data: () => ({
            categories: [],
            loading: true
        }),
        computed: {
            ...mapGetters(['info'])
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(cat => {
                const spend = records
                    .filter(r => r.categoryId === cat.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)

                const percent = (100 * spend) / cat.limit
                const progressPercent = percent > 100 ? 100 : percent
                const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

                const tooltipValue = cat.limit - spend;
                const tooltip = `${
                    tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')
                } ${currencyFilter(Math.abs(tooltipValue))}`
                return {
                    ...cat,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltip
                }
            });
            this.loading = false
        }
    }
</script>
