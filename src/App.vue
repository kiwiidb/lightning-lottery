<template>
  <div id="app" >
    <Participate />
    <Participants />
    <Winners />
    <div class="footer">
      <a style="margin-right: 1em;" href="https://lightninghackday.fulmo.org">Made as a project for the LN Hackday</a>  
      <a style="margin-right: 1em;" href="https://twitter.com/kiwiidb">My Twitter</a>  
      <a style="margin-right: 1em;" href="https://github.com/kiwiidb">My Github</a>
      <a style="margin-right: 1em;" href="https://kiwiidb.github.io">My Homepage</a>
    </div>
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
    Winners,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  text-align: center;
}
</style>
