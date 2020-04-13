<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs :routes="[{ name: 'Inicio' }, { name: 'Asignar Encuesta' }]" />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Asignar encuesta a colaboradores</span>
            </v-card-title>

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
                :items="disponibles"
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
                </template>
              </v-data-table>
            </v-card>
            <v-btn
              v-if="selected.length > 0"
              large
              color="success"
              dark
              @click="crear()"
              :loading="loading"
            >Asignar Seleccionados</v-btn>
            <v-btn
              flat
              @click="$router.push({name: 'encuestaAsignados', params: { id: $route.params.id }})"
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
    return { title: "Asignar curso" };
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
        { text: 'Apellido', value: 'apellido_paterno' }
      ],
      formErrors: {},
      e1: 0,
      searchUsers: '',
      loading: false,
      form: {
        colaboradores: [],
      },
    };
  },
  computed: {
    ...mapState({
        disponibles: state => state.encuestas.disponibles,
        loadingDisponibles: state => state.encuestas.loadingDisponibles
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
      this.getDisponibles({encuestaId: this.$route.params.id});
  },
  methods: {
    ...mapActions({
      getDisponibles:'encuestas/getDisponibles',
      asignar: 'encuestas/asignar'
    }),
    crear() {
      this.loading = true;
      this.form.colaboradores = this.selected.map(function(item) {return item.id});
      this.asignar({
        encuestaId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.loading = false;
          this.$router.push({name: 'encuestaAsignados', params: { id: this.$route.params.id }});
        })
        .catch(error => {
          this.formErrors = error.response.data.errors || {};
        });

    },
  }
};

</script>
