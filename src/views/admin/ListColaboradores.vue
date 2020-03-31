<template>
  <NotPermission v-if="!authenticated" />
  <v-container
    v-else
    fluid
    grid-list-lg
  >
    <v-card-title class="white cyan--text headline" style="border-radius:4px;">
        Listado de Colaboradores
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaboradores' },
          { name: 'Listado'}
        ]"
        />
    </v-card-title>
    <br>
    <template>
      <v-card style="border-radius:10px;">
        <v-toolbar
          color="grey darken-1"
          style="border-radius:10px;"
          dark
          card
        >
          <v-toolbar-title></v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearcolaborador' }"
            color="primary"
          >
            Agregar Colaborador
          </v-btn>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="colaboradores.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingColaboradores"
                box
                append-icon="search"
                label="Buscador"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Rut', value: 'rut'},
                  { text: 'Nombre', value: 'primer_nombre'},
                  { text: 'Apellido',value: 'apellido_paterno'},
                  { text: 'Cargo'},
                  { text: 'Fecha de Ingreso'},
                  { text: 'Estado', value: 'estado'},
                  { text: 'Editar informacion'}
                ]"
                :items="colaboradores"
                :search="searchUsers"
                :loading="loadingColaboradores"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3" width="110px">
                    {{ props.item.rut }}
                  </td>
                  <td class="px-3">
                    {{ props.item.primer_nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.apellido_paterno }}
                  </td>
                  <td class="px-3">
                    {{ props.item.cargoActual.nombre}}
                  </td>
                  <td class="px-3">
                    {{ formatDate(props.item.fecha_ingreso)}}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.estado === 1"
                      class="ma-2"
                      color="primary"
                      dark
                      small
                    >
                      Activo
                    </v-chip>
                    <v-chip
                      v-if="props.item.estado === 0"
                      class="ma-2"
                      color="error"
                      dark
                      small
                    >
                      Inactivo
                    </v-chip>
                  </td>
                  <td class="px-3">
                    <v-btn small  :to="{ name: 'editcolaborador', params: { id: props.item.id } }"  color="success">Informacion</v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },
  data () {
    return {
      searchUsers: "",
    }
  },
  computed: {
    ...mapState({
      colaboradores: state => state.colaboradores.colaboradores,
      loadingColaboradores: state => state.colaboradores.loadingColaboradores,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created () {
    this.getColaboradores();
  },
  methods: {
    ...mapActions({
      getColaboradores: 'colaboradores/getColaboradores',
    }),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  }
}
</script>
<style scoped>
.colorHeader{
  color: aliceblue;
  background:teal;
}
</style>
