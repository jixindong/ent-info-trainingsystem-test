<template>
	<div id="removableBox" class="fColumn" ref="removableBox">
		<div class="removableBoxHd fRow" ref="removableBoxHd" @mousedown="removeStart($event)" @mouseup="removeEnd()">
			<!-- 头部标题 -->
			<slot name="reBoxHdTitle"></slot>

			<!-- 头部 关闭按钮 -->
			<div class="close hover" @mousedown.stop=""><slot name="reBoxHdCloseBtn"></slot></div>
		</div>

		<div class="removableBoxBd fColumn" ref="removableBoxBd">
			<!-- 主体 -->
			<slot name="reBoxBd"></slot>

			<!-- 按钮盒子 -->
			<div class="fRow"><slot name="btnBox"></slot></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RemovableBox',
	data: function() {
		return {
			isRemove: false,
			reBoxX: '',
			reBoxY: '',
			reBoxHdHeight: '',
			reBoxBdWidth: '',
			reBoxBdHeight: ''
		};
	},
	props: {
		width: Number //可移动盒子 宽度
	},
	methods: {
		// 设置 可移动盒子 宽度
		setReBoxWidth() {
			this.$refs.removableBox.style.width = this.width + 'px';
		},
		// 设置 可移动盒子 位置
		setReBoxPosition() {
			let innerWidth = parseFloat(window.innerWidth).toFixed(2);
			let innerHeight = parseFloat(window.innerHeight).toFixed(2);
			let reBox = this.$refs.removableBox;
			let reBoxW = parseFloat(reBox.offsetWidth ? reBox.offsetWidth : reBox.style.width).toFixed(2);
			let reBoxH = parseFloat(reBox.offsetHeight ? reBox.offsetHeight : 300).toFixed(2);

			this.$refs.removableBox.style.top = (innerHeight - reBoxH) / 2 + 'px';
			this.$refs.removableBox.style.left = (innerWidth - reBoxW) / 2 + 'px';
		},
		// 鼠标移动事件
		mouseMoveEvent() {
			let that = this;
			that.reBoxHdHeight = that.$refs.removableBoxHd.offsetHeight;
			that.reBoxBdWidth = that.$refs.removableBoxBd.offsetWidth;
			that.reBoxBdHeight = that.$refs.removableBoxBd.offsetHeight;

			// 鼠标移动事件 侦听器
			document.addEventListener('mousemove', function(e) {
				if (that.isRemove) {
					let cx = e.clientX - that.reBoxX;
					let cy = e.clientY - that.reBoxY;
					if (cx < 0) {
						cx = 0;
					}
					if (cy < 0) {
						cy = 0;
					}
					if (window.innerWidth - e.clientX + that.reBoxX < that.reBoxBdWidth) {
						cx = window.innerWidth - that.reBoxBdWidth;
					}
					if (e.clientY > window.innerHeight - that.reBoxBdHeight - that.reBoxHdHeight + that.reBoxY) {
						cy = window.innerHeight - that.reBoxHdHeight - that.reBoxBdHeight;
					}
					// 鼠标移动到 浏览器外 移动结束
					if (e.clientX < 0 || e.clientX > window.innerWidth || e.clientY < 0) {
						that.removeEnd();
					}
					// 鼠标移动到 可移动盒子内容部分 移动结束
					if (e.clientY > window.innerHeight - that.reBoxBdHeight) {
						that.removeEnd();
					}

					that.$refs.removableBox.style.left = cx + 'px';
					that.$refs.removableBox.style.top = cy + 'px';
				}
			});
			document.addEventListener('mouseup', function(e) {
				if (e.clientX < 0 || e.clientX > window.innerWidth || e.clientY < 0 || e.clientY > window.innerHeight) {
					that.removeEnd();
				}
			});
		},
		// 可移动盒子头部 鼠标移动事件
		removeStart(e) {
			this.isRemove = true;
			this.reBoxX = e.offsetX;
			this.reBoxY = e.offsetY;
			this.$refs.removableBox.style.opacity = 0.9;
		},
		// 移动结束
		removeEnd() {
			this.isRemove = false;
			this.$refs.removableBox.style.opacity = 1;
		}
	},
	mounted() {
		this.$nextTick(() => {
			// 设置 可移动盒子 宽度
			this.setReBoxWidth();
			// 设置 可移动盒子 位置
			this.setReBoxPosition();
			// 鼠标移动事件
			this.mouseMoveEvent();
		});
	}
};
</script>

<style lang="scss" scoped>
#removableBox {
	position: fixed;
	top: 0;
	left: 0;
	width: 500px;
	overflow: hidden;
	border-radius: 2px;
	box-shadow: 0 1px 3px #ccc;
	z-index: 1;
	.removableBoxHd {
		justify-content: space-between;
		padding: 0 20px;
		width: 100%;
		height: 40px;
		color: #fff;
		background-color: #d1ab5b;
		cursor: move;
		user-select: none;
		span {
			pointer-events: none;
		}
		.close {
			width: 16px;
			height: 16px;
			img {
				width: 16px;
				height: 16px;
			}
		}
	}
	.removableBoxBd {
		padding: 10px 20px;
		width: 100%;
		font-size: 14px;
		background-color: #fff;
		.title {
			margin: 10px 0;
			color: #f00;
			font-size: 20px;
		}
		.doc {
			align-self: flex-start;
			margin: 5px 0;
			color: #333;
			.colorRed {
				color: #f00;
			}
		}
		.sure,
		.cancel {
			margin: 10px 10px 0 10px;
			padding: 6px 30px;
			border-radius: 4px;
		}
		.sure {
			color: #fff;
			background-color: #d4b562;
		}
		.cancel {
			color: #d4b562;
			background-color: #fff;
			border: 1px solid #d4b562;
		}
	}
}
</style>
