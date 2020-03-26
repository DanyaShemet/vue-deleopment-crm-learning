<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'CurrencyAmountTitle'|localize}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'Currency'|localize}}</th>
            <th>{{'CurrencyType'|localize}}</th>
            <th>{{'Date'|localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="c in currencies" :key="c">
            <td>{{c}}</td>
<!--            <td>{{rates[c] ? rates[c].toFixed(3) : 1}}</td>-->
            <td>{{rates[c].toFixed(3)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: ['rates','date'],
      data: () => ({
          currencies: [ 'UAH','EUR', 'USD','RUB']
          //currencies: [ 'EUR', 'USD','RUB']
      }),
  }
</script>