<template>
  <div class="participate">
    <h1>{{ 'Welcome to the Lightning Lottery!' }}</h1>
    <form class="" method="post" @submit.prevent="postFirst">
    <p>
    <input v-model="email" placeholder="e-mail (required)">
    </p>
    <p>
    <input v-model="nickname" placeholder="nickname">
    </p>
    <p>
    <textarea v-model="message" placeholder="message"></textarea>
    </p>
    <p>
    <button type="submit" name="button">Submit</button>
    </p>
    </form>
    <p>
    {{ invoice }}
    <p/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Participate',
  data() {
    return {
      email: '',
      nickname: '',
      message: '',
      operator: '', 
      invoice: '', 
      errors: []
    }
  },
  methods: {
    postFirst: function () {
      axios.post(`https://win.lightning-lottery.com/participate`,
                  {email: this.email,
                   nickname: this.nickname,
                   message: this.message,
                   operator:this.operator
                   })
        .then(response => {
        })
        .catch(e => {
          this.invoice = e.response.data
        })
    }
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
