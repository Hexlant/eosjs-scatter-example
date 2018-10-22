<template>
    <div class="topStatistics">
        <h1>{{ symbol }} token sale statistics</h1>
        <div id='statisticsPercent'>{{ percent }}%</div>
        <div id='statisticsProgress'>
            <div id='statisticsProgressInner' :style="'width:' + percent + '%'">&nbsp;</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'TopStatistics',
    props: {
        symbol: String,
        percent: Number
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
