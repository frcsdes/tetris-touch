import Vue from "vue";
import Router from "vue-router";
import ViewMenu from "@/components/ViewMenu";
import ViewPlay from "@/components/ViewPlay";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Menu",
			component: ViewMenu,
		}, {
			path: "/play",
			name: "Play",
			component: ViewPlay,
		}, {
			path: "*",
			redirect: "/",
		},
	],
});
