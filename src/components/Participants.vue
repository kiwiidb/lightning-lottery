<template>
  <div class="hello">
    <h1> {{ nrParticipants }} out of {{ nrParticipantsNeeded }} needed participants have entered this round: </h1>
    <div v-for="p in participants" :key="p.nickname">
    <div>
    Name: {{ p.nickname }}
    <br>
    Message: {{ p.message }}
    </div>
    <br/>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Participants',
  data () {
    return {
      participants: null,
      nrParticipants: null,
      polling: null,
      nrParticipantsNeeded: null
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
    axios
      .get('https://win.lightning-lottery.com/info/participants')
      .then(response => (this.participants = response.data))
    axios
      .get('https://win.lightning-lottery.com/info/roundInfo')
      .then(response => (
        this.nrParticipants = response.data.currentNumberOfParticipants,
        this.nrParticipantsNeeded = response.data.neededNumberOfParticipants
        ))
    },
    pollData () {
		this.polling = setInterval(() => {
			this.getInfo()
		}, 4000)
	}
  },
  beforeDestroy () {
	clearInterval(this.polling)
},
created () {
	this.pollData()
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
