<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaborador' },
          { name: 'Listado de comentarios' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Comentarios</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearcomentario', params: { id: $route.params.id } }"
            color="success"
          >
            Agregar Comentario
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
                  { text: 'Tipo' },
                  { text: 'Autor' },
                  { text: 'Fecha'},
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="comentarios"
                :loading="loadingComentarios"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.tipoComentario.tipo }}
                  </td>
                   <td class="px-3">

                  </td>
                  <td class="px-3">
                    {{ props.item.fecha}}
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
                        :to="{ name: 'editcomentario', params: { id: props.item.id } }"
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
import { mapState, mapActions } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de comentarios' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  computed: {
    ...mapState({
      comentarios: state => state.comentarios.comentarios,
      loadingComentarios: state => state.comentarios.loadingComentarios,
    }),
  },
  created() {
    this.getComentarios();
  },

  methods: {
    ...mapActions({
      getComentarios: 'comentarios/getComentarios',
      replaceCurrentComentario: 'comentarios/replaceCurrentComentario',
      deleteComentario: 'comentarios/deleteComentario',
      replaceComentarios: 'comentarios/replaceComentarios',
    }),
  },
};
</script>