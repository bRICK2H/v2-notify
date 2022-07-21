<template>
	<div class="v2-notify-container"
		:class="setClassLayer"
		@click="removeOnLayer($event)"
	>

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
		types: ['info', 'error', 'success', 'warning', 'question']
	}),
	computed: {
		setClassLayer() {
			return {
				'v2-notify-container--layer': this.isLayer
			}
		},
		isLayer() {
			return this.notifyList.some(({ options: { layer } }) => layer)
		},
		closeOnLayerId() {
			const closeOnLayer = this.notifyList
				.findLast(({ options: { closeOnLayer } }) => closeOnLayer)
			
			return closeOnLayer ? closeOnLayer.id : null
		},

	},
	methods: {
		add({ id, options: o, config }) {
			const { sort } = config
				, def = 'info'
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
		},
		removeOnLayer({ target }) {
			const LAYER = 'v2-notify-container--layer'

			if ([...target.classList].includes(LAYER)) {
				this.closeOnLayerId
					? this.remove(this.closeOnLayerId)
					: null
			}
		}
	}
}
</script>

<style lang="scss">
	.v2-notify-container {
		position: fixed;
		top: 0;
		left: 0;
		border: 1px solid green;
		
		&--layer {
			width: 100%;
			height: 100%;
			
			z-index: 1999;

			transition: .2s;
			background: rgba(0, 0, 0, .5);
		}
	}
</style>