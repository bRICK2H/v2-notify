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
		closeOnLayerItem() {
			return this.notifyList
				.findLast(({ options: { closeOnLayer } }) => closeOnLayer)
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
		remove({ id, options: { resolve } }) {
			const index = this.notifyList
				.findIndex(({ id: _id }) => _id === id)

			resolve({ name: 'closed', value: true })
			this.$delete(this.notifyList, index)
		},
		removeOnLayer({ target }) {
			const LAYER = 'v2-notify-container--layer'

			if ([...target.classList].includes(LAYER)) {
				if (this.closeOnLayerItem) {
					this.remove(this.closeOnLayerItem)
				}
			}
		}
	}
}
</script>

<style lang="scss">
	.v2-notify-container {
		position: absolute;
		top: 0;
		left: 0;
		
		&--layer {
			width: 100%;
			height: 100%;
			
			z-index: 50999;

			transition: .2s;
			background: rgba(0, 0, 0, .5);
		}
	}
</style>