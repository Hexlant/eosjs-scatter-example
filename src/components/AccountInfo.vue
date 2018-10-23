<template>
    <div id="accountInfo">
        <div id='accountInfoLeft'>
            <h5>Account: {{ accountName }}</h5>
            <h5>EOS Balance: {{ balanceComputed }} EOS</h5>
            <h5>EOS Staked: {{ stakedComputed }} EOS</h5>
        </div>
        <div class='circleDiv'>
            <vue-circle ref='circleCPU'
                :start-angle="-Math.PI/2"
                :progress="cpuPercentage"
                :show-percent=true>
                <h5>CPU</h5>
                <p>{{ cpuUsed }} / {{ cpuTotal }} (ms)</p>
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

export default {
    name: 'AccountInfo',
    props: {
        accountName: String,
        balance: Number,
        staked: Number,
        cpuTotal: Number,
        cpuUsed: Number,
        netTotal: Number,
        netUsed: Number,
        ramTotal: Number,
        ramUsed: Number
    },
    components: { VueCircle },
    computed: {
        balanceComputed: function() {
            return this.balance + "!!";
        },
        stakedComputed: function() {
            return this.staked + "!!";
        },
        cpuPercentage: function() {
            return this.cpuUsed / this.cpuTotal * 100;
        },
        netPercentage: function() {
            return this.netUsed / this.netTotal * 100;
        },
        ramPercentage: function() {
            return this.ramUsed / this.ramTotal * 100;
        }
    },
    methods: {
        // change: function() {
        //     this.cpuUsed = 99999;
        // },
        // update: function() {
        //     this.$refs.circleCPU.updateProgress(this.cpuPercentage);
        // }
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
