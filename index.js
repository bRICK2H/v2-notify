import Notify from './notify'
import V2NotifyContainer from './App'

export default {

	install(Vue, config = {}) {
		
		const template = document.createElement('v2-notify-template')
			, 	ctx = new Vue(V2NotifyContainer)

		document.body.appendChild(template)
		ctx.$mount(template)

		Vue.prototype.$notify = new Notify({ ctx, config })
		
	}
	
}