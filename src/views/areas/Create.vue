<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Nuevo Area' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Area</span>
            </v-card-title>

            <v-divider />
            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Datos Generales</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Estructura Jerárquica</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateArea"
              >
            <v-stepper-content step="1">
              <v-text-field
                v-model="form.nombre"
                :disabled="processingForm"
                label="NOMBRE"
                outline
                :rules="rules.nombre"
                :error="!!formErrors.nombre"
                :error-messages="formErrors.nombre"
                @change="verifyNombre"
                @keyup="
                  () => {
                    formErrors.nombre = undefined;
                    delete formErrors.nombre;
                  }
                "
              />
              <v-autocomplete
                v-model="form.tipo_area_id"
                :items="tiposArea"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR TIPO AREA"
                item-text="tipo_nombre"
                item-value="id"
                :disabled="processingForm"
                :rules="rules.tipo_area_id"
                :error="!!formErrors.tipo_area_id"
                :error-messages="formErrors.tipo_area_id"
                @change="
                  () => {
                    formErrors.tipo_area_id = undefined;
                    delete formErrors.tipo_area_id;
                  }
                "
              />
              <v-autocomplete
                v-model="form.estado"
                :items="estados"
                dense
                outline
                clearable
                small-chips
                label="Seleccionar Estado"
                item-text="nombre"
                item-value="id"
                :disabled="processingForm"
                :error="!!formErrors.estado"
                :error-messages="formErrors.estado"
                @change="
                  () => {
                    formErrors.estado = undefined;
                    delete formErrors.estado;
                  }
                "
              />
              <v-btn
                v-if="form.tipo_area_id <= 2"
                  type="submit"
                  color="success"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Guardar
                </v-btn>
                  <v-btn
                    v-show="verify"
                    v-else
                    color="primary"
                    @click="e1 = 2"
                  >
                  Continuar
                  </v-btn>
              <v-btn flat @click="$router.push({ name: 'listaArea' })">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-autocomplete
                v-if="form.tipo_area_id > 2"
                v-model="form.gerencia"
                :items="filterDataGerencia"
                outline
                clearable
                small-chips
                label="SELECCIONAR GERENCIA GENERAL"
                item-text="nombre"
                item-value="id"
                :rules="rules.gerencia"
                :error="!!formErrors.gerencia"
                :error-messages="formErrors.gerencia"
                @keyup="() => {
                  formErrors.gerencia = undefined
                  delete formErrors.gerencia
                }"
              />
              <v-autocomplete
                v-if="form.tipo_area_id > 2"
                v-model="form.area_id"
                :items="filterData"
                outline
                clearable
                small-chips
                label="SELECCIONAR GERENCIA"
                item-text="nombre"
                item-value="id"
                :rules="rules.area_id"
                :error="!!formErrors.area_id"
                :error-messages="formErrors.area_id"
                @keyup="() => {
                  formErrors.area_id = undefined
                  delete formErrors.area_id
                }"
              />
              <v-autocomplete
                v-if="form.tipo_area_id > 3"
                v-model="form.segundo_padre_id"
                :items="filterDataSubgerencia"
                outline
                clearable
                small-chips
                label="SELECCIONAR SUBGERENCIA "
                item-text="nombre"
                item-value="id"
                :rules="rules.segundo_padre_id"
                :error="!!formErrors.segundo_padre_id"
                :error-messages="formErrors.segundo_padre_id"
                @keyup="() => {
                  formErrors.segundo_padre_id = undefined
                  delete formErrors.segundo_padre_id
                }"
              />
              <v-autocomplete
                v-if="form.tipo_area_id > 4"
                v-model="form.tercer_padre_id"
                :items="filterDataArea"
                outline
                clearable
                small-chips
                label="SELECCIONAR AREA "
                item-text="nombre"
                item-value="id"
                :rules="rules.tercer_padre_id"
                :error="!!formErrors.tercer_padre_id"
                :error-messages="formErrors.tercer_padre_id"
                @keyup="() => {
                  formErrors.tercer_padre_id = undefined
                  delete formErrors.tercer_padre_id
                }"
              />
                <v-btn
                  type="submit"
                  color="success"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Guardar
                </v-btn>
              <v-btn flat @click="e1 = 1">Cancel</v-btn>
            </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  metaInfo() {
    return { title: "Nuevo Area" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      form: {
        gerencia: 1,
        nombre: '',
        area_id: '',
        padre_id: '',
        tipo_area_id: 0,
        segundo_padre_id: 0,
        tercer_padre_id: '',
        estado: 1,
      },
      verify: false,
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
        estado: [v => !!v || "El estado es requerido"],
        tipo_area_id: [v => !!v || "El tipo de area es requerido"],
      }
    };
  },
  computed: {
    ...mapState({
      tiposArea: state => state.tiposArea.tiposArea,
      loadingTiposArea: state => state.tiposArea.loadingTiposArea,
      areas: state => state.areas.areas,
      loadingAreas: state => state.areas.loadingAreas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
    filterDataGerencia() {
      let areas = this.areas
      return areas.filter(o => o.id === 1);
    },
    filterData() {
      let areas = this.areas
      return areas.filter(o => o.tipoArea.nivel === 1);
    },
    filterDataSubgerencia() {
      let areas = this.areas
      return areas.filter(o => o.padre_id === this.form.area_id && o.tipoArea.nivel === 2);
    },
    filterDataArea() {
      let areas = this.areas
      if(this.form.segundo_padre_id != 0){
        return areas.filter(o => o.padre_id === this.form.segundo_padre_id && o.tipoArea.nivel === 3);
      } else {
        return areas.filter(o => o.padre_id === this.form.area_id && o.tipoArea.nivel === 3);
      }
    },
  },
  created(){
    this.getTiposArea();
    this.getAreas();
  },
  methods: {
    ...mapActions({
      createArea: "areas/createArea",
      getTiposArea: "tiposArea/getTiposArea",
      getAreas: 'areas/getAreas',
      getVerify: 'areas/getVerify',
    }),
    verifyNombre() {
      this.getVerify({
        nombre: this.form.nombre,
      })
        .then(response => {
          this.verify = true;
        })
        .catch((error) => {
          this.verify = false;
          this.formErrors = error.response.data.errors || {};
          this.step = 1;
        })

    },
    submitCreateArea() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      if (this.form.tipo_area_id === 2){
         this.form.padre_id = 1;
      }
      if(this.form.tipo_area_id === 3){
        this.form.padre_id = this.form.area_id;
      }
       if(this.form.tipo_area_id === 4){
         if(this.form.segundo_padre_id != 0){
           this.form.padre_id = this.form.segundo_padre_id;
         }else if (this.form.area_id != ''){
           this.form.padre_id = this.form.area_id;
         } else {
            this.form.padre_id = this.form.gerencia;
         }
       }
       if(this.form.tipo_area_id === 5 ){
         if(this.form.tercer_padre_id != '' ){
           this.form.padre_id =this.form.tercer_padre_id;
         } else if (this.form.segundo_padre_id != 0){
           this.form.padre_id = this.form.segundo_padre_id;
         } else  if (this.form.area_id != ''){
           this.form.padre_id = this.form.area_id;
         } else {
            this.form.padre_id = this.form.gerencia;
         }
       }
      this.createArea({ data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listaArea" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};

</script>
