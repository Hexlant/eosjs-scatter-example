<template>
    <div class="topStatistics">
        <div id='tsTop'>
            <div class='tsTopElement'>token issue status</div>
            <div class='tsTopElement'>{{ percentComputed }}%</div>
        </div>
        
        <div id='statisticsProgress'>
            <div id='statisticsProgressInner' :style="'width:' + percentComputed + '%'">&nbsp;</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'TopStatistics',
    props: {
        max: Number,
        current: Number
    },
    computed: {
        percentComputed: function() {
            return (this.current / this.max * 100).toFixed(2);
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    
    #statisticsProgress {
        width: 100%;
        height: 30px;
        background: grey;
    }

    #statisticsProgressInner {
        height: 30px;
        background: #555555;
    }
    #tsTop {
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
        margin-top: 40px;
    }
    .tsTopElement {
        font-size: 2em;
    }
</style>
