<template>
	<div class="main">
		<!-- 企业信息导航栏 -->
		<enterprise-info-hd-bar />
		<!-- 企业信息导航栏 end -->

		<!-- banner -->
		<enterprise-info-banner />
		<!-- banner end -->

		<!-- 主体 -->
		<div class="bd">
			<div class="container fColumn">
				<!-- 企业信息面板 -->
				<div class="entInfoPanel fColumn">
					<!-- 企业信息面板 头部 -->
					<div class="panelHd fRow">
						<div class="time fRow">
							<img src="../assets/time.png" />
							<span>{{ currentTime }}</span>
						</div>
						<div class="enterprise fRow">
							<img src="../assets/employee.png" />
							<span>{{ entInfo.entName }}</span>
						</div>
						<div class="quit fRow hover" @click="quit()">
							<img src="../assets/quit.png" />
							<span>退出登录</span>
						</div>
					</div>
					<!-- 企业信息面板 头部 end -->

					<!-- 企业信息面板 主体 -->
					<div class="panelBd fColumn">
						<!-- 面板按钮盒子 -->
						<div class="btnBox fRow">
							<div class="panelBtn fColumn hover" @click="openReportYearReBox()">
								<div class="btnImg"></div>
								<div>年度报告填写</div>
							</div>
							<div class="panelBtn fColumn hover">
								<div class="btnImg"></div>
								<div>其他自行公示信息填报</div>
							</div>
							<div class="panelBtn fColumn hover" @click="downloadTemplate()">
								<div class="btnImg"></div>
								<div>年度报告模板下载</div>
							</div>
							<div class="panelBtn fColumn hover">
								<div class="btnImg"></div>
								<div>简易注销公告信息填报</div>
							</div>
							<div class="panelBtn fColumn hover">
								<div class="btnImg"></div>
								<div>填报须知</div>
							</div>
						</div>

						<!-- 年度报告管理 -->
						<div class="reportManager fColumn">
							<div class="titleBox">年度报告管理</div>

							<table class="reportTable">
								<thead>
									<tr>
										<th>序号</th>
										<th>报告年份</th>
										<th>最后修改日期</th>
										<th>状态</th>
										<th>公示日期</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(item, index) in annualReports">
										<tr :key="index">
											<td>{{ index + 1 }}</td>
											<td>{{ item.year }}</td>
											<td>{{ item.lastModifiedDate }}</td>
											<td>{{ item.state }}</td>
											<td>{{ item.publicityDate }}</td>
											<td>
												<router-link to="/enterpriseDetail" class="operate hover" v-if="item.editable">编辑</router-link>
												<router-link :to="'/previewPublicity/' + item.year" class="operate hover">查看或打印</router-link>
											</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
					<!-- 企业信息面板 主体 end -->
				</div>
				<!-- 企业信息面板 end -->
			</div>
		</div>
		<!-- 主体 end -->

		<!-- 企业信息底部栏 -->
		<enterprise-info-ft-bar />
		<!-- 企业信息底部栏 end -->

		<!-- 警示 提醒弹框 -->
		<removable-box :width="700" v-show="isWarnReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>警示</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeWarnReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="title">警 示</div>
				<div class="doc">
					企业您好，欢迎您按时申报年报。年报提交公示成功后，系统会发送短信提示，如未收到短信，请检查您的操作，确保申报成功。另请认真核对年报数据，以防因数据失实
					而导致企业被列入经营异常名录，影响企业信誉和正常经营。
				</div>
				<div class="doc">国家实行企业标准自我声明公开制度，请登录企业标准信息公共服务平台（http://www.qybz.org.cn/）或本平台执行标准自我声明填报栏填写</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="closeWarnReBox()">确定</div>
			</template>
		</removable-box>
		<!-- 警示 提醒弹框 end -->

		<!-- 年报年度 提醒弹框 -->
		<removable-box :width="400" v-show="isReportYearReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>选择年报年度</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeReportYearReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="selBox fRow">
					<span>年报年度</span>
					<select v-model="reportYear">
						<option value="请选择">请选择</option>
						<option :value="yesteryear">{{ yesteryear }} 年</option>
					</select>
				</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="sure hover" @click="reportYearReBoxSure()">确定</div>
			</template>
		</removable-box>
		<!-- 年报年度 提醒弹框 end -->

		<!-- 年报填写须知 提醒弹框 -->
		<removable-box :width="900" v-show="isReportNoticeReBoxShow">
			<!-- 头部标题 -->
			<template v-slot:reBoxHdTitle>
				<span>选择年报年度</span>
			</template>

			<!-- 头部 关闭按钮 -->
			<template v-slot:reBoxHdCloseBtn>
				<img src="../assets/close.png" @click="closeReportNoticeReBox()" />
			</template>

			<!-- 主体 -->
			<template v-slot:reBoxBd>
				<div class="scrollBox fColumn">
					<div class="title">年报填写须知</div>
					<div class="doc">1、本报告书仅供企业在采集年度报告信息时使用，年报申报请通过企业信用信息公示系统报送，年报时间为1月1日至6月30日。</div>
					<div class="doc">2、企业年报内容应真实可靠，无虚假成份；企业对其公示信息的真实性、及时性负责。</div>
					<div class="doc">3、企业登记事项发生变化的，应当先向工商行政管理机关申请变更登记，在工商行政管理机关作出变更登记决定后，报送年度报告。</div>
					<div class="doc">
						4、企业申报的通信地址、邮政编码、联系电话、电子邮箱、经营状态、网址、网站信息为报送年度报告时的信息，其他信息为企业所报告年份12月31日的信息。
					</div>
					<div class="doc">
						5、企业资产状况信息，数据取自企业年度资产负债表和损益表（利润表）中的期末数；币种为人民币，以万元为单位，数据小数点后保留两位；纳税总额为企业全年所交各类税金总和。
					</div>
					<div class="doc">6、企业资产状况信息及从业人员，为非强制性公示的事项，由企业自行选择是否向社会公示。</div>
					<div class="doc">
						7、表中“高校毕业生人数”是指报告期内录用的毕业两年内的高校毕业生；“退役士兵人数、残疾人数、失业人员”数是指报告期内录用的退役士兵、残疾人、失业人员。此类信息为不公示信息。
					</div>
					<div class="doc">8、党建信息为不公示信息，主要采集企业党组织的建立情况，其中中共党员（包括预备党员）人数，为截止年报年度12月31日的中共党员数。</div>
					<div class="doc">9、企业发现其年报公示的内容不准确，应于6月30日前完成更正。更正前后信息同时公示。</div>
				</div>
			</template>

			<!-- 按钮盒子 -->
			<template v-slot:btnBox>
				<div class="fColumn">
					<div class="readCheckBox">
						<label>
							<input type="checkbox" name="read" v-model="isRead" />
							<span>已阅</span>
						</label>
					</div>
					<div class="sure hover" @click="reportNoticeReBoxSure()">确定</div>
				</div>
			</template>
		</removable-box>
		<!-- 年报填写须知 提醒弹框 end -->
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EnterpriseInfoFill',
	components: {
		EnterpriseInfoHdBar: () => import('../components/EnterpriseInfoHdBar.vue'), //企业信息导航栏
		EnterpriseInfoBanner: () => import('../components/EnterpriseInfoBanner.vue'), //企业信息banner
		EnterpriseInfoFtBar: () => import('../components/EnterpriseInfoFtBar.vue'), //企业信息底部栏
		RemovableBox: () => import('../components/RemovableBox.vue') //提醒弹框
	},
	data: function() {
		return {
			currentTime: '', //当前日期
			yesteryear: '', //去年
			isWarnReBoxShow: true, //警示 提醒弹框 显示
			isReportYearReBoxShow: false, //年报年度 提醒弹框 显示
			isReportNoticeReBoxShow: false, //年报填写须知 提醒弹框 显示
			reportYear: '请选择', //报告年份
			isRead: false //已阅
		};
	},
	computed: {
		...mapState({
			annualReports: state => state.annualReports, //年度报告
			entInfo: state => state.entInfo //企业信息
		})
	},
	methods: {
		// 获取当前时间
		getCurrentTime() {
			let date = new Date();
			this.currentTime = date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1) + '月' + date.getDate() + '日';
			this.yesteryear = date.getFullYear() - 1;
		},
		// 退出登录
		quit() {
			this.$store.dispatch('isLogin', false); //登录状态
			this.$store.dispatch('registerProvince', ''); //省份

			this.$message({
				message: '已退出登录',
				type: 'success'
			});

			this.$router.push({
				path: '/'
			});
		},
		// 关闭 警示 提醒弹框
		closeWarnReBox() {
			this.isWarnReBoxShow = false;
		},
		// 打开 年报年度 提醒弹框
		openReportYearReBox() {
			this.isReportYearReBoxShow = true;
		},
		// 关闭 年报年度 提醒弹框
		closeReportYearReBox() {
			this.isReportYearReBoxShow = false;
		},
		// 年报年度 提醒弹框 确定按钮
		reportYearReBoxSure() {
			if (this.reportYear == '请选择') {
				this.$message.error('请选择年报年度');
			} else {
				this.reportYear = '请选择';
				this.closeReportYearReBox();
				this.isReportNoticeReBoxShow = true;
			}
		},
		// 关闭 年报填写须知 提醒弹框
		closeReportNoticeReBox() {
			this.isReportNoticeReBoxShow = false;
		},
		// 年报填写须知 提醒弹框 确定按钮
		reportNoticeReBoxSure() {
			if (!this.isRead) {
				this.$message.error('请勾选【已阅】后再点击确定按钮！');
			} else {
				this.isRead = false;
				this.isReportNoticeReBoxShow = false;
				this.$store.dispatch('yesteryear', this.yesteryear); //去年
				this.$router.push({
					path: '/enterpriseDetail'
				});
			}
		},
		// 年度报告模板下载按钮
		downloadTemplate() {
			window.open('http://sdxy.gov.cn/file/NBWS.zip');
		}
	},
	mounted() {
		// 获取当前时间
		this.getCurrentTime();
	}
};
</script>

<style lang="scss" scoped>
// 主体
.bd {
	flex: 1;
	min-width: 1200px;
	min-height: 600px;
	background-color: #fbf8ef;
	// 企业信息面板
	.entInfoPanel {
		margin: 20px 0 50px;
		width: 1000px;
		min-width: 1000px;
		// 企业信息面板 头部
		.panelHd {
			position: relative;
			top: -20px;
			justify-content: flex-start;
			padding: 10px 150px 10px 20px;
			width: 100%;
			color: #fff;
			font-size: 12px;
			background-color: #d1ab5b;
			border-radius: 4px;
			box-shadow: 0 1px 3px #ccc;
			.time {
				user-select: none;
				img {
					margin: 0 10px;
					width: 20px;
					height: 20px;
				}
			}
			.enterprise {
				user-select: none;
				margin-left: 50px;
				img {
					margin: 0 8px;
					width: 19px;
					height: 21px;
				}
			}
			.quit {
				margin-left: auto;
				user-select: none;
				img {
					margin: 0 10px;
					width: 20px;
					height: 22px;
				}
			}
		}
		// 企业信息面板 头部 end
		// 企业信息面板 主体
		.panelBd {
			padding: 30px 20px;
			width: 100%;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 3px #ccc;
			// 面板按钮盒子
			.btnBox {
				justify-content: space-between;
				padding: 0 20px;
				width: 100%;
				.panelBtn {
					color: #333;
					font-size: 14px;
					&:hover {
						color: #d1ab5b;
					}
					&:nth-child(2),
					&:nth-child(4) {
						.btnImg {
							width: 72px;
							background-position: -13px -95px;
						}
					}
					&:nth-child(3) {
						.btnImg {
							background-position: -14px -190px;
						}
					}
					&:nth-child(5) {
						.btnImg {
							width: 46px;
							background-position: -25px -285px;
						}
					}
					.btnImg {
						width: 70px;
						height: 94px;
						background: url('../assets/entInfoPanelBtn.png') no-repeat -11px 0;
					}
				}
			}
			// 面板按钮盒子 end
			// 年度报告管理
			.reportManager {
				width: 100%;
				.titleBox {
					position: relative;
					margin: 20px 0;
					padding-left: 30px;
					width: 100%;
					color: #804000;
					&::before {
						position: absolute;
						top: 2px;
						left: 14px;
						width: 7px;
						height: 18px;
						content: '';
						background-color: #804000;
					}
				}
				.reportTable {
					width: 100%;
					border-collapse: collapse;
					th,
					td {
						padding: 10px 0;
						font-size: 14px;
						border: 1px solid #ddd;
					}
					th {
						color: #9b7d46;
						background-color: #eae3db;
					}
					td {
						text-align: center;
						.operate {
							margin: 0 5px;
							color: #3ea8db;
						}
					}
				}
			}
			// 年度报告管理 end
		}
		// 企业信息面板 主体 end
	}
	// 企业信息面板 end
}
// 主体 end
// 年报年度 提醒弹框
#removableBox {
	.selBox {
		margin: 20px 0 10px;
		color: #333;
		select {
			margin-left: 30px;
			padding: 6px 12px;
			width: 240px;
			height: 34px;
			border: 1px solid #ccc;
			border-radius: 4px;
		}
	}
}
// 年报年度 提醒弹框 end
// 年报填写须知 提醒弹框
#removableBox {
	.scrollBox {
		justify-content: flex-start;
		width: 100%;
		height: 300px;
		font-size: 18px;
		overflow-y: auto;
	}
	.readCheckBox {
		margin: 10px 0 0;
		input[type='checkbox'] {
			position: relative;
			top: 3px;
			margin: 0 10px;
			width: 16px;
			height: 16px;
		}
		span {
			user-select: none;
		}
	}
}
// 年报填写须知 提醒弹框 end
</style>
