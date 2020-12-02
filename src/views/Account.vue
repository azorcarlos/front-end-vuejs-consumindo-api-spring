<template>
    <IncludeTemplate >
        <v-form ref="form" @keyup.native.enter="submidtForm">
          <v-text-field
              v-model="name"
              :counter="10"
              label="Nome"
              required
              :rules="[v => !!v || 'Nome é obrigatório']"
          >
          </v-text-field>
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
            submit
          </v-btn>
          <v-btn @click="clear" class="mr-4 error">
            Limpar
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
    name: '',
    email:'',
    password:'',
  }),          
    components: {
      IncludeTemplate
    },
    methods: {
      async submidtForm() {
          if (this.$refs.form.validate()) {
    
              let data = {
                  name: this.name,
                  email: this.email,
                  password: this.password,

              }
              this.$http.request({
                  url: "/sign-up",
                  method: "post",
                  baseURL: this.$urlApi,
                  responseType: 'json',
                  data: data
              }).then(res => {
                if (res.status === 201) {
                  alert('Criado com Sucesso')
                  this.$refs.form.reset()
                }else{
                    alert('Erro ao criar registro')
                }
                    
              }).catch(error => {
                  alert('Ocorreu em erro ao realizar esta operação! Por favor tente novamente mais tarde.')
              });
          }
      },
      clear(){
         this.$refs.form.reset()
      },
 
  }
}
</script>
