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
					<th>办理使用登记特种设备总台数</th>
					<td>
						<input type="number" min="0" class="w80" placeholder="请输入办理使用登记特种设备总台数" v-model="specialEquipment.bldjsb" />
						<span>台（套数）</span>
					</td>
				</tr>
				<tr>
					<th>检验有效期内特种设备总台数</th>
					<td>
						<input type="number" min="0" class="w80" placeholder="请输入检验有效期内特种设备总台数" v-model="specialEquipment.zjyxsb" />
						<span>台（套数）</span>
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
	name: 'EquipmentInfo',
	data: function() {
		return {
			specialEquipment: '', //特种设备
			isSeeAnswer: false //是否查看答案
		};
	},
	computed: {
		...mapState({
			province: state => state.registerProvince, //省份
			entInfo: state => state.entInfo, //企业信息
			specialEquipmentAnswer: state => state.specialEquipmentAnswer //特种设备 答案
		})
	},
	methods: {
		// 获取 特种设备
		getSpecialEquipment() {
			this.specialEquipment = this.$store.state.specialEquipment;
		},
		// 保存按钮
		save() {
			if (this.specialEquipment.bldjsb == '' || this.specialEquipment.zjyxsb == '') {
				this.$message.error('请完善信息');
			} else {
				this.$store.dispatch('specialEquipment', this.specialEquipment); //特种设备
				this.$store.dispatch('fSpecialEquipment', true); //已填写信息 特种设备
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

			this.specialEquipment = this.$store.state.specialEquipment;
		},
		// 查看答案按钮
		seeAnswer() {
			this.isSeeAnswer = true;

			this.specialEquipment = Object.assign(this.$store.state.specialEquipmentAnswer);
		}
	},
	mounted() {
		// 获取 特种设备
		this.getSpecialEquipment();
	}
};
</script>
