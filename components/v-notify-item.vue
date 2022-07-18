<template>
	<div class="v-notify-item"
		:class="`v-notify-item--${type}`"
		:style="[setStylePositionItem, {
			'--image': `url(${image})`,
			zIndex: `${zIndex + index}`,
			boxShadow: length - 1 === index ? '0px 20px 70px rgba(32, 31, 54, 0.1)' : null,
			border: length - 1 === index ? 'none' : '1px solid rgba(32, 31, 54, 0.1)'
		}]"
	>

		<img class="v-notify-item-close"
			src="../assets/svg/close.svg"
			alt="close"
			@click="$emit('remove')"
		>
		
		<div class="v-notify-item-content">
			<h2 class="v-notify-item-title">
				{{ title }}
			</h2>

			<p class="v-notify-item-text">
				{{ text }}
			</p>

		</div>

		<div class="v-notify-item-actions">
			<button v-for="action of actions"
				:key="action.id"
				class="v-notify-item-action"
				:style="{
					background: action.active ? mapColor[type] : '#fff',
					color: action.active ? '#fff' : mapColor[type],
					border: `1px solid ${mapColor[type]}`
				}"
				@click="makeAction(action)"
			>
				{{ action.name }}
			</button>
		</div>

	</div>
</template>

<script>
export default {
	name: 'VNotifyItem',
	props: {
		type: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: ''
		},
		index: {
			type: Number,
			default: 0
		},
		position: {
			type: String,
			default: 'right top'
		},
		length: {
			type: Number,
			default: 0,
		},
		actions: {
			type: Array,
			default: () => ([])
		},
	},
	data: () => ({
		zIndex: 2000,
		mapColor: {
			alert: '#a2a2b9',
			success: '#4bbac5',
			warning: '#e6a533',
			question: '#6b70e3',
		},
	}),
	computed: {
		setStylePositionItem() {
			const mapPosition = {
				'left top': { left: 0, top: `${this.index * 5}px` },
				'left bottom': { left: 0, bottom: `${this.index * 5}px` },
				'left center': { left: 0, top: `calc(50% + ${this.index * 5}px )`, transform: 'translateY(-50%)' },

				'right top': { right: 0, top: `${this.index * 5}px` },
				'right center': { right: 0, top: `calc(50% + ${this.index * 5}px )`, transform: 'translateY(-50%)' },
				'right bottom': { right: 0, bottom: `${this.index * 5}px` },

				'center top': { left: '50%', top: `${this.index * 5 }px`, transform: 'translateX(-50%)' },
				'center center': { left: '50%', top: `calc(50% + ${this.index * 5}px )`, transform: 'translate(-50%, -50%)' },
				'center bottom': { left: '50%', bottom: `${this.index * 5}px`, transform: 'translateX(-50%)' },
			}
			
			return mapPosition[this.position]
		}
	},
	methods: {
		add(color, type) {
			this.$notify.open({
				color,
				type,
			})
		},
		makeAction({ result, resolve }) {
			resolve(result)
			this.$emit('remove')
		}
	}
}
</script>

<style lang="scss">
	.v-notify-item {
		width: 100%;
		max-width: 343px;
		overflow: hidden;
		
		border-radius: 12px;
		background-color: #fff;
		// box-shadow: 2px -2px 2px rgba(32, 31, 54, 0.1);
		
		position: fixed;

		&::before {
			content: '';
			width: 100%;
			height: calc(100% - 20px);
			max-height: 220px;
			background-image: var(--image);
			background-size: contain;
			background-repeat: no-repeat;
			position: absolute;
			z-index: -1;
		}
	}

	.v-notify-item-close {
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
	}
	.v-notify-item-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 52px 16px 16px;
	}
	.v-notify-item-title {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 12px;
		line-height: 20px;
	}
	.v-notify-item-text {
		font-size: 14px;
		font-weight: 400;
		margin-bottom: 16px;
		line-height: 20px;
	}
	.v-notify-item-actions {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 8px;
	}
	.v-notify-item-action {
		flex: 1 1 147px;
		margin: 0 8px 16px;
		padding: 14px 0;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
	}
</style>