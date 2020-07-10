<template>
	<div class="entDtlMain">
		<div class="mainTitle">
			<span>企业名称：</span>
			<strong>{{ this.entInfo.entName }}</strong>
			<span></span>
			<span>统一社会信用代码/注册号：</span>
			<strong>{{ this.entInfo.entCode }}</strong>
		</div>

		<table class="entDtlTbII" v-show="!isAdd && !isModify && !isSeeAnswer">
			<thead>
				<tr>
					<th>股东</th>
					<th>
						<p>认缴出资额</p>
						<p>（万元）</p>
					</th>
					<th>认缴出资时间</th>
					<th>认缴出资方式</th>
					<th>
						<p>实缴出资额</p>
						<p>（万元）</p>
					</th>
					<th>实缴出资时间</th>
					<th>实缴出资方式</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="shareholderFund.length > 0">
				<tr v-for="(item, index) in shareholderFund" :key="index">
					<td>{{ item.gd }}</td>
					<td>{{ item.rje }}</td>
					<td>{{ item.rjsj }}</td>
					<td>{{ item.rjfs }}</td>
					<td>{{ item.sje }}</td>
					<td>{{ item.sjsj }}</td>
					<td>{{ item.sjfs }}</td>
					<td>
						<span class="operation hover" @click="modify(index)">修改</span>
						<span class="operation hover" @click="del(index)">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="shareholderFund.length == 0">
				<tr><td colspan="8">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>

		<!-- 添加 -->
		<table class="entDtlTbIII" v-show="isAdd">
			<tbody>
				<tr>
					<th>股东</th>
					<td><input type="text" placeholder="请输入股东姓名" v-model="addShareholderFund.gd" /></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>认缴出资额（万元）</th>
					<td><input type="number" min="0" placeholder="请输入认缴出资额（万元）" v-model="addShareholderFund.rje" /></td>
					<th>认缴出资时间</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="addRjsj" /></td>
				</tr>
				<tr>
					<th>认缴出资方式</th>
					<td>
						<label>
							<input type="checkbox" name="rje" value="货币" v-model="addRjfs" />
							<span>货币</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="实物" v-model="addRjfs" />
							<span>实物</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="知识产权" v-model="addRjfs" />
							<span>知识产权</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="其他" v-model="addRjfs" />
							<span>其他</span>
						</label>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>实缴出资额（万元）</th>
					<td><input type="number" min="0" placeholder="请输入实缴出资额（万元）" v-model="addShareholderFund.sje" /></td>
					<th>实缴出资时间</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="addSjsj" /></td>
				</tr>
				<tr>
					<th>实缴出资方式</th>
					<td>
						<label>
							<input type="checkbox" name="rje" value="货币" v-model="addSjfs" />
							<span>货币</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="实物" v-model="addSjfs" />
							<span>实物</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="知识产权" v-model="addSjfs" />
							<span>知识产权</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="其他" v-model="addSjfs" />
							<span>其他</span>
						</label>
					</td>
					<td colspan="2"></td>
				</tr>
			</tbody>
		</table>
		<!-- 添加 end -->

		<!-- 修改 -->
		<table class="entDtlTbIII" v-show="isModify">
			<tbody>
				<tr>
					<th>股东</th>
					<td><input type="text" placeholder="请输入股东姓名" v-model="modifyShareholderFund.gd" /></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>认缴出资额（万元）</th>
					<td><input type="number" min="0" placeholder="请输入认缴出资额（万元）" v-model="modifyShareholderFund.rje" /></td>
					<th>认缴出资时间</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="modifyRjsj" /></td>
				</tr>
				<tr>
					<th>认缴出资方式</th>
					<td>
						<label>
							<input type="checkbox" name="rje" value="货币" v-model="modifyRjfs" />
							<span>货币</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="实物" v-model="modifyRjfs" />
							<span>实物</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="知识产权" v-model="modifyRjfs" />
							<span>知识产权</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="其他" v-model="modifyRjfs" />
							<span>其他</span>
						</label>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>实缴出资额（万元）</th>
					<td><input type="number" min="0" placeholder="请输入实缴出资额（万元）" v-model="modifyShareholderFund.sje" /></td>
					<th>实缴出资时间</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="modifySjsj" /></td>
				</tr>
				<tr>
					<th>实缴出资方式</th>
					<td>
						<label>
							<input type="checkbox" name="rje" value="货币" v-model="modifySjfs" />
							<span>货币</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="实物" v-model="modifySjfs" />
							<span>实物</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="知识产权" v-model="modifySjfs" />
							<span>知识产权</span>
						</label>
						<label>
							<input type="checkbox" name="rje" value="其他" v-model="modifySjfs" />
							<span>其他</span>
						</label>
					</td>
					<td colspan="2"></td>
				</tr>
			</tbody>
		</table>
		<!-- 修改 end -->

		<!-- 答案 -->
		<table class="entDtlTbII" v-show="isSeeAnswer">
			<thead>
				<tr>
					<th>股东</th>
					<th>
						<p>认缴出资额</p>
						<p>（万元）</p>
					</th>
					<th>认缴出资时间</th>
					<th>认缴出资方式</th>
					<th>
						<p>实缴出资额</p>
						<p>（万元）</p>
					</th>
					<th>实缴出资时间</th>
					<th>实缴出资方式</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="shareholderFundAnswer.length > 0">
				<tr v-for="(item, index) in shareholderFundAnswer" :key="index">
					<td>{{ item.gd }}</td>
					<td>{{ item.rje }}</td>
					<td>{{ item.rjsj }}</td>
					<td>{{ item.rjfs }}</td>
					<td>{{ item.sje }}</td>
					<td>{{ item.sjsj }}</td>
					<td>{{ item.sjfs }}</td>
					<td>
						<span class="operation">修改</span>
						<span class="operation">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="shareholderFundAnswer.length == 0">
				<tr><td colspan="8">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>
		<!-- 答案 end -->

		<div class="btnBox fRow">
			<div class="btn hover" @click="add()" v-show="!isAdd && !isModify && !isSeeAnswer">添加</div>
			<div class="btn hover" @click="saveAdd()" v-show="isAdd">保存</div>
			<div class="btn hover" @click="saveModify()" v-show="isModify">保存</div>
			<div class="btn hover" @click="save()" v-show="!isAdd && !isModify && !isSeeAnswer">保存</div>
			<div class="btn hover" @click="close()">关闭</div>
			<div class="btn hover" @click="backTo()" v-show="isAdd || isModify || isSeeAnswer">返回</div>
			<div class="btn hover" @click="seeAnswer()" v-show="!isAdd && !isModify && !isSeeAnswer">查看答案</div>
		</div>

		<!-- 确认删除 提醒弹框 -->
		<removable-box :width="300" v-show="isDelReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>确认删除</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="@/assets/close.png" @click="closeDelReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="doc">确认是否删除？</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="delReBoxSure()">确定</div>
				<div class="cancel hover" @click="closeDelReBox()">取消</div>
			</template>
		</removable-box>
		<!-- 确认删除 提醒弹框 end -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ShareholderInfo',
	components: {
		RemovableBox: () => import('@/components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			shareholderFund: '', //股东及出资
			// 添加
			isAdd: false, //是否添加
			addShareholderFund: {
				gd: '', //股东
				rje: '', //认缴出资额（万元）
				rjsj: '', //认缴出资时间
				rjfs: '', //认缴出资方式
				sje: '', //实缴出资额（万元）
				sjsj: '', //实缴出资时间
				sjfs: '' //实缴出资方式
			}, //添加 股东及出资
			addRjfs: [], //添加 股东及出资 认缴出资方式
			addRjsj: '', //添加 股东及出资 认缴出资时间
			addSjfs: [], //添加 股东及出资 实缴出资方式
			addSjsj: '', //添加 股东及出资 实缴出资时间
			// 修改
			isModify: false, //是否修改
			modifyItemIndex: null, //当前修改元素索引
			modifyShareholderFund: {
				gd: '', //股东
				rje: '', //认缴出资额（万元）
				rjsj: '', //认缴出资时间
				rjfs: '', //认缴出资方式
				sje: '', //实缴出资额（万元）
				sjsj: '', //实缴出资时间
				sjfs: '' //实缴出资方式
			}, //修改 股东及出资
			modifyRjfs: [], //修改 股东及出资 认缴出资方式
			modifyRjsj: '', //修改 股东及出资 认缴出资时间
			modifySjfs: [], //修改 股东及出资 实缴出资方式
			modifySjsj: '', //修改 股东及出资 实缴出资时间
			// 删除
			delItemIndex: null, //当前删除元素索引
			isDelReBoxShow: false, //确认删除 提醒弹框 显示
			// 查看答案
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		...mapState({
			province: state => state.registerProvince, //省份
			entInfo: state => state.entInfo, //企业信息
			shareholderFundAnswer: state => state.shareholderFundAnswer //股东及出资 答案
		})
	},
	watch: {
		//添加 股东及出资 认缴出资方式
		addRjfs(e) {
			if (e.length == 0) {
				this.addShareholderFund.rjfs = '';
			} else {
				this.addShareholderFund.rjfs = e.join('、');
			}
		},
		//添加 股东及出资 认缴出资时间
		addRjsj(e) {
			if (e) {
				let date = new Date(e);
				this.addShareholderFund.rjsj = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//添加 股东及出资 实缴出资方式
		addSjfs(e) {
			if (e.length == 0) {
				this.addShareholderFund.sjfs = '';
			} else {
				this.addShareholderFund.sjfs = e.join('、');
			}
		},
		//添加 股东及出资 实缴出资时间
		addSjsj(e) {
			if (e) {
				let date = new Date(e);
				this.addShareholderFund.sjsj = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//修改 股东及出资 认缴出资方式
		modifyRjfs(e) {
			if (e.length == 0) {
				this.modifyShareholderFund.rjfs = '';
			} else {
				this.modifyShareholderFund.rjfs = e.join('、');
			}
		},
		//修改 股东及出资 认缴出资时间
		modifyRjsj(e) {
			if (e) {
				let date = new Date(e);
				this.modifyShareholderFund.rjsj = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//修改 股东及出资 实缴出资方式
		modifySjfs(e) {
			if (e.length == 0) {
				this.modifyShareholderFund.sjfs = '';
			} else {
				this.modifyShareholderFund.sjfs = e.join('、');
			}
		},
		//修改 股东及出资 实缴出资时间
		modifySjsj(e) {
			if (e) {
				let date = new Date(e);
				this.modifyShareholderFund.sjsj = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		}
	},
	methods: {
		// 获取 股东及出资
		getShareholderFund() {
			this.shareholderFund = this.$store.state.shareholderFund;
		},
		// 添加按钮
		add() {
			this.isAdd = true;
		},
		// 添加 保存按钮
		saveAdd() {
			if (
				!this.addShareholderFund.gd ||
				!this.addShareholderFund.rje ||
				!this.addShareholderFund.rjsj ||
				!this.addShareholderFund.rjfs ||
				!this.addShareholderFund.sje ||
				!this.addShareholderFund.sjsj ||
				!this.addShareholderFund.sjfs
			) {
				this.$message.error('请完善信息');
			} else {
				this.shareholderFund.push(this.addShareholderFund);
				this.addShareholderFund = {
					gd: '', //股东
					rje: '', //认缴出资额（万元）
					rjsj: '', //认缴出资时间
					rjfs: '', //认缴出资方式
					sje: '', //实缴出资额（万元）
					sjsj: '', //实缴出资时间
					sjfs: '' //实缴出资方式
				};
				this.addRjfs = []; //添加 股东及出资 认缴出资方式
				this.addRjsj = ''; //添加 股东及出资 认缴出资时间
				this.addSjfs = []; //添加 股东及出资 实缴出资方式
				this.addSjsj = ''; //添加 股东及出资 实缴出资时间
				this.isAdd = false;

				this.$message({
					message: '保存成功',
					type: 'success'
				});
			}
		},
		// 修改按钮
		modify(e) {
			this.modifyItemIndex = e; //当前修改元素索引
			//修改 股东及出资 认缴出资时间
			let rjsj = this.shareholderFund[e].rjsj;
			let rjsjYC = rjsj.indexOf('年'); //年字索引
			let rjsjMC = rjsj.indexOf('月'); //月字索引
			let rjsjDC = rjsj.indexOf('日'); //日字索引
			let rjsjY = rjsj.slice(0, rjsjYC); //年
			let rjsjM = rjsj.slice(rjsjYC + 1, rjsjMC).length == 2 ? rjsj.slice(rjsjYC + 1, rjsjMC) : '0' + rjsj.slice(rjsjYC + 1, rjsjMC); //月
			let rjsjD = rjsj.slice(rjsjMC + 1, rjsjDC).length == 2 ? rjsj.slice(rjsjMC + 1, rjsjDC) : '0' + rjsj.slice(rjsjMC + 1, rjsjDC); //日
			//修改 股东及出资 实缴出资时间
			let sjsj = this.shareholderFund[e].sjsj;
			let sjsjYC = sjsj.indexOf('年');
			let sjsjMC = sjsj.indexOf('月');
			let sjsjDC = sjsj.indexOf('日');
			let sjsjY = sjsj.slice(0, sjsjYC);
			let sjsjM = sjsj.slice(sjsjYC + 1, sjsjMC).length == 2 ? sjsj.slice(sjsjYC + 1, sjsjMC) : '0' + sjsj.slice(sjsjYC + 1, sjsjMC);
			let sjsjD = sjsj.slice(sjsjMC + 1, sjsjDC).length == 2 ? sjsj.slice(sjsjMC + 1, sjsjDC) : '0' + sjsj.slice(sjsjMC + 1, sjsjDC);

			this.modifyShareholderFund = this.shareholderFund[e]; //修改 股东及出资
			this.modifyRjfs = this.shareholderFund[e].rjfs.split('、'); //修改 股东及出资 认缴出资方式
			this.modifySjfs = this.shareholderFund[e].sjfs.split('、'); //修改 股东及出资 实缴出资方式
			this.modifyRjsj = new Date(rjsjY + '/' + rjsjM + '/' + rjsjD + ' 00:00:00').getTime(); //修改 股东及出资 认缴出资时间
			this.modifySjsj = new Date(sjsjY + '/' + sjsjM + '/' + sjsjD + ' 00:00:00').getTime(); //修改 股东及出资 实缴出资时间
			this.isModify = true;
		},
		// 修改 保存按钮
		saveModify() {
			if (
				!this.modifyShareholderFund.gd ||
				!this.modifyShareholderFund.rje ||
				!this.modifyShareholderFund.rjsj ||
				!this.modifyShareholderFund.rjfs ||
				!this.modifyShareholderFund.sje ||
				!this.modifyShareholderFund.sjsj ||
				!this.modifyShareholderFund.sjfs
			) {
				this.$message.error('请完善信息');
			} else {
				this.shareholderFund[this.modifyItemIndex] = this.modifyShareholderFund;
				this.modifyShareholderFund = {
					gd: '', //股东
					rje: '', //认缴出资额（万元）
					rjsj: '', //认缴出资时间
					rjfs: '', //认缴出资方式
					sje: '', //实缴出资额（万元）
					sjsj: '', //实缴出资时间
					sjfs: '' //实缴出资方式
				};
				this.modifyRjfs = []; //添加 股东及出资 认缴出资方式
				this.modifyRjsj = ''; //添加 股东及出资 认缴出资时间
				this.modifySjfs = []; //添加 股东及出资 实缴出资方式
				this.modifySjsj = ''; //添加 股东及出资 实缴出资时间
				this.modifyItemIndex = null;
				this.isModify = false;

				this.$message({
					message: '保存成功',
					type: 'success'
				});
			}
		},
		// 删除按钮
		del(e) {
			this.delItemIndex = e;
			this.isDelReBoxShow = true;
		},
		// 关闭 确认删除 提醒弹框
		closeDelReBox() {
			this.isDelReBoxShow = false;
		},
		// 确认删除 提醒弹框 确定按钮
		delReBoxSure() {
			this.shareholderFund.splice(this.delItemIndex, 1);
			this.delItemIndex = null;
			this.isDelReBoxShow = false;

			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		// 保存按钮
		save() {
			this.$store.dispatch('shareholderFund', this.shareholderFund); //股东及出资
			this.$store.dispatch('fShareholderFund', true); //已填写信息 股东及出资
			this.$message({
				message: '保存成功',
				type: 'success'
			});
		},
		// 关闭按钮
		close() {
			// 跳转 企业信息填报页面
			this.$router.push({
				path: '/enterpriseInfoFill/' + this.province
			});
		},
		// 返回按钮
		backTo() {
			this.isAdd = false;
			this.isModify = false;
			this.isSeeAnswer = false;
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;
		}
	},
	mounted() {
		// 获取 股东及出资
		this.getShareholderFund();
	}
};
</script>
