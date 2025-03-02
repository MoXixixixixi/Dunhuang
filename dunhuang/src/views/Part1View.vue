<template>
  <div id="part1">
    <ul v-if="isVisible" class="clouds" ref="part1Clouds">
      <li v-for="(pos, index) in cloudPics" :key="index" :class="['cloud'+index]"></li>
    </ul>

    <div class="demo">

    </div>
  </div>
</template>

<script>
// import clouds from '@/components/Home/Clouds.vue'
  export default {
    name: "Part1",
    components: {
      // clouds,
    },
    data(){
      return {
        isVisible: true, //开始即见云
        cloudPics: [ 
            require('@/assets/cloud.jpg'),
            require('@/assets/cloud.jpg'),
            require('@/assets/cloud.jpg'),
            require('@/assets/cloud.jpg'),
            require('@/assets/cloud.jpg'),
            require('@/assets/cloud.jpg'),
        ],


      }
    },
    mounted(){
      this.initBackgroundCloud();
      this.part1CloudsOpen();


    },
    methods: {
        initBackgroundCloud(){
            var lis = this.$refs.part1Clouds.children;
            for(var i=0; i<lis.length; i++){
                lis[i].style.background = `url(${this.cloudPics[i]}) no-repeat center center/cover`;
            }
        },
        part1CloudsOpen(){
          var lis = this.$refs.part1Clouds.children;
          setTimeout(() => {
              for(var i=0; i<lis.length; i++){
                  if(i%2){
                      lis[i].style.animation = 'move_back_left 0.5s ease-in forwards'
                  }else {
                      lis[i].style.animation = 'move_back_right 0.5s ease-in forwards'
                  }
              }
          }, 300); // 整面云呈现时间
          setTimeout(()=>{
            this.isVisible = false;
          }, 800) // 0.3+0.5 //不影响下面被盖住的元素
        },


    }
  };
</script>

<style lang="less">
#part1 {
  .clouds {
    position: absolute;
    width: 100vw;
    height: 100vh;
    font-size: 0;
    overflow: hidden;
    // background-color: yellowgreen;
    li {
        display: inline-block;
        width: 50vw;
        height: 33vh;
        // margin-top: -2px;
        &:nth-last-of-type(-n+2){
            height: 34vh;
        }
    }
  }


  .demo {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/dragon.jpg') center center/cover;
  }
}
@keyframes move_back_left {
    from { 
        transform: translateX(0);
        opacity: 1;
    }
    to { 
        transform: translateX(60vw);
        opacity: 0.3; 
    }
}
@keyframes move_back_right {
    from { 
        transform: translateX(0);
        opacity: 1; 
    }
    to { 
        transform: translateX(-60vw);
        opacity: 0.3; 
    }
}
</style>
