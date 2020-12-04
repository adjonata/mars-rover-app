import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Início",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/sobre",
    name: "Sobre",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/dia-na-terra",
    name: "Dia na Terra",
    component: () => import("@/views/pages/DayInEarth.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
