<template>
    <div id="app">
        <TopStatistics :symbol=tokenSymbol :percent=salePercent />

        <div>
            <div v-if="!isLogin" id='loginMethod'>
                <h3>LOGIN with</h3>
                <ul>
                    <li><LoginWithPrivateKey /></li>
                    <li><LoginWithScatter /></li>
                </ul>
            </div>
            <div v-else>
                <b-button @click='logout' id='logoutBtn'>LOGOUT</b-button>
                <AccountInfo :accountName=accountName :balance=balance :staked=staked
                    :cpuTotal=cpuTotal :cpuUsed=cpuUsed
                    :netTotal=netTotal :netUsed=netUsed
                    :ramTotal=ramTotal :ramUsed=ramUsed />

                <h5 id='customTokenBalance'>
                    {{ tokenSymbol }} token Balance: {{ customBalance }} {{ tokenSymbol }}
                </h5>

                <BuyMore/>
            </div>
        </div>
    </div>
</template>

<script>
import TopStatistics from './components/TopStatistics.vue'
import LoginWithPrivateKey from './components/LoginWithPrivateKey.vue'
import LoginWithScatter from './components/LoginWithScatter.vue'
import AccountInfo from './components/AccountInfo.vue'
import BuyMore from './components/BuyMore.vue'
import { EventBus } from './EventBus.js'

export default {
    name: 'app',
    data: function() {
        return {
            tokenSymbol: "SKP",
            salePercent: 5,
            isLogin: true,

            accountName: "skpskpskpskp",
            balance: 123123,
            staked: 123123,
            cpuTotal: 123123,
            cpuUsed: 54321,
            netTotal: 333333, 
            netUsed: 321,
            ramTotal: 12345,
            ramUsed: 333,

            customBalance: 77777
        }
    },
    components: {
        TopStatistics, LoginWithPrivateKey, LoginWithScatter, AccountInfo, BuyMore
    },
    created: function() {
        EventBus.$on('callPrivateKeyLogin', this.loginWithPrivate);
        EventBus.$on('callScatterLogin', this.loginWithScatter);
        EventBus.$on('callBuyMore', this.buyMoreToken);
    },
    methods: {
        loginWithPrivate: function(obj) {
            alert("login with private! : " + obj.accountName + ", " + obj.privateKey);
        },
        loginWithScatter: function() {
            alert("login with Scatter!");
        },
        logout: function() {
            this.isLogin = false;
        },
        buyMoreToken: function(amount) {
            alert("buy more: " + Number(amount));
        }
    }
    
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 40px;
}
#loginMethod {
    margin-top: 60px;
}
#logoutBtn {
    margin-top: 60px;
}
</style>
