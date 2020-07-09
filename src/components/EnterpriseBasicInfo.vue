<template>
	<div class="entDtlMain">
		<div class="mainTitle">
			<span>企业名称：</span>
			<strong>{{ this.entInfo.entName }}</strong>
			<span></span>
			<span>统一社会信用代码/注册号：</span>
			<strong>{{ this.entInfo.entCode }}</strong>
		</div>

		<table class="entDtlTb">
			<tbody>
				<tr>
					<th>报告年度</th>
					<td><input type="text" :value="yesteryear + '年'" readonly /></td>
				</tr>
				<tr>
					<th>企业名称</th>
					<td><input type="text" :value="this.entInfo.entName" readonly /></td>
					<th>统一社会信用代码/注册号</th>
					<td><input type="text" :value="this.entInfo.entCode" readonly /></td>
				</tr>
				<tr>
					<th>企业通信地址</th>
					<td><input type="text" placeholder="请输入企业通信地址" v-model="entInfo.entAddress" /></td>
					<th>邮政编码</th>
					<td><input type="text" placeholder="请输入邮政编码" v-model="entInfo.entPostalCode" /></td>
				</tr>
				<tr>
					<th>企业联系电话</th>
					<td><input type="text" placeholder="请输入企业联系电话" v-model="entInfo.entTel" /></td>
					<th>电子邮箱</th>
					<td><input type="text" placeholder="请输入电子邮箱" v-model="entInfo.entEmail" /></td>
				</tr>
				<tr>
					<th>企业主营业务活动</th>
					<td colspan="3"><input type="text" placeholder="请输入企业主营业务活动" v-model="entInfo.entBusiness" /></td>
				</tr>
				<tr>
					<th>从业人数</th>
					<td>
						<input class="iptSl" type="text" placeholder="请输入人数" v-model="entInfo.entEmployee" />
						<label>
							<input type="radio" name="MEmployeesNum" value="公示" v-model="entInfo.entEmployeePub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="MEmployeesNum" value="不公示" v-model="entInfo.entEmployeePub" />
							<span>不公示</span>
						</label>
					</td>
					<th>(其中女性从业人数)</th>
					<td>
						<input class="iptSl" type="text" placeholder="请输入人数" v-model="entInfo.entFEmployee" />
						<label>
							<input type="radio" name="fEmployeesNum" value="公示" v-model="entInfo.entFEmployeePub" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="fEmployeesNum" value="不公示" v-model="entInfo.entFEmployeePub" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>企业经营状态</th>
					<td>
						<select v-model="entInfo.entRunState">
							<option value="开业">开业</option>
							<option value="歇业">歇业</option>
							<option value="清算">清算</option>
						</select>
					</td>
					<th>企业控股情况</th>
					<td>
						<select v-model="entInfo.entHoldingState">
							<option value="0">请选择</option>
							<option value="1">国有控股</option>
							<option value="2">集体控股</option>
							<option value="3">私人控股</option>
							<option value="4">港澳台商控股</option>
							<option value="5">外商控股</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>是否有对外担保</th>
					<td>
						<label>
							<input type="radio" name="isExSecurity" value="是" v-model="entInfo.isExSecurity" />
							<span>是</span>
						</label>
						<label>
							<input type="radio" name="isExSecurity" value="否" v-model="entInfo.isExSecurity" />
							<span>否</span>
						</label>
					</td>
					<th>是否有网站或网店</th>
					<td>
						<label>
							<input type="radio" name="isHaveWeb" value="是" v-model="entInfo.isHaveWeb" />
							<span>是</span>
						</label>
						<label>
							<input type="radio" name="isHaveWeb" value="否" v-model="entInfo.isHaveWeb" />
							<span>否</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>
						<p>有限责任公司本年度</p>
						<p>是否发生股东股权转让</p>
					</th>
					<td>
						<label>
							<input type="radio" name="isStockTransfer" value="是" v-model="entInfo.isStockTransfer" />
							<span>是</span>
						</label>
						<label>
							<input type="radio" name="isStockTransfer" value="否" v-model="entInfo.isStockTransfer" />
							<span>否</span>
						</label>
					</td>
					<th>
						<p>是否有投资信息或</p>
						<p>购买其他公司股权</p>
					</th>
					<td>
						<label>
							<input type="radio" name="isInvestOther" value="是" v-model="entInfo.isInvestOther" />
							<span>是</span>
						</label>
						<label>
							<input type="radio" name="isInvestOther" value="否" v-model="entInfo.isInvestOther" />
							<span>否</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>

		<table class="entDtlTb noPublicity">
			<tbody>
				<tr>
					<td><span class="title">以下为不公示信息</span></td>
				</tr>
				<tr>
					<th>其中高校毕业生人数</th>
					<th>经营者</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entUniversityErNum" /></td>
					<td>人</td>
					<th>雇员</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entUniversityEeNum" /></td>
					<td>人</td>
				</tr>
				<tr>
					<th>其中退役士兵人数</th>
					<th>经营者</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entReSoldierErNum" /></td>
					<td>人</td>
					<th>雇员</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entReSoldierEeNum" /></td>
					<td>人</td>
				</tr>
				<tr>
					<th>其中残疾人人数</th>
					<th>经营者</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entDisabledErNum" /></td>
					<td>人</td>
					<th>雇员</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entDisabledEeNum" /></td>
					<td>人</td>
				</tr>
				<tr>
					<th>其中失业人员再就业人数</th>
					<th>经营者</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entReEmploymentErNum" /></td>
					<td>人</td>
					<th>雇员</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="entInfo.entReEmploymentEeNum" /></td>
					<td>人</td>
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
export default {
	name: 'EnterpriseBasicInfo',
	data: function() {
		return {
			entInfo: '', //企业信息
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		// 去年
		yesteryear() {
			return this.$store.state.yesteryear;
		}
	},
	watch: {
		// 企业信息 是否有对外担保
		'entInfo.isExSecurity': function(e) {
			this.$store.dispatch('isExSecurity', e);
		},
		// 企业信息 是否有网站或网店
		'entInfo.isHaveWeb': function(e) {
			this.$store.dispatch('isHaveWeb', e);
		},
		// 企业信息 有限责任公司本年度是否发生股东股权转让
		'entInfo.isStockTransfer': function(e) {
			this.$store.dispatch('isStockTransfer', e);
		},
		// 企业信息 是否有投资信息或购买其他公司股权
		'entInfo.isInvestOther': function(e) {
			this.$store.dispatch('isInvestOther', e);
		}
	},
	methods: {
		// 获取 企业信息
		getEntInfo() {
			this.entInfo = this.$store.state.entInfo;
		},
		// 保存按钮
		save() {
			if (
				!this.entInfo.entAddress ||
				!this.entInfo.entPostalCode ||
				!this.entInfo.entTel ||
				!this.entInfo.entEmail ||
				!this.entInfo.entBusiness ||
				!this.entInfo.entEmployee ||
				!this.entInfo.entFEmployee ||
				!this.entInfo.entHoldingState ||
				this.entInfo.entUniversityErNum == '' ||
				this.entInfo.entUniversityEeNum == '' ||
				this.entInfo.entReSoldierErNum == '' ||
				this.entInfo.entReSoldierEeNum == '' ||
				this.entInfo.entDisabledErNum == '' ||
				this.entInfo.entDisabledEeNum == '' ||
				this.entInfo.entReEmploymentErNum == '' ||
				this.entInfo.entReEmploymentEeNum == ''
			) {
				this.$message.error('请完善信息');
			} else {
				this.$store.dispatch('entInfo', this.entInfo); //企业信息
				this.$store.dispatch('fEntInfo', true); //已填写信息 企业信息
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
				path: '/enterpriseInfoFill/' + this.$store.state.registerProvince
			});
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;

			this.entInfo = Object.assign(this.$store.state.entInfoAnswer);
		},
		// 返回按钮
		backTo() {
			this.isSeeAnswer = false;

			this.entInfo = this.$store.state.entInfo;
		}
	},
	mounted() {
		// 获取 企业信息
		this.getEntInfo();
	}
};
</script>
