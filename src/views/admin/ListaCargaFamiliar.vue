<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Carga Familiar' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>lista de Carga Familiar</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'agregarCargaFamiliar', params: { id: this.$route.params.id  } }"
            color="success"
          >
            Agregar Carga Familiar
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
                  { text: 'Nombres', value: 'nombres' },
                  { text: 'Apellidos' },
                  { text: 'Tipo Carga' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="cargaFamiliar"
                :loading="loadingCargaFamiliar"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.nombres }}
                  </td>
                  <td class="px-3">
                    {{ props.item.apellidos }}
                  </td>
                  <td>
                    {{ props.item.tipoCarga.tipo }}
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
    return { title: 'Listado de tags' }
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
      cargaFamiliar: state => state.colaboradores.cargaFamiliar,
      loadingCargaFamiliar: state => state.colaboradores.loadingCargaFamiliar,
    })
  },
  created() {
    this.getFamily({ colaboradorId: this.$route.params.id });
  },

  methods: {
    ...mapActions({
      getFamily: 'colaboradores/getFamily',
    }),
  }
}
</script>
