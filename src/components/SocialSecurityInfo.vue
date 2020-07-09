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
					<th>城镇职工基本养老保险（单位：人）</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="socialSecurity.czylx" /></td>
					<th>失业保险（单位：人）</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="socialSecurity.syex" /></td>
				</tr>
				<tr>
					<th>职工基本医疗保险（单位：人）</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="socialSecurity.zylx" /></td>
					<th>工伤保险（单位：人）</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="socialSecurity.gsx" /></td>
				</tr>
				<tr>
					<th>生育保险（单位：人）</th>
					<td><input type="number" min="0" placeholder="请输入人数" v-model="socialSecurity.syux" /></td>
					<th></th>
					<td></td>
				</tr>
			</tbody>
		</table>

		<table class="entDtlTbIII">
			<tbody>
				<tr>
					<th rowspan="4" class="textCenter">单位缴费基数</th>
					<th>单位参加城镇职工基本养老保险缴费基数</th>
					<td>
						<input type="text" class="w80" placeholder="请输入基数" v-model="socialSecurity.dczylxjs" />
						<span>万元</span>
					</td>
					<td rowspan="4">
						<label>
							<input type="radio" name="djfjsgs" value="选择公示" v-model="socialSecurity.djfjsgs" />
							<span>选择公示</span>
						</label>
						<br />
						<label>
							<input type="radio" name="djfjsgs" value="选择不公示" v-model="socialSecurity.djfjsgs" />
							<span>选择不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>单位参加失业保险缴费基数</th>
					<td>
						<input type="text" class="w80" placeholder="请输入基数" v-model="socialSecurity.dsyexjs" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>单位参加职工基本医疗保险缴费基数</th>
					<td>
						<input type="text" class="w80" placeholder="请输入基数" v-model="socialSecurity.dzylxjs" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>单位参加生育保险缴费基数</th>
					<td>
						<input type="text" class="w80" placeholder="请输入基数" v-model="socialSecurity.dsyuxjs" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th rowspan="5" class="textCenter">本期实际缴费金额</th>
					<th>参加城镇职工基本养老保险本期实际缴费金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.czylxbqsjjf" />
						<span>万元</span>
					</td>
					<td rowspan="5">
						<label>
							<input type="radio" name="bqsjjfgs" value="选择公示" v-model="socialSecurity.bqsjjfgs" />
							<span>选择公示</span>
						</label>
						<br />
						<label>
							<input type="radio" name="bqsjjfgs" value="选择不公示" v-model="socialSecurity.bqsjjfgs" />
							<span>选择不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>参加失业保险本期实际缴费金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.syexbqsjjf" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>参加职工基本医疗保险本期实际缴费金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.zylxbqsjjf" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>参加工伤保险本期实际缴费金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.gsxbqsjjf" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>参加生育保险本期实际缴费金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.syuxbqsjjf" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th rowspan="5" class="textCenter">单位累计欠缴金额</th>
					<th>单位参加城镇职工基本养老保险累计欠缴金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.dczylxqj" />
						<span>万元</span>
					</td>
					<td rowspan="5">
						<label>
							<input type="radio" name="dqjgs" value="选择公示" v-model="socialSecurity.dqjgs" />
							<span>选择公示</span>
						</label>
						<br />
						<label>
							<input type="radio" name="dqjgs" value="选择不公示" v-model="socialSecurity.dqjgs" />
							<span>选择不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>单位参加失业保险累计欠缴金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.dsyexqj" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>单位参加职工基本医疗保险累计欠缴金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.dzylxqj" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>单位参加工伤保险累计欠缴金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.dgsxqj" />
						<span>万元</span>
					</td>
				</tr>
				<tr>
					<th>单位参加生育保险累计欠缴金额</th>
					<td>
						<input type="text" class="w80" placeholder="请输入金额" v-model="socialSecurity.dsyuxqj" />
						<span>万元</span>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="btnBox fRow">
			<div class="btn hover" @click="save()" v-show="!isSeeAnswer">保存</div>
			<div class="btn hover" @click="close()">关闭</div>
			<div class="btn hover" @click="backTo()" v-show="isSeeAnswer">返回</div>
			<div class="btn hover" @click="seeAnswer()" v-show="!isSeeAnswer">查看答案</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'SocialSecurityInfo',
	data: function() {
		return {
			socialSecurity: '', //社保
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		...mapState({
			province: state => state.registerProvince, //省份
			entInfo: state => state.entInfo, //企业信息
			socialSecurityAnswer: state => state.socialSecurityAnswer //社保 答案
		})
	},
	methods: {
		// 获取 社保
		getSocialSecurity() {
			this.socialSecurity = this.$store.state.socialSecurity;
		},
		// 保存按钮
		save() {
			if (
				this.socialSecurity.czylx == '' ||
				this.socialSecurity.syex == '' ||
				this.socialSecurity.zylx == '' ||
				this.socialSecurity.gsx == '' ||
				this.socialSecurity.syux == '' ||
				this.socialSecurity.dczylxjs == '' ||
				this.socialSecurity.dsyexjs == '' ||
				this.socialSecurity.dzylxjs == '' ||
				this.socialSecurity.dsyuxjs == '' ||
				this.socialSecurity.czylxbqsjjf == '' ||
				this.socialSecurity.syexbqsjjf == '' ||
				this.socialSecurity.zylxbqsjjf == '' ||
				this.socialSecurity.gsxbqsjjf == '' ||
				this.socialSecurity.syuxbqsjjf == '' ||
				this.socialSecurity.dczylxqj == '' ||
				this.socialSecurity.dsyexqj == '' ||
				this.socialSecurity.dzylxqj == '' ||
				this.socialSecurity.dgsxqj == '' ||
				this.socialSecurity.dsyuxqj == ''
			) {
				this.$message.error('请完善信息');
			} else {
				this.$store.dispatch('socialSecurity', this.socialSecurity); //社保
				this.$store.dispatch('fSocialSecurity', true); //已填写信息 社保
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
		// 返回按钮
		backTo() {
			this.isSeeAnswer = false;

			this.socialSecurity = this.$store.state.socialSecurity;
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;

			this.socialSecurity = Object.assign(this.$store.state.socialSecurityAnswer);
		}
	},
	mounted() {
		// 获取 社保
		this.getSocialSecurity();
	}
};
</script>
