import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

// 调用 Vuex
Vue.use(Vuex);

// 2. 创建 Vuex 实例
const store = new Vuex.Store({
	state: {
		yesteryear: '', //去年
		isLogin: false, //登录状态
		registerProvince: '', //省份
		users: [{
			entName: '江苏问云电子商务有限公司', //企业名称
			entCode: '91320903755666003E', //企业统一社会信用代码
			legalpersonName: '王鑫', //法定代表人（负责人）姓名
			legalpersonIdNum: '320000199003172612', //法定代表人（负责人）证件号码
			entPersonName: '王鑫', //工商联络员姓名
			entPersonIdType: '中华人民共和国居民身份证', //工商联络员证件类型
			entPersonIdNum: '320000199003172612', //工商联络员证件号码
			entPersonTel: '025-85236974' //工商联络员手机号
		}], //工商联络员
		annualReports: [{
			year: '2018', //报告年份
			lastModifiedDate: '2019年3月20日', //最后修改日期
			state: '已公示', //状态
			publicityDate: '2019年3月21日', //公示日期
			editable: 0, //是否可编辑
			entInfo: {
				entName: '江苏问云电子商务有限公司', //企业名称
				entCode: '91320903755666003E', //统一社会信用代码/注册号	
				entAddress: '江苏省南京市经济开发区胜太路88号', //企业通信地址
				entPostalCode: '210038', //邮政编码
				entTel: '025-85236974', //企业联系电话
				entEmail: '1354569969@163.com', //电子邮箱
				entBusiness: '家用电器、日用百货、办公用品、工艺礼品、电脑配件的销售等。', //企业主营业务活动
				entEmployee: '100', //从业人数
				entEmployeePub: '不公示', //从业人数 公示不公示
				entFEmployee: '30', //其中女性从业人数
				entFEmployeePub: '不公示', //其中女性从业人数 公示不公示
				entRunState: '开业', //企业经营状态 开业、歇业、清算
				entHoldingState: '2', //企业控股情况 国有控股、集体控股、私人控股、港澳台商控股、外商控股
				entUniversityErNum: '20', //其中高校毕业生人数 经营者
				entUniversityEeNum: '70', //其中高校毕业生人数 雇员
				entReSoldierErNum: '0', //其中退役士兵人数 经营者
				entReSoldierEeNum: '10', //其中退役士兵人数 雇员
				entDisabledErNum: '0', //其中残疾人人数 经营者
				entDisabledEeNum: '0', //其中残疾人人数 雇员
				entReEmploymentErNum: '0', //其中失业人员再就业人数 经营者
				entReEmploymentEeNum: '0', //其中失业人员再就业人数 雇员
				isExSecurity: '否', //是否有对外担保
				isHaveWeb: '否', //是否有网站或网店
				isStockTransfer: '否', //有限责任公司本年度是否发生股东股权转让
				isInvestOther: '否' //是否有投资信息或购买其他公司股权
			}, //企业信息
			shareholderFund: [{
					gd: '王鑫',
					rje: '70',
					rjsj: '2018年01月10日',
					rjfs: '货币',
					sje: '70',
					sjsj: '2018年01月10日',
					sjfs: '货币'
				},
				{
					gd: '李德华',
					rje: '30',
					rjsj: '2018年01月10日',
					rjfs: '货币',
					sje: '30',
					sjsj: '2018年01月10日',
					sjfs: '货币'
				}
			], //股东及出资
			websiteOlStore: [{
				type: '网站',
				name: '问云会计网校',
				url: 'www.baidu.com'
			}], //网站或网店
			equityAlter: [{
				gd: '张三',
				bgq: '50%',
				bgh: '60%',
				bgrq: '2020年5月26日'
			}], //股权变更
			externalInvest: [{
				entName: '问云软件科技有限公司',
				entCode: '91320903755666003E'
			}], //对外投资
			financialStanding: {
				assetSum: '5550.47', //资产总额
				assetSumPub: '不公示', //资产总额 公示不公示
				ownerRightSum: '4200.15', //所有者权益合计
				ownerRightSumPub: '不公示', //所有者权益合计 公示不公示
				debtSum: '1271.00', //负债总额
				debtSumPub: '不公示', //负债总额 公示不公示
				incomeSum: '4873.99', //营业总收入
				incomeSumPub: '不公示', //营业总收入 公示不公示
				mainBizIncomeSum: '4680.00', //其中主营业务收入
				mainBizIncomeSumPub: '不公示', //其中主营业务收入 公示不公示
				profitSum: '1274.65', //利润总额
				profitSumPub: '不公示', //利润总额 公示不公示
				retainedProfitsSum: '955.99', //净利润
				retainedProfitsSumPub: '不公示', //净利润 公示不公示
				payTaxesSum: '169.76', //纳税总额
				payTaxesSumPub: '不公示' //纳税总额 公示不公示
			}, //资产状况
			externalEnsure: [{
				zqr: '张三',
				zwr: '李四',
				zqzzl: '其他',
				zqzse: '5000',
				zwqxq: '2020年1月26日',
				zwqxz: '2020年5月26日',
				bzqj: '未约定',
				bzfs: '未约定',
				gszt: '公示'
			}], //对外担保
			partyBuilding: {
				pMNum: '15', //中共党员（包括预备党员）人数
				pOS: '党支部', //党组织拟建制情况
				isPrincipalPM: '是', //负责人是否党员
				isPrincipalPOS: '否' //负责人是否党组织书记
			}, //党建
			leagueConstruction: {
				isEstblOL: '建立团组织', //是否建立团组织
				oMNum: '30', //团员人数（含预备团员）
				youthNum: '20', //青年人数
				// 建立团组织
				eOLPrincipalName: '张三', //团组织负责人姓名
				eOLPrincipalGender: '男', //性别
				eOfficePhone: '0533-2652536', //办公电话
				eCellphone: '13510010010', //手机
				eOLCharge: '工商局/非公团工委', //团组织主管/隶属单位
				eOLOS: '团支部', //团组织建制情况
				eOLBuildMode: '单独组建', //团组织组建方式
				eOLBuildDate: '2001年1月20日', //团组织组建时间
				// 未建立团组织
				uneOLOS: '', //团组织拟建制情况
				uneOLBuildMode: '' //团组织拟组建方式
			}, //团建
			socialSecurity: {
				czylx: '1', //城镇职工基本养老保险（单位：人）
				syex: '1', //失业保险（单位：人）
				zylx: '1', //职工基本医疗保险（单位：人）
				gsx: '1', //工伤保险（单位：人）
				syux: '1', //生育保险（单位：人）
				// 单位缴费基数
				djfjsgs: '选择不公示', //单位缴费基数 公示不公示
				dczylxjs: '1', //单位参加城镇职工基本养老保险缴费基数
				dsyexjs: '1', //单位参加失业保险缴费基数
				dzylxjs: '1', //单位参加职工基本医疗保险缴费基数
				dsyuxjs: '1', //单位参加生育保险缴费基数
				// 本期实际缴费金额
				bqsjjfgs: '选择公示', //本期实际缴费金额 公示不公示
				czylxbqsjjf: '1', //参加城镇职工基本养老保险本期实际缴费金额
				syexbqsjjf: '1', //参加失业保险本期实际缴费金额
				zylxbqsjjf: '1', //参加职工基本医疗保险本期实际缴费金额
				gsxbqsjjf: '1', //参加工伤保险本期实际缴费金额
				syuxbqsjjf: '1', //参加生育保险本期实际缴费金额
				// 单位累计欠缴金额
				dqjgs: '选择不公示', //单位累计欠缴金额 公示不公示
				dczylxqj: '1', //单位参加城镇职工基本养老保险累计欠缴金额
				dsyexqj: '1', //单位参加失业保险累计欠缴金额
				dzylxqj: '1', //单位参加职工基本医疗保险累计欠缴金额
				dgsxqj: '1', //单位参加工伤保险累计欠缴金额
				dsyuxqj: '1' //单位参加生育保险累计欠缴金额
			}, //社保
			specialEquipment: {
				bldjsb: '10', //办理使用登记特种设备总台数
				zjyxsb: '10' //检验有效期内特种设备总台数
			} //特种设备
		}], //年度报告

		// ------------------------ 填写信息 ------------------------
		entInfo: {
			entName: '', //企业名称
			entCode: '', //统一社会信用代码/注册号	
			entAddress: '', //企业通信地址
			entPostalCode: '', //邮政编码
			entTel: '', //企业联系电话
			entEmail: '', //电子邮箱
			entBusiness: '', //企业主营业务活动
			entEmployee: '', //从业人数
			entEmployeePub: '不公示', //从业人数 公示不公示
			entFEmployee: '', //其中女性从业人数
			entFEmployeePub: '不公示', //其中女性从业人数 公示不公示
			entRunState: '开业', //企业经营状态 开业、歇业、清算
			entHoldingState: '0', //企业控股情况 国有控股、集体控股、私人控股、港澳台商控股、外商控股
			entUniversityErNum: '', //其中高校毕业生人数 经营者
			entUniversityEeNum: '', //其中高校毕业生人数 雇员
			entReSoldierErNum: '', //其中退役士兵人数 经营者
			entReSoldierEeNum: '', //其中退役士兵人数 雇员
			entDisabledErNum: '', //其中残疾人人数 经营者
			entDisabledEeNum: '', //其中残疾人人数 雇员
			entReEmploymentErNum: '', //其中失业人员再就业人数 经营者
			entReEmploymentEeNum: '', //其中失业人员再就业人数 雇员
			isExSecurity: '否', //是否有对外担保
			isHaveWeb: '否', //是否有网站或网店
			isStockTransfer: '否', //有限责任公司本年度是否发生股东股权转让
			isInvestOther: '否' //是否有投资信息或购买其他公司股权
		}, //企业信息
		shareholderFund: [], //股东及出资
		websiteOlStore: [], //网站或网店
		equityAlter: [], //股权变更
		externalInvest: [], //对外投资
		financialStanding: {
			assetSum: '', //资产总额
			assetSumPub: '不公示', //资产总额 公示不公示
			ownerRightSum: '', //所有者权益合计
			ownerRightSumPub: '不公示', //所有者权益合计 公示不公示
			debtSum: '', //负债总额
			debtSumPub: '不公示', //负债总额 公示不公示
			incomeSum: '', //营业总收入
			incomeSumPub: '不公示', //营业总收入 公示不公示
			mainBizIncomeSum: '', //其中主营业务收入
			mainBizIncomeSumPub: '不公示', //其中主营业务收入 公示不公示
			profitSum: '', //利润总额
			profitSumPub: '不公示', //利润总额 公示不公示
			retainedProfitsSum: '', //净利润
			retainedProfitsSumPub: '不公示', //净利润 公示不公示
			payTaxesSum: '', //纳税总额
			payTaxesSumPub: '不公示' //纳税总额 公示不公示
		}, //资产状况
		externalEnsure: [], //对外担保
		partyBuilding: {
			pMNum: '', //中共党员（包括预备党员）人数
			pOS: '未成立党组织', //党组织拟建制情况
			isPrincipalPM: '否', //负责人是否党员
			isPrincipalPOS: '否' //负责人是否党组织书记
		}, //党建
		leagueConstruction: {
			isEstblOL: '建立团组织', //是否建立团组织
			oMNum: '', //团员人数（含预备团员）
			youthNum: '', //青年人数
			// 建立团组织
			eOLPrincipalName: '', //团组织负责人姓名
			eOLPrincipalGender: '男', //性别
			eOfficePhone: '', //办公电话
			eCellphone: '', //手机
			eOLCharge: '', //团组织主管/隶属单位
			eOLOS: '', //团组织建制情况
			eOLBuildMode: '', //团组织组建方式
			eOLBuildDate: '', //团组织组建时间
			// 未建立团组织
			uneOLOS: '', //团组织拟建制情况
			uneOLBuildMode: '' //团组织拟组建方式
		}, //团建
		socialSecurity: {
			czylx: '', //城镇职工基本养老保险（单位：人）
			syex: '', //失业保险（单位：人）
			zylx: '', //职工基本医疗保险（单位：人）
			gsx: '', //工伤保险（单位：人）
			syux: '', //生育保险（单位：人）
			// 单位缴费基数
			djfjsgs: '选择不公示', //单位缴费基数 公示不公示
			dczylxjs: '', //单位参加城镇职工基本养老保险缴费基数
			dsyexjs: '', //单位参加失业保险缴费基数
			dzylxjs: '', //单位参加职工基本医疗保险缴费基数
			dsyuxjs: '', //单位参加生育保险缴费基数
			// 本期实际缴费金额
			bqsjjfgs: '选择不公示', //本期实际缴费金额 公示不公示
			czylxbqsjjf: '', //参加城镇职工基本养老保险本期实际缴费金额
			syexbqsjjf: '', //参加失业保险本期实际缴费金额
			zylxbqsjjf: '', //参加职工基本医疗保险本期实际缴费金额
			gsxbqsjjf: '', //参加工伤保险本期实际缴费金额
			syuxbqsjjf: '', //参加生育保险本期实际缴费金额
			// 单位累计欠缴金额
			dqjgs: '选择不公示', //单位累计欠缴金额 公示不公示
			dczylxqj: '', //单位参加城镇职工基本养老保险累计欠缴金额
			dsyexqj: '', //单位参加失业保险累计欠缴金额
			dzylxqj: '', //单位参加职工基本医疗保险累计欠缴金额
			dgsxqj: '', //单位参加工伤保险累计欠缴金额
			dsyuxqj: '' //单位参加生育保险累计欠缴金额
		}, //社保
		specialEquipment: {
			bldjsb: '', //办理使用登记特种设备总台数
			zjyxsb: '' //检验有效期内特种设备总台数
		}, //特种设备
		filledInfo: {
			fEntInfo: false, //企业信息
			fShareholderFund: false, //股东及出资
			fWebsiteOlStore: false, //网站或网店
			fEquityAlter: false, //股权变更
			fExternalInvest: false, //对外投资
			fFinancialStanding: false, //资产状况
			fExternalEnsure: false, //对外担保
			fPartyBuilding: false, //党建
			fLeagueConstruction: false, //团建
			fSocialSecurity: false, //社保
			fSpecialEquipment: false //特种设备
		}, //已填写信息

		// ------------------------ 答案 ------------------------
		entInfoAnswer: {
			entName: '江苏问云电子商务有限公司', //企业名称
			entCode: '91320903755666003E', //统一社会信用代码/注册号	
			entAddress: '江苏省南京市经济开发区胜太路88号', //企业通信地址
			entPostalCode: '210038', //邮政编码
			entTel: '025-85236974', //企业联系电话
			entEmail: '1354569969@163.com', //电子邮箱
			entBusiness: '家用电器、日用百货、办公用品、工艺礼品、电脑配件的销售等。', //企业主营业务活动
			entEmployee: '100', //从业人数
			entEmployeePub: '不公示', //从业人数 公示不公示
			entFEmployee: '30', //其中女性从业人数
			entFEmployeePub: '不公示', //其中女性从业人数 公示不公示
			entRunState: '开业', //企业经营状态 开业、歇业、清算
			entHoldingState: '2', //企业控股情况 国有控股、集体控股、私人控股、港澳台商控股、外商控股
			entUniversityErNum: '20', //其中高校毕业生人数 经营者
			entUniversityEeNum: '70', //其中高校毕业生人数 雇员
			entReSoldierErNum: '0', //其中退役士兵人数 经营者
			entReSoldierEeNum: '10', //其中退役士兵人数 雇员
			entDisabledErNum: '0', //其中残疾人人数 经营者
			entDisabledEeNum: '0', //其中残疾人人数 雇员
			entReEmploymentErNum: '0', //其中失业人员再就业人数 经营者
			entReEmploymentEeNum: '0', //其中失业人员再就业人数 雇员
			isExSecurity: '是', //是否有对外担保
			isHaveWeb: '是', //是否有网站或网店
			isStockTransfer: '是', //有限责任公司本年度是否发生股东股权转让
			isInvestOther: '是' //是否有投资信息或购买其他公司股权
		}, //企业信息 答案
		shareholderFundAnswer: [{
				gd: '王鑫',
				rje: '70',
				rjsj: '2018年01月10日',
				rjfs: '货币',
				sje: '70',
				sjsj: '2018年01月10日',
				sjfs: '货币'
			},
			{
				gd: '李德华',
				rje: '30',
				rjsj: '2018年01月10日',
				rjfs: '货币',
				sje: '30',
				sjsj: '2018年01月10日',
				sjfs: '货币'
			}
		], //股东及出资 答案
		websiteOlStoreAnswer: [{
				type: '网站',
				name: '问云会计网校',
				url: 'www.baidu.com'
			},
			{
				type: '网站',
				name: '问云教育官网',
				url: 'www.baidu.com'
			}
		], //网站或网店 答案
		equityAlterAnswer: [{
				gd: '张三',
				bgq: '50%',
				bgh: '60%',
				bgrq: '2020年5月26日'
			},
			{
				gd: '李四',
				bgq: '50%',
				bgh: '40%',
				bgrq: '2020年5月26日'
			}
		], //股权变更 答案
		externalInvestAnswer: [{
				entName: '问云软件科技有限公司',
				entCode: '91320903755666003E'
			},
			{
				entName: '问云教育有限公司',
				entCode: '91320903755666004E'
			}
		], //对外投资 答案
		financialStandingAnswer: {
			assetSum: '5550.47', //资产总额
			assetSumPub: '不公示', //资产总额 公示不公示
			ownerRightSum: '4200.15', //所有者权益合计
			ownerRightSumPub: '不公示', //所有者权益合计 公示不公示
			debtSum: '1271.00', //负债总额
			debtSumPub: '不公示', //负债总额 公示不公示
			incomeSum: '4873.99', //营业总收入
			incomeSumPub: '不公示', //营业总收入 公示不公示
			mainBizIncomeSum: '4680.00', //其中主营业务收入
			mainBizIncomeSumPub: '不公示', //其中主营业务收入 公示不公示
			profitSum: '1274.65', //利润总额
			profitSumPub: '不公示', //利润总额 公示不公示
			retainedProfitsSum: '955.99', //净利润
			retainedProfitsSumPub: '不公示', //净利润 公示不公示
			payTaxesSum: '169.76', //纳税总额
			payTaxesSumPub: '不公示' //纳税总额 公示不公示
		}, //资产状况 答案
		externalEnsureAnswer: [{
				zqr: '张三',
				zwr: '李四',
				zqzzl: '其他',
				zqzse: '8000',
				zwqxq: '2020年1月26日',
				zwqxz: '2020年5月26日',
				bzqj: '未约定',
				bzfs: '连带保证',
				gszt: '公示'
			},
			{
				zqr: '王武',
				zwr: '陈琳',
				zqzzl: '合同',
				zqzse: '5000',
				zwqxq: '2020年2月26日',
				zwqxz: '2020年6月26日',
				bzqj: '期限',
				bzfs: '一般保证',
				gszt: '不公示'
			}
		], //对外担保 答案
		partyBuildingAnswer: {
			pMNum: '15', //中共党员（包括预备党员）人数
			pOS: '党支部', //党组织拟建制情况
			isPrincipalPM: '是', //负责人是否党员
			isPrincipalPOS: '否' //负责人是否党组织书记
		}, //党建 答案
		leagueConstructionAnswer: {
			isEstblOL: '建立团组织', //是否建立团组织
			oMNum: '30', //团员人数（含预备团员）
			youthNum: '20', //青年人数
			// 建立团组织
			eOLPrincipalName: '张三', //团组织负责人姓名
			eOLPrincipalGender: '男', //性别
			eOfficePhone: '0533-2652536', //办公电话
			eCellphone: '13510010010', //手机
			eOLCharge: '工商局/非公团工委', //团组织主管/隶属单位
			eOLOS: '团支部', //团组织建制情况
			eOLBuildMode: '单独组建', //团组织组建方式
			eOLBuildDate: '2001年1月20日', //团组织组建时间
			// 未建立团组织
			uneOLOS: '', //团组织拟建制情况
			uneOLBuildMode: '' //团组织拟组建方式
		}, //团建 答案
		socialSecurityAnswer: {
			czylx: '1', //城镇职工基本养老保险（单位：人）
			syex: '1', //失业保险（单位：人）
			zylx: '1', //职工基本医疗保险（单位：人）
			gsx: '1', //工伤保险（单位：人）
			syux: '1', //生育保险（单位：人）
			// 单位缴费基数
			djfjsgs: '选择不公示', //单位缴费基数 公示不公示
			dczylxjs: '1', //单位参加城镇职工基本养老保险缴费基数
			dsyexjs: '1', //单位参加失业保险缴费基数
			dzylxjs: '1', //单位参加职工基本医疗保险缴费基数
			dsyuxjs: '1', //单位参加生育保险缴费基数
			// 本期实际缴费金额
			bqsjjfgs: '选择公示', //本期实际缴费金额 公示不公示
			czylxbqsjjf: '1', //参加城镇职工基本养老保险本期实际缴费金额
			syexbqsjjf: '1', //参加失业保险本期实际缴费金额
			zylxbqsjjf: '1', //参加职工基本医疗保险本期实际缴费金额
			gsxbqsjjf: '1', //参加工伤保险本期实际缴费金额
			syuxbqsjjf: '1', //参加生育保险本期实际缴费金额
			// 单位累计欠缴金额
			dqjgs: '选择不公示', //单位累计欠缴金额 公示不公示
			dczylxqj: '1', //单位参加城镇职工基本养老保险累计欠缴金额
			dsyexqj: '1', //单位参加失业保险累计欠缴金额
			dzylxqj: '1', //单位参加职工基本医疗保险累计欠缴金额
			dgsxqj: '1', //单位参加工伤保险累计欠缴金额
			dsyuxqj: '1' //单位参加生育保险累计欠缴金额
		}, //社保 答案
		specialEquipmentAnswer: {
			bldjsb: '10', //办理使用登记特种设备总台数
			zjyxsb: '10' //检验有效期内特种设备总台数
		} //特种设备 答案
	},
	getters: {
		// 省份加括号
		prAndBkt: state => {
			return '(' + state.registerProvince + ')';
		}
	},
	mutations: {
		//去年
		yesteryear(state, yy) {
			state.yesteryear = yy;
		},
		//登录状态
		isLogin(state, isli) {
			state.isLogin = isli;
		},
		//省份
		registerProvince(state, pr) {
			state.registerProvince = pr;
		},
		//添加工商联络员
		addUser(state, au) {
			state.users.push(au);
		},
		//修改工商联络员
		modifyUser(state, mu) {
			state.users.forEach((e, i) => {
				if (e.entCode == mu.entCode) {
					state.users[i] = mu;
				}
			});
		},
		//添加年度报告
		addAnnualReport(state, aa) {
			state.annualReports.push(aa);
		},
		//修改年度报告
		modifyAnnualReport(state, ma) {
			state.annualReports.forEach((e, i) => {
				if (e.year == ma.year) {
					state.annualReports[i] = ma;
				}
			});
		},
		//企业信息
		entInfo(state, ei) {
			state.entInfo = ei;
		},
		//企业信息 是否有对外担保
		isExSecurity(state, e) {
			state.entInfo.isExSecurity = e;
		},
		//企业信息 是否有网站或网店
		isHaveWeb(state, e) {
			state.entInfo.isHaveWeb = e;
		},
		//企业信息 有限责任公司本年度是否发生股东股权转让
		isStockTransfer(state, e) {
			state.entInfo.isStockTransfer = e;
		},
		//企业信息 是否有投资信息或购买其他公司股权
		isInvestOther(state, e) {
			state.entInfo.isInvestOther = e;
		},
		//股东及出资
		shareholderFund(state, shf) {
			state.shareholderFund = shf;
		},
		//网站或网店
		websiteOlStore(state, web) {
			state.websiteOlStore = web;
		},
		//股权变更
		equityAlter(state, ea) {
			state.equityAlter = ea;
		},
		//对外投资
		externalInvest(state, exi) {
			state.externalInvest = exi;
		},
		//资产状况
		financialStanding(state, fs) {
			state.financialStanding = fs;
		},
		//对外担保
		externalEnsure(state, exe) {
			state.externalEnsure = exe;
		},
		//党建
		partyBuilding(state, pb) {
			state.partyBuilding = pb;
		},
		//团建
		leagueConstruction(state, lc) {
			state.leagueConstruction = lc;
		},
		//社保
		socialSecurity(state, ss) {
			state.socialSecurity = ss;
		},
		//特种设备
		specialEquipment(state, se) {
			state.specialEquipment = se;
		},
		//已填写信息 企业信息
		fEntInfo(state, fe) {
			state.filledInfo.fEntInfo = fe;
		},
		//已填写信息 股东及出资
		fShareholderFund(state, fs) {
			state.filledInfo.fShareholderFund = fs;
		},
		//已填写信息 网站或网店
		fWebsiteOlStore(state, fw) {
			state.filledInfo.fWebsiteOlStore = fw;
		},
		//已填写信息 股权变更
		fEquityAlter(state, fe) {
			state.filledInfo.fEquityAlter = fe;
		},
		//已填写信息 对外投资
		fExternalInvest(state, fe) {
			state.filledInfo.fExternalInvest = fe;
		},
		//已填写信息 资产状况
		fFinancialStanding(state, ff) {
			state.filledInfo.fFinancialStanding = ff;
		},
		//已填写信息 对外担保
		fExternalEnsure(state, fe) {
			state.filledInfo.fExternalEnsure = fe;
		},
		//已填写信息 党建
		fPartyBuilding(state, fp) {
			state.filledInfo.fPartyBuilding = fp;
		},
		//已填写信息 团建
		fLeagueConstruction(state, fl) {
			state.filledInfo.fLeagueConstruction = fl;
		},
		//已填写信息 社保
		fSocialSecurity(state, fs) {
			state.filledInfo.fSocialSecurity = fs;
		},
		//已填写信息 特种设备
		fSpecialEquipment(state, fs) {
			state.filledInfo.fSpecialEquipment = fs;
		}
	},
	actions: {
		//去年
		yesteryear(context, yy) {
			context.commit('yesteryear', yy);
		},
		//登录状态
		isLogin(context, isli) {
			context.commit('isLogin', isli);
		},
		//省份
		registerProvince(context, pr) {
			context.commit('registerProvince', pr);
		},
		//添加工商联络员
		addUser(context, au) {
			context.commit('addUser', au);
		},
		//修改工商联络员
		modifyUser(context, mu) {
			context.commit('modifyUser', mu);
		},
		//添加年度报告
		addAnnualReport(context, aa) {
			context.commit('addAnnualReport', aa);
		},
		//修改年度报告
		modifyAnnualReport(context, ma) {
			context.commit('modifyAnnualReport', ma);
		},
		//企业信息
		entInfo(context, ei) {
			context.commit('entInfo', ei);
		},
		//企业信息 是否有对外担保
		isExSecurity(context, e) {
			context.commit('isExSecurity', e);
		},
		//企业信息 是否有网站或网店
		isHaveWeb(context, e) {
			context.commit('isHaveWeb', e);
		},
		//企业信息 有限责任公司本年度是否发生股东股权转让
		isStockTransfer(context, e) {
			context.commit('isStockTransfer', e);
		},
		//企业信息 是否有投资信息或购买其他公司股权
		isInvestOther(context, e) {
			context.commit('isInvestOther', e);
		},
		//股东及出资
		shareholderFund(context, shf) {
			context.commit('shareholderFund', shf);
		},
		//网站或网店
		websiteOlStore(context, web) {
			context.commit('websiteOlStore', web);
		},
		//股权变更
		equityAlter(context, ea) {
			context.commit('equityAlter', ea);
		},
		//对外投资
		externalInvest(context, exi) {
			context.commit('externalInvest', exi);
		},
		//资产状况
		financialStanding(context, fs) {
			context.commit('financialStanding', fs);
		},
		//对外担保
		externalEnsure(context, exe) {
			context.commit('externalEnsure', exe);
		},
		//党建
		partyBuilding(context, pb) {
			context.commit('partyBuilding', pb);
		},
		//团建
		leagueConstruction(context, lc) {
			context.commit('leagueConstruction', lc);
		},
		//社保
		socialSecurity(context, ss) {
			context.commit('socialSecurity', ss);
		},
		//特种设备
		specialEquipment(context, se) {
			context.commit('specialEquipment', se);
		},
		//已填写信息 企业信息
		fEntInfo(context, fe) {
			context.commit('fEntInfo', fe);
		},
		//已填写信息 股东及出资
		fShareholderFund(context, fs) {
			context.commit('fShareholderFund', fs);
		},
		//已填写信息 网站或网店
		fWebsiteOlStore(context, fw) {
			context.commit('fWebsiteOlStore', fw);
		},
		//已填写信息 股权变更
		fEquityAlter(context, fe) {
			context.commit('fEquityAlter', fe);
		},
		//已填写信息 对外投资
		fExternalInvest(context, fe) {
			context.commit('fExternalInvest', fe);
		},
		//已填写信息 资产状况
		fFinancialStanding(context, ff) {
			context.commit('fFinancialStanding', ff);
		},
		//已填写信息 对外担保
		fExternalEnsure(context, fe) {
			context.commit('fExternalEnsure', fe);
		},
		//已填写信息 党建
		fPartyBuilding(context, fp) {
			context.commit('fPartyBuilding', fp);
		},
		//已填写信息 团建
		fLeagueConstruction(context, fl) {
			context.commit('fLeagueConstruction', fl);
		},
		//已填写信息 社保
		fSocialSecurity(context, fs) {
			context.commit('fSocialSecurity', fs);
		},
		//已填写信息 特种设备
		fSpecialEquipment(context, fs) {
			context.commit('fSpecialEquipment', fs);
		}
	},
	plugins: [persistedState({
		storage: window.sessionStorage
	})]
});

// 3. 抛出 Vuex 实例
export default store;
