<template>
	<div class="main">
		<!-- 网站头部装饰线 -->
		<div class="headLine"></div>
		<!-- 网站头部装饰线 end -->

		<!-- banner -->
		<div class="banner fRow">
			<div class="container fColumn">
				<img src="../assets/Simuwu-cauldron.png" class="simuwu" />
				<img src="../assets/national-emblem.png" class="nationalEmblem" />
			</div>
		</div>
		<!-- banner end -->

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<div class="infoTitltBox fRow">
					<div class="hover">企业信用信息</div>
					<div class="hover">经营异常名录</div>
					<div class="hover">严重违法失信企业名单</div>
				</div>

				<div class="searchBar fRow">
					<img src="../assets/magnifying-glass.png" class="magnifyingGlass" />
					<input type="text" placeholder="请输入企业名称、统一社会信用代码或注册号" readonly class="search" />
					<div class="searchBtn fRow hover" @click="query()">查询</div>
				</div>

				<div class="hotSearch fRow">
					<div class="title">热搜榜：</div>
					<div class="info fRow">
						<span class="hover">新玖商业发展有限公司龙湖U城9组团店</span>
						<span class="hover">日照市融鑫商务服务合伙企业（有限合伙）（19年9月2日法院冻结山钢瀚信基金股权）</span>
						<span class="hover">辽阳县首山镇顺冠鑫大冷面店</span>
					</div>
					<div class="more hover">更多</div>
				</div>

				<div class="serveBox fRow">
					<div class="serveItem fColumn hover">
						<img src="../assets/info.png" class="serveImg" />
						<img src="../assets/info-selected.png" class="serveImgS" />
						<div class="info">信息公告</div>
					</div>
					<div class="serveItem fColumn hover" @click="entInfoFill()">
						<img src="../assets/pen.png" class="serveImg" />
						<img src="../assets/pen-selected.png" class="serveImgS" />
						<div class="info">企业信息填报</div>
					</div>
					<div class="serveItem fColumn hover">
						<img src="../assets/menu.png" class="serveImg" />
						<img src="../assets/menu-selected.png" class="serveImgS" />
						<div class="info">小微企业名录</div>
					</div>
					<div class="serveItem fColumn hover">
						<img src="../assets/trumpet.png" class="serveImg" />
						<img src="../assets/trumpet-selected.png" class="serveImgS" />
						<div class="info">使用帮助</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 主体 end -->

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->

		<!-- 提醒弹框 -->
		<removable-box ref="reBox" :width="400" v-show="isReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>查询</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="fColumn">
					<div class="doc">
						<span>此为国家企业信用信息公示系统</span>
						<strong>练习系统</strong>
					</div>
					<div class="doc">点击下方“确定”按钮跳转至官网查询</div>
				</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="reBoxSure()">确定</div>
			</template>
		</removable-box>
		<!-- 提醒弹框 end -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Index',
	components: {
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue'), //企业信息底部栏
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			isReBoxShow: false //提醒弹框 显示
		};
	},
	computed: {
		...mapState({
			isLogin: state => state.isLogin, //登录状态
			province: state => state.registerProvince //省份
		})
	},
	methods: {
		// 查询按钮
		query() {
			this.isReBoxShow = true;
		},
		// 关闭 提醒弹框
		closeReBox() {
			this.isReBoxShow = false;
		},
		// 提醒弹框 确定按钮
		reBoxSure() {
			// 跳转 国家企业信用信息公示系统
			window.open('http://www.gsxt.gov.cn');

			this.isReBoxShow = false;
		},
		// 企业信息填报 链接
		entInfoFill() {
			if (!this.isLogin) {
				//未登录 跳转 选择登记机关所在地页面
				this.$router.push({
					path: '/registerLocation'
				});
			} else {
				//已登录 跳转 企业信息填报页面
				this.$router.push({
					path: '/enterpriseInfoFill/' + this.province
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
// banner
.banner {
	min-width: 1200px;
	height: 340px;
	background: url('../assets/index-bg.png') center/cover no-repeat;
	user-select: none;
	.simuwu {
		align-self: flex-end;
		margin: 0 0 -40px 0;
	}
	.nationalEmblem {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
// 主体
.bd {
	flex: 1;
	margin-top: -60px;
	font-size: 14px;
	.infoTitltBox {
		justify-content: space-between;
		width: 500px;
	}
	.searchBar {
		justify-content: flex-start;
		margin: 20px 0 10px;
		min-width: 690px;
		height: 60px;
		background: url('../assets/search-bg.png') center/cover no-repeat;
		.magnifyingGlass {
			margin: 0 20px;
		}
		.search {
			width: 470px;
			height: 40px;
			background-color: transparent;
			border: none;
			&:focus {
				outline: none;
			}
		}
		.searchBtn {
			margin-left: auto;
			width: 130px;
			color: #fff;
			font-size: 20px;
			letter-spacing: 10px;
		}
	}
	.hotSearch {
		justify-content: space-between;
		min-width: 600px;
		.title {
			color: #f00;
		}
		.info {
			justify-content: space-between;
			min-width: 500px;
			span {
				max-width: 160px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.more {
			color: #f00;
			font-weight: 600;
		}
	}
	.serveBox {
		justify-content: space-between;
		margin: 100px 0;
		min-width: 760px;
		.serveItem {
			width: 25%;
			&:hover > .serveImg {
				display: none;
			}
			&:hover > .serveImgS {
				display: block;
			}
			.serveImg,
			.serveImgS {
				width: 80px;
				height: 80px;
			}
			.serveImgS {
				display: none;
			}
			.info {
				margin: 20px 0;
				color: #333;
				font-size: 16px;
			}
		}
	}
}
</style>
