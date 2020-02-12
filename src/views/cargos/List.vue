<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Cargos' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Cargos</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearcargo' }"
            color="success"
          >
            Agregar Cargo
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
              v-if="cargos.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchCargos"
                :disabled="loadingCargos"
                box
                append-icon="search"
                label="Buscar Cargo"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'nombre' },
                  { text: 'Area', value: 'area.nombre' },
                  { text: 'Estado' },
                  { text: 'Descriptor'},
                  { text: 'Organigrama'},
                  { text: 'Fecha de modificacion',value: 'updated_at' },
                  { text: 'Acciones'}
                ]"
                :items="cargos"
                :search="searchCargos"
                :loading="loadingCargos"
                :rows-per-page-items="[10,25,35,50]"
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
                    {{ props.item.area.nombre }}
                  </td>
                  <td class="px-3">
                    <v-btn class="ma-0"
                        small
                        :href="props.item.organigrama_path"
                        target="_blank"
                        color="success"
                        text-color="white"
                        >
                      Ver
                    </v-btn>
                  </td>
                  <td class="px-3">
                    <v-btn class="ma-0"
                        small
                        :href="props.item.organigrama_path"
                        target="_blank"
                        color="success"
                        text-color="white"
                        >
                      Ver
                    </v-btn>
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
                  <td class="px-3">
                    {{ props.item.updated_at }}
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'editcargo', params: { id: props.item.id } }"
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

  metaInfo() {
    return { title: 'Listado de cargos' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  data() {
    return {
      searchCargos: '',
    };
  },

  computed: {
    ...mapState({
      cargos: state => state.cargos.cargos,
      loadingCargos: state => state.cargos.loadingCargos,
    })
  },
  created () {
    this.getCargos();
  },

  methods: {
    ...mapActions({
      getCargos: 'cargos/getCargos',
    }),
  }
}
</script>
