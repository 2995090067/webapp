<template>
<div class="secondPage">
	<Header>{{$route.meta.title}}</Header>

	<div class="banner">
		<img :src="banner" />
	</div>

	<div class="credit box">
		<h4 class="commonTitle"><span>我的信用</span></h4>
		<div class="entry">
			<router-link :to="{name: 'YyclPage'}">
				<div>
					<span>异议申请</span> 提交异议申请表
				</div>
				<img :src="xyfw_yy" />
			</router-link>
			<router-link :to="{name: 'HcbgPage'}">
				<div>
					<span>核查报告</span> 填写申请报告
				</div>
				<img :src="xyfw_bg" />
			</router-link>
		</div>
	</div>
	<div class="question box">
		<h4 class="commonTitle"><span>常见问题</span></h4>
		<ul class="baseList">
			<li v-for="(item,index) in questionList" :key="index" @click="questionClick(item.title,index)">
				{{ item.title }}
			</li>
		</ul>
	</div>

	<van-actionsheet v-model="questionDetail.show" :title="questionDetail.title">
		<div class="questionDetailContent" v-html="questionDetail.content"></div>
	</van-actionsheet>
</div>
</template>

<script>
import Util from '../../libs/util'
import Header from '../../components/Header'

export default {
	data() {
		return {
			banner: require('../../assets/xyfw.jpg'),
			xyfw_yy: require('../../assets/xyfw_yy.png'),
			xyfw_bg: require('../../assets/xyfw_bg.png'),
			questionList: [{
				title: '异议申请需要哪些资料？',
				answer: '异议申请需要提供异议数据类型、异议申请内容、异议证据材料方可提交异议申请'
			}, {
				title: '异议申请需要等待多久审核？',
				answer: '异议申请提交申请，需要等待1~2个工作日进行处理审核，审核成功后可以在申请进度查询查询最新进展情况'
			}, {
				title: '核查报告工作流程？',
				answer: '核查报告申请核查报告用途，提交核查申请'
			}, {
				title: '核查报告如果获取？',
				answer: '核查报告申请成功后，需要经过审核人员审核通过后，在进度查询最新审核进展'
			}, {
				title: '核查报告审核单位？',
				answer: '核查报告审核单位一般是信用中心审核部门'
			}],
			questionDetail: {
				show: false,
			}

		}
	},
	methods: {
		questionClick(title, index) {
			this.questionDetail.show = true
			this.questionDetail.title = title
			this.questionDetail.content = '<p>' + this.questionList[index].answer + '</p>'
		},
		onSelect(item) {
			// 点击选项时默认不会关闭菜单，可以手动关闭
			this.show = false;
			Toast(item.name);
		}
	},
	mounted: function() {
		// console.log(this.$route.meta.title);
	},
	components: {
		Header,
	}
}
</script>
<style scoped lang="scss">
.secondPage {
    overflow: auto;
    .box {
        margin-top: 0.2rem;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        .commonTitle {
            // padding-top: 0.1rem;
            // padding-bottom: 0.1rem;
            height: 0.8rem;
            line-height: 0.8rem;
        }
    }

    .credit {
        .entry {
            display: flex;
            border-top: 1px solid #e5e5e5;
            a {
                display: flex;
                flex: 1;
                padding: 0.2rem 0.3rem;
                &:first-child {
                    border-right: 1px solid #e5e5e5;
                }
                div {
                    flex: 1;
                    color: #686868;
                    font-size: 0.26rem;
                    span {
                        display: block;
                        color: #333;
                        font-size: 0.3rem;
                    }
                }
                img {
                    align-self: center;
                    width: 0.85rem;
                    height: 0.85rem;
                }
            }
        }
    }
    .question {
        .commonTitle {
            &:before {
                background: #f19149;
            }
        }
        .baseList {
            li {
                display: flex;
                align-items: center;
                height: 0.9rem;
                border-top: 1px solid #e5e5e5;
            }
        }
    }
}
.questionDetailContent {
    padding: 0.25rem;
    overflow: auto;
    min-height: 3.5rem;
    font-size: 0.34rem;
}
</style>
