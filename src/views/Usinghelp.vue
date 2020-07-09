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
			<div class="usinghelp fColumn">
				<div class="titleBox">
					<div class="titleText">使用帮助</div>
					<div class="back hover" @click="back()">返回</div>
				</div>

				<div class="contentBox fColumn">
					<div class="title">网站使用须知</div>
					<p class="subtitle">一、公示依据</p>
					<p class="doc">本系统信息公示依据《中华人民共和国政府信息公开条例》、《企业信息公示暂行条例》等法律法规、规章的有关规定。</p>
					<p class="subtitle">二、系统功能简介</p>
					<p class="doc">本系统提供全国企业、农民专业合作社、个体工商户等市场主体信用信息的填报、公示和查询服务。</p>
					<p class="doc">
						1、查询市场主体信用信息，输入名称或注册号进行查询。系统支持按名称的关键词模糊查询，一次最多显示50条记录。对于无效的查询条件，将不会显示查询结果。
					</p>
					<p class="doc">2、市场主体填报年度报告和其他信息，通过本系统，点击“企业信息填报”进行填报。</p>
					<p class="subtitle">三、信息说明</p>
					<p class="doc">1、本系统公示的信息来自工商行政管理部门、其他政府部门及市场主体，政府部门和市场主体分别对其公示信息的真实性负责。</p>
					<p class="doc">2、本系统使用过程中如有问题，可拨打市场主体所在省、自治区、直辖市企业信用信息公示系统主页下方的业务咨询电话或技术支持电话。</p>
					<p class="subtitle">四、使用说明</p>
					<p class="doc">本系统使用说明请点击以下网址</p>
					<p class="link hover">http://home.sdaic.gov.cn/eportal/ui?pageId=458878&articleKey=922214&columnId=666431</p>
					<p class="doc">本系统视频教程请点击以下网址</p>
					<p class="link hover">http://home.sdaic.gov.cn/eportal/ui?pageId=458878&articleKey=702108&columnId=666431</p>
					<p class="doc">企业年报中增加社保和统计事项的填写说明</p>
					<p class="link hover">http://home.sdaic.gov.cn/eportal/ui?pageId=458878&articleKey=921083&columnId=666332</p>
				</div>
			</div>
		</div>
		<!-- 主体 end -->

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->
	</div>
</template>

<script>
export default {
	name: 'Usinghelp',
	components: {
		EnterpriseInfoHdBar: () => import('../components/EnterpriseInfoHdBar.vue'), //企业信息导航栏
		EnterpriseInfoBanner: () => import('../components/EnterpriseInfoBanner.vue'), //企业信息banner
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue') //企业信息底部栏
	},
	methods: {
		// 返回按钮
		back() {
			this.$router.go(-1);
		}
	}
};
</script>

<style lang="scss" scoped>
// 主体
.bd {
	flex: 1;
	min-width: 1200px;
	background-color: #fbf8ef;
	.usinghelp {
		margin: 50px auto;
		width: 1200px;
		min-width: 1200px;
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0 1px 3px #ccc;
		.titleBox {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 50px;
			background-color: #d1a961;
			.titleText {
				align-self: flex-end;
				margin-left: 25px;
				width: 120px;
				height: 30px;
				line-height: 30px;
				color: #996726;
				text-align: center;
				background-color: #fff;
				border-radius: 4px 4px 0 0;
			}
			.back {
				align-self: center;
				margin-right: 25px;
				width: 84px;
				height: 32px;
				line-height: 32px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				background-color: #ecc276;
				border-radius: 5px;
			}
		}
		.contentBox {
			padding: 10px 100px 30px;
			color: #333;
			font-size: 14px;
			background-color: #fff;
			.title {
				margin: 10px 0;
				font-size: 30px;
			}
			.subtitle {
				margin: 5px auto 5px 0;
				color: #996726;
				font-size: 16px;
				font-weight: bold;
			}
			.doc {
				margin: 5px auto 5px 0;
				text-indent: 50px;
			}
			.link {
				margin: 2px auto 2px 0;
				color: #0094ff;
				text-indent: 100px;
			}
		}
	}
}
</style>
