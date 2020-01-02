<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Paso 1: </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Datos Empresa</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Paso 3: Fotografia Colaborador</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <h3>Información General</h3>
        <br>
        <v-divider></v-divider>
        <br>
          <v-layout
 row wrap>
            <v-flex xs12  md12>
              <v-text-field
                label="RUT"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12  md6>
              <v-text-field
                label="Primer Nombre"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="Segundo Nombre"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                label="Apellido Paterno"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                label="Apellido Materno"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Domicilio"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.sexo"
                :items="genero"
                label="Sexo"
                item-text="nombre"
                item-value="id"
                outline
              />
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                label="Nacionalidad"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.civilstate"
                :items="estados"
                label="Estado Civil"
                item-text="nombre"
                item-value="id"
                outline
              />
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                label="Edad"
                type="number"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex
                      sm4
                      xs12
                    >
                       <v-menu
                          ref="menu"
                          v-model="targetIssueDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :value="formatDate(form.birth_date)"
                            hint="Formato DD/MM/AAAA"
                            label="FECHA DE NACIMIENTO"
                            v-on="on"
                            outline
                        ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="form.birth_date"
                          @input="targetIssueDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
            <v-flex sm4 xs12>
              <v-autocomplete
                v-model="form.educacion"
                :items="niveles"
                label="Nivel de Educación"
                item-text="nombre"
                item-value="id"
                outline
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                label="Contacto de Emergencia"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field
                label="Teléfono Contacto de Emergencia"
                outline
              ></v-text-field>
            </v-flex>
          </v-layout>

        <v-btn
          color="success"
          @click="e1 = 2"
        >
          Siguiente
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="success"
          @click="e1 = 3"
        >
          Siguiente
        </v-btn>

        <v-btn
          color="error"
          @click="e1 = 2"
        >
        Volver
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="success"
          @click="e1 = 1"
        >
          Siguiente
        </v-btn>

        <v-btn color="error">Volver</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  export default {
    data () {
      return {
        targetIssueDate: false,
        e1: 0,
        form:{
          sexo:0,
          civilstate:0,
          educacion:0,
          birth_date: '',
        },
        genero: [
        {id:0, nombre:'Femenino'},
        {id:1, nombre:'Masculino'}
      ],
        estados: [
        {id:0, nombre:'Soltero (a)'},
        {id:1, nombre:'Casado (a)'},
        {id:2, nombre:'viudo (a)'},
      ],
       niveles: [
        {id:0, nombre:'Tecnico'},
        {id:1, nombre:'Universitario'},
      ],
      }
    },
    watch: {
      targetIssueDate (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      targetIssueDateYear (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
  },

      methods: {
       formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    }
  }
</script>
