<template>
	<div class="v-notify-item"
		tabindex="0"
		:id="notifyItemRef"
		:ref="notifyItemRef"
		:class="{ 'v-notify-item--behind': !lastOfType && !isGrab && !isPrevShow}"
		:style="[
			setStyleItem,
			isGrab ? setComputedPositionItem : setStylePositionItem,
			{
				'--image': `url(${image})`,
				'--translateX': isPieceOfSideCenter ?  `calc(50% - ${(width / 2)}px)` : 0,
				'--translateY': isUpTransform ? '-70vh' : '50vh',
			}
		]"

		@mousedown="grab"
	>

		<img v-show="isCloseButton" 
			class="v-notify-item-close"
			src="../assets/svg/close.svg"
			alt="close"
			@mousedown.stop
			@click="$emit('remove')"
		>
		
		<div class="v-notify-scroll-content">
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

				<div v-show="component"
					class="v-notify-item-component"
				>
					<component :is="component"
						@mousedown.native.stop
						@input="setComponentValue"
					/>
				</div>
			</div>
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
				@mousedown.stop
				@click="makeAction(action)"
			>
				{{ action.name }}
			</button>
		</div>

	</div>
</template>

<script>
const getPosition = () => {
	return {
		x: 0,
		y: 0,
		layerX: 0,
		layerY: 0
	}
}

export default {
	name: 'VNotifyItem',
	props: {
		id: {
			type: Symbol,
			default: Symbol('id')
		},
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
		prevIdOfGroup: null,
		closingTime: null,
		component: null
	},
	data: () => ({
		isPrevShow: false,
		width: 0,
		height: 0,
		zIndex: 2000,
		timeoutId: 0,
		isGrab: false,
		notifyItemRef: '',
		componentValue: null,
		computedPos: getPosition(),
		mapColor: {
			info: '#a2a2b9',
			error: '#ef4058',
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
				boxShadow: this.lastOfType ? '0px 5px 30px rgba(32, 31, 54, .5)' : 'none',
				borderLeft: !this.lastOfType && this.isPrevShow  ? '1px solid rgba(32, 31, 54, 0.1)' : 'none',
				borderRight: !this.lastOfType && this.isPrevShow  ? '1px solid rgba(32, 31, 54, 0.1)' : 'none',
				borderTop: !this.lastOfType && this.isUpTransform || this.isPrevShow  ? '1px solid rgba(32, 31, 54, 0.1)' : 'none',
				borderBottom: !this.lastOfType && !this.isUpTransform || this.isPrevShow ? '1px solid rgba(32, 31, 54, 0.1)' : 'none'
			}
		},
		setStylePositionItem() {
			const mapPosition = {
				'left top': { left: 0, top: `${this.indexType * 5}px` },
				'left bottom': { left: 0, bottom: `${this.indexType * 5}px` },
				'left center': { left: 0, top: `calc(50% + ${this.indexType * 5 - (this.height / 2)}px )` },

				'right top': { right: 0, top: `${this.indexType * 5}px` },
				'right center': { right: 0, top: `calc(50% + ${this.indexType * 5 - (this.height / 2)}px )` },
				'right bottom': { right: 0, bottom: `${this.indexType * 5}px` },

				'center top': { left: `calc(50% - ${(this.width / 2)}px)`, top: `${this.indexType * 5}px` },
				'center center': { left: `calc(50% - ${(this.width / 2)}px)`, top: `calc(50% + ${this.indexType * 5 - (this.height / 2)}px )` },
				'center bottom': { left: `calc(50% - ${(this.width / 2)}px)`, bottom: `${this.indexType * 5}px` },
			}
			
			return mapPosition[this.position]
		},
		setComputedPositionItem() {
			const { x, y } = this.computedPos
			
			return {
				left: `${x}px`,
				top: `${y}px`,
			}
		}
	},
	methods: {
		add(color, type) {
			this.$notify.open({
				color,
				type,
			})
		},
		makeAction({ name, value, resolve }) {
			resolve({
				name,
				value,
				...this.getComponentValue()
			})
			
			this.$emit('remove')
		},
		getComponentValue() {
			return this.componentValue !== null
				? { componentValue: this.componentValue } : {}
		},
		setComponentValue(result) {
			this.componentValue = result
		},
		grab(e) {
			const { layerX, layerY } = e

			this.computedPos.layerX = layerX
			this.computedPos.layerY = layerY
			this.isGrab = true
		},
		move(e) {
			const { layerX, layerY } = this.computedPos
				, { x, y } = e

			this.computedPos.x = x - layerX
			this.computedPos.y = y - layerY
		}
	},
	watch: {
		isGrab(grab) {
			const action = grab ? 'add' : 'remove'

			if (this.prevIdOfGroup) {
				const prevIdOfGroup = this.$parent.$children
					.find(({ id: _id }) => _id === this.prevIdOfGroup)

				prevIdOfGroup.isPrevShow = grab
			}

			if (grab) {
				this.zIndex = this.zIndex * 2
			} else {
				this.zIndex = 2000
				this.computedPos = getPosition()
			}

			window[`${action}EventListener`]('mousedown', this.move)
			window[`${action}EventListener`]('mousemove', this.move)
		},
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
	},
	created() {
		this.notifyItemRef = `#id-${String(Math.random()).slice(2, 10)}`
	},
	mounted() {
		const node = this.$refs[this.notifyItemRef]
			?? document.querySelector(this.notifyItemRef)

		node.focus()
		this.width = node.offsetWidth
		this.height = node.offsetHeight

		window.addEventListener('mouseup', () => {
			if (this.isGrab) this.isGrab = false
		})
		window.addEventListener('keydown', e => {
			const { code } = e

			if (code === 'Escape') {
				e.stopPropagation()
			}
		})
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
		outline: none;
		position: fixed;
		user-select: none;
		cursor: grab;

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

		&:hover {
			transition: box-shadow .2s;
			box-shadow: 0px 5px 10px rgba(32, 31, 54, .5) !important;
		}

		&--behind {
			&::after {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background: linear-gradient(180deg, transparent, #fff 40%);
			}
		}
	}

	.v-notify-item-close {
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
	}
	.v-notify-scroll-content {
		max-height: 48vh;
		overflow: auto;
		margin: 52px 2px 16px 16px;
	}
	.v-notify-item-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-right: 14px;
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
	.v-notify-item-component {
		cursor: pointer;
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
			100% { transform: translate(var(--translateX), var(--translateY)); }
		}
	}
</style>