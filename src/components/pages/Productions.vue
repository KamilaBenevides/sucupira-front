<template>
  <div>
    <v-autocomplete solo :items="teachers" color="white" item-text="nome" label="Docentes"
    item-value="cpf" v-model="selectTeacherCpf"></v-autocomplete>
    <div v-if="selectTeacher">
      <div class="d-flex align-start flex-row">
        <v-col cols="5">
          <v-row class="pa-6 d-flex align-start flex-column">
            <v-row>
              <h2 class="text-start">{{ selectTeacher.nome }}</h2>
            </v-row>
            <v-row>
              Última atualização do Lattes: {{ selectTeacher.ultima_atualizacao }}
            </v-row>
          </v-row>
        </v-col>
        <v-row class="no-gutters">
          <v-col cols="auto" sm="4" class="d-flex align-center flex-row">
            <div>
              <v-btn color="primary" dark class="text-none" @click="dialogReport = !dialogReport">Gerar Relatório</v-btn>
            </div>
            <div class="px-2">
              <v-btn color="primary" dark class="text-none" @click="dialogXML = !dialogXML">Importar Lattes</v-btn>
            </div>
            <div>
              <v-btn color="primary" dark class="text-none" @click="dialogEdit = !dialogEdit">Adicionar produção manualmente</v-btn>
            </div>
        </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialogXML" max-width="700">
        <v-card>
          <v-card-title class="text-h5">
            Importar XML
          </v-card-title>

          <v-card-text>
              <div v-if="!itemFile">
                <v-alert
                  v-if="fileErro"
                  dense
                  outlined
                  type="error"
                >
                  Falha ao ler arquivo, tente novamente.
                </v-alert>
                Ao clicar no botão 'Extrair' o sistema tentara extrair os dados 
                das produções, porém, nem todos serão extraídos corretamente, 
                você poderá editar as produções manualmente.
                <v-file-input
                label="Arquivo XML"
                v-model="file"
                ></v-file-input>
                <v-progress-circular
                  v-if="loading"
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-alert
                  dense
                  outlined
                  type="success"
                >
                  As produções abaixo foram extraídas!
                </v-alert>
                <v-list three-line>
                  <div v-for="(item, i) in itemFile"
                  :key="i"
                  >
                    <v-subheader
                      v-if="item.header"
                      v-text="item.header"
                    ></v-subheader>
            
                    <v-divider
                      v-else-if="item.divider"
                    ></v-divider>
            
                    <v-list-item
                      v-else
                      :key="item.titulo"
                    >
                      <v-list-item-content>

                        <v-list-item-title>{{item.titulo}}</v-list-item-title>
                        <v-list-item-subtitle>Publicado em: {{ item.veiculo_publicacao }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Autores: {{ item.autores }}</v-list-item-subtitle>
                        <v-list-item-subtitle>DOI: {{ item.doi }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Ano: {{ item.ano }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Tipo: {{ item.tipo }}</v-list-item-subtitle>
                        <v-list-item-subtitle>ISSN: {{ item.issn }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Qualis: {{ item.qualis || '-' }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-list>
              </div>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text class="text-none" @click="dialogXML = false">
              cancelar
            </v-btn>

            <v-btn v-if="!itemFile" color="blue darken-1" text class="text-none" @click="extractXML">
              {{ btnDialogXML }}
            </v-btn>
            <v-btn v-else color="blue darken-1" text class="text-none" @click="dialogXML = false">
              {{ btnDialogXML }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogReport" max-width="800">
        <v-card>
          <v-card-title class="text-h5">
            Gerar Relatório
          </v-card-title>

          <v-card-text>
            <v-row class="pa-6">
              <v-col>
                <v-row>
                  <spam class="text-h5">{{ selectTeacher.nome }}</spam>
                </v-row>
                <v-row>
                  <spam class="text-h6 py-4">Nota: {{ scoreTeacher }}</spam>
                </v-row>
                <v-row>
                  <v-alert
                    color="blue"
                    dense
                    text
                    type="info"
                  >Nota calculada apartir da média ponderada dos qualis dos artigos publicados</v-alert>
                </v-row>
                <v-row>
                  <v-btn dark color="green" @click="dowloadReport">Baixar relatorio em PDF</v-btn>
                </v-row>
              </v-col>
            </v-row>
            <v-list three-line>
              <div
              v-for="(item, i) in items"
              :key="i"
              >
                <v-subheader
                  v-if="item.header"
                  v-text="item.header"
                ></v-subheader>
        
                <v-divider
                  v-else-if="item.divider"
                ></v-divider>
        
                <v-list-item
                  v-else
                  :key="item.titulo"
                >
                  <v-list-item-content>

                    <v-list-item-title v-html="item.nome"></v-list-item-title>
                    <v-list-item-subtitle>Publicado em: {{ item.veiculo_publicacao }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Qualis: {{ item.qualis }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="dialogReport = false">
              fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogEdit" max-width="800">
        <v-card>
          <v-card-title class="text-h5">
            
          </v-card-title>
            <span class="text-h5 pl-6">{{ formTitle }}</span>
          <v-card-text>
            <v-row>
              <v-col
                cols="auto"
                md="12"
              >
              <v-text-field
                  v-model="editedItem.nome"
                  label="Titulo da producao"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="auto"
                md="4"
              >
                <v-select
                v-model="editedItem.tipo"
                :items="['Conferencia', 'Periodico']"
                label="Tipo"
                required
              ></v-select>
              </v-col>
              <v-col
                cols="auto"
                md="8"
              >
                <v-autocomplete
                v-if="editedItem.tipo === 'Periodico'"
                  v-model="editedItem.veiculo_publicacao"
                  label="Nome do Periódico"
                  required
                  :items="periodicos"
                  item-text="nome"
                ></v-autocomplete>
                <v-autocomplete
                v-if="editedItem.tipo === 'Conferencia'"
                  v-model="editedItem.veiculo_publicacao"
                  label="Nome do Conferência"
                  required
                  :items="conferencia"
                  item-text="nome"
                ></v-autocomplete>
              </v-col>
            </v-row>                                 
            <v-row
            v-for="(textField, i) in textFields" :key="i"
            >
              <v-col cols="3">
                <v-text-field
                :label="textField.label1"
                v-model="textField.value1"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                :label="textField.label2"
                v-model="textField.value2"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                :label="textField.label3"
                v-model="textField.value3"
                ></v-text-field>
              </v-col>
                <v-col cols="auto">
                  <v-btn @click="remove(i)" class="text-none error">delete</v-btn>
                </v-col>
              </v-row>
                <v-btn @click="add" class="text-none primary">Novo coautor</v-btn>
            
            <v-row class="d-flex justify-start align-center">
              <v-col cols="auto">
                <v-btn color="blue darken-1" dark class="text-none" @click="seachQualis(editedItem)">
                  Buscar qualis
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-alert class="ma-0"
                  text
                  color="green"
                >{{ editedItem.qualis }}</v-alert>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text class="text-none" @click="close">
              Fechar
            </v-btn>  
            <v-btn color="blue darken-1" text class="text-none" @click="save">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Deletar {{editedItem.nome}}?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header v-if="!item.divider"                                                                 >
            <v-col>
              <v-row>
                {{ item.nome }}
              </v-row>
            </v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-start">
            <v-col>
              <v-row>
                Tipo: {{ item.tipo }}
              </v-row>
              <v-row>
                Qualis: {{ item.qualis }}
              </v-row>
              <v-row class="d-flex flex-row justify-start pt-2 align-center">
                <v-btn class="text-none" outlined small dark color="primary" @click="editItem(item)">editar</v-btn>
                <v-btn class="ma-2" text icon color="red" @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script>
import { xml2json } from 'xml-js';
import ProductionsXML from './ProductionsXML.vue'
import { jsPDF } from "jspdf";
// import fs from "fs"; 
export default {
  comments: {
    ProductionsXML
  },
  name: "ProductionsComponent",
  data: () => ({
    selectTeacher: null,
    selectTeacherCpf: null,
    dialogXML: false,
    dialogDelete: false,
    dialogEdit: false,
    dialogReport: false,
    file: undefined,
    selectTipo: null,
    textFields: [],
    itemFile: null,
    items: [],
    teachers: [],
    jsonFile: null,
    fileErro: false,
    loading: false,
    editedIndex: -1,
    editedItem: {
      titulo: '',
      qualis: '',
      tipo: ''
    },
    defaultItem: {
      titulo: '',
      qualis: '',
      tipo: ''
    },
    periodicos: null,
    conferencia: null
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo produção' : 'Editar produção'
    },
    btnDialogXML() {
      return this.itemFile ? 'Fechar' : 'Extrair'
    },
    scoreTeacher() {
      let a1 = 0
      let a2 = 0
      let a3 = 0
      let a4 = 0
      let b1 = 0
      let b2 = 0
      let b3 = 0
      let b4 = 0
      this.items.forEach(element => {
        switch (element.qualis) {
          case 'A1':
            a1 += 1
            break
          case 'A2':
            a2 += 1
            break
          case 'A3':
            a3 += 1
            break
          case 'A4':
            a4 += 1
            break
          case 'B1':
            b1 += 1
            break
          case 'B2':
            b2 += 1
            break
          case 'B3':
            b3 += 1
            break
          case 'B4':
            b4 += 1
            break
        }
      })
      return  1 * a1 + 0.875 * a2 + 0.75 * a3 + 0.625 * a4 + 0.5 * b1 + 0.2 * b2 + 0.1* b3 + 0.05 * b4
    },
  },
  async created() {
    // const resultPeriodico = await axios.get('https://back-sucupira-ppgi.herokuapp.com/periodico/')
    // this.periodicos = resultPeriodico.data
    
    this.initializeTeachers()
    this.initializeProductions()
  },
  methods: {
    async initializeTeachers() {
      const result = await this.$store.dispatch('teachers/getTeachers')
      this.teachers = result
    },
    async initializeProductions() {
    this.periodicos = await this.$store.dispatch('production/getJornal')
    this.conferencia = await this.$store.dispatch('production/getEvents')
    },
    read(inputFile) {
      const temporaryFileReader = new FileReader();

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile, 'ISO-8859-1');
      });
    },
    async extractXML() {
      this.loading = true
      if(this.file) {
        const xml = await this.read(this.file)
        const data = xml2json(xml, { spaces: 2 })
        const encodedStringBtoA = btoa(unescape(encodeURIComponent(data)))
        const result = await this.$store.dispatch('teachers/sendJson', {id: this.selectTeacher.id, data: {base64: encodedStringBtoA}})
        console.log(result)
        let veiculo_publicacao_id = null
        await result.EVENTOS.forEach(element => {
          for(let i = 0 ; i < this.conferencia.length ; i++) {
            if(element.JOURNAL === i.nome)
            veiculo_publicacao_id = i.id
          }
          this.$store.dispatch('production/addProduction', {
            id_docente: this.selectTeacher.id,
            nome: element.TITULO,
            tipo: 'Conferencia',
            ano_de_publicacao: element.ANO,
            id_periodico: null,
            id_conferencia: veiculo_publicacao_id,
          })
        });
        await result.REVISTA.forEach(element => {
          for(let i = 0 ; i < this.periodicos.length ; i++) {
            if(element.JOURNAL === i.nome)
            veiculo_publicacao_id = i.id
          }
          this.$store.dispatch('production/addProduction', {
            id_docente: this.selectTeacher.id,
            nome: element.TITULO,
            tipo: 'Periodico',
            ano_de_publicacao: element.ANO,
            id_periodico: veiculo_publicacao_id,
            id_conferencia: null,
          })
        });
        // const eventos = await this.$store.dispatch('production/addProduction', result.EVENTOS)
        // const revista = await this.$store.dispatch('production/addProduction', result.REVISTA)
        // console.log(eventos, revista)
        this.itemFile = true
        this.dialogXML = false
        this.selectProds()
        this.file = null
      } else {
        this.fileErro = true
      }

      // const reader = new FileReader()
      // reader.onload = () => {
      //   this.jsonFile = reader.result
      //   // return reader.result
      //   // const data = xml2json(teste, { spaces: 2 })
      //   // const result = axios.post(`https://back-sucupira-ppgi.herokuapp.com/xml/upload/${this.selectTeacher.id}`, this.jsonFile)
      //   console.log(this.jsonFile)
      // }
      // reader.readAsText(this.file)
      // // const encodedStringBtoA = btoa(data);
      // console.log(this.jsonFile)
      
      this.loading = false
    },
    seachQualis(item) {
      if(item.tipo === 'Periodico') {
        this.periodicos.forEach(p => {
          if(item.veiculo_publicacao === p.nome) {
            console.log(p)
            item.qualis = p.qualis
            item.id_periodico = p.id
          }
        });
      }
      if(item.tipo === 'Conferencia') {
        this.conferencia.forEach(p => {
          if(item.veiculo_publicacao === p.nome) {
            console.log(p)
            item.qualis = p.qualis
            item.id_conferencia = p.id
          }
        });
      }
      console.log(item)
      
    },
    dowloadReport() {
      const doc = new jsPDF();

      doc.text(this.selectTeacher.nome, 10, 10)
      doc.text("Nota: " + this.scoreTeacher, 10, 20)
      doc.setFontSize(10)
      let lines

      let verticalOffset = 30
      this.items.forEach(element => {
        let infos = 'Título: ' + element.nome + ', Publicado em: ' + element.veiculo_publicacao + ', Qualis: ' + element.qualis
        lines = doc.splitTextToSize(infos, 200)
        verticalOffset += (lines.length + 0.5) * 12 / 2
        
        doc.text(8, verticalOffset + 12 / 80, lines)
          
      })

      doc.save("relario.pdf");
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$store.dispatch('production/deleteProduction', this.editedItem.id)
      this.selectProds()
      this.closeDelete()
    },

    close() {
      this.dialogEdit = false
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
        id_docente: this.selectTeacher.id,
        nome: this.editedItem.nome,
        tipo: this.editedItem.tipo,
        id_conferencia: this.editedItem.id_conferencia ? this.editedItem.id_conferencia : null,
        id_periodico: this.editedItem.id_periodico ? this.editedItem.id_periodico : null
      }
      if (this.editedIndex > -1) {
        const result = await this.$store.dispatch('production/EditProduction', {id: this.editedItem.id, data: data})
        // await axios.patch(`https://back-sucupira-ppgi.herokuapp.com/producao/${this.editedItem.id}`, data)
        this.selectProds()
        console.log(result)
      } else {
        const result = await this.$store.dispatch('production/addProduction', data)
        console.log(result)
        this.selectProds()
      }
      this.close()
    },
    async selectProds() {
      const result = await this.$store.dispatch('production/getProducts')
      // let prods = []
      if(this.items.length > 1) {
        this.items = []
      }
      result.forEach(element => {
        if(element.id_docente === this.selectTeacher.id) {
          this.items.push(element)
        }
      })
      this.items.forEach(el => {
        this.periodicos.forEach(p => {
          if(el.id_periodico && el.id_periodico === p.id) {
            el.qualis = p.qualis
            el.veiculo_publicacao = p.nome
          }
        });
      });
      this.items.forEach(el => {
        this.conferencia.forEach(p => {
          if(el.id_conferencia && el.id_conferencia === p.id) {
            el.qualis = p.qualis
            el.veiculo_publicacao = p.nome
          }
        });
      });
      console.log(this.items)
    },
    add () {
        this.textFields.push({
          label1: "Nome", 
          value1: "",
          label2: "CPF",
          value2: "",
          label3: "Email",
          value3: ""
        })
     },
    
     remove (index) {
         this.textFields.splice(index, 1)
     }
  },
  watch: {
    async selectTeacherCpf(nv) {
      this.teachers.forEach(element => {
        if(element.cpf === nv){
          this.selectTeacher = element
        }
      });
      this.selectProds()
    }
  }
};
</script>