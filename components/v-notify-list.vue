<template>
	<transition-group name="notify-list"
		tag="div"
	>
		
		<VNotifyItem
			v-for="({
				id,
				options,
				indexType,
				lastOfType,
				isClosingStart,
				prevIdOfGroup
			}, i) of notifyList"
			
			v-bind="options"
			
			:id="id"
			:key="id"
			:index="i"
			:indexType="indexType"
			:lastOfType="lastOfType"
			:length="notifyList.length"
			:isClosingStart="isClosingStart"
			:prevIdOfGroup="lastOfType ? prevIdOfGroup : null"

			@remove="$emit('remove', { id, options })"
		/>
	</transition-group>
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
		setPrevIdOfGroup(list, positions) {
			positions
				.forEach(pos => {
					const group = list.filter(({ options: { position } }) => pos === position)
						,	groupLen = group.length

					this.$set(
						group[groupLen - 1],
						'prevIdOfGroup',
						groupLen >= 2
							? group[groupLen - 2].id
							: null
					)
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
			this.setPrevIdOfGroup(list, uniqPositions)
			this.setPropLastOfType(list, uniqPositions)
		}
	}
}
</script>

<style lang="scss">

</style>