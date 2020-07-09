<template>
	<div class="banner fRow">
		<div class="container fRow">
			<img src="../assets/national-emblem.png" />
			<span>{{ prAndBkt }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EnterpriseInfoBanner',
	computed: {
		// 省份加括号
		prAndBkt() {
			return this.$store.getters.prAndBkt;
		}
	}
};
</script>

<style lang="scss" scoped>
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
</style>
