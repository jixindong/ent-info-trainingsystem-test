<template>
	<div class="entDtlMain">
		<div class="mainTitle">
			<span>企业名称：</span>
			<strong>{{ this.entInfo.entName }}</strong>
			<span></span>
			<span>统一社会信用代码/注册号：</span>
			<strong>{{ this.entInfo.entCode }}</strong>
		</div>

		<table class="entDtlTbIII">
			<tbody>
				<tr>
					<th>资产总额</th>
					<td><input type="number" min="0" placeholder="请输入资产总额" v-model="financialStanding.assetSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="assetSumPub" value="公示" v-model="financialStanding.assetSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="assetSumPub" value="不公示" v-model="financialStanding.assetSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>所有者权益合计</th>
					<td><input type="number" min="0" placeholder="请输入所有者权益合计" v-model="financialStanding.ownerRightSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="ownerRightSumPub" value="公示" v-model="financialStanding.ownerRightSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="ownerRightSumPub" value="不公示" v-model="financialStanding.ownerRightSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>负债总额</th>
					<td><input type="number" min="0" placeholder="请输入负债总额" v-model="financialStanding.debtSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="debtSumPub" value="公示" v-model="financialStanding.debtSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="debtSumPub" value="不公示" v-model="financialStanding.debtSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>营业总收入</th>
					<td><input type="number" min="0" placeholder="请输入营业总收入" v-model="financialStanding.incomeSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="incomeSumPub" value="公示" v-model="financialStanding.incomeSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="incomeSumPub" value="不公示" v-model="financialStanding.incomeSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>其中主营业务收入</th>
					<td><input type="number" min="0" placeholder="请输入其中主营业务收入" v-model="financialStanding.mainBizIncomeSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="mainBizIncomeSumPub" value="公示" v-model="financialStanding.mainBizIncomeSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="mainBizIncomeSumPub" value="不公示" v-model="financialStanding.mainBizIncomeSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>利润总额</th>
					<td><input type="number" min="0" placeholder="请输入利润总额" v-model="financialStanding.profitSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="profitSumPub" value="公示" v-model="financialStanding.profitSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="profitSumPub" value="不公示" v-model="financialStanding.profitSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>净利润</th>
					<td><input type="number" min="0" placeholder="请输入资净利润" v-model="financialStanding.retainedProfitsSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="retainedProfitsSumPub" value="公示" v-model="financialStanding.retainedProfitsSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="retainedProfitsSumPub" value="不公示" v-model="financialStanding.retainedProfitsSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>纳税总额</th>
					<td><input type="number" min="0" placeholder="请输入纳税总额" v-model="financialStanding.payTaxesSum" /></td>
					<td>万元</td>
					<td>
						<label>
							<input type="radio" name="payTaxesSumPub" value="公示" v-model="financialStanding.payTaxesSumPub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="payTaxesSumPub" value="不公示" v-model="financialStanding.payTaxesSumPub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="btnBox fRow">
			<div class="btn hover" @click="save()" v-show="!isSeeAnswer">保存</div>
			<div class="btn hover" @click="close()">关闭</div>
			<div class="btn hover" @click="seeAnswer()" v-show="!isSeeAnswer">查看答案</div>
			<div class="btn hover" @click="backTo()" v-show="isSeeAnswer">返回</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'FinancialStandingInfo',
	data: function() {
		return {
			financialStanding: '', //资产状况
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		...mapState({
			entInfo: state => state.entInfo, //企业信息
			financialStandingAnswer: state => state.financialStandingAnswer //资产状况 答案
		})
	},
	methods: {
		// 获取 资产状况
		getFinancialStanding() {
			this.financialStanding = this.$store.state.financialStanding;
		},
		// 保存按钮
		save() {
			if (
				!this.financialStanding.assetSum ||
				!this.financialStanding.ownerRightSum ||
				!this.financialStanding.debtSum ||
				!this.financialStanding.incomeSum ||
				!this.financialStanding.mainBizIncomeSum ||
				!this.financialStanding.profitSum ||
				!this.financialStanding.retainedProfitsSum ||
				!this.financialStanding.payTaxesSum
			) {
				this.$message.error('请完善信息');
			} else {
				this.$store.dispatch('financialStanding', this.financialStanding); //资产状况
				this.$store.dispatch('fFinancialStanding', true); //已填写信息 资产状况
				this.$message({
					message: '保存成功',
					type: 'success'
				});
			}
		},
		// 关闭按钮
		close() {
			// 跳转 企业信息填报页面
			this.$router.push({
				path: '/enterpriseInfoFill/' + this.province
			});
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;

			this.financialStanding = Object.assign(this.$store.state.financialStandingAnswer);
		},
		// 返回按钮
		backTo() {
			this.isSeeAnswer = false;

			this.financialStanding = this.$store.state.financialStanding;
		}
	},
	mounted() {
		// 获取 资产状况
		this.getFinancialStanding();
	}
};
</script>
