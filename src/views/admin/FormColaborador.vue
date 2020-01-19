<template>
  <v-container fluid grid-list-lg>
  <v-card-title class="white cyan--text headline">
        Ingresar Colaborador
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaboradores' },
          { name: 'Ingresar Colaborador'}
        ]"
        />
  </v-card-title>
  <br>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Datos Generales </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Datos Empresa</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Paso 3: Fotografia Colaborador</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-form
        ref="form"
        v-model="validForm"
        lazy-validation
        @submit.prevent="submitCreateColaborador"
      >
      <v-stepper-content step="1">
        <h3>Información General</h3>
        <br>
        <v-divider></v-divider>
        <br>
          <v-layout row wrap>
            <v-flex xs12  md12>
              <v-text-field
                v-model="form.rut"
                label="RUT"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12  md6>
              <v-text-field
                v-model="form.primer_nombre"
                label="Primer Nombre"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="form.segundo_nombre"
                label="Segundo Nombre"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="form.apellido_paterno"
                label="Apellido Paterno"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="form.apellido_materno"
                label="Apellido Materno"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="form.domicilio"
                label="Domicilio"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.sexo"
                :items="genero"
                label="Sexo"
                outline
              />
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="form.nacionalidad"
                label="Nacionalidad"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.estado_civil_id"
                :items="estadoCiviles"
                label="Estado Civil"
                item-text="tipo"
                item-value="id"
                outline
              />
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="form.edad"
                label="Edad"
                type="number"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex
              sm4
              xs12
            >
              <v-menu
                ref="menu"
                v-model="targetIssueDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :value="formatDate(form.birth_date)"
                            hint="Formato DD/MM/AAAA"
                            label="FECHA DE NACIMIENTO"
                            v-on="on"
                            outline
                        ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="form.birth_date"
                          @input="targetIssueDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.nivel_educacion_id"
                :items="nivelesEducacion"
                label="Nivel de Educación"
                item-text="nivel_tipo"
                item-value="id"
                outline
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="form.contacto_emergencia_nombre"
                label="Contacto de Emergencia"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="form.contacto_emergencia_telefono"
                label="Teléfono Contacto de Emergencia"
                outline
              ></v-text-field>
            </v-flex>
          </v-layout>

        <v-btn
          color="success"
          @click="e1 = 2"
        >
          Siguiente
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <h3>Datos Empresa</h3>
        <br>
        <v-divider></v-divider>
        <br>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field
              label="Cargo"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="form.estado"
              label="Estado"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
             <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Fecha de Ingreso "
              readonly
              v-on="on"
              outline
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="form.email"
              label="E-mail"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="form.telefono"
              label="Teléfono"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-text-field
              v-model="form.anexo"
              label="Anexo"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex sm12 xs12>
            <v-autocomplete
              v-model="form.tags"
              :items="tags"
              dense
              clearable
              small-chips
              label="Seleccionar Etiquetas"
              item-text="nombre"
              item-value="id"
              outline
              multiple
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-autocomplete
              v-model="form.licencia_b"
              :items="licencias"
              dense
              clearable
              small-chips
              label="Licencia B"
              item-text="nombre"
              item-value="id"
              outline
            />
          </v-flex>
          <v-flex xs12 sm6 md6>
             <v-menu
              ref="menu"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Vencimiento Licencia B"
              readonly
              v-on="on"
              outline
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex sm6 xs12>
            <v-autocomplete
              v-model="form.licencia_d"
              :items="licencias"
              dense
              clearable
              small-chips
              label="Licencia D"
              outline
            />
          </v-flex>
          <v-flex xs12 sm6 md6>
             <v-menu
              ref="menu"
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Vencimiento Licencia D "
              readonly
              v-on="on"
              outline
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex sm6 xs12>
            <v-autocomplete
              v-model="form.credencial_vigilante"
              :items="licencias"
              dense
              clearable
              small-chips
              label="Credencial Vigilante"
              outline
            />
          </v-flex>
          <v-flex xs12 sm6 md6>
             <v-menu
              ref="menu"
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Vencimiento Credencial Vigilante "
              readonly
              v-on="on"
              outline
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-flex>


          <v-flex sm6 xs12>
            <v-autocomplete
              v-model="form.canet_portuario"
              :items="licencias"
              dense
              clearable
              small-chips
              label="Carnet Portuario"
              outline
            />
          </v-flex>
          <v-flex xs12 sm6 md6>
             <v-menu
              ref="menu"
              v-model="menu5"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Vencimiento Carnet Portuario"
              readonly
              v-on="on"
              outline
            ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="form.talla_calzado"
              label="Talla Calzado"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="form.talla_chaleco"
              label="Talla Chaleco"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="form.talla_polera"
              label="Talla Polera"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="form.talla_pantalon"
              label="Talla Pantalón"
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn
          color="success"
          @click="e1 = 3"
        >
          Siguiente
        </v-btn>

        <v-btn
          color="error"
          @click="e1 = 2"
        >
        Volver
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <br>
        <img :src="imageUrl" height="150" v-if="imageUrl"/>
          <v-text-field label="Seleccionar imagen " @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
        <input
          id="file"
          type="file"
          ref="image"
          name="image"
          style="display:none;"
          accept="image/*"
          @change="onFilePicked"
        >
        <br><br>
        <v-btn
          type="submit"
          color="success"
          :loading="processingForm"
        >
          Siguiente
        </v-btn>

        <v-btn color="error">Volver</v-btn>
      </v-stepper-content>
       </v-form>
    </v-stepper-items>
  </v-stepper>
  </v-container>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      targetIssueDate: false,
      e1: 0,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      files: [],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      file: '',
      form: {
        rut: '',
        usuario: '',
        password: '',
        primer_nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        sexo: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        edad: 0,
        email: '',
        domicilio: '',
        licencia_b: '',
        vencimiento_licencia_b: '',
        licencia_d: '',
        vencimiento_licencia_d: '',
        carnet_portuario: '',
        vencimiento_carnet_portuario: '',
        credencial_vigilante: '',
        vencimiento_credencial_vigilante: '',
        talla_calzado: '',
        talla_chaleco: '',
        talla_polera: '',
        talla_pantalon: '',
        fecha_ingreso: '',
        telefono: '',
        celular: '',
        anexo: '',
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        estado: 'Activo (a)',
        fecha_inactividad: '',
        nivel_educacion_id: 0,
        estado_civil_id: 0,
        imagen: '',
        tags: [],
      },
      validForm: true,
      processingForm: false,
      genero: [ 'Masculino', 'Femenino'],
      estados: [
        { id: 0, nombre: 'Soltero (a)' },
        { id: 1, nombre: 'Casado (a)' },
        { id: 2, nombre: 'viudo (a)' },
      ],
      niveles: [
        { id: 0, nombre: 'Tecnico' },
        { id: 1, nombre: 'Universitario' },
      ],
      skills: [
        { id: 0, nombre: 'Auditor Interno' },
        { id: 1, nombre: 'Monitor Pausa Activa' },
        { id: 2, nombre: 'Relator Intero' },
        { id: 3, nombre: 'Otro' },
      ],
      licencias: ['SI','NO','N/A'
      ],
    }
  },
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },
  watch: {
    targetIssueDate (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    targetIssueDateYear (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  computed: {
    ...mapState({
      estadoCiviles: state => state.estadoCiviles.estadoCiviles,
      loadingEstadoCiviles: state => state.estadoCiviles.loadingEstadoCiviles,
      nivelesEducacion: state => state.nivelesEducacion.nivelesEducacion,
      loadingNivelesEducacion: state => state.nivelesEducacion.loadingNivelesEducacion,
      tags: state => state.tags.tags,
      loadingTags: state => state.tags.loadingTags,
    })
  },
  created() {
    this.getEstadoCiviles();
    this.getNivelesEducacion();
    this.getTags();
  },
  methods: {
    ...mapActions({
      createColaborador: 'colaboradores/createColaborador',
      getEstadoCiviles: 'estadoCiviles/getEstadoCiviles',
      getNivelesEducacion: 'nivelesEducacion/getNivelesEducacion',
      getTags: 'tags/getTags',
    }),
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files;
      this.form.imagen = files[0];
			if(files[0] !== undefined) {
        this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
				})
			} else {
				this.imageName = '';
				this.imageFile = '';
				this.imageUrl = '';
			}
		},
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submitCreateColaborador(){
      this.processingForm = true
      var tags = JSON.stringify(this.form.tags);
      var formData = new FormData();
      for (var i = 0; i < this.form.tags.length; i++)
      { formData.append('tags[]', this.form.tags[i]);
        console.log(this.form.tags[i]);
      }
      formData.append("rut", this.form.rut);
      formData.append("primer_nombre", this.form.primer_nombre);
      formData.append("segundo_nombre", this.form.segundo_nombre);
      formData.append("apellido_paterno", this.form.apellido_paterno);
      formData.append("apellido_materno", this.form.apellido_materno);
      formData.append("sexo", this.form.sexo);
      formData.append("nacionalidad", this.form.nacionalidad);
      formData.append("domicilio", this.form.domicilio);

      formData.append("nivel_educacion_id", this.form.nivel_educacion_id);
      formData.append("estado_civil_id", this.form.estado_civil_id);
      formData.append("imagen", this.form.imagen);
      this.createColaborador({ data: formData})
      .then(response => {
        this.processingForm = false
        this.e1 = 1
      })
      .catch((error) => {
          this.processingForm = false
      })
    },
  }
}
</script>
