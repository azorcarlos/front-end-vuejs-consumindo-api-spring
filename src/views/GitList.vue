<template>
    <IncludeTemplate v-if="show" >
      <v-btn
        to="/"
        color="error"
      >
        <span class="mr-2">Sair</span>
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
    <div>
      <v-form ref="form" @keyup.native.enter="submidtForm">
        <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-btn
            color="primary"
            @click="submidtForm"
          >
            Pesquisar
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            label="Linguagem"
            v-model="linguagem"  
            required
            :rules="[v => !!v || 'Campo é obrigatório']"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            label="Qtd Repositórios"
            v-model="repositorios"
            required
            :rules="[v => !!v || 'Campo é obrigatório']"
            ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            label="Qtd Seguidores"
            v-model="seguidores"
            required
            :rules="[v => !!v || 'Campo é obrigatório']"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      :loading="loading"
      @page-count="pageCount = $event"
    >
    
    <template v-slot:item.login="{ item }">
      <v-avatar size="30">
      <img
        :src="item.avatar_url"
        alt="John"
      >
    </v-avatar>
      <v-chip
      class="ml-0 mr-1 "
        small
        color="primary"
      >
        Url {{ item.login }}
      </v-chip>
    </template>
   </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Itens por pagina"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
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
    show:false,
    loading:false,
    linguagem:'Php',
    seguidores:'10',
    repositorios:'10',
    page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        headers: [
          {
            text: 'Login',
            align: 'left',
            sortable: true,
            value: 'login',
          },
          { text: 'Url Git', value: 'html_url' },
          { text: 'Avatar', value: 'avatar_url' },
          
        ],
        desserts: [
        ],
  }),          
    components: {
      IncludeTemplate
    },
    methods: {
      async submidtForm() {
          if (this.$refs.form.validate()) {
              this.loading = true
              this.$http.request({
                  url: "/git?linguagem="+this.linguagem+"&repositorios="+this.repositorios+"&seguidores="+this.seguidores,
                  method: "get",
                  baseURL: this.$urlApi,
                  responseType: 'json',
          
         
              }).then(res => {
                this.desserts = res.data.body.items
                this.loading = false
                     
              }).catch(error => {
                  if(error.response.status === 401){
                    alert('Sessão Expirada')
                     window.location.href = '/';
                  }else{
                    alert('Ocorreu em erro ao realizar esta operação! Por favor tente novamente mais tarde.')
                  }
                  
                  this.loading = false
              });
          }
      },
      
  },
   mounted() {
    let sessionExists = sessionStorage.getItem('socin-storage');
    if (!sessionExists) {
            window.location.href = '/';
 
    }else{
      this.show = true
        var storage =  sessionStorage.getItem('socin-storage')?JSON.parse(sessionStorage.getItem('socin-storage')):'';
        this.$http.defaults.headers.common['Authorization'] = 'Bearer '+storage.token
        
    }
  }

}
</script>
