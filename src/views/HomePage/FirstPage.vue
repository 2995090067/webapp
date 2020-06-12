<template>
<div class="firstPage">
	<Header>
		<template slot="right">
			<!-- <div class="right">
				<router-link class="search" :to="{name: 'Search'}">
					<van-icon size="20px" name="search" />
				</router-link>
			</div> -->
		</template>
	</Header>
	<van-pull-refresh v-model="lastNews.refresh" @refresh="onRefresh">
		<HomeBanner></HomeBanner>
		<ul class="mainNav nineLayout">
			<li>
				<router-link :to="{name: 'ListPage', params: {id: 75}}"><span></span>信用动态</router-link>
			</li>
			<li>
				<router-link :to="{name: 'ListPage', params: {id: 94}}"><span></span>政策法规</router-link>
			</li>
			<li>
				<router-link :to="{name: 'YzsPage', params: {id: 'yzs'}}"><span></span>一站式查询</router-link>
			</li>
			<li>
				<router-link :to="{name: 'XygsListPage', params: {id: 'xygs'}}"><span></span>信用公示</router-link>
			</li>
			<li>
				<router-link :to="{name: 'XygsListPage', params: {id: 'hhmd'}}"><span></span>红黑名单</router-link>
			</li>
			<li>
				<router-link :to="{name: 'ListPageNoTab', params: {id: 144}}"><span></span>信用承诺</router-link>
			</li>
			<!-- <li v-for="item in this.$store.state.nav" :key="item.channelIds">
				<router-link v-if="item.channelIds == 'xygs' || item.channelIds == 'hhmd'" :to="{name: 'XygsListPage', params: {id: item.channelIds}}"><span></span>{{item.title}}</router-link>

				<router-link v-else-if="item.channelIds == 'yzs'" :to="{name: 'YzsPage', params: {id: item.channelIds}}"><span></span>{{item.title}}</router-link>

				<router-link v-else-if="item.child" :to="{name: 'ListPage', params: {id: item.channelIds}}"><span></span>{{item.title}}</router-link>

				<router-link v-else :to="{name: 'ListPageNoTab', params: {id: item.channelIds}}"><span></span>{{item.title}}</router-link>
			</li> -->
		</ul>

		<h4 class="commonTitle">
			<span>信用热点</span>
		</h4>
		<GetListData class="customList" listName="lastNews" ref="lastNews" url="/api/content/list.jspx" :payload="lastNews" :done="lastNewsDone">
			<template slot-scope="slotProps">
				<router-link :to="{name: 'ListDetailPage', params: {id: item.id},query:{url:filterArticleUrl(item.url)}}" class="news van-hairline--top" v-for="item in slotProps.data" :key="item.id">
					<img v-if="item.typeImg" :src="item.typeImg">
					<div>
						<h5>{{ item.title }}</h5>
						<span>{{ item.releaseDate | dateFormat('yyyy-MM-dd')}}</span>
					</div>
				</router-link>
			</template>
		</GetListData>
	</van-pull-refresh>
</div>
</template>

<script>
import Util from '../../libs/util'
import Header from '../../components/Header'
import HomeBanner from '../../components/Banner'
import GetListData from '../../components/GetListData'

export default {
	data() {
		return {
			lastNews: {
				refresh: false,
				params: {
					siteIds: 1,
					titleImg: 0,
					first: 0,
					count: 5
				}
			}
		}
	},
	methods: {
		lastNewsDone() {
			this.lastNews.refresh = false
		},
		onRefresh() {
			let _this = this
			this.$refs['lastNews'].request()
		},
		filterArticleUrl(url) {
			let aa = Util.findSign.checkSign(url)
			let piex = url.substring(0, aa[2])
			let piex1 = url.substring(aa[2], url.length)
			// console.log(piex + '/wap' + piex1);
			return piex + '/wap' + piex1
		}
		// filterListImg(imgSrc) {
		// 	// console.log(imgSrc);
		// 	if (process.env.NODE_ENV == 'development') {
		// 		imgSrc = imgSrc.replace('http://localhost:8080', 'http://221.226.147.58:94')
		// 	} else {
		// 		imgSrc = imgSrc.replace('http://localhost:8080', '')
		// 	}
		//
		// 	return imgSrc
		// }
	},
	mounted: function() {
		// console.log();
	},
	components: {
		Header,
		HomeBanner,
		GetListData
	}
}
</script>
<style scoped lang="scss">
.firstPage {
    overflow: auto;
    // padding-bottom: 1.15rem;
    background: #fff;
    .mainNav {
        padding: 0.35rem 0.25rem;
        border-bottom: 0.1rem solid #fcfcfc;

        li {
            padding-top: 22%;
            a {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                // border: 1px solid #ccc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 0.24rem;
                // background-color: #ccc;
                span {
                    display: block;
                    width: 0.9rem;
                    height: 0.9rem;
                    background: url("../../assets/navIco.png") no-repeat;
                    background-size: 100%;
                }
            }
            &:nth-child(2) {
                a {
                    span {
                        background-position: 0 20%;
                    }
                }
            }
            &:nth-child(3) {
                a {
                    span {
                        background-position: 0 40%;
                    }
                }
            }
            &:nth-child(4) {
                a {
                    span {
                        background-position: 0 60%;
                    }
                }
            }
            &:nth-child(5) {
                a {
                    span {
                        background-position: 0 80%;
                    }
                }
            }
            &:nth-child(6) {
                a {
                    span {
                        background-position: 0 100%;
                    }
                }
            }
        }
    }

    .customList {
        margin: 0;
        height: auto;
        min-height: 5rem;
        .news {
            // overflow: auto;
            display: flex;
            margin-bottom: 0.15rem;
            padding-top: 0.15rem;

            img {
                width: 2.35rem;
                height: 1.5rem;
            }
            div {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 0.15rem;
                font-size: 0.2rem;
                h5 {
                    flex: 1;
                    font-size: 0.26rem;
                }
                span {
                    align-self: flex-end;
                    color: #999;
                }
            }
        }
    }
}
</style>
