<template>
    <div id="app">
        <h1 id='titleH1'>Addressbook!</h1>

        <div>
            <div v-if="!isLogin" id='loginMethod'>
                <LoginWithScatter :scatterLoaded=scatterLoaded />
            </div>
            <div v-else>
    
                <div id='accountInfo'>
                    <div>
                        <h4 style='margin-top: 40px;'>Account : <b>{{ accountName }}</b></h4>
                        <h4>Permission : <b>{{ accountPermission }}</b></h4>
                    </div>
                    <div><b-button @click='logout' id='logoutBtn'>LOGOUT</b-button></div>
                </div>

                <hr style='margin-bottom:40px'/>

                <div class='tableHeader'>
                    <div class='tableTitle'>Total table</div>
                    <div><b-button @click='updateTableList'>REFRESH</b-button></div>
                </div>
                <b-table bordered :fields="tableFields" :items="tableData"></b-table>

                <div class='tableHeader'>
                    <div class='tableTitle'>Upsert my data</div>
                    <div><b-button @click='upsertMyData'>UPSERT</b-button></div>
                </div>
                account <b-input id="inputAccount" v-model="accountName" disabled/>
                first_name <b-input id="inputFirstName" v-model="myFirstName"/>
                last_name <b-input id="inputLastName" v-model="myLastName"/>
                street <b-input id="inputStreet" v-model="myStreet"/>
                city <b-input id="inputCity" v-model="myCity"/>
                state <b-input id="inputState" v-model="myState"/>

                <div class='tableHeader'>
                    <div class='tableTitle'>Erase my data</div>
                    <div><b-button @click='eraseMyData'>ERASE from table</b-button></div>
                </div>


                <!-- <BuyMore/> -->
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

    import Eos from 'eosjs'
    import ScatterJS from 'scatterjs-core'
    import ScatterEOS from 'scatterjs-plugin-eosjs'

    export default {
        name: 'app',
        data: function() {
            return {
                maxSupply: 100,
                supply: 30,
                tokenSymbol: "SKP",
                salePercent: 5,
                isLogin: false,

                accountName: "",
                accountPermission: "",

                scatterLoaded: false,
                scatter: null,
                network: {
                    blockchain: 'eos',
                    host: 'jungle.cryptolions.io',
                    port: 18888,
                    protocol: 'http',
                    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
                },
                eos: null,
                contractAccount: 'lazylion1234',
                tableData: [],
                tableFields: ['key', 'first_name', 'last_name', 'street', 'city', 'state'],

                myFirstName: "",
                myLastName: "",
                myStreet: "",
                myCity: "",
                myState: ""
            }
        },
        components: {
            TopStatistics, LoginWithPrivateKey, LoginWithScatter, AccountInfo, BuyMore
        },
        created: function() {
            EventBus.$on('callPrivateKeyLogin', this.loginWithPrivate);
            EventBus.$on('callScatterLogin', this.loginWithScatter);
            EventBus.$on('callBuyMore', this.buyMoreToken);

            ScatterJS.plugins( new ScatterEOS() );

            ScatterJS.scatter.connect("skp_scatter_example").then(connected => {
                if(!connected) {
                    alert("Cannot find Scatter!");
                    this.scatterLoaded = false;
                    this.eos = null;
                    this.scatter = null;

                    return false;
                }
                else {
                    this.scatter = ScatterJS.scatter;
                    window.ScatterJS = null;

                    this.scatterLoaded = true;

                    if(this.scatter.identity) {
                        this.loginWithScatter();
                    }
                }
            }); 
        },
        methods: {
            loginWithScatter: function() {
                if(!this.scatterLoaded) {
                    alert('Cannot find Scatter!');
                    return;
                }
                this.scatter.getIdentity({accounts:[this.network]}).then(identity => {

                    let account = this.scatter.identity.accounts.find(account => account.blockchain === this.network.blockchain);

                    this.eos = this.scatter.eos(this.network, Eos);

                    this.accountName = account.name;
                    this.accountPermission = account.authority;

                    this.isLogin = true;

                    this.updateTableList();
                });
            },
            logout: function() {
                if(this.scatter.identity) {
                    this.scatter.forgetIdentity();
                }
                this.isLogin = false;

                this.myFirstName = "";
                this.myLastName = "";
                this.myStreet = "";
                this.myCity = "";
                this.myState = "";
            },

            updateTableList: function() {
                this.tableData = [];
                this.eos.getTableRows(true, this.contractAccount, this.contractAccount, 'people').then(data => {
                    console.log(JSON.stringify(data.rows));

                    this.tableData = data.rows;
                });
            },

            upsertMyData: function() {
                this.eos.transaction({
                    actions: [{
                        account: this.contractAccount,
                        name: 'upsert',
                        data: {
                            user: this.accountName,
                            first_name: this.myFirstName,
                            last_name: this.myLastName,
                            street: this.myStreet,
                            city: this.myCity,
                            state: this.myState
                        },
                        authorization: [{
                            actor: this.accountName,
                            permission: this.accountPermission
                        }]
                    }]
                }).then(result => {
                    alert('upsert Success!');
                    this.updateTableList();
                }).catch(error => {
                    alert('error: ' + JSON.stringify(error));
                });
            },
            eraseMyData: async function() {
                this.eos.transaction({
                    actions: [{
                        account: this.contractAccount,
                        name: 'erase',
                        data: {
                            user: this.accountName
                        },
                        authorization: [{
                            actor: this.accountName,
                            permission: this.accountPermission
                        }]
                    }]
                }).then(result => {
                    alert('erase Success!');
                    this.updateTableList();
                }).catch(error => {
                    alert('error: ' + JSON.stringify(error));
                });
              
            },
            
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
#accountInfo, .tableHeader {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
}
.tableTitle {
    font-size: 2em;
}
</style>
