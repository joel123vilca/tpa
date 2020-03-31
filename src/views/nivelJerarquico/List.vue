<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-card-title class="white cyan--text headline">
        Listado de Niveles jerárquico
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Niveles Jerárquico' },
          { name: 'Listado'}
        ]"
        />
    </v-card-title>
    <br>
    <template>
      <v-card>
       <v-toolbar
          color="grey darken-1"
          dark
          card
          style="border-radius:10px;"
        >
          <v-toolbar-title>Nivel Jerarquico</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'creaniveljerarquico' }"
            color="primary"
          >
            Agregar nivel jerarquico
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
              v-if="nivelesJerarquico.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchJerarquico"
                :disabled="loadingNivelesJerarquico"
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
                  { text: 'Nombre', value: 'nivel_nombre'},
                  { text: 'Estado'},
                  { text: 'Acciones'},
                ]"
                :items="nivelesJerarquico"
                :search="searchJerarquico"
                :loading="loadingNivelesJerarquico"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.nivel_nombre }}
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
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'editniveljerarquico', params: { id: props.item.id } }"
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
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },
  data() {
    return {
      searchJerarquico: '',
    };
  },
  computed: {
    ...mapState({
      nivelesJerarquico: state => state.nivelesJerarquico.nivelesJerarquico,
      loadingNivelesJerarquico: state => state.nivelesJerarquico.loadingNivelesJerarquico,
    }),
  },
  created() {
    this.getNivelesJerarquico();
  },
  methods: {
    ...mapActions({
      getNivelesJerarquico: 'nivelesJerarquico/getNivelesJerarquico',
    }),
  },
};
</script>
<style scoped>
.colorHeader{
  color: aliceblue;
  background:teal;
}
</style>
