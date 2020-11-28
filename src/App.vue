<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        to="/login"
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>    
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        to="/new-login"
      >
        <span class="mr-2">Criar Conta</span>
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
      <slot>

        </slot>   
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
