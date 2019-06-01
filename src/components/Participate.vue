<template>
  <div class="participate">
    <h1>{{ 'Welcome to the Lightning Lottery!' }}</h1>
    <p>This lottery is being organised in for the <a href= "https://lightninghackday.fulmo.org"> Lightning Hackday Munich</a> in cooperation with <a href="https://www.nodl.it/">Nodl</a>  
    <br>
    You can win a Nodl node!
    <br>
    The revenue fully goes to supporting the organiser Fulmo. Participating only costs ? ⚡.
    <br>
    When you paid the invoice, you will get a unique code, do not lose this code if you want to claim your prize!
    </p>
    <form class="" method="post" @submit.prevent="postFirst">
    <input v-model="nickname" placeholder="nickname (required)">
    <br>
    <br>
    <textarea v-model="message" placeholder="Trollbox (optional)"></textarea>
    <br>
    <button type="submit" name="button">Submit</button>
    </form>
    <div v-if="reqInProgress == true" >
    <b-spinner></b-spinner>
    <br>
    Waiting for payment..
    </div>
    <qrcode-vue v-show="invoice != ''" id="second" :value=invoice size=250></qrcode-vue>
    <button v-show="invoice != ''" v-clipboard:copy="invoice">Copy to clipboard</button>
    <a v-show="invoice != ''" v-bind:href="'lightning:'+ invoice" class="button">Open in wallet</a>
    <br>
    <div v-if="reqInProgress == true" >
    Your unique code is: 
    {{uid}}
    <br>
    Make a screenshot or copy this value if you want to claim your prize!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'Participate',
  data() {
    return {
      nickname: '',
      message: '',
      invoice: '', 
      token: '', 
      resp: '', 
      providers: [],
      errors: [],
      uid: '',
      reqInProgress: false
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
                  {nickname: this.nickname,
                   message: this.message,
                   })
        .catch(e => {
          this.invoice = e.response.data
          this.token = e.response.headers['x-token']
        })
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
      this.reqInProgress = true;
      sleep(5000).then(() => {
      //do stuff
      this.checkInvoicePaid()
    })
    },
    postSecond: function () {
      axios.post(`https://win.lightning-lottery.com/participate`,
                  {
                   nickname: this.nickname,
                   message: this.message,
                   },
                   {headers: {'X-Token': this.token}
                   }
                )
        .then(response => {
          this.uid = response.data['uid']
          this.simpleNotification()
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.invoice = '';
      this.reqInProgress = false;
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
