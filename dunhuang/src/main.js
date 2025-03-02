import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// //自定义全局函数，处理MyNav先于HomeView，HomeView先于Prelude  应该是异步以及配置文件原因 ////解决不了
// app.config.globalProperties.$sleep = function (ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// };
// createApp(App).use(router).mount("#app");
app.use(router).mount("#app");