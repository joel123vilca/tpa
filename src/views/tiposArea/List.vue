<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Tipos Area' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Tipos Area</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'sgcUsersCreate' }"
            color="success"
          >
            Agregar Tipo Area
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
                  { text: 'Nombres', value: 'tipo_nombre' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="tiposArea"
                :loading="loadingTiposArea"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.tipo_nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.estado }}
                  </td>
                  <td class="px-3">
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'edittag', params: { id: props.item.id } }"
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
    return { title: 'Listado de tipos Area' }
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
      tiposArea: state => state.tiposArea.tiposArea,
      loadingTiposArea: state => state.tiposArea.loadingTiposArea,
    })
  },
  created () {
    this.getTiposArea();
  },

  methods: {
    ...mapActions({
      getTiposArea: 'tiposArea/getTiposArea',
    }),
  }
}
</script>
