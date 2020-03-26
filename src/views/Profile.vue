<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHanlder">
      <div class="input-field">
        <input
                id="description"
                type="text"
                v-model="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <span
                class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{'Message_EnterName' | localize}}</span>
      </div>
      <div class="switch" style="margin-bottom: 20px;">
        <label>
          EN
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          RU
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {required} from 'vuelidate/lib/validators'

    export default {
        metaInfo() {
            return {
                title: this.$title('ProfileTitle')
            }
        },
        data: () => ({
            name: '',
            isRuLocale: true
        }),
        mounted() {
            this.name = this.info.name
            setTimeout(() => {
                M.updateTextFields()
            }, 0)
            this.isRuLocale = this.info.locale === 'ru-RU'
        },
        computed: {
            ...mapGetters(['info'])
        },
        validations: {
            name: {required}
        },
        methods: {
            ...mapActions(['updateInfo']),
            async submitHanlder() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                try {
                    await this.updateInfo({
                        name: this.name,
                        locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                    })
                } catch (e) {
                }
            }

        }
    }
</script>
