<template>
  <div class="participate">
    <h1>{{ 'Welcome to the Lightning Lottery!' }}</h1>
    <p>You can win various products from <a href="https://bitrefill.com">Bitrefill</a>.<br>
    Participating only costs 15,000 ⚡. When the sufficient amount of participants for a round is reached,<br>
    a randomly selected winner gets an e-mail from Bitrefill with a voucher code for the chosen product.<br>
    The value of the vouchers is around $ 25, depending on the provider.</p>
    <form class="" method="post" @submit.prevent="postFirst">
    <input v-model="email" placeholder="e-mail (required)">
    <br>
    <br>
    <textarea v-model="message" placeholder="Trollbox (optional)"></textarea>
    <br>
    <select v-model="operator">
      <option disabled value="">Pick a Bitrefill product</option>
      <option v-for="p in providers" v-bind:key="p">{{ p }}</option>
    </select>
    <br>
    <button type="submit" name="button">Submit</button>
    </form>
    <qrcode-vue v-show="invoice != ''" id="second" :value=invoice size=250></qrcode-vue>
    <button v-show="invoice != ''" v-clipboard:copy="invoice">Copy to clipboard</button>
    <a v-show="invoice != ''" v-bind:href="'lightning:'+ invoice" class="button">Open in wallet</a>
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
                   message: this.message,
                   operator:this.operator
                   })
        .catch(e => {
          this.invoice = e.response.data
          this.token = e.response.headers['x-token']
        })
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
      sleep(5000).then(() => {
      //do stuff
      this.checkInvoicePaid()
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
          this.simpleNotification()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    checkInvoicePaid: function () {
      var invToken = this.token.split(".", 2)[0]
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
      axios.get(`https://win.lightning-lottery.com/info/`+invToken)
        .then(()=>
            sleep(500).then(() => {
            this.postSecond()
        }),
        )
        .catch(e => {
          this.errors.push(e)
        })
    },
    simpleNotification: function () {
      this.$snotify.success('Congratulations, you have joined the game!', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true
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
a.button {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;

    text-decoration: none;
    color: initial;
}
</style>
