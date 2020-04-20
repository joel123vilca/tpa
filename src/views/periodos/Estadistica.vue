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
      <v-bottom-nav color="transparent" :value="activeBtn">
        <v-btn flat color="teal">
          <span>Periodos</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn flat color="teal">
          <span>Encuestas</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn flat color="teal">
          <span>Generar Resultados</span>
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn flat color="teal">
          <span>Resultados</span>
          <v-icon>supervisor_account</v-icon>
        </v-btn>
      </v-bottom-nav>
      <br />
      <v-toolbar color="grey darken-1" dark card>
        <v-toolbar-title>Listado de Resultados estadisticos</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              :headers="[
                  { text: 'Nombre Area'},
                  { text: 'Promedio'}
                ]"
              :items="periodoEstadisticas"
              :loading="loadingPeriodoEstadisticas"
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
  },

  methods: {
    ...mapActions({
      getPeriodoEstadisticas: 'periodos/getPeriodoEstadisticas',
    }),
  },
};
</script>
