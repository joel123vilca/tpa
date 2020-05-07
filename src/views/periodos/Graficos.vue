
<template>
  <v-container>
    <v-layout justify-center wrap>
      <v-flex md12 xs12>
        <v-card color="#DFDFDF">
          <v-container>
            <BarChart v-if="loaded" :label="labels" :data="data" />
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
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
      data: []
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
      getPeriodoEstadisticas: 'periodos/getPeriodoEstadisticas',
    }),
    async setear(){
      try {
      await this.getPeriodoEstadisticas({periodoId: this.$route.params.id})
      this.loaded = true;
      let estadistica = this.periodoEstadisticas.filter(periodo => periodo.resultado != null);
      let labels = estadistica.map(function(x) {
                      return x.area.nombre;
                  });
      let resultados = estadistica.map(function(x) {
                    return x.resultado;
                  });
      this.data = resultados;
      this.labels = labels;
      console.log(this.labels, this.data);
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
