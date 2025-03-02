<template>
  <div id="home" ref="home">
    <!-- MyNav刚构建时就通信了，子向父通信 --> <!-- MyNav挂载时间比HomeView 早 1 ms ，用v-if无效-->
    <!-- <MyNav v-if="appear"  
    @initBackground="childInitBackground"
    @singleBackImgPath="childSingleBackImgPath" 
    /> -->
    <MyNav ref="MyNavComponent"
    @initBackground="childInitBackground"
    @singleBackImgPath="childSingleBackImgPath" 
    />

  </div>
</template>

<script> //重难点：箭头显示时间，跳转页面问题
import MyNav from '@/components/Home/MyNav.vue';

export default {
    name: 'home',
    components: {
      MyNav,
    },
    data() {
      return {
        // appear: true,
      }
    },
    mounted(){
      
      // console.log(this.$route)
      // if(this.$route.name == 'home') { //当加载到这个页面时，this.$route已不再为undefined
        //   setTimeout(() => {
        //   this.appear = true;
        // }, 6000);
      // }
      
      // console.log("sessionStorage.getItem(firstVisit)")
      // console.log(sessionStorage.getItem('firstVisit'))
      // 值为1
      
      //从其他版块跳转回来还是相同问题
      //当前是首次进入，会播放个视频，所以控制箭头出现时间
      //但是进入其他板块后返回时，不会播放视频，但箭头出现时间还是之前那个加上视频时长的
    },
    methods: {
      childInitBackground(initialBackground){
        this.$refs.home.style.background = `url(${initialBackground}) no-repeat center center/cover`;
      },
      childSingleBackImgPath(imgPath){
        this.$refs.home.style.background = `url(${imgPath})` + 'no-repeat center center/cover';
        
        //静态+变量  --失败
        //使用 Webpack 的 file-loader 或 url-loader --失败
        
        // 在 Webpack 和其他类似的模块打包工具中，require 调用是在构建时（而不是运行时）解析的。
        //这意味着当 Webpack 处理代码时，它会查找所有 require 调用，并解析这些调用所指向的文件路径。
        //由于这个过程是静态的，它不能处理在运行时才确定的路径（比如存储在变量中的路径）。
        // 因此，当尝试使用 const imagePath = require(imgPath); 这样的代码时，Webpack 会在构建时尝试解析 imgPath 变量的值。
        //但是，在构建时，imgPath 变量的值还没有被确定（它将在运行时被赋值为 '@/assets/dragon.jpg'），所以 Webpack 无法正确地解析这个路径。
      }
    }
}
</script>

<style lang="less">

#home {
    // position: relative;//使其与子组件在同一文档流中，不然无效
    overflow: hidden;
    height: 100vh;

    // &::before {
    //   content: '';
    //   display: block;
    //   // height: inherit;//不用定位，铺满整个#home，使用径向渐变，但效果没定位的好
    //   // width: 100vw;
    //   width: 500px;
    //   height: 500px;
    //   border-radius: 50%;
    //   position: absolute;
    //   top: 25%;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   // border: 1px dotted rgba(0, 0, 0, 0.1);
    //   // background: radial-gradient(transparent 50%, rgba(0, 0, 0, 1));
    //   //使用高斯模糊，border模糊，从而可以避免使用径向渐变实现过渡，也可以避免出现圆圈线的情况。
    //   background-color: transparent;
    //   box-shadow: 0px 0px 0px 2000px rgba(0, 0, 0, 0.4);
    //   filter: blur(15px);
    // }


}
</style>