import Vue from "vue";
import Router from "vue-router";
import ViewMenu from "@/components/ViewMenu";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Menu",
			component: ViewMenu,
		}, {
			path: "*",
			redirect: "/",
		},
	],
});
