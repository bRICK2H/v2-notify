<template>
	<div class="test"
		:style="{
			background: color,
			top: `${index * 5}px`,
			zIndex: `${zIndex + index}`
		}"
	>
		VItemInfo

		<button @click="$emit('remove')">remove</button>
	</div>
</template>

<script>
export default {
	name: 'VItemInfo',
	props: {
		index: {
			type: Number,
			default: 0
		},
		color: {
			type: String,
			default: '#000'
		}
	},
	data: () => ({
		test: '',
		zIndex: 2000
	}),
}
</script>

<style lang="scss">
	.test {
		width: 300px;
		height: 100px;
		position: fixed;
		right: 0;
	}
</style>