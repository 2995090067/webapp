<template>
<div class="commonSearch">
	<input v-model="keyword" type="text" :placeholder="placeholder || '请输入信用主体名称'">
	<button @click="search(keyword)">搜索</button>
</div>
</template>

<script>
export default {
	props: ['search'],
	data() {
		return {
			keyword: ''
		}
	},
	props: ['search', 'placeholder'],
	methods: {

	},
	mounted: function() {},
}
</script>
<style scoped lang="scss">
.commonSearch {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.25rem;
    input {
        flex: 1;
        padding-left: 0.5rem;
        width: 5.6rem;
        height: 0.66rem;
        line-height: normal;
        border: 1px solid #cdcdcd;
        background: url("../assets/searchIco.png") #fff 0.1rem -0.6rem no-repeat;
        background-size: 0.35rem;
        font-size: 0.28rem;
    }
    button {
        margin-left: 0.2rem;
        width: 1.4rem;
        height: 0.66rem;
        line-height: 0.66rem;
        border: 0;
        background-color: #2795ee;
        color: #fff;
        font-size: 0.28rem;
    }

}
</style>
