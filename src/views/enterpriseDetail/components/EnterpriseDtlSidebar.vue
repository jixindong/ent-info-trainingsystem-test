<template>
	<div class="entDtlSidebar fColumn">
		<router-link to="/enterpriseDetail/enterpriseBasicInfo" class="menuItem">企业基本信息</router-link>
		<router-link to="/enterpriseDetail/shareholderInfo" class="menuItem">股东及出资信息</router-link>
		<router-link to="/enterpriseDetail/websiteInfo" class="menuItem" v-show="entInfo.isHaveWeb == '是'">网站或网店信息</router-link>
		<router-link to="/enterpriseDetail/equityAlterInfo" class="menuItem" v-show="entInfo.isStockTransfer == '是'">股权变更信息</router-link>
		<router-link to="/enterpriseDetail/externalInvestInfo" class="menuItem" v-show="entInfo.isInvestOther == '是'">对外投资信息</router-link>
		<router-link to="/enterpriseDetail/financialStandingInfo" class="menuItem">资产状况信息</router-link>
		<router-link to="/enterpriseDetail/externalEnsureInfo" class="menuItem" v-show="entInfo.isExSecurity == '是'">对外担保信息</router-link>
		<router-link to="/enterpriseDetail/partyBuildingInfo" class="menuItem">党建信息</router-link>
		<router-link to="/enterpriseDetail/leagueConstructionInfo" class="menuItem">团建信息</router-link>
		<router-link to="/enterpriseDetail/socialSecurityInfo" class="menuItem">社保信息</router-link>
		<router-link to="/enterpriseDetail/equipmentInfo" class="menuItem">特种设备信息</router-link>
		<div class="menuItem" @click="previewPublicity()">预览并公示</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EnterpriseDtlSidebar',
	data: function() {
		return {
			currentTime: '' //当前日期
		};
	},
	computed: {
		...mapState({
			yesteryear: state => state.yesteryear, //去年
			annualReports: state => state.annualReports, //年度报告
			// 填写信息
			entInfo: state => state.entInfo, //企业信息
			filledInfo: state => state.filledInfo //已填写信息
		})
	},
	methods: {
		// 获取当前时间
		getCurrentTime() {
			let date = new Date();
			this.currentTime = date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1) + '月' + date.getDate() + '日';
		},
		// 预览并公示按钮
		previewPublicity() {
			if (!this.filledInfo.fEntInfo) {
				this.$message.error('请完善【企业基本信息】');
			} else if (!this.filledInfo.fShareholderFund) {
				this.$message.error('请完善【股东及出资信息】');
			} else if (this.entInfo.isHaveWeb == '是' && !this.filledInfo.fWebsiteOlStore) {
				this.$message.error('请完善【网站或网店信息】');
			} else if (this.entInfo.isStockTransfer == '是' && !this.filledInfo.fEquityAlter) {
				this.$message.error('请完善【股权变更信息】');
			} else if (this.entInfo.isInvestOther == '是' && !this.filledInfo.fExternalInvest) {
				this.$message.error('请完善【对外投资信息】');
			} else if (!this.filledInfo.fFinancialStanding) {
				this.$message.error('请完善【资产状况信息】');
			} else if (this.entInfo.isExSecurity == '是' && !this.filledInfo.fExternalEnsure) {
				this.$message.error('请完善【对外担保信息】');
			} else if (!this.filledInfo.fSocialSecurity) {
				this.$message.error('请完善【社保信息】');
			} else if (!this.filledInfo.fSpecialEquipment) {
				this.$message.error('请完善【特种设备信息】');
			} else {
				// 当前年度报告
				let annualReport = {
					year: this.yesteryear, //报告年份
					lastModifiedDate: this.currentTime, //最后修改日期
					state: '未公示', //状态
					publicityDate: '未公示', //公示日期
					editable: 1, //是否可编辑
					entInfo: this.entInfo, //企业信息
					shareholderFund: this.$store.state.shareholderFund, //股东及出资
					websiteOlStore: this.$store.state.websiteOlStore, //网站或网店
					equityAlter: this.$store.state.equityAlter, //股权变更
					externalInvest: this.$store.state.externalInvest, //对外投资
					financialStanding: this.$store.state.financialStanding, //资产状况
					externalEnsure: this.$store.state.externalEnsure, //对外担保
					partyBuilding: this.$store.state.partyBuilding, //党建
					leagueConstruction: this.$store.state.leagueConstruction, //团建
					socialSecurity: this.$store.state.socialSecurity, //社保
					specialEquipment: this.$store.state.specialEquipment //特种设备
				};
				// 查看 年度报告 中 有无相同年份的报告
				let isReportExist = false;
				this.annualReports.forEach(e => {
					if (e.year == this.yesteryear) {
						isReportExist = true;
					}
				});
				// 无相同则添加 有相同则修改
				if (!isReportExist) {
					this.$store.dispatch('addAnnualReport', annualReport); //添加年度报告
				} else {
					this.$store.dispatch('modifyAnnualReport', annualReport); //修改年度报告
				}
				// 跳转 预览公示页面
				this.$router.push({
					path: '/previewPublicity/' + this.yesteryear
				});
			}
		}
	},
	mounted() {
		// 获取当前时间
		this.getCurrentTime();
	}
};
</script>

<style lang="scss" scoped>
.entDtlSidebar {
	width: 190px;
	.menuItem {
		margin-bottom: 2px;
		padding: 12px 20px;
		width: 190px;
		color: #fff;
		font-size: 14px;
		background-color: #aa802f;
		&.router-link-active {
			background-color: #ae1d1c;
		}
		&:hover {
			background-color: #ae1d1c;
			cursor: pointer;
		}
	}
}
</style>
