<template>
  <v-container fluid grid-list-lg>
    <Breadcrumbs
      :routes="[
          { name: 'Inicio'},
          { name: 'Listado' },
          { name: 'Grafico' }
        ]"
    />
    <v-card style="border-radius:10px 10px 0 0;">
      <v-toolbar card style="border-radius:10px 10px 0 0;" color="primary" dark>
        <v-toolbar-title>{{nombre}}</v-toolbar-title>
      </v-toolbar>
      <v-toolbar color="grey darken-1" dark card>
        <v-toolbar-title>Listado Grafico</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex v-if="periodoEstadisticas.length" sm12>
            <v-card color="#DFDFDF">
              <v-container>
                <BarChart v-if="loaded" :label="labels" :data="data" />
              </v-container>
            </v-card>
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
import BarChart from './Bar'
export default {
  components: { BarChart },
  data() {
    return {
      loaded: false,
      labels: [],
      data: [],
      nombre: ''
    }
  },
  computed: {
    ...mapState({
      periodoEstadisticas: state => state.periodos.periodoEstadisticas,
      loadingPeriodoEstadisticas: state => state.periodos.loadingPeriodoEstadisticas,
    }),
    currentDataSet () {
      return this.chartData.datasets[0].data
    }
  },
  
  created() {
    this.setear();
  },
  methods: {
    ...mapActions({
      getPeriodo: 'periodos/getPeriodo',
      getPeriodoEstadisticas: 'periodos/getPeriodoEstadisticas'
    }),
    async setear(){
      try {
      let periodo = await this.getPeriodo({periodoId: this.$route.params.id})
      await this.getPeriodoEstadisticas({periodoId: this.$route.params.id})
      this.loaded = true;
      this.nombre = periodo.data.data.nombre;
      let estadistica = this.periodoEstadisticas.filter(periodo => periodo.resultado != null);
      let label = periodo.data.data.encuestaPlantilla.nombre;
      if(label === 'GED')
      {
        this.labels = estadistica.map(function(x) {
                    return x.colaborador.rut;
                  })
      } else {
        this.labels = estadistica.map(function(x) {
                      return x.area.nombre;
                  });
      }
      this.data = estadistica.map(function(x) {
                    return x.resultado;
                  });
      }
      catch (e) {
      console.error(e)
      }
    }
  }
};
</script>

<style>
.chart {
  width: 280px;
  height: 350px;
}
</style>
