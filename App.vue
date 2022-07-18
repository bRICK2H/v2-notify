<template>
	<div class="v2-notify-container"
		:class="setClassLayer"
	>

		<!-- <VListAlert
			:info="notify.info"
			@remove="remove"
		/>

		<VListConfirm
			:info="notify.info"
			:confirm="notify.confirm"
			@remove="remove"
		/> -->

		<VNotifyList
			:notifyList="notifyList"
			@remove="remove"
		/>

	</div>
</template>

<script>
import VNotifyList from './components/v-notify-list'
export default {
	name: 'VNotifyContainer',
	components: {
		VNotifyList
	},
	data: () => ({
		notifyList: [],
		types: ['success', 'alert', 'warning', 'question']
	}),
	computed: {
		setClassLayer() {
			return {
				'v2-notify-container--layer': this.isLayer
			}
		},
		isLayer() {
			return this.notifyList.some(({ options: { layer } }) => layer)
		}
	},
	methods: {
		add({ id, options: o, config }) {
			const { sort } = config
				, def = 'alert'
				, type = o?.type ? this.types.includes(o.type) ? o.type : def : def
				, item = {
					id,
					options: {
						...o,
						type,
						image: require(`./assets/svg/${type}.svg`)
					}
				}

			sort && sort === 'desc'
				? this.notifyList.unshift(item)
				: this.notifyList.push(item)
		},
		remove(id) {
			const index = this.notifyList
				.findIndex(({ id: _id }) => _id === id)

			this.$delete(this.notifyList, index)
		}
	}
}
</script>

<style lang="scss">
	.v2-notify-container {
		&--layer {
			width: 100%;
			height: 100%;
			
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1999;
	
			background: rgba(0, 0, 0, .5);
		}
	}
</style>