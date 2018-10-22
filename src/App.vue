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
            </div>
        </div>
    </div>
</template>

<script>
import TopStatistics from './components/TopStatistics.vue'
import LoginWithPrivateKey from './components/LoginWithPrivateKey.vue'
import LoginWithScatter from './components/LoginWithScatter.vue'
import { EventBus } from './EventBus.js'

export default {
    name: 'app',
    data: function() {
        return {
            tokenSymbol: "SKP",
            salePercent: 5,
            isLogin: true
        }
    },
    components: {
        TopStatistics,
        LoginWithPrivateKey,
        LoginWithScatter
    },
    created: function() {
        EventBus.$on('callPrivateKeyLogin', this.loginWithPrivate);
        EventBus.$on('callScatterLogin', this.loginWithScatter);
    },
    methods: {
        loginWithPrivate: function(pk) {
            alert("login with private! : " + pk);
        },
        loginWithScatter: function() {
            alert("login with Scatter!");
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
</style>
