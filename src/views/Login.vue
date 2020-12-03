<template>
    <IncludeTemplate>
      <v-col cols="12" md="12" xs="12" sm="12">
            <v-snackbar
                    v-model="snackbar"
                    :timeout="timeoutSnackbar"
                    top
                    color="error"

            >
                {{ textSnackbar }}

                <template v-slot:action="{ attrs }">
                    <v-btn

                            v-bind="attrs"
                            @click="snackbar = false"
                            dark
                            text
                            small
                                >
                        Fechar
                    </v-btn>
                </template>
            </v-snackbar>
        </v-col>
        <v-form ref="form" @keyup.native.enter="submidtForm">
          <v-text-field
              v-model="email"
              label="E-mail"
              required
              :rules="[v => !!v || 'Email é obrigatório']"
          >
          </v-text-field>
          <v-text-field
              v-model="password"
              label="Password"
              required
              type="password"
              :rules="[v => !!v || 'Password é obrigatório']"
          >
          </v-text-field>
          <v-btn
            class="mr-4 primary"
            @click="submidtForm"
          >
            Logar
          </v-btn>
        </v-form>
    </IncludeTemplate>
</template>

<script>
// @ is an alias to /src
import IncludeTemplate from '@/components/Template.vue'

export default {
  name: 'Home',
  data: () => ({
    email:'',
    password:'',
    msgErrorLogin:false,
    textSnackbar:'',
    timeoutSnackbar:5000,
    show1: false,
    snackbar:false,
  }),          
    components: {
      IncludeTemplate
    },
    methods: {
      async submidtForm() {
          if (this.$refs.form.validate()) {
    
              let data = {
                  email: this.email,
                  password: this.password,

              }
              this.$http.request({
                  url: "/sign-in",
                  method: "post",
                  baseURL: this.$urlApi,
                  responseType: 'json',
                  data: data
              }).then(response => {
                if (response.status == 200) {
                    window.sessionStorage.setItem('socin-storage', JSON.stringify(response.data));
                    setTimeout(function () {
                      this.$router.push('/git-list')
                    }, 1000);
                }
                  
              }).catch(error => {
                  if(error.response){
                             var response = error.response.data

                            if(response || response.status === 401){

                                this.snackbar = true
                                this.loading = false
                                this.textSnackbar = "E-mail ou senha inválido"
                                this.hintError = "E-mail ou senha inválido"

                            }else{
                                this.snackbar = true
                                this.loading = false
                                this.textSnackbar = 'Erro ao conectar-se ao Servidor';

                            }
                         }else{

                            this.snackbar = true
                            this.loading = false
                            this.textSnackbar = 'Sistema temporariamente fora do ar';

                         }
              });
          }
      }
 
  },
     mounted() {
    let sessionExists = sessionStorage.getItem('socin-storage');
    if (sessionExists) {
        setTimeout(function () {
            sessionStorage.removeItem('socin-storage')
        }, 3000)
    }
  }
}
</script>
