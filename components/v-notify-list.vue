<template>
	<div class="v-notify-list">
		<transition-group name="notify-list">
			<VNotifyItem
				v-for="({
					id,
					options,
					indexType,
					lastOfType,
					isClosingStart
				}, i) of notifyList"
				v-bind="options"
				
				:key="id"
				:index="i"
				:indexType="indexType"
				:lastOfType="lastOfType"
				:length="notifyList.length"
				:isClosingStart="isClosingStart"

				@remove="$emit('remove', id)"
			/>
		</transition-group>
	</div>
</template>

<script>
import notify from '../notify'
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
	},
	methods: {
		setPropLastOfType(list, positions) {
			const positionsId = positions
				.map(pos => list.findLast(({ options: { position } }) => pos === position))
				.map(({ id }) => id)

			list.forEach(notify => {
				this.$set(notify, 'lastOfType', positionsId.includes(notify.id))
			})
		},
		setPropIndexType(list, positions) {
			const typeGroupArray = positions.map(pos => {
				return list.filter(({ options: { position } }) => pos === position)
			})
			
			typeGroupArray.forEach(container => {
				container.forEach((notify, i) => {
					this.$set(notify, 'indexType', i)
				})
			})
		},
		setPropClosingStart(list) {
			const closingArray = list
				.filter(({ options }) => {
					const { closingTime, component, actions } = options
						, isComponent = component
						, isActions = actions?.length
						, isClosingTime = typeof closingTime === 'number'

					return !isActions && !isComponent && isClosingTime
				})

			closingArray.forEach(notify => {
				const isLastNotify = closingArray[closingArray.length - 1].id === notify.id
				this.$set(notify, 'isClosingStart', isLastNotify)
			})
		}
	},
	watch: {
		notifyList(list) {
			const uniqPositions = [...new Set(list.map(({ options: { position } }) => position))]

			this.setPropClosingStart(list)
			this.setPropIndexType(list, uniqPositions)
			this.setPropLastOfType(list, uniqPositions)
		}
	}
}
</script>

<style lang="scss">

</style>