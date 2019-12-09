<template>
  <v-app id="login" class="fondo">
    <v-container fluid fill-height>
      <template v-if="!authenticated">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="teal accent-4">
              <h3 class="login-title">Bienvenido a Plataforma Personas</h3>
              <hr class="line"/>
              <v-card-title>
                <div class="layout column align-center">
                  <img src="@/assets/logo.png" alt="logo" class="login-image" />
                </div>
              </v-card-title>
              <v-card-text class="pa-0">
                <v-form v-model="validForm" lazy-validation @submit.prevent="lauchLogin">
                  <v-container fluid class="pb-0" grid-list-lg>
                    <v-text-field
                      v-model="form.username"
                      :disabled="processingForm"
                      :error="!!validationErrors.username"
                      :error-messages="validationErrors.username"
                      autofocus
                      outline
                      prepend-inner-icon="email"
                      label="Correo electrónico"
                      @keyup="
                        () => {
                          validationErrors.username = undefined;
                          delete validationErrors.username;
                        }
                      "
                    />

                    <v-text-field
                      v-model="form.password"
                      :disabled="processingForm"
                      :error="!!validationErrors.password"
                      :error-messages="validationErrors.password"
                      type="password"
                      outline
                      prepend-inner-icon="lock"
                      label="Contraseña"
                      @keyup="
                        () => {
                          validationErrors.password = undefined;
                          delete validationErrors.password;
                        }
                      "
                    />
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
    </v-container>
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

  watch: {
    showModalLogin(newValue, oldValue) {
      if (!newValue) {
        this.tryFacebookLogin = false;
        return false;
      }
    }
  },

  created() {
    if (this.authenticated) this.$router.push({ name: "sgcUsersList" });
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

              const roleType = response.data.data.typeUser;
              if (roleType === "Administrador") {
                this.$router.push({ name: "sgcUsersList" });
              } else {
                this.$router.push({ name: "sgcUsersList" });
              }
            })
            .catch(error => {
              this.processingForm = false;
              this.validationErrors = error.response.data.errors || {};
            });
        })
        .catch(error => {
          this.processingForm = false;
          this.validationErrors = error.response.data.errors || {};
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
<style scoped lang="css">
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
.login-title{
  color:white;
  font-size: 24px;
  font-family: inherit;
}
.login-image{
  margin: 20px auto 20px auto;
  max-width: 200px;
  border-radius: 10px
}
.line{
  border-color:black;
}
</style>
