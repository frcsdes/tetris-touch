import Vue from "vue";
import Router from "vue-router";
import ViewMenu from "@/components/ViewMenu";
import ViewTutorial from "@/components/ViewTutorial";
import ViewCalibration from "@/components/ViewCalibration";
import ViewPlay from "@/components/ViewPlay";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "menu",
			component: ViewMenu,
		}, {
			path: "/tutorial",
			name: "tutorial",
			component: ViewTutorial,
		}, {
			path: "/calibration",
			name: "calibration",
			component: ViewCalibration,
		}, {
			path: "/play",
			name: "play",
			component: ViewPlay,
		}, {
			path: "*",
			redirect: "/",
		},
	],
});
