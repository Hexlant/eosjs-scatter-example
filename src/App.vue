<template>
    <div id="app">
        <h1 id='titleH1'>Token Manager</h1>

        <div>
            <div v-if="!isLogin" id='loginMethod'>
                <LoginWithScatter />
            </div>
            <div v-else>
                <TopStatistics :max=maxSupply :current=supply />
                <b-button @click='logout' id='logoutBtn'>LOGOUT</b-button>
                <AccountInfo :accountName=accountName :balance=balance :staked=staked
                    :cpuTotal=cpuTotal :cpuUsed=cpuUsed
                    :netTotal=netTotal :netUsed=netUsed
                    :ramTotal=ramTotal :ramUsed=ramUsed />

                <hr/>
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
            maxSupply: 100,
            supply: 30,
            tokenSymbol: "SKP",
            salePercent: 5,
            isLogin: true,

            accountName: "skpskpskpskp",
            privateKey: "",
            balance: 123123,
            staked: 123123,
            cpuTotal: 123123,
            cpuUsed: 54321,
            netTotal: 333333, 
            netUsed: 321321,
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
#titleH1 {
    text-align:center;
}
#loginMethod {
    margin-top: 60px;
    text-align:center;
}
#logoutBtn {
    margin-top: 60px;
}
</style>
