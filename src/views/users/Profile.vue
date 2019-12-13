<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <v-card-title class="white cyan--text headline">
        Mi Perfil
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'sgcUsersList' } },
          { name: 'Mi Perfil' },
          { name: 'Datos Generales' }
        ]"
      />
      </v-card-title>
      <v-tabs
        fixed-tabs
        color="#283848"
        dark
      >
        <v-tabs-slider color="#44b5ba"></v-tabs-slider>
        <v-tab class="tab">
          <h3 class="title-button">Datos Generales</h3>
        </v-tab>
        <v-tab class="tab">
          <h3 class="title-button">
          Desarrollo Organizacional
          </h3>
        </v-tab>
        <v-tab class="tab">
          <h3 class="title-button">
            Capacitacion
          </h3>
        </v-tab>
        <v-tab class="tab">
          <h3 class="title-button">
            Hoja de Vida
          </h3>
        </v-tab>
      </v-tabs>
      <br>
      <v-layout row>
      <v-flex xs8>
            <v-card  class="black--text">
              <v-layout>
                <v-flex xs3>
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
                <v-flex xs5>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="profile-dates">Nombre: FELIPE BRICEÑO</h3>
                      <br>
                      <div class="profile-dates">Gerencia: Gerencia de Personas</div>
                      <br>
                      <div class="profile-dates">Cargo: Gerente de Personas</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Relator Interno</div>
                  <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Monitor Pausa Activa</div>
                  <div class="profile-description"><v-icon color="yellow">star_border</v-icon>Auditor Interno</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card>
              <v-list
                subheader
                two-line
              >
              <v-subheader><h4 class="link-encuestas">Link Encuestas</h4></v-subheader>
              <hr/>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-avatar color="red">
                    <span class="white--text headline">P</span>
                  </v-avatar>
                </v-list-tile-action>

                <v-list-tile-content @click="notifications = !notifications">
                <v-list-tile-title>Encuesta Clima Laboral</v-list-tile-title>
                <v-list-tile-sub-title>Hace 2 Meses</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-avatar color="teal">
                    <span class="white--text headline">C</span>
                  </v-avatar>
                </v-list-tile-action>

                <v-list-tile-content @click="sound = !sound">
                  <v-list-tile-title>Encuesta Colaboradores 2018.</v-list-tile-title>
                  <v-list-tile-sub-title>Hace 2 dias</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
              </v-list>
            </v-card>
            <br>
            <v-card>
              <v-list
                subheader
                two-line
              >
              <v-subheader><h4 class="link-encuestas">Cargas Familiares</h4></v-subheader>
              <hr/>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-avatar color="red">
                    <span class="white--text headline">P</span>
                  </v-avatar>
                </v-list-tile-action>

                <v-list-tile-content @click="notifications = !notifications">
                <v-list-tile-title>Juanita Perez</v-list-tile-title>
                <v-list-tile-sub-title>Esposa</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <button class="ver-datos">VER DATOS</button>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-avatar color="teal">
                    <span class="white--text headline">C</span>
                  </v-avatar>
                </v-list-tile-action>

                <v-list-tile-content @click="sound = !sound">
                  <v-list-tile-title>Pia Rayen</v-list-tile-title>
                  <v-list-tile-sub-title>Hija</v-list-tile-sub-title>
                  </v-list-tile-content>
                <v-list-tile-action>
                  <button class="ver-datos">VER DATOS</button>
                </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
              </v-list>
            </v-card>
          </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: "auth",
  metaInfo() {
    return { title: "Perfil" };
  },
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import("@/views/errors/NotPermission")
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700');
.profile-description{
  background-color: #44b5ba;
  color:white;
  height: 26px;
  width: 200px;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 15px;
  font-size: 1em;
  padding: 0 0 0 10px;
  font-weight: 400;
}
.tab:hover {
    color: white !important;
    background: #44b5ba !important;
}
.profile-dates{
  color:#67757c;
  text-decoration: none;
  font-size:15px;
  line-height: 1.3;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}
.profile-image{
  border:6px solid #44b5ba;
  border-radius: 4px;
}
.link-encuestas{
  color:#455a64;
  font-weight: 400;
  font-size: 18px;
}
.ver-datos{
  color:white;
  background-color: #0fb76b;
  border-radius: 50px;
  font-size: 12px;
  padding: 6px 20px;
  min-width: 110px;
  font-weight: 400;
}
</style>
