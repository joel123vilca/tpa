<template>
  <v-app id="login" class="fondo">
      <template v-if="!authenticated">
        <v-layout align-center justify-center >
          <center>
          <v-flex >
            <v-card  class="login-card" color="#fff">
              <div class="layout column align-center" id="titulo">
              <Typography variant="subtitle1" class="login-title" gutterBottom>
                Panel de Administrador
              </Typography>
              <br>
              </div>

             <!--  <v-card-title>
                <div class="layout column align-center">
                  <img src="@/assets/logo.png" alt="logo" class="login-image" />
                </div>
              </v-card-title> -->
              <v-card-text class="pa-0">
                <v-form v-model="validForm" lazy-validation @submit.prevent="lauchLogin">
                  <v-container fluid class="pb-0" grid-list-lg>
                    <p>Ingresa con tu Usuario y Contraseña de Administrador</p>
                   <v-text-field
                      v-model="form.username"
                      :disabled="processingForm"
                      label="Usuario"
                      class="login-input"
                      :error="!!validationErrors.username"
                      :error-messages="validationErrors.username"
                      @keyup="() => {
                        validationErrors.username = undefined
                        delete validationErrors.username
                      }"


                    />
                    <br>
                    <v-text-field
                      v-model="form.password"
                      type="password"
                      label="Contraseña"
                      class="login-input"
                      :error="!!validationErrors.password"
                      :error-messages="validationErrors.password"
                      @keyup="() => {
                        validationErrors.password = undefined
                        delete validationErrors.password
                      }"


                    />

                  </v-container>
                  <v-divider />
                  <v-container fluid grid-list-lg>
                    <div class="text-xs-center">
                      <v-btn
                        type="submit"
                        color="#337ab7"
                        class="ma-2 white--text"
                        :disabled="!validForm || processingForm"
                        :loading="processingForm"
                      >
                        Iniciar sesión
                      </v-btn>
                    </div>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
          </center>
        </v-layout>
      </template>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      tryFacebookLogin: false,
      validForm: true,
      processingForm: false,
      form: {
        username: "",
        password: "",
        rol: "api"
      },
      validationErrors: {},
      remember: true,
      rules: {
        username: [
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
  computed: {
    ...mapState({
      showModalLogin: state => state.auth.showModalLogin,
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: "auth/check"
    })
  },


  created() {
    if (this.authenticated) this.$router.push({ name: "notificaciones" });
  },

  methods: {
    ...mapActions({
      login: "auth/login",
      replacePrimaryDrawer: "layout/replacePrimaryDrawer"
    }),

    lauchLogin() {
      this.processingForm = true;
      this.login({ params: this.form })
        .then(response => {
          // Save the token.
          this.$store.dispatch("auth/saveToken", {
            token: response.data.token,
            remember: this.remember
          });

          this.processingForm = false;
          this.replacePrimaryDrawerModel();

          // Fetch the user.
          this.$store
            .dispatch("auth/fetchUser")
            .then(response => {
              this.processingForm = false;
                this.$router.push({ name: "notificaciones" });
            })
            .catch(error => {
              this.processingForm = false;
            });
        })
        .catch(error => {
          this.processingForm = false;
          this.validationErrors = error.response.data.errors || {}
        });
    },

    replacePrimaryDrawerModel() {
      let primaryDrawer = this.primaryDrawer;
      primaryDrawer.model = true;

      this.replacePrimaryDrawer({ primaryDrawer });
    }
  }
};
</script>
<style scoped>
#login {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.theme--light.v-divider{
  border-color: transparent;
}
.fondo{
  background-image: url('../assets/portada1.jpg');
  background-size: cover;
}
.login-card{
  width: 340px;
  border-radius: 15px;
  height: 370px;
}
.login-title{
  color:white;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif !important;
  margin-top:20px;
}
#titulo{
  background: rgba(56,159,255,1);
  background: -moz-linear-gradient(left, rgba(56,159,255,1) 0%, rgba(10,124,255,1) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(56,159,255,1)), color-stop(100%, rgba(10,124,255,1)));
  background: -webkit-linear-gradient(left, rgba(56,159,255,1) 0%, rgba(10,124,255,1) 100%);
  background: -o-linear-gradient(left, rgba(56,159,255,1) 0%, rgba(10,124,255,1) 100%);
  background: -ms-linear-gradient(left, rgba(56,159,255,1) 0%, rgba(10,124,255,1) 100%);
  background: linear-gradient(to right, rgba(56,159,255,1) 0%, rgba(10,124,255,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#389fff', endColorstr='#0a7cff', GradientType=1 );
}
.login-image{
  margin: 20px auto 20px auto;
  max-width: 200px;
  border-radius: 10px
}
.login-input{
  background-color: #CDCDCD;
  height: 54px;
  margin-top: 10px;
  max-width: 90%;
  font-size: 1em;
  border-radius: 8px;
  transition-duration:0.15s, 0.15s;
  padding-left:12px;
  padding-right:12px;
}
.line{
  border-color:transparent;
}

@media only screen and (max-width: 400px) {
  .login-card{
    width: 280px;
  }
  .login-title{
  color:white;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif !important;
  margin-top:20px;
}
}
@media only screen and (min-width: 401px) and (max-width: 960px) {
  .login-card{
    width: 400px;
  }
  .login-title{
  color:white;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif !important;
  margin-top:20px;
}
}
</style>
