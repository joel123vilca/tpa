<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Editar Cargo' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Cargo</span>
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
                @submit.prevent="submitUpdate"
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
                @keyup="
                  () => {
                    formErrors.nombre = undefined;
                    delete formErrors.nombre;
                  }
                "
              />
              <v-autocomplete
                v-model="form.nivel_jerarquico_id"
                :items="nivelesJerarquico"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR NIVEL JERARQUICO"
                item-text="nivel_nombre"
                item-value="id"
                :disabled="processingForm"
                :error="!!formErrors.nivel_jerarquico_id"
                :error-messages="formErrors.nivel_jerarquico_id"
                @change="
                  () => {
                    formErrors.nivel_jerarquico_id = undefined;
                    delete formErrors.nivel_jerarquico_id;
                  }
                "
              />
              <v-autocomplete
                v-model="form.supervisor_id"
                :items="cargos"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR SUPERVISOR"
                item-text="nombre"
                item-value="id"
                :disabled="processingForm"
                :error="!!formErrors.supervisor_id"
                :error-messages="formErrors.supervisor_id"
                @change="
                  () => {
                    formErrors.supervisor_id = undefined;
                    delete formErrors.supervisor_id;
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
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({ name: 'listacargo' })">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <div v-for="area in areasRelacionados.slice().reverse()">
                   <h3 class="title" key='area.id'>{{area.tipoArea.tipo_nombre}}: {{ area.nombre }}</h3>
                   <br>
                </div>
                <br>
              <v-autocomplete
                v-model="form.padre_id"
                :items="filterData"
                outline
                clearable
                small-chips
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
              <v-autocomplete
                v-model="form.cuarto_padre_id"
                :items="filterDataSubArea"
                outline
                clearable
                small-chips
                label="SELECCIONAR SUBAREA "
                item-text="nombre"
                item-value="id"
                :rules="rules.cuarto_padre_id"
                :error="!!formErrors.cuarto_padre_id"
                :error-messages="formErrors.cuarto_padre_id"
                @keyup="() => {
                  formErrors.cuarto_padre_id = undefined
                  delete formErrors.cuarto_padre_id
                }"
              />
                <v-btn
                  type="submit"
                  color="success"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Guardar Cambios
                </v-btn>
              <v-btn flat @click="e1 = 1">Volver</v-btn>
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
    return { title: "Editar Cargo" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      areasRelacionados: [],
      form: {
        nombre: '',
        supervisor_id: '',
        padre_id: 1,
        nivel_jerarquico_id: null,
        segundo_padre_id: null,
        tercer_padre_id: null,
        cuarto_padre_id: null,
        estado: 1,
        area_id: null,
      },
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
      nivelesJerarquico: state => state.nivelesJerarquico.nivelesJerarquico,
      loadingNivelesJerarquico: state => state.nivelesJerarquico.loadingNivelesJerarquico,
      areas: state => state.areas.areas,
      loadingAreas: state => state.areas.loadingAreas,
      cargos: state => state.cargos.cargos,
      loadingCargos: state => state.cargos.loadingCargos,
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
        return areas.filter(o => o.padre_id === this.form.segundo_padre_id && o.tipoArea.nivel === 3);
      } else {
        return areas.filter(o => o.padre_id === this.form.padre_id && o.tipoArea.nivel === 3);
      }
    },
    filterDataSubArea() {
      let areas = this.areas
      return areas.filter(o => o.padre_id === this.form.tercer_padre_id);
    },
  },
  created(){
    this.getCargo({ cargoId: this.$route.params.id }).then(response => {
      const cargoInfo = response.data.data;
      this.setForm(cargoInfo);
    });
    this.getNivelesJerarquico();
    this.getAreas();
    this.getCargos();
  },
  methods: {
    ...mapActions({
      updateCargo: "cargos/updateCargo",
      getCargo: 'cargos/getCargo',
      getNivelesJerarquico: "nivelesJerarquico/getNivelesJerarquico",
      getAreas: 'areas/getAreas',
      getCargos: 'cargos/getCargos',
      getAreasRelacionados: 'areas/getAreasRelacionados',
    }),
    setForm(cargo) {
      this.form.nombre = cargo.nombre;
      this.form.estado = cargo.estado;
      this.form.supervisor_id = cargo.supervisor_id;
      this.form.nivel_jerarquico_id = cargo.nivelJerarquico.id;
      this.form.area_id = cargo.area.id;
      this.getAreasRelacionados({ areaId: this.form.area_id }).then(response => {
        const AreasRelacionados = response.data.data;
        this.areasRelacionados= AreasRelacionados;
      });
    },
    submitUpdate() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      if (this.form.padre_id === 1){
         this.form.area_id = 1;
      }
      if(this.form.padre_id > 1){
        this.form.area_id = this.form.padre_id;
      }
       if(this.form.segundo_padre_id !=null){
         this.form.area_id =this.form.segundo_padre_id;
       }
       if(this.form.tercer_padre_id !=null){
         this.form.area_id =this.form.tercer_padre_id;
       }
       if(this.form.cuarto_padre_id !=null){
         this.form.area_id =this.form.cuarto_padre_id;
       }
      this.updateCargo({ cargoId: this.$route.params.id,
        data: this.form, })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listacargo" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};

</script>
