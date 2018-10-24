<template>
    <div id="app">
        <h1>Account Details</h1>

        <b-form inline id='accountForm'>
            <label class="mr-sm-2" for="inputPrivateKey">Account name</label>
            <b-input id="inputPrivateKey" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter account name..." v-model="accountName"/>
            <b-button @click='updateAccountInfo'>SHOW INFO</b-button>
        </b-form>

        <hr/>

        <AccountInfo :accountName=accountName :balance=balance :cpuStakedEOS=cpuStakedEOS :netStakedEOS=netStakedEOS
            :cpuTotal=cpuTotal :cpuUsed=cpuUsed
            :netTotal=netTotal :netUsed=netUsed
            :ramTotal=ramTotal :ramUsed=ramUsed />
        
        <CurrentInfo :headBlockId=headBlockId :headBlockNum=headBlockNum :headBlockProducer=headBlockProducer :headBlockTime=headBlockTime />
    </div>
</template>

<script>
    import Eos from 'eosjs'
    import AccountInfo from './components/AccountInfo.vue'
    import CurrentInfo from './components/CurrentInfo.vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import { network, eosNetwork } from './config.js'
    import { EventBus } from './EventBus.js'

    export default {
        name: 'app',
        data: function() {
            return {
                accountName: "",
                balance: "0 EOS",
                cpuTotal: 1,
                cpuUsed: 0,
                cpuStakedEOS: 0,
                netTotal: 1, 
                netUsed: 0,
                netStakedEOS: 0,
                ramTotal: 1,
                ramUsed: 0,

                headBlockId: "aaa",
                headBlockNum: 0,
                headBlockProducer: "aaa",
                headBlockTime: "aaa",
                
                eos: null
            }
        },
        components: {
            AccountInfo, CurrentInfo
        },
        created: async function() {
            EventBus.$on('callUpdateCurrentInfo', this.updateCurrentInfo);

            this.eos = Eos(eosNetwork);
        },
        methods: {
            updateAccountInfo: async function() {
                let result = await this.eos.getAccount({'account_name':this.accountName});

                console.log(result);

                this.accountName = result.account_name;
                this.balance = result.core_liquid_balance;
                this.cpuTotal = Number(result.cpu_limit.max);
                this.cpuUsed = result.cpu_limit.used;
                this.cpuStakedEOS = result.cpu_weight;
                this.netTotal = Number(result.net_limit.max);
                this.netUsed = result.net_limit.used;
                this.netStakedEOS = result.net_weight;
                this.ramTotal = result.ram_quota;
                this.ramUsed = result.ram_usage;

                EventBus.$emit('callAccountInfoCircleUpdate');
            },
            updateCurrentInfo: async function() {
                let result = await this.eos.getInfo({});

                console.log(result);

                this.headBlockId = result.head_block_id;
                this.headBlockNum = result.head_block_num;
                this.headBlockProducer = result.head_block_producer;
                this.headBlockTime = result.head_block_time;
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
#accountForm {
    margin: 40px 0 40px 0;
}
</style>
