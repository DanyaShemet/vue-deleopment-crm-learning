<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories'|localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreat @created="addNewCategory"/>

        <CategoryEdit :categories="categories" @updated="updateCategories" :key="categories.length + updateCount" v-if="categories.length"/>
        <p v-else class="center">{{'NoCategories'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
    import CategoryCreat from '@/components/CategoryCreate'
    import CategoryEdit from '@/components/CategoryEdit'

    export default {
        metaInfo() {
            return {
                title: this.$title('Menu_Categories')
            }
        },
        components: {CategoryCreat, CategoryEdit},
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategories(category) {
              const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updateCount++
            }
        }
    }
</script>
