<template>
	<div class="v2-notify-container"
		:class="setClassLayer"
	>

		<VListAlert
			:info="notify.info"
			@remove="remove"
		/>

		<VListConfirm
			:confirm="notify.confirm"
			:startZIndex="notify.info.length"
			@remove="remove"
		/>

	</div>
</template>

<script>
import VListAlert from './components/v-list-info'
import VListConfirm from './components/v-list-confirm'

export default {
	name: 'V2NotifyContainer',
	components: {
		VListAlert,
		VListConfirm,
	},
	data: () => ({
		cards: [],
		notify: {
			info: [],
			confirm: []
		}
	}),
	computed: {
		setClassLayer() {
			return {
				'v2-notify-container--layer': this.notify.confirm.length
			}
		}
	},
	methods: {
		add({ id, options, config }) {
			const { sort } = config
				,	type = options?.type ?? 'info'

			if (this.notify[type]) {
				sort && sort === 'desc'
					? this.notify[type].unshift({ id, options })
					: this.notify[type].push({ id, options })

				console.warn(this.notify)

			} else {
				console.warn('[v2-notify]: укажите корректный тип оповещания')
			}
		},
		remove({ id, type }) {
			const index = this.notify[type]
				.findIndex(({ id: _id }) => _id === id)

			this.$delete(this.notify[type], index)
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