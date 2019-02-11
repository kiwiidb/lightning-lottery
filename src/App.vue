<template>
  <div id="app">
    <Participate />
    <Participants />
    <Winners />
  </div>
</template>

<script>
import Participate from './components/Participate.vue'
import Participants from './components/Participants.vue'
import Winners from './components/Winners.vue'

export default {
  name: 'app',
  components: {
    Participate,
    Participants,
    Winners
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
