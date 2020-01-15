<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Areas' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Areas</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearArea' }"
            color="success"
          >
            Agregar Area
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
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'nombre' },
                  { text: 'Descripcion' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="areas"
                :loading="loadingAreas"
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
                    {{ props.item.tipoArea.tipo_nombre }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.estado === 1"
                      small
                      color="primary"
                      text-color="white"
                    >
                      Activo
                    </v-chip>
                    <v-chip v-else-if="props.item.estado === 0" small>
                      Inactivo
                    </v-chip>
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'editArea', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  metaInfo () {
    return { title: 'Listado de areas' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      areas: state => state.areas.areas,
      loadingAreas: state => state.areas.loadingAreas,
    })
  },
  created () {
    this.getAreas();
  },

  methods: {
    ...mapActions({
      getAreas: 'areas/getAreas',
    }),
  }
}
</script>
