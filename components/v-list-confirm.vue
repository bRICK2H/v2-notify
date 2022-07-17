<template>
	<div class="v-list-confirm">
		<VItemConfirm
			v-for="({ id, options }, i) of confirm"
			v-bind="options"
			
			:key="id"
			:index="i"
			:startZIndex="startZIndex"

			@remove="$emit('remove', { id, type: 'confirm' })"
		/>
	</div>
</template>

<script>
import VItemConfirm from './item/v-item-confirm'

export default {
	name: 'VListConfirm',
	components: {
		VItemConfirm
	},
	props: {
		confirm: {
			type: Array,
			default: () => ([])
		},
		startZIndex: {
			type: Number,
			default: 0
		}
	}
}
</script>

<style lang="scss">

</style>