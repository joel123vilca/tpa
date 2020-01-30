<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Movilidades' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>lista de Movilidades</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearmovilidad', params: { id: this.$route.params.id  } }"
            color="success"
          >
            Agregar Movilidad
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
                  { text: 'cargo', value: 'cargo' },
                  { text: 'fecha Inicio' },
                  { text: 'Fecha Final' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="movilidades"
                :loading="loadingMovilidades"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.cargo_id }}
                  </td>
                  <td class="px-3">
                    {{ props.item.fecha_inicio }}
                  </td>
                  <td>
                    {{ props.item.fecha_termino }}
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
                        :to="{ name: '', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="error"
                      >
                        <v-icon small>
                          delete
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
import { mapState, mapActions } from 'vuex';

export default {

  metaInfo () {
    return { title: 'Listado de Movilidades' }
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
      movilidades: state => state.colaboradores.movilidades,
      loadingMovilidades: state => state.colaboradores.loadingMovilidades,
    })
  },
  created() {
    this.getMovilidad({ colaboradorId: this.$route.params.id });
  },

  methods: {
    ...mapActions({
      getMovilidad: 'colaboradores/getMovilidad',
    }),
  }
}
</script>
