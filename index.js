import Notify from './notify'
import V2NotifyContainer from './App'

export default {

	install(Vue, { config = {}, store = {} } = {}) {

		const template = document.createElement('v2-notify-template')
			, ctx = new Vue({
				store: store,
				...V2NotifyContainer
			})

		document.body.appendChild(template)
		ctx.$mount(template)

		Vue.prototype.$notify = new Notify({ ctx, config })

	}

}