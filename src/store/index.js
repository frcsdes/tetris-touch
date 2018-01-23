import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		recognizedShape: "",
	},
	actions: {
		changeRecognizedShape (context, payload) {
			context.commit("changeRecognizedShape", payload);
		},
	},
	mutations: {
		changeRecognizedShape (state, payload) {
			state.recognizedShape = payload;
		},
	},
});
