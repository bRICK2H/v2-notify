export default class {

	constructor({ ctx, config }) {
		this.ctx = ctx
		this.config = config
	}

	open(options = {}) {
		return new Promise(resolve => {
			const {
				type,
				closingTime,
				isClosingStart
			} = options
			this.ctx.add({
				id: Symbol('id'),
				config: this.config,
				options: {
					resolve,
					...options,
					...{
						isClosingStart: type === 'success' ? true : isClosingStart,
						closingTime: type === 'success' ? closingTime ?? 3000 : closingTime,
					},
					...(() => {
						const actions = options?.actions

						return actions && Array.isArray(actions)
							? {
								actions: actions.map(props => ({
									...props,
									resolve,
									id: Symbol('action')
								}))
							}
							: {}
					})()
				},
			})
		})

	}
}