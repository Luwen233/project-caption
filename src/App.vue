<template>
  <div id="app">
    <ResearchForm/>
  </div>
</template>

<script>
import ResearchForm from './views/ResearchFormDemo.vue'
// import Form from './views/forms/Forms.vue'

export default {
  name: 'App',
  components: {
    ResearchForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
