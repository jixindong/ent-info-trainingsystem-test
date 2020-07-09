<template>
	<div class="entInfoHdBar">
		<div class="container fRow">
			<router-link to="/" class="navigation fRow hover">
				<img src="../assets/monitor.png" />
				<span>首页</span>
			</router-link>
			<div class="navigation fRow hover" @click="toEnterpriseInfoFill()">
				<img src="../assets/Pen2.png" />
				<span>企业信息填报</span>
			</div>
			<div class="navigation fRow hover">
				<img src="../assets/document.png" />
				<span>信息公告</span>
			</div>
			<router-link to="/usinghelp" class="navigation fRow hover">
				<img src="../assets/trumpet2.png" />
				<span>使用帮助</span>
			</router-link>

			<div class="navigationII hover">导航</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EnterpriseInfoHdBar',
	computed: {
		...mapState({
			province: state => state.registerProvince //省份
		})
	},
	methods: {
		// 跳转 企业信息填报页面
		toEnterpriseInfoFill() {
			this.$router.push({
				path: '/enterpriseInfoFill/' + this.province
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.entInfoHdBar {
	min-width: 1200px;
	height: 60px;
	background-color: #ab812d;
	.container {
		justify-content: flex-start;
		.navigation {
			padding: 0 50px;
			height: 60px;
			color: #fff;
			border-left: 1px solid #9c7320;
			&:nth-child(4) {
				border-right: 1px solid #9c7320;
			}
			img {
				margin: 0 10px;
				width: 26px;
				height: 26px;
			}
		}
		.navigationII {
			margin-left: auto;
			color: #fff;
		}
	}
}
</style>
