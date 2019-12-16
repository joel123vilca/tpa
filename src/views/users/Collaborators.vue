<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <v-card-title class="white cyan--text headline">
        Colaboradores
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
          <br>
            <v-chip color="orange" text-color="white">
              Condicional
            </v-chip>
          <br>
          <br>
          <center>
          <v-avatar
            size="120px"
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="120px"
            >
            </v-img>
          </v-avatar>
          </center>
          <br>
            <div>
              <h4 class="nombre">Felipe Briceño</h4>
              <span class="titulo">Cordinar Proyecto DO</span>
              <p class="cargo">Gerencia de Personas</p>
              <v-card-title class="centrar">
                <div class="padding-cuadros">
                  <div class="cuadro">Tactico Operativo</div>
                  </div>
                <div class="numero">3</div>
              </v-card-title>
            </div>
            <center>
          <v-card-actions>
            <button class="collaborator--button">Ver Perfil</button>
          </v-card-actions>
            </center>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex xs4 >
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <br>
            <v-chip color="pink" text-color="white">
              Despedido
            </v-chip>
          <br>
          <br>
          <center>
          <v-avatar
            size="120px"
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="120px"
            >
            </v-img>
          </v-avatar>
          </center>
          <br>
            <div>
              <h4 class="nombre">Felipe Briceño</h4>
              <span class="titulo">Cordinar Proyecto DO</span>
              <p class="cargo">Gerencia de Personas</p>
              <v-card-title class="centrar">
                <div class="padding-cuadros">
                  <div class="cuadro">Tactico Operativo</div>
                  </div>
                <div class="numero">3</div>
              </v-card-title>
            </div>
            <center>
          <v-card-actions>
            <button class="collaborator--button">Ver Perfil</button>
          </v-card-actions>
            </center>
        </v-card>
        </v-hover>
        </v-flex>
        <v-flex  xs4>
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <br>
            <v-chip color="#01c73d" text-color="white">
              Contratado
            </v-chip>
          <br>
          <br>
          <center>
          <v-avatar
            size="120px"
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="120px"
            >
            </v-img>
          </v-avatar>
          </center>
          <br>
            <div>
              <h4 class="nombre">Felipe Briceño</h4>
              <span class="titulo">Cordinar Proyecto DO</span>
              <p class="cargo">Gerencia de Personas</p>
              <v-card-title class="centrar">
                <div class="padding-cuadros">
                  <div class="cuadro">Tactico Operativo</div>
                  </div>
                <div class="numero">3</div>
              </v-card-title>
            </div>
            <center>
          <v-card-actions>
            <button class="collaborator--button">Ver Perfil</button>
          </v-card-actions>
            </center>
        </v-card>
        </v-hover>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware:"auth",
  data: () => ({
      show: false
    }),
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import("@/views/errors/NotPermission")
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
.centrar{
  text-align: center;
}
.padding-cuadros{
  margin-right: 10px;
}
.nombre{
  margin-bottom: 4px;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 500;
  line-height: 1.382;
  color: #455a64;
  font-family: inherit;
  text-align: center;
}
.atributos{
  text-align: center;
}
.titulo{
  font-weight: 500;
  font-size: 15px;
  display: block;
  color:#677484;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.618;
  text-align: center;
}
.cargo{
  color:#67757c;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 1.618;
  font-weight: 400;
  text-align: center;
}
.cuadro{
  border: 1px solid #b9c5ce;
  padding: 3px 10px;
  font-weight: 500;
  color:#657180;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  border-radius: 2px;
  width: 147px;
  height: 30px;
}
.numero{
  background-color: #1194f7;
  color:white;
  border-radius: 2px;
  padding: 3px 10px;
  font-weight: 500;
  width: 30px;
  height: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}
</style>
