<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="c in currencies" :key="c">
          <span>{{getCurrency(c) | currencyFilter(c)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['rates'],
        data: () => ({
           currencies: [ 'UAH','EUR', 'USD','RUB']
           //currencies: ['EUR', 'USD','RUB']
        }),
        computed: {
            base(){
                return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR'])
                //return this.$store.getters.info.bill / (this.rates['RUB'] )
            }
        },
        methods: {
            getCurrency(currency){
                return Math.floor(this.base * this.rates[currency])
            }
            // getCurrency(currency){
            //     if (currency === 'EUR'){
            //         return Math.floor(this.base)
            //     }
            //     return Math.floor(this.base * this.rates[currency])
            // }
        }
    }
</script>