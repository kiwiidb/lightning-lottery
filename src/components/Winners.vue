<template>
  <div class="hello">
    <h1>{{ 'These are the reckless winners up until now:' }}</h1>
    <div v-for="p in winners" :key="p.nickname">
    <div>
    Name: {{ p.nickname }}
    <br/>
    Message: {{ p.message }}
    </div>
    <br/>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Winners',
  data () {
    return {
      winners: null
    }
  },
  mounted () {
    axios
      .get('https://win.lightning-lottery.com/info/winners')
      .then(response => (this.winners = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
