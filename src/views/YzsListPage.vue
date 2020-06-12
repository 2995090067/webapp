<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="searchPage">
		<!-- 列表组件 -->
		<div class="wukai">
			<List :list="listTab.list" :loading="listTab.loading" :finished="listTab.finished" :onLoad="onLoad">
				<template slot-scope="slotProps">
				    <div class="listItem" v-for="(item, index) in slotProps.cList" :key="index">
						<div v-if="$route.query.type.indexOf('fr') > -1" @click="showDetail(item)">
							<span class="name">{{ item.A000001 }}</span>
							<span class="textOverflow">统一社会信用代码:{{ item.A000002 }}</span>
							<span>组织机构代码:{{ item.A000004 }}</span>
							<span>工商注册号:{{ item.A000003 }}</span>
							<span>税务登记证号:--</span>
						</div>
						<div v-else @click="showDetail(item)">
							<span class="name">{{ item.B000001 }}</span>
							<span class="textOverflow">统一社会信用代码:{{ item.TYBM }}</span>
							<span>身份证号码:{{ item.B000002 }}</span>
							<span>手机号码:--</span>
							<span>家庭现住址:--</span>
						</div>
				    </div>
				</template>
			</List>
		</div>
	</div>

	<van-popup class="linesePopup" v-model="show" position="right" :overlay="false">
		<YzsDetailPage :tybm="detail.tybm" :type="detail.type" :customBackFun="customBackFun"></YzsDetailPage>
	</van-popup>
</Layout>
</template>

<script>
import Util from '../libs/util'
import YzsDetailPage from './YzsDetailPage'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import List from '../components/list'

export default {
	data() {
		return {
			show: false,
			listTab: {
				refresh: false,
				loading: false,
				finished: false,
				list: [],
			},
			payload: {
				condition: this.$route.params.keyword,
				type: this.$route.query.type,
				pageNo: 0,
				pageSize: 10
			},
			detail: {
				tybm: '',
				type: this.$route.query.type,
			}
		}
	},
	methods: {
		customBackFun() {
			this.show = false
		},
		showDetail(item) {
			if (this.$route.query.type.indexOf('fr') > -1) {
				this.show = true
				this.detail.tybm = item.tybm
			}
		},
		getData() {
			if (this.listTab.loading) {
				return false;
			}
			this.listTab.loading = true
			Util.ajax.get(this.$route.query.url, {
					params: this.payload
				})
				.then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							this.listTab.finished = true
						} else {
							this.listTab.list = this.listTab.list.concat(response.data.data)
						}
						this.payload.first = this.payload.first + this.payload.count
					}
					this.listTab.loading = false
					setTimeout(function() {
						this.listTab.refresh = false
					}.bind(this), 1000);
				}).catch((err) => {
					this.$toast('接口出错')
					this.listTab.loading = false
				})
		},
		onLoad() {
			this.getData()
		}
	},
	components: {
		YzsDetailPage,
		Layout,
		Headerlevel2,
		List,
	}
}
</script>
<style lang="scss">
.searchPage {
    flex: 1;

    .wukai {
        overflow: auto;
        position: absolute;
        top: 0.9rem;
        bottom: 0;
        width: 100%;
        .listItem {
            margin-bottom: 0.2rem;
            padding: 0.2rem 0.2rem 0.2rem 0.6rem;
            background: url("../assets/yzsList.png") #fff 0.15rem 0.3rem no-repeat;
            background-size: 0.31rem;
            span {
                display: block;
                color: #666;
                font-size: 0.26rem;
                &.name {
                    color: #333;
                    font-size: 0.3rem;
                }
            }
        }
    }
}
.linesePopup {
    width: 100%;
    height: 100%;
}
</style>
