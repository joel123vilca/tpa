<template>
  <v-container fluid grid-list-lg>

    <template>
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
      <v-flex xs12 md8 sm12>
      <v-card  class="black--text">
        <v-layout row wrap>
          <v-flex xs12  md3>
            <center>
              <v-img
                :src="require('@/assets/user-1.jpg')"
                height="130px"
                width="140px"
                class="profile-image"
                contain
              ></v-img>
            </center>
          </v-flex>
          <v-flex xs12  md5>
            <center>
              <div style="margin-top:15px;">
                <h3 class="profile-dates">Nombre: FELIPE BRICEÑO</h3>
                <br>
                <div class="profile-dates">Gerencia: Gerencia de Personas</div>
                <br>
                <div class="profile-dates">Cargo: Gerente de Personas</div>
              </div>
            </center>
          </v-flex>
          <v-flex xs12  md4>
            <center>
              <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Relator Interno</div>
              <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Monitor Pausa Activa</div>
              <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Auditor Interno</div>
            </center>
          </v-flex>
        </v-layout>
      </v-card>
      </v-flex>
      <v-flex xs12 md4 sm12>
        <v-card>
          <h3>descargar</h3>
        </v-card>
      </v-flex>
      </v-layout>
      <br><br>
      <v-layout row wrap>
        <v-flex xs12 md4 sm12>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
        <v-flex xs12 md4 sm12 >
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md6 sm12>
            <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
          </v-flex>
          <v-flex xs12 md6 sm12>
            <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
          </v-flex>
          </v-layout>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex  xs12 md4 sm12>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
        <v-flex xs12 md4 sm12>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
        <v-flex xs12 md4 sm12 >
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
        <v-flex  xs12 md4 sm12>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
        <div class="titulo-grafico">cliente interno global</div>
          <v-layout row wrap>
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
          <v-flex xs12 md5 sm12>
          <p class="label--grafico">cliente interno 2016</p>
          </v-flex>
          <v-flex xs12 md6 sm12>
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
@import "./style.css";
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

