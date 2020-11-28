<template>
    <HelloWorld >
        <form>
          <v-text-field
              v-model="name"
              :counter="10"
              label="Nome"
              required
          >
          </v-text-field>
          <v-text-field
              v-model="email"
              label="E-mail"
              required
          >
          </v-text-field>
          <v-text-field
              v-model="password"
              label="Password"
              required
              type="password"
          >
          </v-text-field>
          <v-btn
            class="mr-4 primary"
            @click="Salvar"
          >
            submit
          </v-btn>
          <v-btn @click="clear" class="mr-4 error">
            Limpar
          </v-btn>
        </form>
    </HelloWorld>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Template.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
