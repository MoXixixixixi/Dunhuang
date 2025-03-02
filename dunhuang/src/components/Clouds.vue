<template>
    <div>
        <ul class="openDoor" ref="openDoor">
            <li v-for="(pos, index) in cloudPics" :key="index" :class="['cloud'+index]"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "clouds",
    data(){
        return {
            isThrottle: true,
            throttleTimer: -1, 
            cloudPics: [ 
                require('@/assets/cloud.jpg'),
                require('@/assets/cloud.jpg'),
                require('@/assets/cloud.jpg'),
                require('@/assets/cloud.jpg'),
                require('@/assets/cloud.jpg'),
                require('@/assets/cloud.jpg'),
            ]
        }
    },
    mounted() {
        this.initBackgroundCloud();

    },
    methods: {
        initBackgroundCloud(){
            var lis = this.$refs.openDoor.children;
            for(var i=0; i<lis.length; i++){
                lis[i].style.background = `url(${this.cloudPics[i]}) no-repeat center center/cover`;
            }
        },
        throttle(){ //对开门云效果进行点击节流
            // if(this.throttleTimer != -1) clearTimeout(this.throttleTimer); 
            // //延时器写在if外需要清理，不清理则很快置为true； 延时器写在外面的话，鼠标狂点，只能实现一次效果
            if(this.isThrottle) {
                // this.run(); // 开门云全过程
                this.cloudsClose();
                // console.log(1)
                this.isThrottle = false;
                this.throttleTimer = setTimeout(()=>{
                    this.isThrottle = true;
                }, 2000)
            }   
            // console.log('父组件调用子组件方法成功')
        },
        run(){
            var lis = this.$refs.openDoor.children;
            for(var i=0; i<lis.length; i++){
                if(i%2){
                    lis[i].style.animation = 'move_to_left 0.5s cubic-bezier(.55,0,.81,.52) forwards'
                }else {
                    lis[i].style.animation = 'move_to_right 0.5s cubic-bezier(.55,0,.81,.52) forwards'
                    // alternate 对动画执行次数不为1的有效
                }
            }
            setTimeout(() => {
                for(var i=0; i<lis.length; i++){
                    if(i%2){
                        lis[i].style.animation = 'move_back_left 0.5s ease-in forwards'
                    }else {
                        lis[i].style.animation = 'move_back_right 0.5s ease-in forwards'
                    }
                }
            }, 850);
        },
        cloudsClose(){
            var lis = this.$refs.openDoor.children;
            for(var i=0; i<lis.length; i++){
                if(i%2){
                    lis[i].style.animation = 'move_to_left 0.5s cubic-bezier(.55,0,.81,.52) forwards'
                }else {
                    lis[i].style.animation = 'move_to_right 0.5s cubic-bezier(.55,0,.81,.52) forwards'
                    // alternate 对动画执行次数不为1的有效
                }
            }
        },
        cloudsOpen(){
            var lis = this.$refs.openDoor.children;
            setTimeout(() => {
                for(var i=0; i<lis.length; i++){
                    if(i%2){
                        lis[i].style.animation = 'move_back_left 0.5s ease-in forwards'
                    }else {
                        lis[i].style.animation = 'move_back_right 0.5s ease-in forwards'
                    }
                }
            }, 850);
        },
        startFromClosed(){
            var lis = this.$refs.openDoor.children;
            for(var i=0; i<lis.length; i++){
                if(i%2){
                    lis[i].style.transfrom = 'translateX(-60vw)';
                }else {
                    lis[i].style.transfrom = 'translateX(60vw)';
                }
            }
        }
    }
}
</script>


<style lang="less">

.openDoor {
    position: relative;
    width: 100vw;
    height: 100vh;
    font-size: 0;
    overflow: hidden;
    // background-color: yellowgreen;
    box-sizing: content-box;
    li {
        display: inline-block;
        width: 50vw;
        height: 33vh;
        // margin-top: -2px;
        box-sizing: border-box;
        // border: 1px solid black;
        opacity: 0.5;
        position: relative;
        font-size: 0;
        &:nth-of-type(2n+1) {
            left: -60vw;
        }
        &:nth-of-type(2n){
            right: -60vw;
        }
        &:nth-last-of-type(-n+2){
            height: 34vh;
        }
    }
    
}

@keyframes move_to_left {
    from { 
        transform: translateX(0);
        opacity: 0.3;
     }
    to { 
        transform: translateX(-60vw);
        opacity: 1;
     }
}
@keyframes move_to_right {
    from { 
        transform: translateX(0);
        opacity: 0.3;
    }
    to { 
        transform: translateX(60vw);
        opacity: 1; 
    }
}
@keyframes move_back_left {
    from { 
        transform: translateX(-60vw);
        opacity: 1;
    }
    to { 
        transform: translateX(0);
        opacity: 0.3; 
    }
}
@keyframes move_back_right {
    from { 
        transform: translateX(60vw);
        opacity: 1; 
    }
    to { 
        transform: translateX(0);
        opacity: 0.3; 
    }
}

</style>