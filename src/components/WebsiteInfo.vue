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
					<th>类型</th>
					<th>名称</th>
					<th>网址</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="websiteOlStore.length > 0">
				<tr v-for="(item, index) in websiteOlStore" :key="index">
					<td>{{ item.type }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.url }}</td>
					<td>
						<span class="operation hover" @click="modify(index)">修改</span>
						<span class="operation hover" @click="del(index)">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="websiteOlStore.length == 0">
				<tr><td colspan="4">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
			</tbody>
		</table>

		<!-- 添加 -->
		<table class="entDtlTbIII" v-show="isAdd">
			<tbody>
				<tr>
					<th>网站或网店类型</th>
					<td>
						<select v-model="addType">
							<option value="0">请选择</option>
							<option value="1">网站</option>
							<option value="2">网店</option>
						</select>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>网站或网店名称</th>
					<td><input type="text" placeholder="请输入网站或网店名称" v-model="addWebsiteOlStore.name" /></td>
					<th>网站或网店网址</th>
					<td><input type="text" placeholder="请输入网站或网店网址" v-model="addWebsiteOlStore.url" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 添加 end -->

		<!-- 修改 -->
		<table class="entDtlTbIII" v-show="isModify">
			<tbody>
				<tr>
					<th>网站或网店类型</th>
					<td>
						<select v-model="modifyType">
							<option value="0">请选择</option>
							<option value="1">网站</option>
							<option value="2">网店</option>
						</select>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th>网站或网店名称</th>
					<td><input type="text" placeholder="请输入网站或网店名称" v-model="modifyWebsiteOlStore.name" /></td>
					<th>网站或网店网址</th>
					<td><input type="text" placeholder="请输入网站或网店网址" v-model="modifyWebsiteOlStore.url" /></td>
				</tr>
			</tbody>
		</table>
		<!-- 修改 end -->

		<!-- 答案 -->
		<table class="entDtlTbII" v-show="isSeeAnswer">
			<thead>
				<tr>
					<th>类型</th>
					<th>名称</th>
					<th>网址</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="websiteOlStoreAnswer.length > 0">
				<tr v-for="(item, index) in websiteOlStoreAnswer" :key="index">
					<td>{{ item.type }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.url }}</td>
					<td>
						<span class="operation">修改</span>
						<span class="operation">删除</span>
					</td>
				</tr>
			</tbody>
			<tbody v-if="websiteOlStoreAnswer.length == 0">
				<tr><td colspan="4">暂无相关数据，请点击下方“添加”按钮进行操作</td></tr>
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
	name: 'WebsiteInfo',
	components: {
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			websiteOlStore: '', //网站或网店
			// 添加
			isAdd: false, //是否添加
			addWebsiteOlStore: {
				type: '', //类型
				name: '', //名称
				url: '' //网址
			}, //添加 网站或网店
			addType: '0', //添加 网站或网店 类型
			// 修改
			isModify: false, //是否修改
			modifyItemIndex: null, //当前修改元素索引
			modifyWebsiteOlStore: {
				type: '', //类型
				name: '', //名称
				url: '' //网址
			}, //修改 网站或网店
			modifyType: '0', //修改 网站或网店 类型
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
			websiteOlStoreAnswer: state => state.websiteOlStoreAnswer //网站或网店 答案
		})
	},
	watch: {
		//添加 网站或网店 类型
		addType(e) {
			if (e == 0) {
				this.addWebsiteOlStore.type = '';
			} else if (e == 1) {
				this.addWebsiteOlStore.type = '网站';
			} else if (e == 2) {
				this.addWebsiteOlStore.type = '网店';
			}
		},
		//修改 网站或网店 类型
		modifyType(e) {
			if (e == 0) {
				this.modifyWebsiteOlStore.type = '';
			} else if (e == 1) {
				this.modifyWebsiteOlStore.type = '网站';
			} else if (e == 2) {
				this.modifyWebsiteOlStore.type = '网店';
			}
		}
	},
	methods: {
		// 获取 网站或网店
		getWebsiteOlStore() {
			this.websiteOlStore = this.$store.state.websiteOlStore;
		},
		// 添加按钮
		add() {
			this.isAdd = true;
		},
		// 添加 保存按钮
		saveAdd() {
			if (!this.addWebsiteOlStore.type || !this.addWebsiteOlStore.name || !this.addWebsiteOlStore.url) {
				this.$message.error('请完善信息');
			} else {
				this.websiteOlStore.push(this.addWebsiteOlStore);
				this.addWebsiteOlStore = {
					type: '', //类型
					name: '', //名称
					url: '' //网址
				}; //添加 网站或网店
				this.addType = '0'; //添加 网站或网店 类型
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
			this.modifyWebsiteOlStore = this.websiteOlStore[e]; //修改 网站或网店
			this.modifyType = this.websiteOlStore[e].type == '网站' ? '1' : '2'; //修改 网站或网店 类型
			this.isModify = true;
		},
		// 修改 保存按钮
		saveModify() {
			if (!this.modifyWebsiteOlStore.type || !this.modifyWebsiteOlStore.name || !this.modifyWebsiteOlStore.url) {
				this.$message.error('请完善信息');
			} else {
				this.websiteOlStore[this.modifyItemIndex] = this.modifyWebsiteOlStore;
				this.modifyWebsiteOlStore = {
					type: '', //类型
					name: '', //名称
					url: '' //网址
				}; //修改 网站或网店
				this.modifyType = '0'; //修改 网站或网店 类型
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
			this.websiteOlStore.splice(this.delItemIndex, 1);
			this.delItemIndex = null;
			this.isDelReBoxShow = false;

			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		// 保存按钮
		save() {
			this.$store.dispatch('websiteOlStore', this.websiteOlStore); //网站或网店
			this.$store.dispatch('fWebsiteOlStore', true); //已填写信息 网站或网店
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
		// 获取 网站或网店
		this.getWebsiteOlStore();
	}
};
</script>
