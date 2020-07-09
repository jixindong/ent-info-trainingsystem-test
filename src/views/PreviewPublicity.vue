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
							<span v-if="annualReport">{{ annualReport.entInfo.entName }}</span>
							<span v-else>企业名称</span>
						</div>
						<div class="quit fRow hover" @click="quit()">
							<img src="../assets/quit.png" />
							<span>退出登录</span>
						</div>
					</div>
					<!-- 企业信息面板 头部 end -->

					<!-- 企业信息面板 主体 -->
					<div class="panelBd fColumn">
						<!-- 企业信息表格 -->
						<table class="entInfoTable">
							<tbody>
								<tr>
									<th>报告年度</th>
									<td colspan="3" v-if="annualReport">{{ annualReport.year }}</td>
									<td colspan="3" v-else></td>
								</tr>
								<tr>
									<th>企业名称</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entName }}</td>
									<td v-else></td>
									<th>统一社会信用代码/注册号</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entCode }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>企业通信地址</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entAddress }}</td>
									<td v-else></td>
									<th>邮政编码</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entPostalCode }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>企业联系电话</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entTel }}</td>
									<td v-else></td>
									<th>电子邮箱</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entEmail }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>企业经营状态</th>
									<td v-if="annualReport">{{ annualReport.entInfo.entRunState }}</td>
									<td v-else></td>
								</tr>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<th :rowspan="1 + annualReport.shareholderFund.length" v-if="annualReport">
										<p>股东发起人出资情况表</p>
										<p>（万元，币种应与注册资本币种一致）</p>
									</th>
									<th v-else>
										<p>股东发起人出资情况表</p>
										<p>（万元，币种应与注册资本币种一致）</p>
									</th>
									<th>股东</th>
									<th>认缴出资额</th>
									<th>认缴出资时间</th>
									<th>认缴出资方式</th>
									<th>实缴出资额</th>
									<th>实缴出时间</th>
									<th>实缴出资方式</th>
								</tr>
								<template v-if="annualReport">
									<tr v-for="(item, index) in annualReport.shareholderFund" :key="index">
										<td>{{ item.gd }}</td>
										<td>{{ item.rje }}</td>
										<td>{{ item.rjsj }}</td>
										<td>{{ item.rjfs }}</td>
										<td>{{ item.sje }}</td>
										<td>{{ item.sjsj }}</td>
										<td>{{ item.sjfs }}</td>
									</tr>
								</template>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<template v-if="annualReport">
										<th :rowspan="1 + annualReport.equityAlter.length">有限责任公司本年度是否有股权转让</th>
									</template>
									<th v-else>有限责任公司本年度是否有股权转让</th>

									<template v-if="annualReport">
										<td :rowspan="1 + annualReport.equityAlter.length" v-if="annualReport.equityAlter.length">是</td>
										<td v-else>否</td>
									</template>
									<td v-else></td>

									<th>股东</th>
									<th>变更前股权比例</th>
									<th>变更后股权比例</th>
									<th>股权变更日期</th>
								</tr>
								<template v-if="annualReport">
									<tr v-for="(item, index) in annualReport.equityAlter" :key="index">
										<td>{{ item.gd }}</td>
										<td>{{ item.bgq }}</td>
										<td>{{ item.bgh }}</td>
										<td>{{ item.bgrq }}</td>
									</tr>
								</template>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<template v-if="annualReport">
										<th :rowspan="1 + annualReport.externalInvest.length">企业是否有投资信息或购买其它公司股权</th>
									</template>
									<th v-else>企业是否有投资信息或购买其它公司股权</th>

									<template v-if="annualReport">
										<td :rowspan="1 + annualReport.externalInvest.length" v-if="annualReport.externalInvest.length">是</td>
										<td v-else>否</td>
									</template>
									<td v-else></td>

									<th>投资设立企业或购买股权企业名称</th>
									<th>统一社会信用代码/注册号</th>
								</tr>
								<template v-if="annualReport">
									<tr v-for="(item, index) in annualReport.externalInvest" :key="index">
										<td>{{ item.entName }}</td>
										<td>{{ item.entCode }}</td>
									</tr>
								</template>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<template v-if="annualReport">
										<th :rowspan="1 + annualReport.websiteOlStore.length">是否有网站或网店</th>
									</template>
									<th v-else>是否有网站或网店</th>

									<template v-if="annualReport">
										<td :rowspan="1 + annualReport.websiteOlStore.length" v-if="annualReport.websiteOlStore.length">是</td>
										<td v-else>否</td>
									</template>
									<td v-else></td>

									<th>类型</th>
									<th>名称</th>
									<th>网站</th>
								</tr>
								<template v-if="annualReport">
									<tr v-for="(item, index) in annualReport.websiteOlStore" :key="index">
										<td>{{ item.type }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.url }}</td>
									</tr>
								</template>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<th rowspan="8">资产状况信息</th>
									<th>资产总额</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.assetSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.assetSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>所有者权益合计</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.ownerRightSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.ownerRightSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>营业总收入</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.incomeSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.incomeSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>其中主营业务收入</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.mainBizIncomeSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.mainBizIncomeSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>利润总额</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.profitSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.profitSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>净利润</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.retainedProfitsSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.retainedProfitsSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>纳税总额</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.payTaxesSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.payTaxesSumPub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th>负债总额</th>

									<td v-if="annualReport">{{ annualReport.financialStanding.debtSum }} 万元</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.financialStanding.debtSumPub }}</td>
									<td v-else></td>
								</tr>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<template v-if="annualReport">
										<th :rowspan="1 + annualReport.externalEnsure.length">对外提供保证担保信息</th>
									</template>
									<th v-else>对外提供保证担保信息</th>

									<th>债权人</th>
									<th>债务人</th>
									<th>主债权种类</th>
									<th>主债权种类额</th>
									<th>履行债务的期限</th>
									<th>保证的周期</th>
									<th>保证的方式</th>
									<th>公示状态</th>
								</tr>
								<template v-if="annualReport">
									<tr v-for="(item, index) in annualReport.externalEnsure" :key="index">
										<td>{{ item.zqr }}</td>
										<td>{{ item.zwr }}</td>
										<td>{{ item.zqzzl }}</td>
										<td>{{ item.zqzse }} 万元</td>
										<td>{{ item.zwqxq }} - {{ item.zwqxz }}</td>
										<td>{{ item.bzqj }}</td>
										<td>{{ item.bzfs }}</td>
										<td>{{ item.gszt }}</td>
									</tr>
								</template>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<th>从业人数</th>

									<td v-if="annualReport">{{ annualReport.entInfo.entEmployee }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.entInfo.entEmployeePub }}</td>
									<td v-else></td>

									<th>其中女性从业人数</th>

									<td v-if="annualReport">{{ annualReport.entInfo.entFEmployee }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">{{ annualReport.entInfo.entFEmployeePub }}</td>
									<td v-else></td>
								</tr>
								<tr>
									<th rowspan="4">其中</th>
									<th colspan="2">高校毕业生人数</th>

									<td v-if="annualReport">经营者 {{ annualReport.entInfo.entUniversityErNum }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">雇员 {{ annualReport.entInfo.entUniversityEeNum }} 人</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th colspan="2">退役士兵人数</th>

									<td v-if="annualReport">经营者 {{ annualReport.entInfo.entReSoldierErNum }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">雇员 {{ annualReport.entInfo.entReSoldierEeNum }} 人</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th colspan="2">残疾人人数</th>

									<td v-if="annualReport">经营者 {{ annualReport.entInfo.entDisabledErNum }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">雇员 {{ annualReport.entInfo.entDisabledEeNum }} 人</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th colspan="2">失业人员再就业人数</th>

									<td v-if="annualReport">经营者 {{ annualReport.entInfo.entReEmploymentErNum }} 人</td>
									<td v-else></td>

									<td v-if="annualReport">雇员 {{ annualReport.entInfo.entReEmploymentEeNum }} 人</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
							</tbody>
						</table>

						<table class="entInfoTable">
							<tbody>
								<tr>
									<th rowspan="4">党建信息</th>
									<th>中共党员（包括预备党员）人数</th>

									<td v-if="annualReport">{{ annualReport.partyBuilding.pMNum }} 人</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th>党组织建制</th>

									<td v-if="annualReport">{{ annualReport.partyBuilding.pOS }}</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th>法定代表人是否为党员</th>

									<td v-if="annualReport">{{ annualReport.partyBuilding.isPrincipalPM }}</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
								<tr>
									<th>法定代表人是否为党组织书记</th>

									<td v-if="annualReport">{{ annualReport.partyBuilding.isPrincipalPOS }}</td>
									<td v-else></td>

									<td>不公示</td>
								</tr>
							</tbody>
						</table>
						<!-- 企业信息表格 end -->

						<!-- 按钮盒子 -->
						<div class="btnBox fRow">
							<div class="btn hover" @click="print()">打印预览</div>

							<template v-if="annualReport">
								<div class="btn hover" @click="previewPublicity()" v-if="annualReport.state == '未公示'">预览并公示</div>
							</template>

							<div class="btn hover" @click="back()">返回</div>
						</div>
						<!-- 按钮盒子 end -->

						<div>说明：如用户需审查填报内容，可点击预览打印，并确认无误后点击提交并公示</div>
					</div>
					<!-- 企业信息面板 主体 -->
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
export default {
	name: 'PreviewPublicity',
	components: {
		EnterpriseInfoHdBar: () => import('../components/EnterpriseInfoHdBar.vue'), //企业信息导航栏
		EnterpriseInfoBanner: () => import('../components/EnterpriseInfoBanner.vue'), //企业信息banner
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue') //企业信息底部栏
	},
	data: function() {
		return {
			reportYear: '', //报告年份
			annualReports: '', //年度报告
			currentTime: '' //当前日期
		};
	},
	computed: {
		// 当前年度报告
		annualReport() {
			let annualReport = '';

			if (this.annualReports) {
				this.annualReports.forEach(e => {
					if (e.year == this.reportYear) {
						annualReport = e;
					}
				});
			}

			return annualReport;
		}
	},
	methods: {
		// 获取报告年份
		getReportYear() {
			this.reportYear = this.$route.params.year; //报告年份
		},
		// 获取年度报告
		getAnnualReports() {
			this.annualReports = this.$store.state.annualReports;
		},
		// 获取当前时间
		getCurrentTime() {
			let date = new Date();
			this.currentTime = date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1) + '月' + date.getDate() + '日';
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
		},
		// 打印按钮
		print() {
			document.querySelector('.entInfoHdBar').style.display = 'none';
			document.querySelector('.banner').style.display = 'none';
			document.querySelector('.panelHd').style.display = 'none';
			document.querySelector('.ft').style.display = 'none';
			window.print();
			document.querySelector('.entInfoHdBar').style.display = 'block';
			document.querySelector('.banner').style.display = 'flex';
			document.querySelector('.panelHd').style.display = 'flex';
			document.querySelector('.ft').style.display = 'flex';
		},
		// 预览并公示按钮
		previewPublicity() {
			let annualReport = this.annualReport;

			annualReport.state = '已公示'; //状态
			annualReport.publicityDate = this.currentTime; //公示日期

			this.$store.dispatch('modifyAnnualReport', annualReport); //修改年度报告
			this.$message.success('公示成功');
		},
		// 返回按钮
		back() {
			this.$router.go(-1);
		}
	},
	mounted() {
		// 获取报告年份
		this.getReportYear();
		// 获取年度报告
		this.getAnnualReports();
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
	background-color: #fbf8ef;
	// 企业信息面板
	.entInfoPanel {
		margin: 20px 0 10px;
		width: 1000px;
		min-width: 1000px;
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
			width: 100%;
			color: #333;
			font-size: 14px;
			// 企业信息表格
			.entInfoTable {
				margin-bottom: 20px;
				width: 100%;
				border-collapse: collapse;
				th,
				td {
					padding: 10px;
					border: 1px solid #ddd;
				}
				th {
					color: #9b7d46;
					background-color: #eae3db;
				}
			}
			// 企业信息表格 end
			// 按钮盒子
			.btnBox {
				margin-bottom: 20px;
				.btn {
					margin: 0 10px;
					padding: 10px 16px;
					color: #333;
					font-size: 18px;
					background-color: #fff;
					border: 1px solid #ccc;
					border-radius: 6px;
				}
			}
			// 按钮盒子 end
		}
		// 企业信息面板 主体 end
	}
	// 企业信息面板 end
}
</style>
