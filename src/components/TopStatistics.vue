<template>
    <div class="topStatistics">
    </div>
</template>

<script>
export default {
    name: 'TopStatistics',
    props: {
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
