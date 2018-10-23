<template>
    <div id="CurrentInfo">
        <h1>Current Network Info</h1>
        <h4>head block id: {{ headBlockId }}</h4>
        <h4>head block Number: <b>{{ headBlockNum }}</b></h4>
        <h4>head block producer: {{ headBlockProducer }}</h4>
        <h4>head block time: {{ headBlockTime }}</h4>
        <b-button @click='callUpdateCurrentInfo'>UPDATE</b-button>
    </div>

</template>

<script>
import { EventBus } from '../EventBus.js'

export default {
    name: 'CurrentInfo',
    props: {
        headBlockId: String,
        headBlockNum: Number,
        headBlockProducer: String,
        headBlockTime: String
    },
    methods: {
        callUpdateCurrentInfo: function() {
            EventBus.$emit('callUpdateCurrentInfo');
        }
    }
}
</script>

<style scoped>
</style>
