<template>
	<div class="main">
		<!-- 网站头部装饰线 -->
		<div class="headLine"></div>
		<!-- 网站头部装饰线 end -->

		<!-- banner -->
		<div class="banner fRow">
			<div class="container fRow">
				<img src="../assets/national-emblem.png" />
				<span>{{ prAndBkt }}</span>
			</div>
		</div>
		<!-- banner end -->

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<!-- 企业登录盒子 -->
				<div class="entLogin fColumn">
					<div class="elHd fRow">
						<div :class="['hdTab', { active: entLoginTabIndex == 1 }]" @click="entLoginTab(1)">工商联络员登录</div>
						<div :class="['hdTab', { active: entLoginTabIndex == 2 }]" @click="entLoginTab(2)">电子营业执照登录</div>
						<div :class="['hdTab', { active: entLoginTabIndex == 3 }]" @click="entLoginTab(3)">农专、个体用户登录</div>
						<router-link to="/" class="back hover">返回首页</router-link>
					</div>
					<div class="elBd fColumn">
						<div class="bdBox fColumn" v-show="entLoginTabIndex == 1">
							<div class="row fRow">
								<div class="title required">统一社会信用代码/注册号</div>
								<input class="ipt" type="text" placeholder="统一社会信用代码/注册号" v-model="entCode" />
							</div>
							<div class="row fRow">
								<div class="title required">工商联络员身份证号码</div>
								<input class="ipt" type="text" placeholder="工商联络员身份证号码" v-model="entPersonIdNum" />
							</div>
							<div class="row fRow">
								<div class="title required">企业名称</div>
								<input class="ipt" type="text" :value="entName" placeholder="企业名称" readonly />
							</div>
							<div class="row fRow">
								<div class="title required">工商联络员姓名</div>
								<input class="ipt" type="text" :value="entPersonName" placeholder="工商联络员姓名" readonly />
							</div>
							<div class="row fRow">
								<div class="title required">工商联络员手机号</div>
								<input class="ipt" type="text" :value="entPersonTel" placeholder="工商联络员手机号" readonly />
							</div>
							<div class="row fRow">
								<div class="title">验证码</div>
								<input class="ipt iptSl" type="text" maxlength="6" placeholder="验证码" v-model="iVerifyCode" />
								<div class="getVerifyCode hover" @click="getVerifyCode()" v-show="vCBtnShow">{{ vCBtnText }}</div>
								<div class="getVerifyCode disabled" v-show="!vCBtnShow">{{ vCCount }}秒后重新获取</div>
							</div>
							<div class="btnBox fRow">
								<div class="btn hover" @click="entLogin()">登录</div>
								<div class="btn hover" @click="reset()">重置</div>
								<div class="btn hover" @click="getBack()">返回</div>
							</div>
						</div>
						<div class="bdBox fColumn" v-show="entLoginTabIndex == 2">电子营业执照登录</div>
						<div class="bdBox fColumn" v-show="entLoginTabIndex == 3">农专、个体用户登录</div>
					</div>
				</div>
				<!-- 企业登录盒子 end -->

				<!-- 企业登录提示 -->
				<div class="entLoginTip fRow">
					<span>说明：在首次【企业公示信息填报】之前，请先</span>
					<router-link class="link hover" :to="'/liaisonmanRegister/' + province">【工商联络员注册】</router-link>
					<span>，若注册信息发生变化请</span>
					<router-link class="link hover" :to="'/liaisonmanModify/' + province">【工商联络员变更】</router-link>
					<span>！</span>
				</div>
				<!-- 企业登录提示 end -->
			</div>
		</div>
		<!-- 主体 end -->

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->

		<!-- 提醒弹框 -->
		<removable-box ref="reBox" v-show="isReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>提醒</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="title">登录方式说明</div>
				<div class="doc">
					<span>1、已领取电子营业执照的企业可以通过</span>
					<span class="colorRed">【电子营业执照登录】</span>
					<span>
						方式进行登录，此方式仅支持IE浏览器，需要先安装电子营业执照驱动程序，系统默认口令为:12345678如需修改请访问： http://sdxy.gov.cn:8080/businessQuery/index.jsp
					</span>
				</div>
				<div class="doc">
					<span>2、首次填报‘企业公示信息’或未进行联络员备案的企业，应先通过登录界面下方的</span>
					<span class="colorRed">【工商联络员注册】</span>
					<span>进行备案，注册成功后便可进行登录。</span>
				</div>
				<div class="doc">
					<span>3、如果企业联络员发生变更后可以通过</span>
					<span class="colorRed">【工商联络员变更】</span>
					<span>进行变更，变更后企业可使用新联络员进行登录。</span>
				</div>
				<div class="doc">
					<span>4、农民专业合作社、个体工商户使用</span>
					<span class="colorRed">【农专、个体用户登录】</span>
					<span>方式进行登录。</span>
				</div>
				<div class="doc">
					<span>5、为了顺利进行信息填报，推荐使用</span>
					<span class="colorRed">【IE8及以上】</span>
					<span>、</span>
					<span class="colorRed">【火狐Firefox】</span>
					<span>、</span>
					<span class="colorRed">【谷歌Chrome】</span>
					<span>浏览器。</span>
				</div>
				<div class="doc">
					<span>6、使用</span>
					<span class="colorRed">【工商联络员登录】</span>
					<span>方式登陆的企业用户，同一手机号每天最多接收25条短信。</span>
				</div>
				<div class="doc">
					<span>7、</span>
					<span class="colorRed">【使用说明】</span>
					<span>http://amr.shandong.gov.cn/art/2020/3/17/art_122606_8931632.html</span>
				</div>
				<div class="doc">
					<span>8、</span>
					<span class="colorRed">【视频操作说明】</span>
					<span>http://amr.shandong.gov.cn/art/2020/3/18/art_122606_8935618.html</span>
				</div>
				<div class="doc">
					<span>9、</span>
					<span class="colorRed">【填报须知】</span>
					<span>填报须知</span>
				</div>
				<div class="doc">10、国家实行企业标准自我声明公开制度，请登录企业标准信息公共服务平台（http://www.qybz.org.cn/）或本平台执行标准自我声明填报栏填写</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="closeReBox()">确定</div>
			</template>
		</removable-box>
		<!-- 提醒弹框 end -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EnterpriseLogin',
	components: {
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue'), //企业信息底部栏
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			province: '', //省份
			entLoginTabIndex: 1, //企业登录tab切换 index
			entName: '', //企业名称
			entCode: '', //企业统一社会信用代码
			entPersonName: '', //工商联络员姓名
			entPersonIdNum: '', //工商联络员证件号码
			entPersonTel: '', //工商联络员手机号
			iVerifyCode: '', //验证码
			verifyCode: '',
			vCBtnShow: true,
			vCBtnText: '获取验证码',
			vCCount: '',
			vCTimer: null,
			isReBoxShow: true //提醒弹框 显示
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
		},
		...mapState({
			entInfo: state => state.entInfo //企业信息
		})
	},
	watch: {
		//企业统一社会信用代码
		entCode(e) {
			if (e) {
				this.entName = '';
				this.entPersonName = '';
				this.users.forEach(user => {
					if (e == user.entCode) {
						this.entName = user.entName;
						this.entPersonName = user.entPersonName;
					}
				});
			} else {
				this.entName = '';
				this.entPersonName = '';
			}
		},
		//工商联络员身份证号码
		entPersonIdNum(e) {
			if (e) {
				this.entPersonTel = '';
				this.users.forEach(user => {
					if (e == user.entPersonIdNum) {
						this.entPersonTel = user.entPersonTel.slice(0, 3) + '****' + user.entPersonTel.slice(7);
					}
				});
			} else {
				this.entPersonTel = '';
			}
		}
	},
	methods: {
		// 获取当前省份
		getProvince() {
			this.province = this.$route.params.pr; //省份
		},
		//企业登录tab切换
		entLoginTab(e) {
			this.entLoginTabIndex = e;
		},
		// 获取验证码
		getVerifyCode() {
			if (!this.entName || !this.entCode || !this.entPersonIdNum || !this.entPersonTel) {
				this.$message.error('请先完善信息');
			} else {
				let verifyCode = Math.random()
					.toString()
					.slice(-6);
				let timeCount = 30;

				this.verifyCode = verifyCode;
				this.$notify.success({
					title: '验证码',
					message: '您的验证码为：' + verifyCode,
					duration: 10000
				});

				if (!this.vCTimer) {
					this.vCBtnShow = false;
					this.vCCount = timeCount;
					this.vCTimer = setInterval(() => {
						if (this.vCCount > 0 && this.vCCount <= timeCount) {
							this.vCCount--;
						} else {
							this.vCBtnShow = true;
							this.vCBtnText = '重新获取';
							clearInterval(this.vCTimer);
							this.vCTimer = null;
						}
					}, 1000);
				}
			}
		},
		// 登录按钮
		entLogin() {
			if (!this.entName || !this.entCode || !this.entPersonName || !this.entPersonIdNum || !this.entPersonTel || !this.iVerifyCode) {
				this.$message({
					message: '请完善信息',
					type: 'warning'
				});
			} else if (!this.iVerifyCode || this.iVerifyCode.length < 6) {
				this.$message({
					message: '验证码格式有误',
					type: 'warning'
				});
			} else if (this.iVerifyCode != this.verifyCode) {
				this.$message({
					message: '验证码错误',
					type: 'error'
				});
			} else {
				this.entInfo.entName = this.entName; //企业名称
				this.entInfo.entCode = this.entCode; //企业统一社会信用代码
				this.$store.dispatch('isLogin', true); //登录状态
				this.$store.dispatch('registerProvince', this.province); //省份
				this.$store.dispatch('entInfo', this.entInfo); //企业信息

				this.$message({
					message: '恭喜您，登录成功',
					type: 'success'
				});

				this.$router.push({
					path: '/enterpriseInfoFill/' + this.province
				});
			}
		},
		// 重置按钮
		reset() {
			this.entName = '';
			this.entCode = '';
			this.entPersonName = '';
			this.entPersonIdNum = '';
			this.entPersonTel = '';
			this.verifyCode = '';
			this.$message({
				message: '填写信息已重置',
				type: 'success'
			});
		},
		// 返回按钮
		getBack() {
			this.$router.go(-1);
		},
		// 关闭 提醒弹框
		closeReBox() {
			this.isReBoxShow = false;
		}
	},
	mounted() {
		// 获取当前省份
		this.getProvince();
	}
};
</script>

<style lang="scss" scoped>
// banner
.banner {
	min-width: 1200px;
	height: 108px;
	background: url('../assets/index-bg2.png') center/cover no-repeat;
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
	.entLogin {
		margin: 70px 0 30px;
		width: 930px;
		min-width: 930px;
		overflow: hidden;
		border-radius: 5px;
		box-shadow: 0 1px 3px #ccc;
		.elHd {
			justify-content: flex-start;
			padding: 0 24px;
			width: 100%;
			height: 50px;
			color: #fff;
			background-color: #ab812d;
			.hdTab {
				align-self: flex-end;
				padding: 6px 20px;
				font-size: 18px;
				border-radius: 5px 5px 0 0;
				user-select: none;
				cursor: pointer;
				&.active {
					color: #ab812d;
					background-color: #fff;
				}
			}
			.back {
				margin-left: auto;
				padding: 6px 14px;
				color: #fff;
				font-size: 14px;
				background-color: #d1ab62;
				border-radius: 5px;
			}
		}
		.elBd {
			padding: 50px 0;
			width: 100%;
			font-size: 14px;
			background-color: #fff;
			.bdBox {
				width: 100%;
				.row {
					justify-content: flex-start;
					margin: 10px 0;
					width: 80%;
					.title {
						margin-right: 30px;
						min-width: 200px;
						color: #333;
						font-weight: 600;
						text-align: right;
					}
					.required::before {
						content: '*';
						color: #f00;
					}
					.ipt {
						padding: 6px 12px;
						width: 350px;
						height: 36px;
						color: #555;
						border: 1px solid #ccc;
						border-radius: 4px;
						&:read-only {
							background-color: #eee;
						}
					}
					.iptSl {
						width: 160px;
					}
					.getVerifyCode {
						margin: 0 30px;
						padding: 8px 0;
						width: 110px;
						color: #fff;
						text-align: center;
						background-color: #ffab30;
						border-radius: 4px;
						&.disabled {
							width: 120px;
							background-color: #ecc68d;
							pointer-events: none;
						}
					}
				}
				.btnBox {
					margin: 20px 0;
					.btn {
						margin: 0 12px;
						padding: 6px 16px;
						color: #fff;
						background-color: #d1ab62;
						border-radius: 4px;
					}
				}
			}
		}
	}
	.entLoginTip {
		color: #333;
		font-size: 14px;
		.link {
			color: #f00;
		}
	}
}
</style>
