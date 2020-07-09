<template>
	<div class="main">
		<!-- 网站头部装饰线 -->
		<div class="headLine"></div>

		<!-- banner -->
		<div class="banner fRow">
			<div class="container fRow"><img src="../assets/national-emblem.png" /></div>
		</div>

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<div class="chooseRegisterLocation fColumn">
					<div class="crlHd fRow">
						<div class="title">请选择登记机关所在地</div>
						<router-link to="/" class="back hover">返回首页</router-link>
					</div>
					<div class="crlBd fColumn">
						<div class="row fRow" v-for="(item, index) in location" :key="index">
							<div class="classifyName">{{ item.classifyName }}</div>
							<div class="province hover" v-for="(item, index) in item.classifyProvince" :key="index" @click="clickProvince(item)">{{ item }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->
	</div>
</template>

<script>
export default {
	name: 'RegisterLocation',
	components: {
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue') //企业信息底部栏
	},
	data: function() {
		return {
			location: [
				{
					classifyName: '华北',
					classifyProvince: ['北京', '天津', '河北', '山西', '内蒙古']
				},
				{
					classifyName: '东北',
					classifyProvince: ['辽宁', '吉林', '黑龙江']
				},
				{
					classifyName: '华东',
					classifyProvince: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东']
				},
				{
					classifyName: '华南',
					classifyProvince: ['广东', '广西', '海南']
				},
				{
					classifyName: '华中',
					classifyProvince: ['河南', '湖北', '湖南']
				},
				{
					classifyName: '西南',
					classifyProvince: ['重庆', '四川', '贵州', '云南', '西藏']
				},
				{
					classifyName: '西北',
					classifyProvince: ['陕西', '甘肃', '青海', '宁夏', '新疆']
				}
			]
		};
	},
	methods: {
		// 选择登记机关所在地
		clickProvince(pr) {
			this.$router.push({ path: '/enterpriseLogin/' + pr });
		}
	}
};
</script>

<style lang="scss" scoped>
// banner
.banner {
	min-width: 1200px;
	height: 108px;
	background: url('../assets/index-bg2.png') center/cover no-repeat;
	box-shadow: 0 1px 3px #ccc;
	z-index: 1;
	user-select: none;
	.container {
		justify-content: flex-start;
		img {
			width: 540px;
		}
	}
}
// 主体
.bd {
	flex: 1;
	min-width: 1200px;
	background-color: #fbf8ef;
	.chooseRegisterLocation {
		margin: 70px 0;
		width: 930px;
		min-width: 930px;
		overflow: hidden;
		border-radius: 5px;
		box-shadow: 0 1px 3px #ccc;
		.crlHd {
			justify-content: space-between;
			padding: 12px 24px;
			width: 100%;
			background-color: #ab812d;
			.title {
				position: relative;
				color: #fff;
				font-size: 18px;
				letter-spacing: 2px;
				user-select: none;
				&::before {
					position: absolute;
					top: 6px;
					left: -15px;
					width: 0;
					height: 0;
					content: '';
					border-top: 6px solid transparent;
					border-bottom: 6px solid transparent;
					border-left: 6px solid #fff;
				}
			}
			.back {
				padding: 6px 14px;
				color: #fff;
				font-size: 14px;
				background-color: #d1ab62;
				border-radius: 5px;
			}
		}
		.crlBd {
			align-items: flex-start;
			padding: 60px 0;
			width: 100%;
			font-size: 14px;
			background-color: #fff;
			.row {
				margin: 5px 0 5px 200px;
				.classifyName {
					position: relative;
					margin-right: 40px;
					color: #ab812d;
					font-weight: 600;
					user-select: none;
					&::after {
						position: absolute;
						top: 4px;
						right: -20px;
						width: 1px;
						height: 15px;
						content: '';
						background-color: #000;
					}
				}
				.province {
					margin: 0 2px;
					padding: 3px 10px;
					border-radius: 4px;
					transition: color 0.3s, background-color 0.3s;
					&:hover {
						color: #fff;
						background-color: #ab812d;
					}
				}
			}
		}
	}
}
</style>
