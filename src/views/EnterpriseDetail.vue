<template>
	<div class="main">
		<!-- 企业信息导航栏 -->
		<enterprise-info-hd-bar />
		<!-- 企业信息导航栏 end -->

		<!-- banner -->
		<enterprise-info-banner />
		<!-- banner end -->

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<!-- 企业信息面板 -->
				<div class="entInfoPanel fColumn">
					<!-- 企业信息面板 头部 -->
					<div class="panelHd fRow">
						<div class="time fRow">
							<img src="../assets/time.png" />
							<span>{{ currentTime }}</span>
						</div>
						<div class="enterprise fRow">
							<img src="../assets/employee.png" />
							<span>{{ entInfo.entName }}</span>
						</div>
						<div class="quit fRow hover" @click="quit()">
							<img src="../assets/quit.png" />
							<span>退出登录</span>
						</div>
					</div>
					<!-- 企业信息面板 头部 end -->

					<!-- 企业信息面板 主体 -->
					<div class="panelBd fRow">
						<!-- 企业详情侧边栏 -->
						<enterprise-dtl-sidebar />
						<!-- 企业详情侧边栏 end -->

						<!-- 企业详情主栏 -->
						<router-view />
						<!-- 企业详情主栏 end -->
					</div>
					<!-- 企业信息面板 主体 end -->
				</div>
				<!-- 企业信息面板 end -->
			</div>
		</div>
		<!-- 主体 end -->

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EnterpriseDetail',
	components: {
		EnterpriseInfoHdBar: () => import('../components/EnterpriseInfoHdBar.vue'), //企业信息导航栏
		EnterpriseInfoBanner: () => import('../components/EnterpriseInfoBanner.vue'), //企业信息banner
		EnterpriseDtlSidebar: () => import('../components/EnterpriseDtlSidebar.vue'), //企业详情侧边栏
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue') //企业信息底部栏
	},
	data: function() {
		return {
			currentTime: '' //当前日期
		};
	},
	computed: {
		...mapState({
			entInfo: state => state.entInfo //企业信息
		})
	},
	methods: {
		// 获取当前时间
		getCurrentTime() {
			let date = new Date();
			this.currentTime = date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1) + '月' + date.getDate() + '日';
			this.yesteryear = date.getFullYear() - 1;
		},
		// 退出登录
		quit() {
			this.$store.dispatch('isLogin', false); //登录状态
			this.$store.dispatch('registerProvince', ''); //省份

			this.$message({
				message: '已退出登录',
				type: 'success'
			});

			this.$router.push({
				path: '/'
			});
		}
	},
	mounted() {
		// 获取当前时间
		this.getCurrentTime();
	}
};
</script>

<style lang="scss" scoped>
// 主体
.bd {
	flex: 1;
	min-width: 1200px;
	min-height: 800px;
	background-color: #fbf8ef;
	// 企业信息面板
	.entInfoPanel {
		margin: 20px 0 50px;
		min-width: 1200px;
		// 企业信息面板 头部
		.panelHd {
			position: relative;
			top: -20px;
			justify-content: flex-start;
			padding: 10px 150px 10px 20px;
			width: 100%;
			color: #fff;
			font-size: 12px;
			background-color: #d1ab5b;
			border-radius: 4px;
			box-shadow: 0 1px 3px #ccc;
			.time {
				user-select: none;
				img {
					margin: 0 10px;
					width: 20px;
					height: 20px;
				}
			}
			.enterprise {
				user-select: none;
				margin-left: 50px;
				img {
					margin: 0 8px;
					width: 19px;
					height: 21px;
				}
			}
			.quit {
				margin-left: auto;
				user-select: none;
				img {
					margin: 0 10px;
					width: 20px;
					height: 22px;
				}
			}
		}
		// 企业信息面板 头部 end
		// 企业信息面板 主体
		.panelBd {
			justify-content: space-between;
			align-items: flex-start;
			width: 100%;
		}
		// 企业信息面板 主体 end
	}
	// 企业信息面板 end
}
// 主体 end
</style>
