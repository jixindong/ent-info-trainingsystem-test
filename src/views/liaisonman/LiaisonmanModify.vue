<template>
	<div class="main">
		<!-- 网站头部装饰线 -->
		<div class="headLine"></div>

		<!-- banner -->
		<div class="banner fRow">
			<div class="container fRow">
				<img src="@/assets/national-emblem.png" />
				<span>{{ prAndBkt }}</span>
			</div>
		</div>

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<div class="registerBox fColumn">
					<div class="row fRow">
						<div class="title">统一社会信用代码/注册号</div>
						<div class="iptBox"><input class="ipt" type="text" placeholder="统一社会信用代码/注册号" v-model="entCode" /></div>
					</div>
					<div class="row fRow">
						<div class="title">企业名称</div>
						<div class="iptBox"><input class="ipt" type="text" :value="entName" placeholder="企业名称" readonly /></div>
					</div>
					<div class="row fRow">
						<div class="title">法定代表人（负责人）姓名</div>
						<div class="iptBox"><input class="ipt" type="text" :value="legalpersonName" placeholder="法定代表人（负责人）姓名" readonly /></div>
					</div>
					<div class="row fRow">
						<div class="title">法定代表人（负责人）证件号码</div>
						<div class="iptBox"><input class="ipt" type="text" maxlength="18" placeholder="法定代表人（负责人）证件号码" v-model="legalpersonIdNum" /></div>
					</div>
					<div class="row fRow">
						<div class="title">原联络员姓名</div>
						<div class="iptBox"><input class="ipt" type="text" placeholder="原联络员姓名" v-model="oEntPersonName" /></div>
					</div>
					<div class="row fRow">
						<div class="title">原联络员证件号码</div>
						<div class="iptBox"><input class="ipt" type="text" maxlength="18" placeholder="原联络员证件号码" v-model="oEntPersonIdNum" /></div>
					</div>
					<div class="row fRow">
						<div class="title">原联络员手机号码</div>
						<div class="iptBox"><input class="ipt" type="text" maxlength="12" placeholder="原联络员手机号码" v-model="oEntPersonTel" /></div>
					</div>
					<div class="row fRow">
						<div class="title">新联络员姓名</div>
						<div class="iptBox"><input class="ipt" type="text" placeholder="新联络员姓名" v-model="nEntPersonName" /></div>
					</div>
					<div class="row fRow">
						<div class="title">新联络员证件类型</div>
						<div class="iptBox">
							<select name="IDType" v-model="nEntPersonIdType">
								<option value="中华人民共和国居民身份证">中华人民共和国居民身份证</option>
								<option value="士兵证">士兵证</option>
								<option value="军官证">军官证</option>
								<option value="警官证">警官证</option>
							</select>
						</div>
					</div>
					<div class="row fRow">
						<div class="title">新联络员证件号码</div>
						<div class="iptBox"><input class="ipt" type="text" maxlength="18" placeholder="新联络员证件号码" v-model="nEntPersonIdNum" /></div>
					</div>
					<div class="row fRow">
						<div class="title">新联络员手机号码</div>
						<div class="iptBox"><input class="ipt" type="text" maxlength="11" placeholder="新联络员手机号码" v-model="nEntPersonTel" /></div>
					</div>

					<div class="fRow">
						<div class="save hover" @click="save()">保存</div>
						<div class="back hover" @click="back()">返回</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->

		<!-- 提醒弹框 -->
		<removable-box ref="reBox" :width="400" v-show="isReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>提示</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="@/assets/close.png" @click="closeReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="doc">联络员修改成功，请登录</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="reBoxSure()">确定</div>
			</template>
		</removable-box>
		<!-- 提醒弹框 end -->
	</div>
</template>

<script>
export default {
	name: 'LiaisonmanModify',
	components: {
		EnterpriseInfoFtBar: () => import('@/components/EnterpriseInfoFtBar.vue'), //企业信息底部栏
		RemovableBox: () => import('@/components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			province: '', //省份
			entName: '', //企业名称
			entCode: '', //企业统一社会信用代码
			legalpersonName: '', //法定代表人（负责人）姓名
			legalpersonIdNum: '', //法定代表人（负责人）证件号码
			oEntPersonName: '', //原联络员姓名
			oEntPersonIdNum: '', //原联络员证件号码
			oEntPersonTel: '', //原联络员手机号
			nEntPersonName: '', //新联络员姓名
			nEntPersonIdType: '中华人民共和国居民身份证', //新联络员证件类型
			nEntPersonIdNum: '', //新联络员证件号码
			nEntPersonTel: '', //新联络员手机号
			verifyUser: '', //已匹配待验证用户信息
			isReBoxShow: false //提醒弹框 显示
		};
	},
	computed: {
		//工商联络员
		users() {
			return this.$store.state.users;
		},
		//省份加括号
		prAndBkt: function() {
			return '(' + this.province + ')';
		}
	},
	watch: {
		//企业统一社会信用代码
		entCode: function(e) {
			if (e) {
				this.verifyUser = '';
				this.entName = '';
				this.legalpersonName = '';
				this.users.forEach(user => {
					if (e == user.entCode) {
						this.verifyUser = user;
						this.entName = user.entName;
						this.legalpersonName = user.entPersonName;
					}
				});
			} else {
				this.verifyUser = '';
				this.entName = '';
				this.legalpersonName = '';
			}
		}
	},
	methods: {
		// 获取 省份
		getProvince() {
			this.province = this.$route.params.pr;
		},
		//保存按钮
		save() {
			let regIdNum = new RegExp(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);
			let regTel = new RegExp(/^[1]([3-9])[0-9]{9}$/);

			if (
				!this.entCode ||
				!this.legalpersonName ||
				!this.legalpersonIdNum ||
				!this.oEntPersonName ||
				!this.oEntPersonIdNum ||
				!this.oEntPersonTel ||
				!this.nEntPersonName ||
				!this.nEntPersonIdNum ||
				!this.nEntPersonTel
			) {
				this.$message.error('请完善信息');
			} else {
				if (
					this.legalpersonIdNum != this.verifyUser.legalpersonIdNum ||
					this.oEntPersonName != this.verifyUser.entPersonName ||
					this.oEntPersonIdNum != this.verifyUser.entPersonIdNum ||
					this.oEntPersonTel != this.verifyUser.entPersonTel
				) {
					this.$message.error('法人证件号或原联络员信息有误');
				} else if (!regIdNum.test(this.nEntPersonIdNum)) {
					this.$message.error('新联络员证件号码有误');
				} else if (!regTel.test(this.nEntPersonTel)) {
					this.$message.error('手机号码格式有误');
				} else {
					this.isReBoxShow = true;
				}
			}
		},
		// 关闭 提醒弹框
		closeReBox() {
			this.isReBoxShow = false;
		},
		// 提醒弹框 确定按钮
		reBoxSure() {
			let modifyUser = {
				entName: this.entName, //企业名称
				entCode: this.entCode, //企业统一社会信用代码
				legalpersonName: this.legalpersonName, //法定代表人（负责人）姓名
				legalpersonIdNum: this.legalpersonIdNum, //法定代表人（负责人）证件号码
				entPersonName: this.nEntPersonName, //新联络员姓名
				entPersonIdType: this.nEntPersonIdType, //新联络员证件类型
				entPersonIdNum: this.nEntPersonIdNum, //新联络员证件号码
				entPersonTel: this.nEntPersonTel //新联络员手机号
			};

			this.$store.dispatch('modifyUser', modifyUser); //修改用户
			this.isReBoxShow = false;
			this.back();
		},
		//返回按钮
		back() {
			this.$router.push({
				path: '/enterpriseLogin/' + this.province
			});
		}
	},
	mounted() {
		// 获取 省份
		this.getProvince();
	}
};
</script>

<style lang="scss" scoped>
// banner
.banner {
	min-width: 1200px;
	height: 108px;
	background: url('../../assets/index-bg2.png') center/cover no-repeat;
	box-shadow: 0 1px 3px #ccc;
	z-index: 1;
	user-select: none;
	.container {
		justify-content: flex-start;
		img {
			width: 540px;
		}
		span {
			margin-top: -20px;
			color: #ab812d;
			font-size: 36px;
			font-weight: 600;
		}
	}
}
// 主体
.bd {
	flex: 1;
	min-width: 1200px;
	min-height: 700px;
	background-color: #fbf8ef;
	.registerBox {
		margin: 70px 0;
		padding: 50px 0 20px;
		width: 1000px;
		min-width: 1000px;
		font-size: 14px;
		background-color: #fff;
		border: 5px solid #ab812d;
		box-shadow: 0 1px 3px #ccc;
		.row {
			margin: 1px 0;
			height: 36px;
			.title {
				padding: 0 6px;
				width: 300px;
				height: 36px;
				line-height: 36px;
				color: #987d46;
				font-weight: 600;
				text-align: right;
				background-color: #eae3db;
				&::after {
					content: '*';
					color: #f00;
				}
			}
			.iptBox {
				padding: 0 50px;
				width: 600px;
				height: 36px;
				line-height: 36px;
				background-color: #f5f5f5;
				.ipt {
					padding: 0 12px;
					width: 350px;
					height: 34px;
					color: #555;
					border: 1px solid #ccc;
					border-radius: 4px;
					&:read-only {
						background-color: #eee;
					}
				}
				select[name='IDType'] {
					padding: 0 12px;
					width: 350px;
					height: 34px;
					color: #333;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
			}
		}
		.save,
		.back {
			margin: 20px;
			padding: 10px 40px;
			color: #fff;
			background-color: #ab812d;
			border-radius: 5px;
		}
	}
}
</style>
