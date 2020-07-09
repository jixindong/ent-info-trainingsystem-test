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
					<th>债权人</th>
					<th>债务人</th>
					<th>主权债种类</th>
					<th>主权债数额</th>
					<th>履行债务的期限</th>
					<th>保证的期间</th>
					<th>保证的方式</th>
					<th>公示状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="externalEnsure.length > 0">
				<tr v-for="(item, index) in externalEnsure" :key="index">
					<td>{{ item.zqr }}</td>
					<td>{{ item.zwr }}</td>
					<td>{{ item.zqzzl }}</td>
					<td>{{ item.zqzse }}</td>
					<td>{{ item.zwqxq }} - {{ item.zwqxz }}</td>
					<td>{{ item.bzqj }}</td>
					<td>{{ item.bzfs }}</td>
					<td>{{ item.gszt }}</td>
					<td>
						<span class="operation hover" @click="modify(index)">修改</span>
						<span class="operation hover" @click="del(index)">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="externalEnsure.length == 0">
				<tr><td colspan="9">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>

		<!-- 添加 -->
		<table class="entDtlTbIII" v-show="isAdd">
			<tbody>
				<tr>
					<th>是否公示</th>
					<td colspan="3">
						<label>
							<input type="radio" name="addGszt" value="公示" v-model="addExternalEnsure.gszt" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="addGszt" value="不公示" v-model="addExternalEnsure.gszt" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>债权人</th>
					<td><input type="text" placeholder="请输入债权人" v-model="addExternalEnsure.zqr" /></td>
					<th>债务人</th>
					<td><input type="text" placeholder="请输入债务人" v-model="addExternalEnsure.zwr" /></td>
				</tr>
				<tr>
					<th>主权债种类</th>
					<td>
						<select v-model="addZqzzl">
							<option value="0">请选择</option>
							<option value="1">合同</option>
							<option value="2">其他</option>
						</select>
					</td>
					<th>主权债数额</th>
					<td><input type="number" min="0" placeholder="请输入主权债数额" v-model="addExternalEnsure.zqzse" /></td>
				</tr>
				<tr>
					<th>履行债务的期限</th>
					<td colspan="3">
						<el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="addZwqxq" />
						<span>-</span>
						<el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="addZwqxz" />
					</td>
				</tr>
				<tr>
					<th>保证的期间</th>
					<td colspan="3">
						<label>
							<input type="radio" name="addBzqj" value="期限" v-model="addExternalEnsure.bzqj" />
							<span>期限</span>
						</label>
						<label>
							<input type="radio" name="addBzqj" value="未约定" v-model="addExternalEnsure.bzqj" />
							<span>未约定</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>保证的方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="addBzfs" value="一般保证" v-model="addExternalEnsure.bzfs" />
							<span>一般保证</span>
						</label>
						<label>
							<input type="radio" name="addBzfs" value="连带保证" v-model="addExternalEnsure.bzfs" />
							<span>连带保证</span>
						</label>
						<label>
							<input type="radio" name="addBzfs" value="未约定" v-model="addExternalEnsure.bzfs" />
							<span>未约定</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 添加 -->

		<!-- 修改 -->
		<table class="entDtlTbIII" v-show="isModify">
			<tbody>
				<tr>
					<th>是否公示</th>
					<td colspan="3">
						<label>
							<input type="radio" name="modifyGszt" value="公示" v-model="modifyExternalEnsure.gszt" />
							<span>公示</span>
						</label>
						<label>
							<input type="radio" name="modifyGszt" value="不公示" v-model="modifyExternalEnsure.gszt" />
							<span>不公示</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>债权人</th>
					<td><input type="text" placeholder="请输入债权人" v-model="modifyExternalEnsure.zqr" /></td>
					<th>债务人</th>
					<td><input type="text" placeholder="请输入债务人" v-model="modifyExternalEnsure.zwr" /></td>
				</tr>
				<tr>
					<th>主权债种类</th>
					<td>
						<select v-model="modifyZqzzl">
							<option value="0">请选择</option>
							<option value="1">合同</option>
							<option value="2">其他</option>
						</select>
					</td>
					<th>主权债数额</th>
					<td><input type="number" min="0" placeholder="请输入主权债数额" v-model="modifyExternalEnsure.zqzse" /></td>
				</tr>
				<tr>
					<th>履行债务的期限</th>
					<td colspan="3">
						<el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="modifyZwqxq" />
						<span>-</span>
						<el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="modifyZwqxz" />
					</td>
				</tr>
				<tr>
					<th>保证的期间</th>
					<td colspan="3">
						<label>
							<input type="radio" name="modifyBzqj" value="期限" v-model="modifyExternalEnsure.bzqj" />
							<span>期限</span>
						</label>
						<label>
							<input type="radio" name="modifyBzqj" value="未约定" v-model="modifyExternalEnsure.bzqj" />
							<span>未约定</span>
						</label>
					</td>
				</tr>
				<tr>
					<th>保证的方式</th>
					<td colspan="3">
						<label>
							<input type="radio" name="modifyBzfs" value="一般保证" v-model="modifyExternalEnsure.bzfs" />
							<span>一般保证</span>
						</label>
						<label>
							<input type="radio" name="modifyBzfs" value="连带保证" v-model="modifyExternalEnsure.bzfs" />
							<span>连带保证</span>
						</label>
						<label>
							<input type="radio" name="modifyBzfs" value="未约定" v-model="modifyExternalEnsure.bzfs" />
							<span>未约定</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 修改 end -->

		<!-- 答案 -->
		<table class="entDtlTbII" v-show="isSeeAnswer">
			<thead>
				<tr>
					<th>债权人</th>
					<th>债务人</th>
					<th>主权债种类</th>
					<th>主权债数额</th>
					<th>履行债务的期限</th>
					<th>保证的期间</th>
					<th>保证的方式</th>
					<th>公示状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="externalEnsureAnswer.length > 0">
				<tr v-for="(item, index) in externalEnsureAnswer" :key="index">
					<td>{{ item.zqr }}</td>
					<td>{{ item.zwr }}</td>
					<td>{{ item.zqzzl }}</td>
					<td>{{ item.zqzse }}</td>
					<td>{{ item.zwqxq }} - {{ item.zwqxz }}</td>
					<td>{{ item.bzqj }}</td>
					<td>{{ item.bzfs }}</td>
					<td>{{ item.gszt }}</td>
					<td>
						<span class="operation">修改</span>
						<span class="operation">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="externalEnsureAnswer.length == 0">
				<tr><td colspan="9">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>
		<!-- 答案 end -->

		<div class="btnBox fRow">
			<div class="btn hover" @click="add()" v-show="!isAdd && !isModify && !isSeeAnswer">添加</div>
			<div class="btn hover" @click="saveAdd()" v-show="isAdd">保存</div>
			<div class="btn hover" @click="saveModify()" v-show="isModify">保存</div>
			<div class="btn hover" @click="save()" v-show="!isAdd && !isModify && !isSeeAnswer">保存</div>
			<div class="btn hover" @click="close()">关闭</div>
			<div class="btn hover" @click="seeAnswer()" v-show="!isAdd && !isModify && !isSeeAnswer">查看答案</div>
			<div class="btn hover" @click="backTo()" v-show="isAdd || isModify || isSeeAnswer">返回</div>
		</div>

		<!-- 确认删除 提醒弹框 -->
		<removable-box :width="300" v-show="isDelReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>确认删除</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeDelReBox()" />
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
	name: 'ExternalEnsureInfo',
	components: {
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			externalEnsure: '', //对外担保
			// 添加
			isAdd: false, //是否添加
			addExternalEnsure: {
				zqr: '', //债权人
				zwr: '', //债务人
				zqzzl: '', //主权债种类
				zqzse: '', //主权债数额
				zwqxq: '', //履行债务的期限 起
				zwqxz: '', //履行债务的期限 止
				bzqj: '未约定', //保证的期间
				bzfs: '未约定', //保证的方式
				gszt: '不公示' //公示状态
			}, //添加 对外担保
			addZqzzl: '0', //添加 对外担保 主权债种类
			addZwqxq: '', //添加 对外担保 履行债务的期限 起
			addZwqxz: '', //添加 对外担保 履行债务的期限 止
			// 修改
			isModify: false, //是否修改
			modifyItemIndex: null, //当前修改元素索引
			modifyExternalEnsure: {
				zqr: '', //债权人
				zwr: '', //债务人
				zqzzl: '', //主权债种类
				zqzse: '', //主权债数额
				zwqxq: '', //履行债务的期限 起
				zwqxz: '', //履行债务的期限 止
				bzqj: '未约定', //保证的期间
				bzfs: '未约定', //保证的方式
				gszt: '不公示' //公示状态
			}, //修改 对外担保
			modifyZqzzl: '0', //修改 对外担保 主权债种类
			modifyZwqxq: '', //修改 对外担保 履行债务的期限 起
			modifyZwqxz: '', //修改 对外担保 履行债务的期限 止
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
			externalEnsureAnswer: state => state.externalEnsureAnswer //对外担保 答案
		})
	},
	watch: {
		//添加 对外担保 主权债种类
		addZqzzl(e) {
			if (e == 0) {
				this.addExternalEnsure.zqzzl = '';
			} else if (e == 1) {
				this.addExternalEnsure.zqzzl = '合同';
			} else if (e == 2) {
				this.addExternalEnsure.zqzzl = '其他';
			}
		},
		//添加 对外担保 履行债务的期限 起
		addZwqxq(e) {
			if (e) {
				let date = new Date(e);
				this.addExternalEnsure.zwqxq = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//添加 对外担保 履行债务的期限 止
		addZwqxz(e) {
			if (e) {
				let date = new Date(e);
				this.addExternalEnsure.zwqxz = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//修改 对外担保 主权债种类
		modifyZqzzl(e) {
			if (e == 0) {
				this.modifyExternalEnsure.zqzzl = '';
			} else if (e == 1) {
				this.modifyExternalEnsure.zqzzl = '合同';
			} else if (e == 2) {
				this.modifyExternalEnsure.zqzzl = '其他';
			}
		},
		//修改 对外担保 履行债务的期限 起
		modifyZwqxq(e) {
			if (e) {
				let date = new Date(e);
				this.modifyExternalEnsure.zwqxq = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//修改 对外担保 履行债务的期限 止
		modifyZwqxz(e) {
			if (e) {
				let date = new Date(e);
				this.modifyExternalEnsure.zwqxz = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		}
	},
	methods: {
		// 获取 对外担保
		getExternalEnsure() {
			this.externalEnsure = this.$store.state.externalEnsure;
		},
		// 添加按钮
		add() {
			this.isAdd = true;
		},
		// 添加 保存按钮
		saveAdd() {
			if (
				!this.addExternalEnsure.zqr ||
				!this.addExternalEnsure.zwr ||
				!this.addExternalEnsure.zqzzl ||
				!this.addExternalEnsure.zqzse ||
				!this.addExternalEnsure.zwqxq ||
				!this.addExternalEnsure.zwqxz
			) {
				this.$message.error('请完善信息');
			} else {
				this.externalEnsure.push(this.addExternalEnsure);
				this.addExternalEnsure = {
					zqr: '', //债权人
					zwr: '', //债务人
					zqzzl: '', //主权债种类
					zqzse: '', //主权债数额
					zwqxq: '', //履行债务的期限 起
					zwqxz: '', //履行债务的期限 止
					bzqj: '未约定', //保证的期间
					bzfs: '未约定', //保证的方式
					gszt: '不公示' //公示状态
				}; //添加 对外担保
				this.addZqzzl = '0'; //添加 对外担保 主权债种类
				this.addZwqxq = ''; //添加 对外担保 履行债务的期限 起
				this.addZwqxz = ''; //添加 对外担保 履行债务的期限 止
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
			//修改 对外担保 履行债务的期限 起
			let zwqxq = this.externalEnsure[e].zwqxq;
			let zwqxqYC = zwqxq.indexOf('年'); //年字索引
			let zwqxqMC = zwqxq.indexOf('月'); //月字索引
			let zwqxqDC = zwqxq.indexOf('日'); //日字索引
			let zwqxqY = zwqxq.slice(0, zwqxqYC); //年
			let zwqxqM = zwqxq.slice(zwqxqYC + 1, zwqxqMC).length == 2 ? zwqxq.slice(zwqxqYC + 1, zwqxqMC) : '0' + zwqxq.slice(zwqxqYC + 1, zwqxqMC); //月
			let zwqxqD = zwqxq.slice(zwqxqMC + 1, zwqxqDC).length == 2 ? zwqxq.slice(zwqxqMC + 1, zwqxqDC) : '0' + zwqxq.slice(zwqxqMC + 1, zwqxqDC); //日
			//修改 对外担保 履行债务的期限 止
			let zwqxz = this.externalEnsure[e].zwqxz;
			let zwqxzYC = zwqxq.indexOf('年');
			let zwqxzMC = zwqxq.indexOf('月');
			let zwqxzDC = zwqxq.indexOf('日');
			let zwqxzY = zwqxz.slice(0, zwqxzYC);
			let zwqxzM = zwqxz.slice(zwqxzYC + 1, zwqxzMC).length == 2 ? zwqxz.slice(zwqxzYC + 1, zwqxzMC) : '0' + zwqxz.slice(zwqxzYC + 1, zwqxzMC);
			let zwqxzD = zwqxz.slice(zwqxzMC + 1, zwqxzDC).length == 2 ? zwqxz.slice(zwqxzMC + 1, zwqxzDC) : '0' + zwqxz.slice(zwqxzMC + 1, zwqxzDC);

			this.modifyExternalEnsure = this.externalEnsure[e]; //修改 对外担保
			this.modifyZwqxq = new Date(zwqxqY + '/' + zwqxqM + '/' + zwqxqD + ' 00:00:00').getTime(); //修改 对外担保 履行债务的期限 起
			this.modifyZwqxz = new Date(zwqxzY + '/' + zwqxzM + '/' + zwqxzD + ' 00:00:00').getTime(); //修改 对外担保 履行债务的期限 止
			this.isModify = true;
		},
		// 修改 保存按钮
		saveModify() {
			if (
				!this.modifyExternalEnsure.zqr ||
				!this.modifyExternalEnsure.zwr ||
				!this.modifyExternalEnsure.zqzzl ||
				!this.modifyExternalEnsure.zqzse ||
				!this.modifyExternalEnsure.zwqxq ||
				!this.modifyExternalEnsure.zwqxz
			) {
				this.$message.error('请完善信息');
			} else {
				this.externalEnsure[this.modifyItemIndex] = this.modifyExternalEnsure;
				this.modifyExternalEnsure = {
					zqr: '', //债权人
					zwr: '', //债务人
					zqzzl: '', //主权债种类
					zqzse: '', //主权债数额
					zwqxq: '', //履行债务的期限 起
					zwqxz: '', //履行债务的期限 止
					bzqj: '未约定', //保证的期间
					bzfs: '未约定', //保证的方式
					gszt: '不公示' //公示状态
				}; //修改 对外担保
				this.modifyZqzzl = '0'; //修改 对外担保 主权债种类
				this.modifyZwqxq = ''; //修改 对外担保 履行债务的期限 起
				this.modifyZwqxz = ''; //修改 对外担保 履行债务的期限 止
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
			this.externalEnsure.splice(this.delItemIndex, 1);
			this.delItemIndex = null;
			this.isDelReBoxShow = false;

			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		// 保存按钮
		save() {
			this.$store.dispatch('externalEnsure', this.externalEnsure); //对外担保
			this.$store.dispatch('fExternalEnsure', true); //已填写信息 对外担保
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
		// 获取 对外担保
		this.getExternalEnsure();
	}
};
</script>
