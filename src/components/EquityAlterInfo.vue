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
					<th>变更前股权比例</th>
					<th>变更后股权比例</th>
					<th>股权变更日期</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="equityAlter.length > 0">
				<tr v-for="(item, index) in equityAlter" :key="index">
					<td>{{ item.gd }}</td>
					<td>{{ item.bgq }}</td>
					<td>{{ item.bgh }}</td>
					<td>{{ item.bgrq }}</td>
					<td>
						<span class="operation hover" @click="modify(index)">修改</span>
						<span class="operation hover" @click="del(index)">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="equityAlter.length == 0">
				<tr><td colspan="5">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>

		<!-- 添加 -->
		<table class="entDtlTbIII" v-show="isAdd">
			<tbody>
				<tr>
					<th>股东</th>
					<td><input type="text" placeholder="请输入股东名称" v-model="addEquityAlter.gd" /></td>
					<th>股权变更日期</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="addBgrq" /></td>
				</tr>
				<tr>
					<th>股权变更前比例</th>
					<td><input type="text" placeholder="请输入股权变更前比例" v-model="addEquityAlter.bgq" /></td>
					<th>股权变更后比例</th>
					<td><input type="text" placeholder="请输入股权变更后比例" v-model="addEquityAlter.bgh" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 添加 end -->

		<!-- 修改 -->
		<table class="entDtlTbIII" v-show="isModify">
			<tbody>
				<tr>
					<th>股东</th>
					<td><input type="text" placeholder="请输入股东名称" v-model="modifyEquityAlter.gd" /></td>
					<th>股权变更日期</th>
					<td><el-date-picker class="elDatePicker" type="date" placeholder="选择日期" value-format="timestamp" v-model="modifyBgrq" /></td>
				</tr>
				<tr>
					<th>股权变更前比例</th>
					<td><input type="text" placeholder="请输入股权变更前比例" v-model="modifyEquityAlter.bgq" /></td>
					<th>股权变更后比例</th>
					<td><input type="text" placeholder="请输入股权变更后比例" v-model="modifyEquityAlter.bgh" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 修改 end -->

		<!-- 答案 -->
		<table class="entDtlTbII" v-show="isSeeAnswer">
			<thead>
				<tr>
					<th>股东</th>
					<th>变更前股权比例</th>
					<th>变更后股权比例</th>
					<th>股权变更日期</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="equityAlterAnswer.length > 0">
				<tr v-for="(item, index) in equityAlterAnswer" :key="index">
					<td>{{ item.gd }}</td>
					<td>{{ item.bgq }}</td>
					<td>{{ item.bgh }}</td>
					<td>{{ item.bgrq }}</td>
					<td>
						<span class="operation">修改</span>
						<span class="operation">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="equityAlterAnswer.length == 0">
				<tr><td colspan="5">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
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
	name: 'EquityAlterInfo',
	components: {
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			equityAlter: '', //股权变更
			// 添加
			isAdd: false, //是否添加
			addEquityAlter: {
				gd: '', //股东
				bgq: '', //变更前股权比例
				bgh: '', //变更后股权比例
				bgrq: '' //股权变更日期
			}, //添加 股权变更
			addBgrq: '', //添加 股权变更 股权变更日期
			// 修改
			isModify: false, //是否修改
			modifyItemIndex: null, //当前修改元素索引
			modifyEquityAlter: {
				gd: '', //股东
				bgq: '', //变更前股权比例
				bgh: '', //变更后股权比例
				bgrq: '' //股权变更日期
			}, //修改 股权变更
			modifyBgrq: '', //修改 股权变更 股权变更日期
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
			equityAlterAnswer: state => state.equityAlterAnswer //股权变更 答案
		})
	},
	watch: {
		//添加 股权变更 股权变更日期
		addBgrq(e) {
			if (e) {
				let date = new Date(e);
				this.addEquityAlter.bgrq = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		},
		//修改 股权变更 股权变更日期
		modifyBgrq(e) {
			if (e) {
				let date = new Date(e);
				this.modifyEquityAlter.bgrq = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			}
		}
	},
	methods: {
		// 获取 股权变更
		getEquityAlter() {
			this.equityAlter = this.$store.state.equityAlter;
		},
		// 添加按钮
		add() {
			this.isAdd = true;
		},
		// 添加 保存按钮
		saveAdd() {
			if (!this.addEquityAlter.gd || !this.addEquityAlter.bgq || !this.addEquityAlter.bgh || !this.addEquityAlter.bgrq) {
				this.$message.error('请完善信息');
			} else {
				this.equityAlter.push(this.addEquityAlter);
				this.addEquityAlter = {
					gd: '', //股东
					bgq: '', //变更前股权比例
					bgh: '', //变更后股权比例
					bgrq: '' //股权变更日期
				}; //添加 股权变更
				this.addBgrq = ''; //添加 股权变更 股权变更日期
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
			this.modifyEquityAlter = this.equityAlter[e]; //修改 股权变更
			//修改 股权变更 股权变更日期
			let bgrq = this.equityAlter[e].bgrq;
			let bgrqYC = bgrq.indexOf('年'); //年字索引
			let bgrqMC = bgrq.indexOf('月'); //月字索引
			let bgrqDC = bgrq.indexOf('日'); //日字索引
			let bgrqY = bgrq.slice(0, bgrqYC); //年
			let bgrqM = bgrq.slice(bgrqYC + 1, bgrqMC).length == 2 ? bgrq.slice(bgrqYC + 1, bgrqMC) : '0' + bgrq.slice(bgrqYC + 1, bgrqMC); //月
			let bgrqD = bgrq.slice(bgrqMC + 1, bgrqDC).length == 2 ? bgrq.slice(bgrqMC + 1, bgrqDC) : '0' + bgrq.slice(bgrqMC + 1, bgrqDC); //日

			this.modifyBgrq = new Date(bgrqY + '/' + bgrqM + '/' + bgrqD + ' 00:00:00').getTime(); //修改 股权变更 股权变更日期
			this.isModify = true;
		},
		// 修改 保存按钮
		saveModify() {
			if (!this.modifyEquityAlter.gd || !this.modifyEquityAlter.bgq || !this.modifyEquityAlter.bgh || !this.modifyEquityAlter.bgrq) {
				this.$message.error('请完善信息');
			} else {
				this.equityAlter[this.modifyItemIndex] = this.modifyEquityAlter;
				this.modifyEquityAlter = {
					gd: '', //股东
					bgq: '', //变更前股权比例
					bgh: '', //变更后股权比例
					bgrq: '' //股权变更日期
				}; //修改 股权变更
				this.modifyBgrq = ''; //修改 股权变更 股权变更日期
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
			this.equityAlter.splice(this.delItemIndex, 1);
			this.delItemIndex = null;
			this.isDelReBoxShow = false;

			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		// 保存按钮
		save() {
			this.$store.dispatch('equityAlter', this.equityAlter); //股权变更
			this.$store.dispatch('fEquityAlter', true); //已填写信息 股权变更
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
		// 获取 股权变更
		this.getEquityAlter();
	}
};
</script>
