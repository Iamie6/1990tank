<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
    data(){
        return{}
    }
}
</script>

<style>
#app {
    height: 100%;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

* {
    padding: 0;
    margin: 0;
}

html, body {
    width: 100%;
    height: 100%;
}

canvas {
    position: absolute;
    left: 0;
    top: 0;
}

button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

button:nth-child(2) {
    left: 40px;
}
</style>
