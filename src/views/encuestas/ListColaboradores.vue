<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs :routes="[{ name: 'Inicio' }, { name: 'Lista de colaboradores' }]" />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">encuesta - colaboradores</span>
            </v-card-title>
            <v-spacer />
            <v-btn
              :to="{ name: 'encuestaAsignar', params: { id: $route.params.id }}"
              color="primary"
            >Asignar Colaboradores</v-btn>
            <v-divider />
            <v-card>
              <v-card-title>
                Colaboradores
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Buscador"
                  single-line
                  hide-details
                  box
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="asignados"
                :search="search"
                :rows-per-page-items="[10,25,35,50]"
                item-key="id"
                select-all
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td>{{ props.item.rut }}</td>
                  <td>{{ props.item.primer_nombre}}</td>
                  <td>{{ props.item.apellido_paterno }}</td>
                  <td>{{ props.item.apellido_materno }}</td>
                </template>
              </v-data-table>
            </v-card>
            <v-btn
              v-if="selected.length > 0"
              large
              color="error"
              dark
              @click="eleminar()"
              :loading="loading"
            >desasignar Seleccionados</v-btn>
            <v-btn
              flat
              @click="$router.push({name: 'periodoEncuestas', params: { id: peridoId }})"
            >Cancelar</v-btn>
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
    return { title: "Lista de colaboradores" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      selected: [],
      search: '',
      headers: [
        {
          text: 'Rut',
          align: 'left',
          sortable: false,
          value: 'rut',
        },
        { text: 'Nombre', value: 'primer_nombre' },
        { text: 'Apellido Paterno', value: 'apellido_paterno' },
        { text: 'Apellido Materno', value: 'apellido_materno' },
      ],
      formErrors: {},
      e1: 0,
      searchUsers: '',
      loading: false,
      form: {
        colaboradores: [],
      },
      peridoId: '',
    };
  },
  computed: {
    ...mapState({
        asignados: state => state.encuestas.asignados,
        loadingAsignados: state => state.encuestas.loadingAsignados
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
      this.getAsignados({encuestaId: this.$route.params.id});
      this.getEncuesta({encuestaId: this.$route.params.id}).then(response => {
      const encuestaInfo = response.data.data;
      this.setForm(encuestaInfo);
    });
  },
  methods: {
    ...mapActions({
      getAsignados:'encuestas/getAsignados',
      desasignar: 'encuestas/desasignar',
      getEncuesta: 'encuestas/getEncuesta'
    }),
    setForm(encuesta) {
      this.peridoId= encuesta.periodo.id;
    },
    eleminar() {
      this.loading = true;
      this.form.colaboradores = this.selected.map(function(item) {return item.id});
      this.desasignar({
        encuestaId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.loading = false;
          this.$router.push({name: 'encuestaAsignados', params: { id: this.$route.params.id }});
          this.getAsignados({encuestaId: this.$route.params.id});
        })
        .catch(error => {
          this.formErrors = error.response.data.errors || {};
        });

    },
  }
};

</script>
