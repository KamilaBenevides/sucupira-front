<template>
  <div>
    <!-- Start  -->
    <v-navigation-drawer v-if="userLogin" v-model="drawer" app clipped>
      <!-- Start Menu list -->
      <v-list dense>
        <template v-for="item in items">

          <!-- subheader block -->
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <!-- end subheader block -->

          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon>
            
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </template>
      </v-list>
      <!-- End Menu list -->
    </v-navigation-drawer>
    <!-- End -->

    <!-- Start -->
    <v-app-bar 
      app 
      clipped-left
      color="primary"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Sucupira</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
        <v-btn dark outlined @click="logout()">Sair</v-btn>
    </v-app-bar>
    <!-- End -->
  </div>
</template>
<script>
export default {
  name: "AppMenu",
  
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "Docente", to: "/" },
      { icon: "mdi-file-document", text: "Produções", to: "/productions" },
      { icon: "mdi-account-group", text: "Coautores", to: "/coauthor" },
    ]
  }),
  computed: {
    userLogin() {
      return this.$store.state.user.userLogin
    }
  },
  methods: {
    logout() {
    this.$store.dispatch('user/login')
  }
  }
};
</script>