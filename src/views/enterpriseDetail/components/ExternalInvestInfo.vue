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
					<th>投资设立企业或购买股权企业名称</th>
					<th>统一社会信用代码/注册号</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="externalInvest.length > 0">
				<tr v-for="(item, index) in externalInvest" :key="index">
					<td>{{ item.entName }}</td>
					<td>{{ item.entCode }}</td>
					<td>
						<span class="operation hover" @click="modify(index)">修改</span>
						<span class="operation hover" @click="del(index)">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="externalInvest.length == 0">
				<tr><td colspan="3">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>

		<!-- 添加 -->
		<table class="entDtlTbIII" v-show="isAdd">
			<tbody>
				<tr>
					<th>投资设立企业或购买股权企业名称</th>
					<td><input type="text" placeholder="请输入投资设立企业或购买股权企业名称" v-model="addExternalInvest.entName" /></td>
				</tr>
				<tr>
					<th>统一社会信用代码/注册号</th>
					<td><input type="text" placeholder="请输入统一社会信用代码/注册号" v-model="addExternalInvest.entCode" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 添加 end -->

		<!-- 修改 -->
		<table class="entDtlTbIII" v-show="isModify">
			<tbody>
				<tr>
					<th>投资设立企业或购买股权企业名称</th>
					<td><input type="text" placeholder="请输入投资设立企业或购买股权企业名称" v-model="modifyExternalInvest.entName" /></td>
				</tr>
				<tr>
					<th>统一社会信用代码/注册号</th>
					<td><input type="text" placeholder="请输入统一社会信用代码/注册号" v-model="modifyExternalInvest.entCode" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 修改 end -->

		<!-- 答案 -->
		<table class="entDtlTbII" v-show="isSeeAnswer">
			<thead>
				<tr>
					<th>投资设立企业或购买股权企业名称</th>
					<th>统一社会信用代码/注册号</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="externalInvestAnswer.length > 0">
				<tr v-for="(item, index) in externalInvestAnswer" :key="index">
					<td>{{ item.entName }}</td>
					<td>{{ item.entCode }}</td>
					<td>
						<span class="operation">修改</span>
						<span class="operation">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="externalInvestAnswer.length == 0">
				<tr><td colspan="3">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
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
	name: 'ExternalInvestInfo',
	components: {
		RemovableBox: () => import('@/components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			externalInvest: '', //对外投资
			// 添加
			isAdd: false, //是否添加
			addExternalInvest: {
				entName: '', //投资设立企业或购买股权企业名称
				entCode: '' //统一社会信用代码/注册号
			}, //添加 对外投资
			// 修改
			isModify: false, //是否修改
			modifyItemIndex: null, //当前修改元素索引
			modifyExternalInvest: {
				entName: '', //投资设立企业或购买股权企业名称
				entCode: '' //统一社会信用代码/注册号
			}, //修改 对外投资
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
			externalInvestAnswer: state => state.externalInvestAnswer //对外投资 答案
		})
	},
	methods: {
		// 获取 对外投资
		getExternalInvest() {
			this.externalInvest = this.$store.state.externalInvest;
		},
		// 添加按钮
		add() {
			this.isAdd = true;
		},
		// 添加 保存按钮
		saveAdd() {
			if (!this.addExternalInvest.entName || !this.addExternalInvest.entCode) {
				this.$message.error('请完善信息');
			} else {
				this.externalInvest.push(this.addExternalInvest);
				this.addExternalInvest = {
					entName: '', //投资设立企业或购买股权企业名称
					entCode: '' //统一社会信用代码/注册号
				}; //添加 对外投资
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
			this.modifyExternalInvest = this.externalInvest[e]; //修改 对外投资
			this.isModify = true;
		},
		// 修改 保存按钮
		saveModify() {
			if (!this.modifyExternalInvest.entName || !this.modifyExternalInvest.entCode) {
				this.$message.error('请完善信息');
			} else {
				this.externalInvest[this.modifyItemIndex] = this.modifyExternalInvest;
				this.modifyExternalInvest = {
					entName: '', //投资设立企业或购买股权企业名称
					entCode: '' //统一社会信用代码/注册号
				}; //修改 对外投资
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
			this.externalInvest.splice(this.delItemIndex, 1);
			this.delItemIndex = null;
			this.isDelReBoxShow = false;

			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		// 保存按钮
		save() {
			this.$store.dispatch('externalInvest', this.externalInvest); //对外投资
			this.$store.dispatch('fExternalInvest', true); //已填写信息 对外投资
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
		// 获取 对外投资
		this.getExternalInvest();
	}
};
</script>
