<template>
  <div class="participate">
    <h1>{{ 'Welcome to the Lightning Lottery!' }}</h1>
    <p>You can win various products from <a href="https://bitrefill.com">Bitrefill</a>.</p>
    <form class="" method="post" @submit.prevent="postFirst">
    <input v-model="email" placeholder="e-mail (required)">
    <br>
    <input v-model="nickname" placeholder="nickname">
    <br>
    <textarea v-model="message" placeholder="message"></textarea>
    <br>
    <select v-model="operator">
      <option disabled value="">Pick a Bitrefill product</option>
      //<option v-for="p in providers" :key=p value=p > {{ p }}</option>
    </select>
    <br>
    <button type="submit" name="button">Submit</button>
    </form>
    <qrcode-vue v-show="invoice != ''" id="second" :value=invoice size=250></qrcode-vue>
    <button v-show="invoice != ''" v-clipboard:copy="invoice">Copy to clipboard</button>
    <button v-show="invoice != ''" v-on:click="postSecond">Click here if you made the payment</button>
    <a v-show="invoice != ''" v-bind:href="'lightning:'+ invoice">Open in wallet</a>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'Participate',
  data() {
    return {
      email: '',
      nickname: '',
      message: '',
      operator: '', 
      invoice: '', 
      token: '', 
      resp: '', 
      providers: [],
      errors: []
    }
  },
  mounted () {
    axios
      .get('https://win.lightning-lottery.com/info/providers')
      .then(response => (this.providers = response.data))
  },
  components: {
    QrcodeVue
  },
  methods: {
    postFirst: function () {
      axios.post(`https://win.lightning-lottery.com/participate`,
                  {email: this.email,
                   nickname: this.nickname,
                   message: this.message,
                   operator:this.operator
                   })
        .catch(e => {
          this.invoice = e.response.data
          this.token = e.response.headers['x-token']
        })
    },
    postSecond: function () {
      axios.post(`https://win.lightning-lottery.com/participate`,
                  {email: this.email,
                   nickname: this.nickname,
                   message: this.message,
                   operator:this.operator
                   },
                   {headers: {'X-Token': this.token}
                   }
                )
        .then(response => {
          this.resp = response.data
          window.location.reload()
        })
        .catch(e => {
          this.errors.push(e)
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
