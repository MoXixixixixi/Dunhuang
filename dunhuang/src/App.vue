<template>
  <div id="app">

    <Prelude v-if="isExist" class="prelude" /> 
    <!-- <router-view v-if="routerView"/> -->
    <router-view />

  </div>   
</template>

<script>
import Prelude from '@/components/Home/Prelude.vue';
  export default {
    name: "App",
    components: { 
      Prelude
    },
    data() {
      return {
        // routerView: false,//影响整个的加载，包括Prelude
        isExist: false, //重难点：首次进入首页 或者 刷新首页 就播放视频，否则不播放 //如果开始时就存在，异步执行会play(),但毫秒后又false，就导致Cannot read properties of null (reading 'play')
        // 其他板块的呈现也因此出现延迟
        // 考虑多个动画效果，其所耗费时间，使用setTimeout实现的，从别的路径返回时，会因该定时器而达不到预期效果，因为此时视频不再播放 
      }
    },
    mounted(){
      // 使用路径方法以及mitt，不能够实现按钮控制以及在首页刷新时才播放视频
      // 退而求其次，利用sessionStorage做，只有关闭浏览器后重新打开才能播放视频，刷新无用
      this.isExist = sessionStorage.getItem('firstVisit') ? false : true;
      setTimeout(()=>{
        sessionStorage.setItem('firstVisit', 1);
      }, 10000)


      // if(!sessionStorage.getItem('firstVisit')) {
      //   setTimeout(()=>{
      //     this.routerView = true; //首次访问就等待 后再渲染routerView
      //   }, 20000)
      // }else this.routerView = true;

    }
  }
  
// //禁Ctrl+滑轮
// window.addEventListener('mousewheel', function(event){
//       if (event.ctrlKey === true || event.metaKey) {
//             event.preventDefault();
//       }
//     },{ passive: false});

//     //firefox
//     window.addEventListener('DOMMouseScroll', function(event){
//         if (event.ctrlKey === true || event.metaKey) {
//               event.preventDefault();
//         }
//     },{ passive: false});
// //禁Ctrl+'+/-'
// window.onload = function() {
//   document.addEventListener('keydown', function (event) {
//         if ((event.ctrlKey === true || event.metaKey === true)
//             && (event.which === 61 || event.which === 107
//             || event.which === 173 || event.which === 109
//             || event.which === 187  || event.which === 189))
//         {
//             event.preventDefault();
//         }
//     }, false);
// }

</script>


<style lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    color: #333;
  }
  #app {
    position: relative;
    overflow: hidden; // App.vue、HomeView.vue、each part
    .prelude {
      position: absolute;
    }
  }
</style>
