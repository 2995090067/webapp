<template>
<div class="commonUpload">
	<div class="fileBox" v-if="uploadFile">
		<img :src="uploadFile">
	</div>

	<!-- <span class="filename">{{title}}</span> -->
</div>
</template>

<script>
export default {
	props: ['file', 'title'],
	data() {
		return {
			uploadFile: ''
		}
	},
	watch: {
		file(val) {
			this.uploadFile = val
		}
	},
	mounted: function() {
		this.uploadFile = this.file
	},
}
</script>
<style scoped lang="scss">
.commonUpload {
    position: relative;
    .fileBox {
        overflow: hidden;
        position: absolute;
        background-color: #fff;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
            height: 100%;
        }
    }
    .title {
        display: block;
        text-align: center;
        font-size: 0.2rem;
    }

}
</style>
