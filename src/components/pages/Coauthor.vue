<template>
  <v-data-table :search="search" :headers="headers" :items="desserts" sort-by="nome" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2 text-none" v-bind="attrs" v-on="on">
              Novo coautor
            </v-btn>
            <v-text-field
              class="pl-4"
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar coautor"
              single-line
              hide-details
            ></v-text-field>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.cpf" label="CPF"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" class="text-none" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" class="text-none" text @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deseja apagar o coautor?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
    <template v-slot:[`item.cadastrado_sucupira`]="{ item }">
      <v-chip
        outlined
        :color="item.cadastrado_sucupira ? 'green' : 'red'"
      >
        {{item.cadastrado_sucupira ? 'Sim' : 'Não' }}
      </v-chip>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'CoauthorC',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome',
      },
      { text: 'CPF', value: 'cpf' },
      { text: 'Email', value: 'email' },
      { text: 'Cadastrado no Sucupira', value: 'cadastrado_sucupira' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      cpf: '',
      email: '',
      cadastrado_sucupira: false
    },
    defaultItem: {
      nome: '',
      cpf: '',
      email: '',
      cadastrado_sucupira: false
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo coautor' : 'Editar coautor'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      const result = await this.$store.dispatch('coautor/getCoauthor')
      console.log(result)
      this.desserts = result
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1)
      await this.$store.dispatch('coautor/deleteCoauthor', this.editedItem.id)
      this.initialize()
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      const data = {
        nome: this.editedItem.nome,
        email: this.editedItem.email,
        cpf: this.editedItem.cpf,
        cadastrado_sucupira: false
      }
      if (this.editedIndex > -1) {
        const result = await this.$store.dispatch('coautor/editCoauthor', {id: this.editedItem.id, data: data})
        console.log(result)
      } else {
        const result = await this.$store.dispatch('coautor/addCoauthor', data)
        console.log(result)
      }
      this.close()
      console.log(this.dialog)
      this.initialize()
    },
  },
}
</script>