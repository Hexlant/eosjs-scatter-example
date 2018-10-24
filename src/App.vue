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
    import { EventBus } from './EventBus.js'

    export default {
        name: 'app',
        data: function() {
            return {
                /**
                 * 아래의 변수들은 브라우저에 표시될 내용과 연결되어 있습니다. (vuejs)
                 * eosjs를 사용해 변수들을 변경하여 올바르게 정보를 표시하는 것이 
                 * 본 예제의 목적입니다.
                 * 
                 * 현재는 의미없는 값들로 초기화되어있습니다.
                 */
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

                /**
                 * Current Network Info 기능에 보여줄 변수들입니다.
                 * 마찬가지로, 이 변수들이 수정되면 화면에 값이 변경되게 됩니다.
                 */
                headBlockId: "aaa",
                headBlockNum: 0,
                headBlockProducer: "aaa",
                headBlockTime: "aaa",

                
                networkOptions: {
                    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
                    httpEndpoint: "http://jungle.cryptolions.io:18888",
                    broadcast: true,
                    verbose: true,
                    sign: true
                },
                
                eos: null
            }
        },
        components: {
            AccountInfo, CurrentInfo
        },
        created: async function() {
            EventBus.$on('callUpdateCurrentInfo', this.updateCurrentInfo);

            /**
             * this.networkOptions을 사용하여
             * eos 인스턴스를 초기화합니다.
             */
            this.eos = Eos(this.networkOptions);
        },
        methods: {
            updateAccountInfo: async function() {

                // TODO 1 : account 정보 받아오기 
                /**
                 * eosjs에는 계정 정보를 받아오는 getAccount 메서드가 있습니다.
                 * 이 메서드를 사용하여 계정 정보를 조회해보고,
                 * 
                 * 변경이 필요한 변수들의 값을 바꿔 화면에 변경된 정보를 출력해 봅시다.
                 * 
                 *  - 입력한 계정 이름 input 과 연결된 변수 : this.accountName
                 *  - 조회한 정보를 가지고 변경해야 될 변수들
                 *    this.accountName
                 *    this.balance
                 *    this.cpuTotal
                 *    this.cpuUsed
                 *    this.cpuStakedEOS
                 *    this.netTotal
                 *    this.netUsed
                 *    this.netStakedEOS
                 *    this.ramTotal
                 *    this.ramUsed
                 * 
                 *    ex) this.ramTotal = result.ram_quota;
                 *        this.ramUsed = result.ram_usage;
                 *        ....
                 */

                
                // WRITE CODE HERE .....


                EventBus.$emit('callAccountInfoCircleUpdate');
            },
            updateCurrentInfo: async function() {
                // TODO 2 : 체인 정보 받아오기 
                /**
                 * eosjs에는 체인 정보를 받아오는 getInfo 메서드가 있습니다.
                 * 이 메서드를 사용하여 체인 정보를 조회해보고,
                 * 
                 * 변경이 필요한 변수들의 값을 바꿔 화면에 변경된 정보를 출력해 봅시다.
                 * 
                 *  - 조회한 정보를 가지고 변경해야 될 변수들
                 *    this.headBlockId
                 *    this.headBlockNum
                 *    this.headBlockProducer
                 *    this.headBlockTime
                 * 
                 *    ex) this.headBlockId = result.head_block_id;
                 *        ...
                 */

                
                // WRITE CODE HERE .....
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
