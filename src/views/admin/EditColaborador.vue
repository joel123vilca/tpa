<template>
  <NotPermission v-if="!authenticated" />
  <v-container v-else fluid grid-list-lg>
    <v-card-title class="white cyan--text headline">
      Editar Colaborador
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
    <br />
    <v-toolbar card style="border-radius:10px 10px 0 0;" color="primary" dark>
      <v-avatar size="45px">
        <img v-if="avatar" :src="avatar" alt="Avatar" />
      </v-avatar>
      <v-toolbar-title>{{nombre_completo}}</v-toolbar-title>
    </v-toolbar>
    <v-bottom-nav color="transparent" :value="activeBtn">
      <v-btn :to="{ name: 'editcolaborador', params: { id: $route.params.id } }" flat color="teal">
        <span>Informacion</span>
        <v-icon>assignment</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'movilidades', params: { id: $route.params.id } }" flat color="teal">
        <span>Movilidades</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'listacomentario', params: { id: $route.params.id } }" flat color="teal">
        <span>Hoja de vida</span>
        <v-icon>description</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'ListaCargaFamiliar', params: { id: $route.params.id } }"
        flat
        color="teal"
      >
        <span>Cargas familiares</span>
        <v-icon>supervisor_account</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'ListCursosColaborador', params: { id: $route.params.id } }"
        flat
        color="teal"
      >
        <span>Cursos</span>
        <v-icon>book</v-icon>
      </v-btn>
    </v-bottom-nav>
    <br />
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step editable step="1">Paso 1: Datos Generales</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">Paso 2: Datos Empresa</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="3">Paso 3: Fotografia Colaborador</v-stepper-step>
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
            <br />
            <v-divider></v-divider>
            <br />
            <v-layout row wrap>
              <v-flex xs12 md12>
                <v-text-field v-model="form.rut" label="RUT" disabled outline></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="form.primer_nombre" label="Primer Nombre" outline></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="form.segundo_nombre" label="Segundo Nombre" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.apellido_paterno" label="Apellido Paterno" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.apellido_materno" label="Apellido Materno" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="form.domicilio" label="Domicilio" outline></v-text-field>
              </v-flex>
              <v-flex sm4 xs12>
                <v-autocomplete v-model="form.sexo" :items="genero" label="Sexo" outline />
              </v-flex>
              <v-flex xs12 sm4 md4>
                <v-text-field v-model="form.nacionalidad" label="Nacionalidad" outline></v-text-field>
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
              <v-flex sm6 xs12>
                <v-text-field
                  v-model="form.fecha_nacimiento"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE NACIMIENTO"
                  outline
                  type="date"
                  max="9999-12-31"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 xs12>
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

            <v-btn color="success" @click="e1 = 2">Siguiente</v-btn>
            <v-btn color="error" @click="$router.push({name: 'listacolaboradores'})">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <h3>Datos Empresa</h3>
            <br />
            <v-divider></v-divider>
            <br />
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="form.email" :rules="rules.email" label="E-mail" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.telefono" label="Teléfono" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.anexo" label="Anexo" outline></v-text-field>
              </v-flex>
              <v-flex sm12 xs12>
                <v-autocomplete
                  v-model="form.tags"
                  :items="filterData"
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
                  small-chips
                  label="Licencia B"
                  outline
                />
              </v-flex>
              <v-flex sm6 xs12>
                <v-text-field
                  v-model="form.vencimiento_licencia_b"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE VENCIMIENTO LICENCIA B"
                  outline
                  :disabled="form.licencia_b === 'NO'"
                  type="date"
                  max="9999-12-31"
                  :error="!!formErrors.vencimiento_licencia_b"
                  :error-messages="formErrors.vencimiento_licencia_b"
                  @keyup="
                      () => {
                        formErrors.vencimiento_licencia_b = undefined;
                        delete formErrors.vencimiento_licencia_b;
                      }
                    "
                ></v-text-field>
              </v-flex>
              <v-flex sm6 xs12>
                <v-autocomplete
                  v-model="form.licencia_d"
                  :items="licencias"
                  dense
                  small-chips
                  label="Licencia D"
                  outline
                />
              </v-flex>
              <v-flex sm6 xs12>
                <v-text-field
                  v-model="form.vencimiento_licencia_d"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE VENCIMIENTO LICENCIA D"
                  outline
                  :disabled="form.licencia_d === 'NO'"
                  type="date"
                  max="9999-12-31"
                  :error="!!formErrors.vencimiento_licencia_d"
                  :error-messages="formErrors.vencimiento_licencia_d"
                  @keyup="
                      () => {
                        formErrors.vencimiento_licencia_d = undefined;
                        delete formErrors.vencimiento_licencia_d;
                      }
                    "
                ></v-text-field>
              </v-flex>

              <v-flex sm6 xs12>
                <v-autocomplete
                  v-model="form.credencial_vigilante"
                  :items="licencias"
                  dense
                  small-chips
                  label="Credencial Vigilante"
                  outline
                />
              </v-flex>
              <v-flex sm6 xs12>
                <v-text-field
                  v-model="form.vencimiento_credencial_vigilante"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE VENCIMIENTO CREDENCIAL VIGILANTE"
                  outline
                  :disabled="form.credencial_vigilante === 'NO'"
                  type="date"
                  max="9999-12-31"
                  :error="!!formErrors.vencimiento_credencial_vigilante"
                  :error-messages="formErrors.vencimiento_credencial_vigilante"
                  @keyup="
                      () => {
                        formErrors.vencimiento_credencial_vigilante = undefined;
                        delete formErrors.vencimiento_credencial_vigilante;
                      }
                    "
                ></v-text-field>
              </v-flex>

              <v-flex sm6 xs12>
                <v-autocomplete
                  v-model="form.carnet_portuario"
                  :items="licencias"
                  dense
                  small-chips
                  label="Carnet Portuario"
                  outline
                />
              </v-flex>
              <v-flex sm6 xs12>
                <v-text-field
                  v-model="form.vencimiento_carnet_portuario"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE VENCIMIENTO CARNET PORTUARIO"
                  outline
                  :disabled="form.carnet_portuario === 'NO'"
                  type="date"
                  max="9999-12-31"
                  :error="!!formErrors.vencimiento_carnet_portuario"
                  :error-messages="formErrors.vencimiento_carnet_portuario"
                  @keyup="
                      () => {
                        formErrors.vencimiento_carnet_portuario = undefined;
                        delete formErrors.vencimiento_carnet_portuario;
                      }
                    "
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.talla_calzado" label="Talla Calzado" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.talla_chaleco" label="Talla Chaleco" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.talla_polera" label="Talla Polera" outline></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.talla_pantalon" label="Talla Pantalón" outline></v-text-field>
              </v-flex>
            </v-layout>
            <v-btn :disabled="continuar" color="success" @click="e1 = 3">Siguiente</v-btn>

            <v-btn color="error" @click="e1 = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <br />
            <br />
            <v-fab-transition>
              <v-btn
                v-show="imageUrl"
                color="pink"
                small
                dark
                absolute
                left
                fab
                @click="deleteImage()"
              >X</v-btn>
            </v-fab-transition>
            <v-fab-transition>
              <v-btn
                v-show="form.imagen_url"
                color="pink"
                small
                dark
                absolute
                left
                fab
                @click="deleteImageSet()"
              >X</v-btn>
            </v-fab-transition>
            <el-upload
              class="avatar-uploader"
              action
              name="image"
              :http-request="onFilePicked"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
            >
              <img v-if="form.imagen_url && !imageUrl" :src="form.imagen_url" class="avatar" />
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-if="!form.imagen_url && !imageUrl" class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <label class="grey--text text--darken-1">Imagen de Perfil</label>
            <br />
            <v-btn type="submit" color="success" :loading="processingForm">Guardar Cambios</v-btn>

            <v-btn @click="e1 = 2" color="error">Volver</v-btn>
          </v-stepper-content>
        </v-form>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data () {
    return {
      activeBtn: 1,
      targetIssueDate: false,
      targetIssueDate1: false,
      targetIssueDate2: false,
      targetIssueDate3: false,
      targetIssueDate4: false,
      targetIssueDate5: false,
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
      avatar: '',
      continuar: false,
      nombre_completo: '',
      formErrors: { vencimiento_carnet_portuario:'', vencimiento_credencial_vigilante:'', vencimiento_licencia_b:'', vencimiento_licencia_d:''},
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
        telefono: '',
        celular: '',
        anexo: '',
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        fecha_inactividad: '',
        nivel_educacion_id: '',
        estado_civil_id: '',
        imagen: '',
        tags: [],
        imagen_url: '',
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
      licencias: ['SI','NO'],
      rules: {
        email: [v => /.+@.+/.test(v) || 'E-mail tiene que ser ejemplo@gmail.com.'],
      }
    }
  },
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },
  watch: {
    'form.licencia_b': function () {
      if(this.form.licencia_b != 'SI'){
        this.form.licencia_b = 'NO'
        this.form.vencimiento_licencia_b = '';
        this.formErrors.vencimiento_licencia_b = '';
      } else {
        this.formErrors.vencimiento_licencia_b = 'Este campo es requerido!.';
      }
    },
    'form.licencia_d': function () {
      if(this.form.licencia_d != 'SI'){
        this.form.licencia_d = 'NO';
        this.form.vencimiento_licencia_d = '';
        this.formErrors.vencimiento_licencia_d = '';
      } else {
        this.formErrors.vencimiento_licencia_d = 'Este campo es requerido!.';
      }
    },
    'form.carnet_portuario': function () {
      if(this.form.carnet_portuario != 'SI'){
        this.form.carnet_portuario = 'NO'
        this.form.vencimiento_carnet_portuario = '';
        this.formErrors.vencimiento_carnet_portuario = '';
      } else {
        this.formErrors.vencimiento_carnet_portuario = 'Este campo es requerido!.';
      }
    },
    'form.credencial_vigilante': function () {
      if(this.form.credencial_vigilante != 'SI'){
        this.form.credencial_vigilante = 'NO'
        this.form.vencimiento_credencial_vigilante = '';
        this.formErrors.vencimiento_credencial_vigilante = '';
      } else {
        this.formErrors.vencimiento_credencial_vigilante = 'Este campo es requerido!.';
      }
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
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
    filterData() {
      let tags = this.tags;
      return tags.filter(o => o.estado === 1);
    },
  },
  created() {
    this.getColaborador({ colaboradorId: this.$route.params.id }).then(response => {
      const colaboradorInfo = response.data.data;
      this.setForm(colaboradorInfo);
    });
    this.getEstadoCiviles();
    this.getNivelesEducacion();
    this.getTags();
  },
  methods: {
    ...mapActions({
      getColaborador: 'colaboradores/getColaborador',
      updateColaborador: 'colaboradores/updateColaborador',
      getEstadoCiviles: 'estadoCiviles/getEstadoCiviles',
      getNivelesEducacion: 'nivelesEducacion/getNivelesEducacion',
      getTags: 'tags/getTags',
    }),
    deleteImage() {
      this.imageUrl = '';
    },
    deleteImageSet() {
      this.form.imagen_url = '';
    },
    setForm(colaborador) {
      this.form.rut = colaborador.rut;
      this.form.primer_nombre = colaborador.primer_nombre;
      this.form.segundo_nombre = colaborador.segundo_nombre;
      this.form.apellido_paterno = colaborador.apellido_paterno;
      this.form.apellido_materno = colaborador.apellido_materno;
      this.form.sexo = colaborador.sexo;
      this.form.nacionalidad = colaborador.nacionalidad;
      this.form.fecha_nacimiento = colaborador.fecha_nacimiento;
      this.form.email = colaborador.email;
      this.form.domicilio = colaborador.domicilio;
      this.form.licencia_b = colaborador.licencia_b;
      this.form.vencimiento_licencia_b = colaborador.vencimiento_licencia_b;
      this.form.licencia_d = colaborador.licencia_d;
      this.form.vencimiento_licencia_d = colaborador.vencimiento_licencia_d;
      this.form.carnet_portuario = colaborador.carnet_portuario;
      this.form.vencimiento_carnet_portuario = colaborador.vencimiento_carnet_portuario;
      this.form.credencial_vigilante = colaborador.credencial_vigilante;
      this.form.vencimiento_credencial_vigilante = colaborador.vencimiento_credencial_vigilante;
      this.form.talla_calzado = colaborador.talla_calzado;
      this.form.talla_chaleco = colaborador.talla_chaleco;
      this.form.talla_polera = colaborador.talla_polera;
      this.form.talla_pantalon = colaborador.talla_pantalon;
      this.form.telefono = colaborador.telefono;
      this.form.celular = colaborador.celular;
      this.form.anexo = colaborador.anexo;
      this.form.contacto_emergencia_nombre = colaborador.contacto_emergencia_nombre;
      this.form.contacto_emergencia_telefono = colaborador.contacto_emergencia_telefono;
      this.form.fecha_inactividad = colaborador.fecha_inactividad;
      this.form.nivel_educacion_id = colaborador.nivelEducacion === '' ? '' : colaborador.nivelEducacion.id;
      this.form.estado_civil_id = colaborador.estadoCivil === '' ? '' : colaborador.estadoCivil.id;
      this.form.tags = colaborador.tags;
      this.form.imagen_url = colaborador.imagen_url;
      this.nombre_completo = colaborador.nombre_completo;
      this.avatar = colaborador.imagen_url;
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      this.form.imagen = e.file;
			if(e.file !== undefined) {
        this.imageName = e.file.name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader()
				fr.readAsDataURL(e.file)
				fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = e.file
				})
			} else {
				this.imageName = '';
				this.imageFile = '';
				this.imageUrl = '';
			}
    },
    beforeImageUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$notify.info({
          title: 'TPA',
          message: 'La imagen tiene que estar en formato JPG ó PNG'
        })
        return isJPG && isLt5M
      }
      if (!isLt5M) {
        this.$notify.info({
          title: 'TPA',
          message: 'La imagen no puede exceder los 5MB de tamaño'
        })
        return isJPG && isLt5M
      }
      return isJPG && isLt5M
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submitCreateColaborador(){
      this.processingForm = true

      if(this.form.licencia_b === 'SI' && this.form.vencimiento_licencia_b === ''){
        this.form.licencia_b = 'NO';
      }
      if(this.form.licencia_d === 'SI' && this.form.vencimiento_licencia_d === ''){
        this.form.licencia_d = 'NO';
      }
      if(this.form.carnet_portuario === 'SI' && this.form.vencimiento_carnet_portuario === ''){
        this.form.carnet_portuario = 'NO';
      }
      if(this.form.credencial_vigilante === 'SI' && this.form.vencimiento_credencial_vigilante === ''){
        this.form.credencial_vigilante = 'NO';
      }
      var tags = JSON.stringify(this.form.tags);
      var formData = new FormData();
      formData.append("_method", 'PATCH');
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
      formData.append("email", this.form.email);
      formData.append("licencia_b", this.form.licencia_b);
      formData.append("vencimiento_licencia_b", this.form.vencimiento_licencia_b);
      formData.append("licencia_d", this.form.licencia_d);
      formData.append("vencimiento_licencia_d", this.form.vencimiento_licencia_d);
      formData.append("carnet_portuario", this.form.carnet_portuario);
      formData.append("vencimiento_carnet_portuario", this.form.vencimiento_carnet_portuario);
      formData.append("credencial_vigilante", this.form.credencial_vigilante);
      formData.append("vencimiento_credencial_vigilante", this.form.vencimiento_credencial_vigilante);
      formData.append("talla_calzado", this.form.talla_calzado);
      formData.append("talla_chaleco", this.form.talla_chaleco);
      formData.append("talla_polera", this.form.talla_polera);
      formData.append("talla_pantalon", this.form.talla_pantalon);
      formData.append("telefono", this.form.telefono);
      formData.append("celular", this.form.celular);
      formData.append("anexo", this.form.anexo);
      formData.append("contacto_emergencia_nombre", this.form.contacto_emergencia_nombre);
      formData.append("contacto_emergencia_telefono", this.form.contacto_emergencia_telefono);
      formData.append("fecha_nacimiento", this.form.fecha_nacimiento);
      formData.append("nivel_educacion_id", this.form.nivel_educacion_id);
      formData.append("estado_civil_id", this.form.estado_civil_id);
      formData.append("imagen", this.form.imagen);
      formData.append("imagen_url", this.form.imagen_url);
      this.updateColaborador({
        colaboradorId: this.$route.params.id,
        data: formData
      })
      .then(response => {
        this.processingForm = false
        this.$router.push({ name: "listacolaboradores" });
      })
      .catch((error) => {
          this.processingForm = false
      })
    },
  }
}
</script>
