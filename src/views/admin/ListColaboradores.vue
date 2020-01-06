<template>
  <v-container
    fluid
    grid-list-lg
  >
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio' },
          { name: 'Colaboradores' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Preinscritos</v-toolbar-title>
          <v-spacer />
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
              v-if="listado.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingRegistereds"
                box
                append-icon="search"
                label="Buscar por dni o apellido"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre', value: 'Nombre' },
                  { text: 'Cargo'},
                  { text: 'Editar informacion'},
                  { text: 'Editar Movilidad'},
                  { text: 'Editar Cargas' },
                  { text: 'Editar Hoja de vida'}
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
                    hola
                  </td>
                  <td class="px-3">
                    {{ props.item.nombre }}
                  </td>
                  <td class="px-3">
                    button
                  </td>
                  <td class="px-3">
                    button
                  </td>
                  <td class="px-3">
                    button
                  </td>
                  <td>
                    button
                  </td>
                  <td class="text-xs-center px-3">
                   button
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
