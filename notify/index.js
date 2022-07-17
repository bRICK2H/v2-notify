export default class {

	constructor({ ctx, config }) {
		this.ctx = ctx
		this.config = config
	}

	open(options = {}) {
		return new Promise(resolve => {
			this.ctx.add({
				id: Symbol('id'),
				config: this.config,
				options: {
					...options,
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