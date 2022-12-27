<template>
  <div>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-row align="center" justify="center">
          <v-col class="text-center">
              <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
export default {
  name: 'ContentC',
  computed: {
    items() {
      return [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: this.$route.name ,
          disabled: false,
          href: this.$route.path,
        }
      ]
    }    
  }
};
</script>