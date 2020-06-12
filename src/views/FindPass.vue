<template>
<div class="findPass">
	<div class="findPassBox modelBox">
		<div class="modelHead">密码找回</div>

	</div>
</div>
</template>

<script>
import Util from '../libs/util'
import SendMess from '../components/sendMess'

export default {
	data() {
		return {

		}
	},
	methods: {
		save(formName) {
			// this.$refs[formName].validate((valid) => {
			// 	if (valid) {
			// 		this.$store.dispatch('findPassPage_findPass', this.ruleForm).then((data) => {
			// 			this.$message({
			// 				message: '修改成功，请牢记密码',
			// 				type: 'success'
			// 			})
			// 			setTimeout(() => {
			// 				this.$router.push({
			// 					'name': 'Login'
			// 				})
			// 			}, 2000)
			// 		}).catch(err => {
			// 			if (err) {
			// 				this.$message({
			// 					message: err.mess,
			// 					type: 'error'
			// 				})
			// 			} else {
			// 				this.$message({
			// 					message: '修改失败',
			// 					type: 'error'
			// 				})
			// 			}
			// 		})
			// 	} else {
			// 		this.$message({
			// 			message: '请填写正确的登陆信息',
			// 			type: 'error'
			// 		})
			// 		return false
			// 	}
			// });
		}
	},
	mounted: function() {},
	components: {
		SendMess
	}
}
</script>
<style lang="scss">
.findPass {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // .findPassBox {
    //     position: absolute;
    //     left: 50%;
    //     top: 50%;
    //     transform: translate(-50%, -50%);
    //     width: 480px;
    //     height: 320px;
    //     background-color: #fff;
    //     .submit {
    //         // height: 40px;
    //         background-color: #419ef2;
    //         border-color: #419ef2;
    //         font-size: 16px;
    //     }
    // }
}
</style>
