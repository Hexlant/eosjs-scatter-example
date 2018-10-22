<template>
    <div id='buyMore'>
        <b-form inline>
            <label class="mr-sm-2" for="inputBuyMoreAmount">Amount</label>
            <b-input id="inputBuyMoreAmount" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter amount..." v-model="amount"/>
            <b-button @click='buyMoreClick'>Buy Token</b-button>
        </b-form>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { EventBus } from '../EventBus.js'

export default {
    name: 'BuyMore',
    data: function() {
        return {
            amount: 0
        }
    },
    methods: {
        buyMoreClick: function() {
            EventBus.$emit('callBuyMore', this.amount);
        }
    }
}
</script>

<style scoped>
#loginWithScatter {
    margin-top: 10px;
}
</style>