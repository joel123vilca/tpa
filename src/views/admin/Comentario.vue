<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaboradores' },
          { name: 'Crear Comentario'}
        ]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Comentario</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateComentario"
              >
                <v-container fluid grid-list-lg>

                  <v-autocomplete
                    v-model="form.tipo_comentario_id"
                    :items="tipoComentarios"
                    dense
                    outline
                    clearable
                    small-chips
                    label="Seleccionar tipo de comentario"
                    item-text="tipo"
                    item-value="id"
                    :disabled="processingForm"
                    :rules="rules.tipo_comentario_id"
                    :error="!!formErrors.tipo_comentario_id"
                    :error-messages="formErrors.tipo_comentario_id"
                    @change="
                      () => {
                        formErrors.tipo_comentario_id = undefined;
                        delete formErrors.tipo_comentario_id;
                      }
                    "
                  />
                  <v-textarea
                    v-model="form.texto_libre"
                    name="input-7-4"
                    label="Comentario"
                    outline
                  ></v-textarea>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>

              <template >
                <v-text-field
                  v-model="form.fecha"
                  hint="Formato DD/MM/AAAA"
                  label="Fecha"
                  outline
                  type="date"
                  :rules="rules.fecha"
                ></v-text-field>
              </template>
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                    v-model="form.colaborador_autor_id"
                    :items="filterData"
                    dense
                    outline
                    clearable
                    small-chips
                    label="Autor del comentario"
                    item-text="nombre_completo"
                    item-value="id"
                    :disabled="processingForm"
                    :rules="rules.colaborador_autor_id"
                    :error="!!formErrors.colaborador_autor_id"
                    :error-messages="formErrors.colaborador_autor_id"
                    @change="
                      () => {
                        formErrors.colaborador_autor_id = undefined;
                        delete formErrors.colaborador_autor_id;
                      }
                    "
                  />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.publico"
                        :items="privacidad"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Privacidad"
                        item-text="nombre"
                        item-value="id"
                        :disabled="processingForm"
                        :rules="rules.publico"
                        :error="!!formErrors.publico"
                        :error-messages="formErrors.publico"
                        @keyup="
                          () => {
                            formErrors.publico = undefined;
                            delete formErrors.publico;
                          }
                        "
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
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
                        :rules="rules.estado"
                        :error="!!formErrors.estado"
                        :error-messages="formErrors.estado"
                        @change="
                          () => {
                            formErrors.estado = undefined;
                            delete formErrors.estado;
                          }
                        "
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({name: 'listacomentario', params: { id: $route.params.id }})">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
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
    return { title: "Nuevo comentario" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')

  },

  data() {
    return {
      formErrors: {},
      targetIssueDate5: false,
      targetIssueDate: false,
      mask: 'date',
      form: {
        texto_libre: '',
        publico: '',
        fecha: '',
        estado: 1,
        tipo_comentario_id: '',
        colaborador_id: '',
        colaborador_autor_id: '',
        positivo:1,
      },
      tipos: [
        { id: 0, nombre: 'Negativo'},
        { id: 1, nombre: 'Positivo'}
      ],
      privacidad: [
        { id: 2, nombre: 'Privado'},
        { id: 1, nombre: 'Publico'}
      ],
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,
      rules: {
        publico: [v => !!v || "El privacidad es requerido"],
        fecha: [v => !!v || "La fecha es requerido"],
        colaborador_autor_id: [v => !!v || "El auto es requerido"],
        tipo_comentario_id: [v => !!v || "El tipo de comentario es requerido"],
      }
    };
  },
  computed: {
    ...mapState({
      tipoComentarios: state => state.comentarios.tipoComentarios,
      loadingTipoComentarios: state => state.comentarios.loadingTipoComentarios,
      colaboradores: state => state.colaboradores.colaboradores,
      loadingColaboradores: state => state.colaboradores.loadingColaboradores,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
    filterData() {
      let colaboradores = this.colaboradores;
      return colaboradores.filter(o => o.id != this.$route.params.id );
    },
  },
  created() {
    this.getTipoComentarios();
    this.getColaboradores();
  },
  methods: {
    ...mapActions({
      createComentario: "comentarios/createComentario",
      getTipoComentarios: "comentarios/getTipoComentarios",
      getColaboradores: 'colaboradores/getColaboradores',
    }),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    submitCreateComentario() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      if(this.form.publico === 2){
        this.form.publico = 0;
      }
      this.form.colaborador_id = this.$route.params.id;
      this.createComentario({ data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listacomentario", params: { id: this.$route.params.id }});
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
