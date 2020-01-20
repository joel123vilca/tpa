<template>
  <v-container fluid grid-list-lg>
    <template>
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
              <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Datos Especificos</v-stepper-step>
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
                label="nombre"
                outline
                :rules="rules.nombre"
                :error="!!formErrors.nombre"
                :error-messages="formErrors.nombre"
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
                label="Seleccionar tipo de curso"
                item-text="tipo_nombre"
                item-value="id"
                :disabled="processingForm"
                :error="!!formErrors.tipo_area_id"
                :error-messages="formErrors.tipo_area_id"
                @change="
                  () => {
                    formErrors.tipo_area_id = undefined;
                    delete formErrors.tipo_area_id;
                  }
                "
              />
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continue
              </v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
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
              <v-autocomplete
                v-if="form.tipo_area_id > 2"
                v-model="form.padre_id"
                :items="filterData"
                label="SELECCIONAR GERENCIA"
                item-text="nombre"
                item-value="id"
                :rules="rules.padre_id"
                :error="!!formErrors.padre_id"
                :error-messages="formErrors.padre_id"
                @keyup="() => {
                  formErrors.padre_id = undefined
                  delete formErrors.padre_id
                }"
              />
              <v-autocomplete
                v-if="form.tipo_area_id > 3"
                v-model="form.segundo_padre_id"
                :items="filterDataSubgerencia"
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
import { mapState, mapActions } from "vuex";

export default {
  metaInfo() {
    return { title: "Nuevo Area" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      form: {
        nombre: '',
        padre_id: '',
        tipo_area_id: 0,
        segundo_padre_id: 0,
        tercer_padre_id: '',
        estado: 0,
      },
      tipos: ['POSITIVO', 'NEGATIVO'],
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
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
      filterData() {
      let areas = this.areas
      return areas.filter(o => o.tipoArea.nivel === 1);
    },
    filterDataSubgerencia() {
      let areas = this.areas
      return areas.filter(o => o.padre_id === this.form.padre_id && o.tipoArea.nivel === 2);
    },
    filterDataArea() {
      let areas = this.areas
      if(this.form.segundo_padre_id != 0){
        console.log(this.form.segundo_padre_id);
        return areas.filter(o => o.padre_id === this.form.segundo_padre_id && o.tipoArea.nivel === 3);
      } else {
        return areas.filter(o => o.padre_id === this.form.padre_id && o.tipoArea.nivel === 3);
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
    }),

    submitCreateArea() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
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
