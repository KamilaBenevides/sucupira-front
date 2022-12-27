<template>
  <v-row class="justify-center d-flex align-center">
    <v-card width="800" elevation="8" class="pa-12" max-height="500">
      <div class="text-xs-h6 text-md-h5 text-lg-h4 text-center">Sucupira IC</div>
      <div class="text--primary my-5 text-center">
        Preencha os dados do login para acessar
      </div>
      <v-card-text>
        <v-col cols="12">
          <v-text-field color="blue darken-2" append-icon="mdi-account" label="Email"
            v-model="valueUSer"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field color="blue darken-2" label="Senha" required dense :type="value ? 'password' : 'text'"
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (value = !value)"
            v-model="valuePassword"></v-text-field>
        </v-col>
      </v-card-text>
      <v-row>
        <v-btn style="color: white" color="#0078F0" block @click="goTo()">
          entrar
        </v-btn>
        <div class="pt-4">
          <v-alert v-if="erro" dense outlined type="error">
            Email ou Senha incorretos
          </v-alert>
        </div>
      </v-row>
    </v-card>
  </v-row>

</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    value: String,
    valueUSer: '',
    valuePassword: '',
    user: 'admin',
    password: 'admin123',
    erro: false
  }),
  components: {},
  methods: {
    goTo() {
      if (this.valueUSer === this.user && this.valuePassword === this.password) {
        this.$store.dispatch('user/login')
        this.$router.push('/teachers')
        this.erro = false
      }
      else {
        this.valueUSer = ''
        this.valuePassword = ''
        this.erro = true
      }
    },
  },
};
</script>
