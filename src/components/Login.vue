<template>
  <v-app id="login" class="fondo">
      <template v-if="!authenticated">
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="login-card" color="#44b5ba">
              <div class="layout column align-center">
              <Typography variant="subtitle1" class="login-title" gutterBottom>
                Bienvenido a Plataforma Personas
              </Typography>
              <br>
              </div>
              <hr class="line"/>
              <v-card-title>
                <div class="layout column align-center">
                  <img src="@/assets/logo.png" alt="logo" class="login-image" />
                </div>
              </v-card-title>
              <v-card-text class="pa-0">
                <v-form v-model="validForm" lazy-validation @submit.prevent="lauchLogin">
                  <v-container fluid class="pb-0" grid-list-lg>
                    <input class="login-input" v-model="form.username" placeholder="Rut" name="email" type="email" autofocus style="background-color: white; color: #283848;">
                    <br><br>
                    <input class="login-input" v-model="form.password" placeholder="Contraseña" name="password" type="password"  style="background-color: white; color: #283848; ">
                  </v-container>
                  <v-divider />
                  <v-container fluid grid-list-lg>
                    <div class="text-xs-center ">
                      <v-btn
                        type="submit"
                        color="black"
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
        password: ""
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
    if (this.authenticated) this.$router.push({ name: "home" });
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
              console.log('entro al push')
                this.$router.push({ name: "home" });
            })
            .catch(error => {
              this.processingForm = false;
            });
        })
        .catch(error => {
          this.processingForm = false;
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
  content: "";
  z-index: 0;
}
.fondo{
  background-image: url('../assets/puerto.jpg');
  background-size: cover;
}
.login-card{
  width: 550px;
}
.login-title{
  color:white;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif !important;
  margin-top:20px;
}
.login-image{
  margin: 20px auto 20px auto;
  max-width: 200px;
  border-radius: 10px
}
.login-input{
  background-color: #fff;
  height: 52px;
  width: 510px;
  font-size: 16px;
  border-radius: 1px;
  border: #2b3c4e;
  transition-duration:0.15s, 0.15s;
  padding-left:12px;
  padding-right:12px;
}
.line{
  border-color:black;
}
</style>
