<template>
	<div class="entDtlMain">
		<div class="mainTitle">
			<span>企业名称：</span>
			<strong>{{ this.entInfo.entName }}</strong>
			<span></span>
			<span>统一社会信用代码/注册号：</span>
			<strong>{{ this.entInfo.entCode }}</strong>
		</div>

		<table class="entDtlTbIII" v-show="!isSeeAnswer">
			<tbody>
				<tr>
					<th rowspan="9" class="textCenter">团组织组建情况</th>
					<th>*是否建立团组织</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCIsEstblOL" value="建立团组织" v-model="leagueConstruction.isEstblOL" />
							<span>建立团组织</span>
						</label>
						<label>
							<input type="radio" name="lCIsEstblOL" value="未建立团组织" v-model="leagueConstruction.isEstblOL" />
							<span>未建立团组织</span>
						</label>
					</td>
				</tr>
				<!-- 建立团组织 -->
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'"><th colspan="4" class="textCenter">以下栏目请建立团组织的企业填写</th></tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团组织负责人姓名</th>
					<td><input type="text" placeholder="请输入团组织负责人姓名" v-model="leagueConstruction.eOLPrincipalName" /></td>
					<th>*性别</th>
					<td>
						<label>
							<input type="radio" name="lCEOLPrincipalGender" value="男" v-model="leagueConstruction.eOLPrincipalGender" />
							<span>男</span>
						</label>
						<label>
							<input type="radio" name="lCEOLPrincipalGender" value="女" v-model="leagueConstruction.eOLPrincipalGender" />
							<span>女</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*办公电话</th>
					<td><input type="text" placeholder="请输入办公电话" v-model="leagueConstruction.eOfficePhone" /></td>
					<th>*手机</th>
					<td><input type="text" placeholder="请输入手机号" v-model="leagueConstruction.eCellphone" /></td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团组织主管/隶属单位</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCEOLCharge" value="工商局/非公团工委" v-model="leagueConstruction.eOLCharge" />
							<span>工商局/非公团工委</span>
						</label>
						<label>
							<input type="radio" name="lCEOLCharge" value="市,县,街道等团委" v-model="leagueConstruction.eOLCharge" />
							<span>市,县,街道等团委</span>
						</label>
						<label>
							<input type="radio" name="lCEOLCharge" value="其他" v-model="leagueConstruction.eOLCharge" />
							<span>其他</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团组织建制情况</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCEOLOS" value="团委" v-model="leagueConstruction.eOLOS" />
							<span>团委</span>
						</label>
						<label>
							<input type="radio" name="lCEOLOS" value="团总支" v-model="leagueConstruction.eOLOS" />
							<span>团总支</span>
						</label>
						<label>
							<input type="radio" name="lCEOLOS" value="团支部" v-model="leagueConstruction.eOLOS" />
							<span>团支部</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团组织组建方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCEOLBuildMode" value="单独组建" v-model="leagueConstruction.eOLBuildMode" />
							<span>单独组建</span>
						</label>
						<label>
							<input type="radio" name="lCEOLBuildMode" value="联合组建" v-model="leagueConstruction.eOLBuildMode" />
							<span>联合组建</span>
						</label>
						<label>
							<input type="radio" name="lCEOLBuildMode" value="其他" v-model="leagueConstruction.eOLBuildMode" />
							<span>其他</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团员人数（含预备团员）</th>
					<td><input type="text" placeholder="请输入团员人数（含预备团员）" v-model="leagueConstruction.oMNum" /></td>
					<th>*35岁以下青年人数</th>
					<td><input type="text" placeholder="请输入35岁以下青年人数" v-model="leagueConstruction.youthNum" /></td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '建立团组织'">
					<th>*团组织组建时间</th>
					<td colspan="3"><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="lCEOLBuildDate" /></td>
				</tr>
				<!-- 未建立团组织 -->
				<tr v-show="leagueConstruction.isEstblOL == '未建立团组织'"><th colspan="4" class="textCenter">以下栏目请未建立团组织的企业填写</th></tr>
				<tr v-show="leagueConstruction.isEstblOL == '未建立团组织'">
					<th>*团员人数（含预备团员）</th>
					<td><input type="text" placeholder="请输入团员人数（含预备团员）" v-model="leagueConstruction.oMNum" /></td>
					<th>*35岁以下青年人数</th>
					<td><input type="text" placeholder="请输入35岁以下青年人数" v-model="leagueConstruction.youthNum" /></td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '未建立团组织'">
					<th>*团组织拟建制情况</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCUneOLOS" value="团委" v-model="leagueConstruction.uneOLOS" />
							<span>团委</span>
						</label>
						<label>
							<input type="radio" name="lCUneOLOS" value="团总支" v-model="leagueConstruction.uneOLOS" />
							<span>团总支</span>
						</label>
						<label>
							<input type="radio" name="lCUneOLOS" value="团支部" v-model="leagueConstruction.uneOLOS" />
							<span>团支部</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstruction.isEstblOL == '未建立团组织'">
					<th>*团组织拟组建方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCUneOLBuildMode" value="单独组建" v-model="leagueConstruction.uneOLBuildMode" />
							<span>单独组建</span>
						</label>
						<label>
							<input type="radio" name="lCUneOLBuildMode" value="联合组建" v-model="leagueConstruction.uneOLBuildMode" />
							<span>联合组建</span>
						</label>
						<label>
							<input type="radio" name="lCUneOLBuildMode" value="其他" v-model="leagueConstruction.uneOLBuildMode" />
							<span>其他</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- 答案 -->
		<table class="entDtlTbIII" v-show="isSeeAnswer">
			<tbody>
				<tr>
					<th rowspan="9" class="textCenter">团组织组建情况</th>
					<th>*是否建立团组织</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAIsEstblOL" value="建立团组织" v-model="leagueConstructionAnswer.isEstblOL" />
							<span>建立团组织</span>
						</label>
						<label>
							<input type="radio" name="lCAIsEstblOL" value="未建立团组织" v-model="leagueConstructionAnswer.isEstblOL" />
							<span>未建立团组织</span>
						</label>
					</td>
				</tr>
				<!-- 建立团组织 -->
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'"><th colspan="4" class="textCenter">以下栏目请建立团组织的企业填写</th></tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团组织负责人姓名</th>
					<td><input type="text" placeholder="请输入团组织负责人姓名" v-model="leagueConstructionAnswer.eOLPrincipalName" /></td>
					<th>*性别</th>
					<td>
						<label>
							<input type="radio" name="lCAEOLPrincipalGender" value="男" v-model="leagueConstructionAnswer.eOLPrincipalGender" />
							<span>男</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLPrincipalGender" value="女" v-model="leagueConstructionAnswer.eOLPrincipalGender" />
							<span>女</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*办公电话</th>
					<td><input type="text" placeholder="请输入办公电话" v-model="leagueConstructionAnswer.eOfficePhone" /></td>
					<th>*手机</th>
					<td><input type="text" placeholder="请输入手机号" v-model="leagueConstructionAnswer.eCellphone" /></td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团组织主管/隶属单位</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAEOLCharge" value="工商局/非公团工委" v-model="leagueConstructionAnswer.eOLCharge" />
							<span>工商局/非公团工委</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLCharge" value="市,县,街道等团委" v-model="leagueConstructionAnswer.eOLCharge" />
							<span>市,县,街道等团委</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLCharge" value="其他" v-model="leagueConstructionAnswer.eOLCharge" />
							<span>其他</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团组织建制情况</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAEOLOS" value="团委" v-model="leagueConstructionAnswer.eOLOS" />
							<span>团委</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLOS" value="团总支" v-model="leagueConstructionAnswer.eOLOS" />
							<span>团总支</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLOS" value="团支部" v-model="leagueConstructionAnswer.eOLOS" />
							<span>团支部</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团组织组建方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAEOLBuildMode" value="单独组建" v-model="leagueConstructionAnswer.eOLBuildMode" />
							<span>单独组建</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLBuildMode" value="联合组建" v-model="leagueConstructionAnswer.eOLBuildMode" />
							<span>联合组建</span>
						</label>
						<label>
							<input type="radio" name="lCAEOLBuildMode" value="其他" v-model="leagueConstructionAnswer.eOLBuildMode" />
							<span>其他</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团员人数（含预备团员）</th>
					<td><input type="text" placeholder="请输入团员人数（含预备团员）" v-model="leagueConstructionAnswer.oMNum" /></td>
					<th>*35岁以下青年人数</th>
					<td><input type="text" placeholder="请输入35岁以下青年人数" v-model="leagueConstructionAnswer.youthNum" /></td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '建立团组织'">
					<th>*团组织组建时间</th>
					<td colspan="3"><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="lCAnswerEOLBuildDate" /></td>
				</tr>
				<!-- 未建立团组织 -->
				<tr v-show="leagueConstructionAnswer.isEstblOL == '未建立团组织'"><th colspan="4" class="textCenter">以下栏目请未建立团组织的企业填写</th></tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '未建立团组织'">
					<th>*团员人数（含预备团员）</th>
					<td><input type="text" placeholder="请输入团员人数（含预备团员）" v-model="leagueConstructionAnswer.oMNum" /></td>
					<th>*35岁以下青年人数</th>
					<td><input type="text" placeholder="请输入35岁以下青年人数" v-model="leagueConstructionAnswer.youthNum" /></td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '未建立团组织'">
					<th>*团组织拟建制情况</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAUneOLOS" value="团委" v-model="leagueConstructionAnswer.uneOLOS" />
							<span>团委</span>
						</label>
						<label>
							<input type="radio" name="lCAUneOLOS" value="团总支" v-model="leagueConstructionAnswer.uneOLOS" />
							<span>团总支</span>
						</label>
						<label>
							<input type="radio" name="lCAUneOLOS" value="团支部" v-model="leagueConstructionAnswer.uneOLOS" />
							<span>团支部</span>
						</label>
					</td>
				</tr>
				<tr v-show="leagueConstructionAnswer.isEstblOL == '未建立团组织'">
					<th>*团组织拟组建方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="lCAUneOLBuildMode" value="单独组建" v-model="leagueConstructionAnswer.uneOLBuildMode" />
							<span>单独组建</span>
						</label>
						<label>
							<input type="radio" name="lCAUneOLBuildMode" value="联合组建" v-model="leagueConstructionAnswer.uneOLBuildMode" />
							<span>联合组建</span>
						</label>
						<label>
							<input type="radio" name="lCAUneOLBuildMode" value="其他" v-model="leagueConstructionAnswer.uneOLBuildMode" />
							<span>其他</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 答案 end -->

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
	name: 'LeagueConstructionInfo',
	data: function() {
		return {
			leagueConstruction: '', //团建
			lCEOLBuildDate: '', //团建 团组织组建时间
			leagueConstructionAnswer: '', //团建 答案
			lCAnswerEOLBuildDate: '', //团建 答案 团组织组建时间
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		...mapState({
			province: state => state.registerProvince, //省份
			entInfo: state => state.entInfo //企业信息
		})
	},
	watch: {
		//团建 团组织组建时间
		lCEOLBuildDate(e) {
			if (e) {
				let date = new Date(e);
				this.leagueConstruction.eOLBuildDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//团建 答案 团组织组建时间
		lCAnswerEOLBuildDate(e) {
			if (e) {
				let date = new Date(e);
				this.leagueConstructionAnswer.eOLBuildDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		}
	},
	methods: {
		// 获取 党建及答案
		getLCAndLCAnswer() {
			this.leagueConstruction = this.$store.state.leagueConstruction;
			this.leagueConstructionAnswer = this.$store.state.leagueConstructionAnswer;

			//团建 团组织组建时间
			if (this.leagueConstruction.eOLBuildDate) {
				let lCD = this.leagueConstruction.eOLBuildDate;
				let lCDYC = lCD.indexOf('年'); //年字索引
				let lCDMC = lCD.indexOf('月'); //月字索引
				let lCDDC = lCD.indexOf('日'); //日字索引
				let lCDY = lCD.slice(0, lCDYC); //年
				let lCDM = lCD.slice(lCDYC + 1, lCDMC).length == 2 ? lCD.slice(lCDYC + 1, lCDMC) : '0' + lCD.slice(lCDYC + 1, lCDMC); //月
				let lCDD = lCD.slice(lCDMC + 1, lCDDC).length == 2 ? lCD.slice(lCDMC + 1, lCDDC) : '0' + lCD.slice(lCDMC + 1, lCDDC); //日
				this.lCEOLBuildDate = new Date(lCDY + '/' + lCDM + '/' + lCDD + ' 00:00:00').getTime(); //团建 团组织组建时间
			}
			//团建 答案 团组织组建时间
			if (this.leagueConstructionAnswer.eOLBuildDate) {
				let lCAD = this.leagueConstructionAnswer.eOLBuildDate;
				let lCADYC = lCAD.indexOf('年'); //年字索引
				let lCADMC = lCAD.indexOf('月'); //月字索引
				let lCADDC = lCAD.indexOf('日'); //日字索引
				let lCADY = lCAD.slice(0, lCADYC); //年
				let lCADM = lCAD.slice(lCADYC + 1, lCADMC).length == 2 ? lCAD.slice(lCADYC + 1, lCADMC) : '0' + lCAD.slice(lCADYC + 1, lCADMC); //月
				let lCADD = lCAD.slice(lCADMC + 1, lCADDC).length == 2 ? lCAD.slice(lCADMC + 1, lCADDC) : '0' + lCAD.slice(lCADMC + 1, lCADDC); //日
				this.lCAnswerEOLBuildDate = new Date(lCADY + '/' + lCADM + '/' + lCADD + ' 00:00:00').getTime(); //团建 答案 团组织组建时间
			}
		},
		save() {
			if (this.leagueConstruction.isEstblOL == '建立团组织') {
				if (
					!this.leagueConstruction.eOLPrincipalName ||
					!this.leagueConstruction.eOfficePhone ||
					!this.leagueConstruction.eCellphone ||
					!this.leagueConstruction.eOLCharge ||
					!this.leagueConstruction.eOLOS ||
					!this.leagueConstruction.eOLBuildMode ||
					!this.leagueConstruction.oMNum ||
					!this.leagueConstruction.youthNum ||
					!this.leagueConstruction.eOLBuildDate
				) {
					this.$message.error('请完善信息');
				} else {
					this.$store.dispatch('leagueConstruction', this.leagueConstruction); //团建
					this.$store.dispatch('fLeagueConstruction', true); //已填写信息 团建
					this.$message({
						message: '保存成功',
						type: 'success'
					});
				}
			} else if (this.leagueConstruction.isEstblOL == '未建立团组织') {
				if (!this.leagueConstruction.oMNum || !this.leagueConstruction.youthNum || !this.leagueConstruction.uneOLOS || !this.leagueConstruction.uneOLBuildMode) {
					this.$message.error('请完善信息');
				} else {
					this.$store.dispatch('leagueConstruction', this.leagueConstruction); //团建
					this.$store.dispatch('fLeagueConstruction', true); //已填写信息 团建
					this.$message({
						message: '保存成功',
						type: 'success'
					});
				}
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
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;
		}
	},
	mounted() {
		// 获取 党建及答案
		this.getLCAndLCAnswer();
	}
};
</script>
