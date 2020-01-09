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
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="listado.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingRegistereds"
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
                  { text: 'Nombre', value: 'Nombre', color: 'red'},
                  { text: 'Cargo'},
                  { text: 'Editar informacion'},
                  { text: 'Editar Movilidad'},
                  { text: 'Editar Cargas' },
                  { text: 'Editar Hoja de vida'},
                  { text: 'Cursos'}
                ]"
                :items="listado"
                :search="searchUsers"
                :loading="loadingRegistereds"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.nombre }}
                  </td>
                  <td class="px-3">
                    cargo
                  </td>
                  <td class="px-3">
                    <v-btn small color="success">Informacion</v-btn>
                  </td>
                  <td class="px-3">
                    <v-btn small color="success">Movilidad</v-btn>
                  </td>
                  <td class="px-3">
                    <v-btn small color="success">Cargas</v-btn>
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
import { mapState, mapActions } from 'vuex'

export default {

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },
  data () {
    return {
      listado:[
        {id:1, nombre:'joel'},
        {id:2, nombre:'alberto'},
      ]
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    ...mapActions({

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
