<template>
  <NotPermission v-if="!authenticated" />
  <v-container v-else fluid grid-list-lg>
    <Breadcrumbs
      :routes="[
          { name: 'Inicio'},
          { name: 'Listado' },
          { name: 'Estadistica' }
        ]"
    />
    <v-card style="border-radius:10px 10px 0 0;">
      <v-toolbar card style="border-radius:10px 10px 0 0;" color="primary" dark>
        <v-toolbar-title>{{tipo}}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-toolbar color="grey darken-1" dark card>
        <v-toolbar-title>Listado de Resultados estadisticos</v-toolbar-title>
        <v-spacer />
        <v-btn
          class="ma-0"
          small
          flat
          :to="{ name: 'periodoGraficos', params: { id: this.$route.params.id } }"
          color="info"
        >ver graficos</v-btn>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex v-if="periodoEstadisticas.length" sm6 offset-sm6>
            <v-text-field
              v-model="search"
              :disabled="loadingPeriodoEstadisticas"
              box
              append-icon="search"
              label="Buscar "
              clearable
              hide-details
            />
          </v-flex>
          <v-flex xs12>
            <v-data-table
              v-if="tipo === 'GED'"
              :headers="[
                  { text: 'Nombre Periodo'},
                  { text: 'Nombre Colaborador', value: 'colaborador.nombre_completo'},
                  { text: 'Promedio', value:'resultado'}
                ]"
              :items="periodoEstadisticas"
              :loading="loadingPeriodoEstadisticas"
              :search="search"
              :rows-per-page-items="[25,35,50]"
              class="elevation-1"
            >
              <tr slot="items" slot-scope="props">
                <td class="px-8" v-if="props.item.resultado !=null">{{ props.item.periodo.nombre }}</td>
                <td
                  class="px-8"
                  v-if="props.item.resultado !=null"
                >{{ props.item.colaborador.nombre_completo }}</td>
                <td class="px-3" v-if="props.item.resultado !=null">{{ props.item.resultado +'%' }}</td>
              </tr>
            </v-data-table>
            <v-data-table
              v-else
              :headers="[
                  { text: 'Nombre Area', value:'area.nombre'},
                  { text: 'Promedio', value:'resultado'}
                ]"
              :items="periodoEstadisticas"
              :loading="loadingPeriodoEstadisticas"
              :search="search"
              :rows-per-page-items="[25,35,50]"
              class="elevation-1"
            >
              <tr slot="items" slot-scope="props">
                <td class="px-8" v-if="props.item.resultado !=null">{{ props.item.area.nombre }}</td>
                <td class="px-3" v-if="props.item.resultado !=null">{{ props.item.resultado +'%' }}</td>
              </tr>
            </v-data-table>
          </v-flex>
          <center>
            <v-btn color="error" @click="$router.push({ name: 'listaPeriodo' })">Volver</v-btn>
          </center>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de estadisticas' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      activeBtn: 5,
      tipo: '',
      search: '',
    };
  },

  computed: {
    ...mapState({
      periodoEstadisticas: state => state.periodos.periodoEstadisticas,
      loadingPeriodoEstadisticas: state => state.periodos.loadingPeriodoEstadisticas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getPeriodoEstadisticas({periodoId: this.$route.params.id});
    this.getPeriodo({periodoId: this.$route.params.id}).then(response => {
      const periodo = response.data.data;
      this.setForm(periodo);
    });
  },

  methods: {
    ...mapActions({
      getPeriodoEstadisticas: 'periodos/getPeriodoEstadisticas',
      getPeriodo: 'periodos/getPeriodo',
    }),
    setForm(periodo) {
      this.tipo = periodo.encuestaPlantilla.nombre;
    },
  },
};
</script>
