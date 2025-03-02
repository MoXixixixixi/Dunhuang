import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//import Part1View from "../views/Part1View.vue";
//import Part2View from "@/views/Part2View.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/part1",
    name: "part1",
    component: () => //提升性能，用时再导
      import("../views/Part1View.vue"),
    // children: [
    //   {
    //     path: '',
    //     redirect: 'child-a' //默认显示的子路由
    //   },
    //   {
    //     path: 'child-a',
    //     name: 'ChildA',
    //     component: ChildComponentA
    //   },
    //   {
    //     path: 'child-b',
    //     name: 'ChildB',
    //     component: ChildComponentB
    //   }
    // ]
  },
  {
    path: "/part2",
    name: "part2",
    component: () =>
      import("../views/Part2View.vue"),
  },
  {
    path: "/part3",
    name: "part3",
    component: () =>
      import("../views/Part3View.vue"),
  },
  {
    path: "/part4",
    name: "part4",
    component: () =>
      import("../views/Part4View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
