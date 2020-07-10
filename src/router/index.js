// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 VueRouter
import Vue from "vue";
import VueRouter from "vue-router";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error);
};

// 调用 VueRouter
Vue.use(VueRouter);

// 2. 创建 router 实例，配置 `routes`
const router = new VueRouter({
	mode: 'history',
	routes: [
		// 首页
		{
			path: '/',
			component: () => import('@/views/index'),
			meta: {
				title: '国家企业信用信息公示系统',
				favicon: require('@/assets/favicon.png')
			}
		},
		// 选择登记机关所在地页面
		{
			path: '/registerLocation',
			component: () => import('@/views/RegisterLocation'),
			meta: {
				title: '选择登记机关所在地'
			}
		},
		// 企业登录页面
		{
			path: '/enterpriseLogin/:pr',
			component: () => import('@/views/EnterpriseLogin'),
			meta: {
				title: '企业登录'
			}
		},
		// 工商联络员注册页面
		{
			path: '/liaisonmanRegister/:pr',
			component: () => import('@/views/liaisonman/LiaisonmanRegister'),
			meta: {
				title: '工商联络员注册'
			}
		},
		// 工商联络员变更页面
		{
			path: '/liaisonmanModify/:pr',
			component: () => import('@/views/liaisonman/LiaisonmanModify'),
			meta: {
				title: '工商联络员变更'
			}
		},
		// 企业信息填报页面
		{
			path: '/enterpriseInfoFill/:pr',
			component: () => import('@/views/EnterpriseInfoFill'),
			meta: {
				title: '企业信息填报'
			}
		},
		// 企业详情页面
		{
			path: '/enterpriseDetail',
			redirect: '/enterpriseDetail/enterpriseBasicInfo',
			component: () => import('@/views/enterpriseDetail/EnterpriseDetail'),
			children: [
				// 企业基本信息
				{
					path: '/enterpriseDetail/enterpriseBasicInfo',
					component: () => import('@/views/enterpriseDetail/components/EnterpriseBasicInfo')
				},
				// 股东及出资信息
				{
					path: '/enterpriseDetail/shareholderInfo',
					component: () => import('@/views/enterpriseDetail/components/ShareholderInfo')
				},
				// 网站或网店信息
				{
					path: '/enterpriseDetail/websiteInfo',
					component: () => import('@/views/enterpriseDetail/components/WebsiteInfo')
				},
				// 股权变更信息
				{
					path: '/enterpriseDetail/equityAlterInfo',
					component: () => import('@/views/enterpriseDetail/components/EquityAlterInfo')
				},
				// 对外投资信息
				{
					path: '/enterpriseDetail/externalInvestInfo',
					component: () => import('@/views/enterpriseDetail/components/ExternalInvestInfo')
				},
				// 资产状况信息
				{
					path: '/enterpriseDetail/financialStandingInfo',
					component: () => import('@/views/enterpriseDetail/components/FinancialStandingInfo')
				},
				// 对外担保信息
				{
					path: '/enterpriseDetail/externalEnsureInfo',
					component: () => import('@/views/enterpriseDetail/components/ExternalEnsureInfo')
				},
				// 党建信息
				{
					path: '/enterpriseDetail/partyBuildingInfo',
					component: () => import('@/views/enterpriseDetail/components/PartyBuildingInfo')
				},
				// 团建信息
				{
					path: '/enterpriseDetail/leagueConstructionInfo',
					component: () => import('@/views/enterpriseDetail/components/LeagueConstructionInfo')
				},
				// 社保信息
				{
					path: '/enterpriseDetail/socialSecurityInfo',
					component: () => import('@/views/enterpriseDetail/components/SocialSecurityInfo')
				},
				// 特种设备信息
				{
					path: '/enterpriseDetail/equipmentInfo',
					component: () => import('@/views/enterpriseDetail/components/EquipmentInfo')
				}
			]
		},
		// 预览公示页面
		{
			path: '/previewPublicity/:year',
			component: () => import('@/views/PreviewPublicity'),
			meta: {
				title: '预览公示'
			}
		},
		// 使用帮助页面
		{
			path: '/usinghelp',
			component: () => import('@/views/Usinghelp'),
			meta: {
				title: '使用帮助'
			}
		},
		// 404页面
		{
			path: '*',
			component: () => import('@/views/Error'),
			meta: {
				title: '404',
				favicon: require('@/assets/404.png')
			}
		}
	]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 设置 title
	if (to.meta.title) {
		document.title = to.meta.title;
	} else {
		document.title = '国家企业信用信息公示系统';
	}

	// 设置 favicon
	if (to.meta.favicon) {
		let favicon = document.querySelector('link[rel="icon"]');
		favicon.href = to.meta.favicon;
	}

	next();
});

// 全局后置钩子
router.afterEach(() => {
	window.scrollTo(0, 0);
});

// 3. 抛出 router 实例
export default router;
