// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	// If the user tries to play a game, check if gestures have been calibrated.
	// If so, follow route; if not, return to the menu.
	to.name === "play"
		? store.state.calibrated
			? next()
			: next("/")
		: next();
});

/* eslint-disable no-new */
new Vue({
	el: "#app",
	store,
	router,
	template: "<App/>",
	components: { App },
});
