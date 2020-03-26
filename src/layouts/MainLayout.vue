<template>
  <div >
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>

      <NavBar @toggleMenu="isOpen = !isOpen" v-model="isOpen"/>

      <SideBar v-model="isOpen" :key="locale"/>

      <main class="app-content " :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-toolTip="'Создать новую запись'" data-position="left">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import messages from "../utils/messages";
    import SideBar from '@/components/app/SideBar'
    import NavBar from '@/components/app/NavBar'

    export default {
        name: 'main-layout',
        components: {
            NavBar, SideBar
        },
        data: () => ({
            isOpen: true,
            loading: true
        }),
        async mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                await this.$store.dispatch('fetchInfo')
            }
            this.loading = false
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            locale(){
                return this.$store.getters.info.locale
            }
        },
        watch: {
            error(fbError) {
                this.$error(messages[fbError.code] || 'Что то пошло не так')
            }
        }

    }
</script>
