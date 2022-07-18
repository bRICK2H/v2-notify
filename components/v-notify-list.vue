<template>
	<div>
		<VNotifyItem
			v-for="({ id, options }, i) of notifyList"
			v-bind="options"
			
			:key="id"
			:index="i"
			:length="notifyList.length"

			@remove="$emit('remove', id)"
		/>
	</div>
</template>

<script>
import VNotifyItem from './v-notify-item'

export default {
	name: 'VNotifyList',
	components: {
		VNotifyItem
	},
	props: {
		notifyList: {
			type: Array,
			default: () => ([])
		}
	}
}
</script>

<style lang="scss">

</style>