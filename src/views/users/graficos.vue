<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <v-card-title class="white cyan--text headline">
        Graficos
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaboradores' }
        ]"
      />
      </v-card-title>
      <br>
      <v-layout row wrap>
        <v-flex xs4>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill1"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill1}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill2"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill2}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill3"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill3}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex xs4 >
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs6>
            <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
          </v-flex>
          <v-flex xs6>
            <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex  xs4>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill1"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill1}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill2"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill2}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill3"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill3}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill1"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill1}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill2"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill2}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill3"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill3}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex xs4 >
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill1"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill1}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill2"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill2}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill3"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill3}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex  xs4>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill1"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill1}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill2"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill2}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs5>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs6>
          <v-progress-linear
            v-model="skill3"
            color="blue-grey"
            height="25"
            class="grafico-barra"
          >
            <center>
              <strong class="white--text">{{skill3}} %</strong>
            </center>
          </v-progress-linear>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import PieChart from "./Piechart.js";
export default {
  middleware:"auth",
  data: () => ({
      show: false,
      skill1:60,
      skill2:80,
      skill3:97,
      chartOptions: {
        hoverBorderWidth: 10
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["120 % GDE 2018"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#6699cc", "#dcdcdc"],
            data: [120, 1]
          }
        ]
      }
    }),
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import("@/views/errors/NotPermission"),
    PieChart,
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700');


.collaborator--button{
  color:white;
  background-color: #01b2ac;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  padding: 9px 17px;
  font-family: 'Montserrat', sans-serif;
}
.atributos{
  text-align: center;
}

.grafico-barra{
  border-radius: 1em;
}
.label--grafico{
  text-align: center;
  align-self: center;
  margin-top: 15px;
}
.titulo-grafico{
  background-color: #01b2ac;
  color: white;
  text-align: center;
  font-size: 16px;
}
</style>

