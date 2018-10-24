<template>
    <div class="topStatistics">
        <div id='statisticsPercent'>{{ percentComputed }}%</div>
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

    #statisticsPercent {
        display: float;
        text-align: right;
        font-size: 2em;
    }
</style>
