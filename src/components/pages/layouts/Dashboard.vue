<template>
  <v-app id="inspire">
    <LoginView v-if="!userLogin"></LoginView>
    <!-- Start app bar  + left menu -->
    <layoutAppMenue v-if="userLogin"></layoutAppMenue>
    <!-- End app bar + left menu-->

    <!-- Start content -->
    <layoutContent v-if="userLogin"></layoutContent>
    <!-- End content -->

    <!-- Start footer -->
    <layoutFooter></layoutFooter>
    <!-- End footer -->
  </v-app>
</template>

<script>
import layoutAppMenue from './AppMenu.vue'
import layoutContent from './Content.vue'
import layoutFooter from './Footer.vue'
import LoginView from '../LoginView.vue'
export default {
  name: "dashboardC",
  components:{
    layoutAppMenue,
    layoutContent,
    layoutFooter,
    LoginView
  },
  data: () => ({
  }),
  computed: {
    userLogin() {
      return this.$store.state.user.userLogin
    }
  }
};
</script>
<style scoped>
</style>