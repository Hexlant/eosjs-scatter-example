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
            </div>
        </div>
    </div>
</template>

<script>
    import LoginWithScatter from './components/LoginWithScatter.vue'
    import { EventBus } from './EventBus.js'

    import Eos from 'eosjs'
    import ScatterJS from 'scatterjs-core'
    import ScatterEOS from 'scatterjs-plugin-eosjs'

    export default {
        name: 'app',
        data: function() {
            return {
                // 이 변수를 통해 vuejs에서 로그인 이전, 이후 화면을 분기합니다.
                isLogin: false,
                // 스캐터가 설치되었는지 확인합니다.
                scatterLoaded: false,

                // 스캐터로 로그인 한 후, 해당 변수에 로그인 한 계정명과 권한명을 저장합니다.
                // 해당 정보가 화면에 출력되고,
                // 트랜잭션 호출 시에 계정명이 필요할 때 이 정보를 사용합니다.
                accountName: "",
                accountPermission: "",

                // 스캐터의 인스턴스입니다. 스캐터가 설치되었다면 
                // 초기 구동 시 (created: 부분) 해당 변수를 초기화 합니다.
                scatter: null,

                // eosjs의 인스턴스 입니다. 올바르게 스캐터로부터 identity를 받아왔다면 
                // 해당 변수를 초기화 합니다.
                eos: null,

                // 스캐터나 eosjs에서 사용할 nodeos 관련 정보입니다. 
                network: {
                    blockchain: 'eos',
                    host: 'jungle.cryptolions.io',
                    port: 18888,
                    protocol: 'http',
                    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
                },
                
                // 컨트랙트 올라가 있는 계정입니다.
                // lazylion1234에는 addressbook 컨트랙트가 배포되어 있습니다. 
                contractAccount: 'lazylion1234',

                // addressbook의 people 테이블 (화면 상 Total table 영역) 에 보여 줄 정보에 상응하는 변수입니다.
                // 이 변수에 people 테이블 조회 결과를 집어넣으면 화면이 갱신됩니다.
                tableData: [],

                // Total table의 헤더입니다.
                tableFields: ['key', 'first_name', 'last_name', 'street', 'city', 'state'],

                // Upsert my data 기능의 각 input에 연결된 변수입니다. 
                myFirstName: "",
                myLastName: "",
                myStreet: "",
                myCity: "",
                myState: ""
            }
        },
        components: {
            LoginWithScatter
        },
        /**
         * 초기 로딩 시, 스캐터 설치 유무를 파악해 (ScatterJS.scatter.connect)
         * 로그인을 가능하게 할지 말지를 결정합니다.
         * 
         * 이미 로그인이 되어있다면(스캐터 identity 이미 획득) 자동으로 화면이 넘어가고,
         * 로그인이 되어있지 않다면(획득한 스캐터 identity 없음) 로그인 버튼이 활성화됩니다.
         */
        created: function() {
            EventBus.$on('callScatterLogin', this.loginWithScatter);


            // 스캐터 초기화를 진행합니다.
            ScatterJS.plugins( new ScatterEOS() );

            
            ScatterJS.scatter.connect("skp_scatter_example").then(connected => {
                // 스캐터와 정상적으로 연결되었다면,
                // 아래의 if문을 건너뜁니다.
                if(!connected) {
                    alert("Cannot find Scatter!");
                    this.scatterLoaded = false;
                    this.eos = null;
                    this.scatter = null;

                    return false;
                }
                else {
                    // vue 내부 변수인 this.scatter에 생성된 스캐터 인스턴스를 연결합니다.
                    // 그리고 보안을 위해 window 객체에 존재하는 window.ScatterJS 객체를 null 처리 합니다.
                    this.scatter = ScatterJS.scatter;
                    window.ScatterJS = null;

                    this.scatterLoaded = true;

                    if(this.scatter.identity) {
                        // 이미 identity가 존재하는 경우 (이미 identity를 획득한 상태)
                        // 바로 로그인 과정을 진행합니다.
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
                /**
                 * getIdentity 메서드가 실행되면 
                 * 계정을 선택하는 스캐터 창이 뜨게 됩니다.
                 * 이후 내부 로직이 수행됩니다.
                 * 
                 * 만약 이미 identity가 획득된 상태라면,
                 * 창은 뜨진 않지만 내부 로직은 수행됩니다.
                 */
                this.scatter.getIdentity({accounts:[this.network]}).then(identity => {

                    // 스캐터 identity에서 계정 정보를 조회합니다. 
                    let account = this.scatter.identity.accounts.find(account => account.blockchain === this.network.blockchain);

                    // 스캐터가 말아준(?) eosjs 인스턴스 입니다.
                    // 추후 이 변수를 사용해 네트워크에 여러 작업을 할 수 있습니다.
                    this.eos = this.scatter.eos(this.network, Eos);

                    // 계정 정보를 임의의 변수에 담습니다.
                    // 해당 변수는 추후 트랜잭션에서 필요할 때 사용합니다.
                    this.accountName = account.name;
                    this.accountPermission = account.authority;

                    // 로그인 성공 여부를 true로 변경합니다.
                    this.isLogin = true;

                    // 전체 테이블을 조회합니다.
                    this.updateTableList();
                });
            },
            logout: function() {
                if(this.scatter.identity) {
                    // 연결된 스캐터 identity를 삭제합니다. 
                    this.scatter.forgetIdentity();
                }
                // 로그인 상태 변수를 false처리 합니다.
                this.isLogin = false;

                // 기존에 입력된 내용이 재 로그인 시 남아있지 않게 하기 위해
                // input 입력 값을 지워줍니다.
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
                // TODO 1: upsert 트랜잭션 날리기
                /**
                 * this.eos.transaction 메서드를 사용해 
                 * lazylion1234 컨트랙트의 upsert 명령을 날려봅시다. 
                 * 
                 * 참고 : https://github.com/EOSIO/eosjs/tree/v16.0.9#transaction
                 * 
                 * 아래 남아있는 코드에서 알 수 있듯이, 
                 * 해당 메서드는 promise를 반환합니다.
                 * 
                 * 메서드 호출 후 then(), catch() 관련 체이닝은 주석처리 해놓았으니
                 * eos.transaction 구현 후 주석 해제하여 붙이시면 됩니다.
                 */


                // }).then(result => {
                //     alert('upsert Success!');
                //     this.updateTableList();
                // }).catch(error => {
                //     alert('error: ' + JSON.stringify(error));
                // });
            },
            eraseMyData: async function() {
                // TODO 2: erase 트랜잭션 날리기
                /**
                 * this.eos.transaction 메서드를 사용해 
                 * lazylion1234 컨트랙트의 erase 명령을 날려봅시다. 
                 * 
                 * 참고 : https://github.com/EOSIO/eosjs/tree/v16.0.9#transaction
                 * 
                 * 아래 남아있는 코드에서 알 수 있듯이, 
                 * 해당 메서드는 promise를 반환합니다.
                 * 
                 * 메서드 호출 후 then(), catch() 관련 체이닝은 주석처리 해놓았으니
                 * eos.transaction 구현 후 주석 해제하여 붙이시면 됩니다.
                 */

                
                // }).then(result => {
                //     alert('erase Success!');
                //     this.updateTableList();
                // }).catch(error => {
                //     alert('error: ' + JSON.stringify(error));
                // });
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
