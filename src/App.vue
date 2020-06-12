<style lang="scss">
@import "./sass/base.scss";
@import "./sass/common.scss";
</style>

<template>
<div class="app">
	<router-view></router-view>
</div>
</template>

<script>
import FormatDate from './libs/formatDate'
export default {
	name: 'App',
}
</script>
