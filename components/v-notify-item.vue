<template>
	<div class="v-notify-item"
		:class="`v-notify-item--${type}`"
		:style="[setStylePositionItem, setStyleItem, {
			'--image': `url(${image})`,
			'--translateX': isPieceOfSideCenter ? '-50%' : 0,
			'--translateY': isUpTransform ? '-80vh' : '50vh',
		}]"
	>

		<img v-show="isCloseButton" 
			class="v-notify-item-close"
			src="../assets/svg/close.svg"
			alt="close"
			@click="$emit('remove')"
		>
		
		<div class="v-notify-item-content">
			<h2 v-show="title"
				class="v-notify-item-title"
			>
				{{ title }}
			</h2>

			<p v-show="text"
				class="v-notify-item-text"
			>
				{{ text }}
			</p>

			<component :is="component"
				@result="setResult"
			/>

		</div>

		<div v-show="actions.length"
			class="v-notify-item-actions"
		>
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
		isCloseButton: {
			type: Boolean,
			default: true
		},
		image: {
			type: String,
			default: ''
		},
		index: {
			type: Number,
			default: 0
		},
		indexType: {
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
		lastOfType: {
			type: Boolean,
			default: false
		},
		actions: {
			type: Array,
			default: () => ([])
		},
		isClosingStart: {
			type: Boolean,
			default: false
		},
		closingTime: null,
		component: null
	},
	data: () => ({
		zIndex: 2000,
		timeoutId: 0,
		cResult: null,
		mapColor: {
			alert: '#a2a2b9',
			success: '#4bbac5',
			warning: '#e6a533',
			question: '#6b70e3',
		},
	}),
	computed: {
		isPieceOfSideCenter() {
			const [center] = this.position.split(' ')

			return center === 'center' 
		},
		isUpTransform() {
			return this.position.includes('top')
				|| (this.position.includes('center') && !this.position.includes('bottom'))
		},
		setStyleItem() {
			return {
				zIndex: `${this.zIndex + this.index}`,
				boxShadow: this.lastOfType ? '0px 5px 40px rgba(32, 31, 54, .3)' : 'none',
				border: this.lastOfType ? 'none' : '1px solid rgba(32, 31, 54, 0.1)'
			}
		},
		setStylePositionItem() {
			const mapPosition = {
				'left top': { left: 0, top: `${this.indexType * 5}px` },
				'left bottom': { left: 0, bottom: `${this.indexType * 5}px` },
				'left center': { left: 0, top: `calc(50% + ${this.indexType * 5}px )`, transform: 'translateY(-50%)' },

				'right top': { right: 0, top: `${this.indexType * 5}px` },
				'right center': { right: 0, top: `calc(50% + ${this.indexType * 5}px )`, transform: 'translateY(-50%)' },
				'right bottom': { right: 0, bottom: `${this.indexType * 5}px` },

				'center top': { left: '50%', top: `${this.indexType * 5 }px`, transform: 'translateX(-50%)' },
				'center center': { left: '50%', top: `calc(50% + ${this.indexType * 5}px )`, transform: 'translate(-50%, -50%)' },
				'center bottom': { left: '50%', bottom: `${this.indexType * 5}px`, transform: 'translateX(-50%)' },
			}
			
			return mapPosition[this.position]
		},
	},
	methods: {
		add(color, type) {
			this.$notify.open({
				color,
				type,
			})
		},
		makeAction({ value, resolve }) {
			resolve({
				value,
				...this.getResult()
			})
			
			this.$emit('remove')
		},
		getResult() {
			return this.cResult !== null
				? { cResult: this.cResult } : {}
		},
		setResult(result) {
			this.cResult = result
		}
	},
	watch: {
		isClosingStart: {
			immediate: true,
			handler(is) {
				if (is) {
					this.timeoutId = setTimeout(() => {
						this.$emit('remove')
					}, this.closingTime)
				} else {
					clearTimeout(this.timeoutId)
				}
				
			}
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
		flex: 1 1 45%;
		margin: 0 8px 16px;
		padding: 14px 0;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
	}

	.notify-list-enter-active {
		animation: enter-notify-item .4s;

		@keyframes enter-notify-item {
			0% { transform: translate(var(--translateX), 50vh); }
		}
	}
	.notify-list-leave-active {
		animation: leave-notify-item .4s;

		@keyframes leave-notify-item {
			// 100% { transform: translate(var(--translateX), -50vh); }
			100% { transform: translate(var(--translateX), var(--translateY)); }
		}
	}
</style>