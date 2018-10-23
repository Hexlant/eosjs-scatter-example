<template>
    <div id="accountInfo">
        <div id='accountInfoLeft'>
            <h5>Account: {{ accountName }}</h5>
            <h5>EOS Balance: {{ balanceComputed }}</h5>
            <h5>Total Staked: {{ stakedComputed }} EOS</h5>
        </div>
        <div class='circleDiv'>
            <vue-circle ref='circleCPU'
                :start-angle="-Math.PI/2"
                :progress="cpuPercentage"
                :show-percent=true>
                <h5>CPU</h5>
                <p>{{ cpuUsed }} / {{ cpuTotal }} (&#x00B5s)</p>
            </vue-circle>
        </div>
        <div class='circleDiv'>
            <vue-circle ref='circleNET'
                :start-angle="-Math.PI/2"
                :progress="netPercentage"
                :show-percent=true>
                <h5>NET</h5>
                <p>{{ netUsed }} / {{ netTotal }} (bytes)</p>
            </vue-circle>
        </div>
        <div class='circleDiv'>
            <vue-circle ref='circleRAM'
                :start-angle="-Math.PI/2"
                :progress="ramPercentage"
                :show-percent=true>
                <h5>RAM</h5>
                <p>{{ ramUsed }} / {{ ramTotal }} (bytes)</p>
            </vue-circle>
        </div>

        <!-- <div><button @click='change'>change</button></div>
        <div><button @click='update'>update</button></div> -->
    </div>

</template>

<script>
import VueCircle from 'vue2-circle-progress/src/index.vue'
import { EventBus } from '../EventBus.js'

export default {
    name: 'AccountInfo',
    props: {
        accountName: String,
        balance: String,
        cpuTotal: Number,
        cpuUsed: Number,
        cpuStakedEOS: Number,
        netTotal: Number,
        netUsed: Number,
        netStakedEOS: Number,
        ramTotal: Number,
        ramUsed: Number
    },
    components: { VueCircle },
    mounted: function() {
        EventBus.$on('callAccountInfoCircleUpdate', this.updateCircle);
    },
    computed: {
        balanceComputed: function() {
            return this.balance;
        },
        stakedComputed: function() {
            return ( this.cpuStakedEOS + this.netStakedEOS ) / 1000;
        },
        cpuPercentage: function() {
            // this.$refs.circleCPU.updateProgress(this.cpuUsed / this.cpuTotal * 100);
            return this.cpuUsed / this.cpuTotal * 100;
            
        },
        netPercentage: function() {
            // this.$refs.circleNET.updateProgress(this.netUsed / this.netTotal * 100);
            return this.netUsed / this.netTotal * 100;
            
        },
        ramPercentage: function() {
            // this.$refs.circleRAM.updateProgress(this.ramUsed / this.ramTotal * 100);
            return this.ramUsed / this.ramTotal * 100;
            
        }
    },
    methods: {
        updateCircle: function() {
            this.$nextTick(function() {
                this.$refs.circleCPU.updateProgress(this.cpuPercentage);
                this.$refs.circleNET.updateProgress(this.netPercentage);
                this.$refs.circleRAM.updateProgress(this.ramPercentage);
            });
        }
    }
}
</script>

<style scoped>
#accountInfo {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-top: 80px;
    margin-bottom: 170px;
}

vue-circle {
    margin-right: 30px;
}
</style>
