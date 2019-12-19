<template>
  <v-container fluid grid-list-lg>

    <template >
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
        class="hidden-sm-and-down"
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
      <v-layout row wrap>
      <v-flex xs12 md8 sm12 >
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
            <br>
            <v-card>
            <v-card-title primary-title>
              <span class="headline">Información General</span>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon  v-on="on"  @click="isDisabled = !isDisabled" >
                  <v-icon large color="info">edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar Formulario</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon  v-on="on" >
                  <v-icon large color="green darken-2">save</v-icon>
                  </v-btn>
                </template>
                <span>Guardar Cambios</span>
              </v-tooltip>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">

                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Nombre"
                      outline

                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Nivel de educación"
                      outline

                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Rut"
                      outline

                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Nacional"
                      outline

                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Dirección"
                      outline

                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Estado Civil"
                      outline

                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Correo"
                      outline

                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Sexo"
                      outline

                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Celular / anexo"
                      outline
                      persistent-hint

                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Fecha de Nacimiento"
                      outline

                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
            </v-card-text>
          </v-card>
          <br>
          <v-card>
            <v-card-title primary-title>
              <span class="headline">Indumentaria Trabajador</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateUser"
              >
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Talla de Zapato"
                      outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Talla de Zapato"
                      outline
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      label="Talla de Zapato"
                      outline
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-text-field
                      v-model="form.password"
                      type="password"
                      :disabled="isDisabled"
                      filled
                      label="Talla de Zapato"
                      outline
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
              </v-form>
            </v-card-text>
          </v-card>
          </v-flex>
          <v-flex xs12 md4 sm12>
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
  data() {
    return {
      isDisabled:true,
      form: {
        email: "",
        password: "",
        name: "",
        type_user_id: 0,
        processingForm: false,
      },
      validForm: true,
      processingForm: false,

      rules: {
        name: [v => !!v || "El nombre es requerido"],
        email: [
          v => !!v || "El correo electrónico es requerido",
          // eslint-disable-next-line no-useless-escape
          v =>
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "El correo electrónico debe ser válido"
        ],
        password: [v => !!v || "La contraseña es requerida"]
      }
    };
  },
  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import("@/views/errors/NotPermission")
  },
  methods: {

  }
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
