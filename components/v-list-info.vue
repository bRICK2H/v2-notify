<template>
	<div>
		<VItemInfo
			v-for="({ id, options }, i) of info"
			v-bind="options"
			
			:key="id"
			:index="i"

			@remove="$emit('remove', { id, type: 'info' })"
		/>
	</div>
</template>

<script>
import VItemInfo from './item/v-item-info.vue'

export default {
	name: 'VListInfo',
	components: {
		VItemInfo
	},
	props: {
		info: {
			type: Array,
			default: () => ([])
		}
	}
}
</script>

<style lang="scss">

</style>