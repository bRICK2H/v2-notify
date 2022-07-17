<template>
	<div class="v-item-confirm"
		:style="{
			background: color,
			zIndex: `${zIndex + startZIndex + index}`
		}"
	>
		VItemConfirm

		<button @click="$emit('remove')">remove</button>
		<button @click="add('green', 'confirm')">add-1</button>
	  	<button @click="add('blue', 'confirm')">add-2</button>

		<button v-for="({ id, title, result, resolve }) of actions"
			:key="id"
			@click="resolve(result)"
		>
			{{ title }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'VItemConfirm',
	props: {
		index: {
			type: Number,
			default: 0
		},
		color: {
			type: String,
			default: '#000'
		},
		actions: {
			type: Array,
			default: () => ([])
		},
		startZIndex: {
			type: Number,
			default: 0
		}
	},
	data: () => ({
		test: '',
		zIndex: 2000
	}),
	methods: {
		add(color, type) {
			this.$notify.open({
				color,
				type,
			})
		}
	}
}
</script>

<style lang="scss">
	.v-item-confirm {
		width: 300px;
		height: 100px;
		
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>