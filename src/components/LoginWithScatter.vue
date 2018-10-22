<template>
    <div id='loginWithScatter'>
        <b-button @click='scatterLogin'>LOGIN using Scatter</b-button>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { EventBus } from '../EventBus.js'

export default {
    name: 'LoginWithScatter',
    props: {},
    methods: {
        scatterLogin: function() {
            EventBus.$emit('callScatterLogin');
        }
    }
}
</script>

<style scoped>
#loginWithScatter {
    margin-top: 10px;
}
</style>