<style scoped>

.notfound {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    h1 {
        font-size: 22px;
    }
}

</style>

<template>

<div class="notfound">
    <h1>{{notfound}}</h1>
</div>

</template>

<script>

export default {
    data() {
        return {
            notfound: '404 NotFound'
        }
    }
}

</script>
