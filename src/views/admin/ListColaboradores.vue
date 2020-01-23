<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-card-title class="white cyan--text headline">
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
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title></v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearcolaborador' }"
            color="success"
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
                label="Buscar Nombre"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre', value: 'primer_nombre'},
                  { text: 'Apellido',value: 'apellido_paterno'},
                  { text: 'Cargo'},
                  { text: 'Editar informacion'},
                  { text: 'Editar Movilidad'},
                  { text: 'Editar Cargas' },
                  { text: 'Editar Hoja de vida'},
                  { text: 'Cursos'}
                ]"
                :items="colaboradores"
                :search="searchUsers"
                :loading="loadingColaboradores"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.primer_nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.apellido_paterno }}
                  </td>
                  <td class="px-3">
                    cargo
                  </td>
                  <td class="px-3">
                    <v-btn small  :to="{ name: 'editcolaborador', params: { id: props.item.id } }"  color="success">Informacion</v-btn>
                  </td>
                  <td class="px-3">
                    <v-btn small :to="{ name: 'crearmovilidad', params: { id: props.item.id } }" color="success">Movilidad</v-btn>
                  </td>
                  <td class="px-3">
                    <v-btn small :to="{ name: 'ListaCargaFamiliar', params: { id: props.item.id } }" color="success">Cargas</v-btn>
                  </td>
                  <td>
                    <v-btn small color="success">Hoja de Vida</v-btn>
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn small color="success">Cursos</v-btn>
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
import { mapState, mapActions } from 'vuex';

export default {

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs')
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
    })
  },
  created () {
    this.getColaboradores();
  },
  methods: {
    ...mapActions({
      getColaboradores: 'colaboradores/getColaboradores',
    })
  }
}
</script>
<style scoped>
.colorHeader{
  color: aliceblue;
  background:teal;
}
</style>
