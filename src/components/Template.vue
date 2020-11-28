<template>
  <v-container>
      <AppTemplate>
        <slot></slot>
       </AppTemplate>
  </v-container>
</template>

<script>
  import AppTemplate from '../App'
  export default {
    name: 'Template',

    data: () => ({
      
    }),
    components:{
      AppTemplate
    }
  }
</script>
