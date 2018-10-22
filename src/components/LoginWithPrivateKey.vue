<template>
    <div id='loginWithPrivateKey'>
        <b-form inline style='margin-bottom:5px'>
            <label class="mr-sm-2" for="inputAccountName">Account name</label>
            <b-input id="inputAccountName" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter account name..." v-model="accountName"/>
        </b-form>
        <b-form inline>
            <label class="mr-sm-2" for="inputPrivateKey">Private Key</label>
            <b-input id="inputPrivateKey" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter private key..." v-model="privateKey"/>
            <b-button @click='privateKeyLogin'>LOGIN</b-button>
        </b-form>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { EventBus } from '../EventBus.js'

export default {
    name: 'LoginWithPrivateKey',
    props: {},
    data: function() {
        return {
            accountName: "",
            privateKey: ""
        }
    },
    methods: {
        privateKeyLogin: function() {
            EventBus.$emit('callPrivateKeyLogin', {accountName: this.accountName, privateKey: this.privateKey});
        }
    }
}
</script>

<style scoped>
</style>