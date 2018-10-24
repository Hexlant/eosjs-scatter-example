<template>
    <div id='loginWithScatter'>
        <b-button @click='scatterLogin' :disabled="!scatterLoaded">{{ btnText }}</b-button>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { EventBus } from '../EventBus.js'

export default {
    name: 'LoginWithScatter',
    props: {
        scatterLoaded: Boolean
    },
    methods: {
        scatterLogin: function() {
            EventBus.$emit('callScatterLogin');
        }
    },
    computed: {
        btnText: function() {
            return this.scatterLoaded ? "LOGIN using Scatter" : "Checking scatter installation..";
        }
    }
}
</script>

<style scoped>
#loginWithScatter {
    margin-top: 10px;
}
</style>