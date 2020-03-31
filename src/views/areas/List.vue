<template>
  <NotPermission v-if="!authenticated" />
  <v-container
    v-else
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
          color="grey darken-1"
          dark
          card
          style="border-radius:10px;"
        >
          <v-toolbar-title>Areas</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearArea' }"
            color="primary"
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
            <v-flex
              v-if="areas.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchAreas"
                :disabled="loadingAreas"
                box
                append-icon="search"
                label="Buscar Area"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'nombre' },
                  { text: 'Descripcion',value: 'descripcion' },
                  { text: 'Estado',value: 'estado' },
                  { text: 'Fecha de modificacion',value: 'updated_at' },
                  { text: 'Acciones'}
                ]"
                :items="areas"
                :search="searchAreas"
                :loading="loadingAreas"
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
                  <td class="px-3">
                    {{ props.item.updated_at }}
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {

  metaInfo () {
    return { title: 'Listado de areas' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      searchAreas: '',
    };
  },

  computed: {
    ...mapState({
      areas: state => state.areas.areas,
      loadingAreas: state => state.areas.loadingAreas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getAreas();
  },

  methods: {
    ...mapActions({
      getAreas: 'areas/getAreas',
    }),
  }
}
</script>
