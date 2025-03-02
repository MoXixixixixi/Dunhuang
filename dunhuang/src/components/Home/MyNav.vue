<template>
    <div id="myNav">
        <ul class="nav" ref="myNavul">
            <li :class="['li'+index]" v-for="(item, index) in RouterLink" :key="index">
                <!-- <router-link :to="item.path" @click.prevent="runClouds">{{ item.text }}</router-link> -->
                <a :href=item.path  @click.prevent="runClouds">{{ item.text }}</a> <!-- 相较于routerlink，a会将dom全部重新加载，加载一个新页面 -->
            </li>
        </ul> 

        <!-- <a href="javascript:void(0);" @click.prevent="clickNext()">下一个</a> -->
        <div class="buttons" ref="buttons" @click="clickBtn">
            <!-- <div @click="clickPre"></div> 
            <div @click="clickPre"></div>  -->
            <div data-btnPos="left"></div> 
            <div data-btnPos="right"></div> 
        </div>

        <clouds class="clouds" v-if="isVisible" ref="cloudsComponent"/>
    </div>
</template>
 
<script>
import clouds from '@/components/Clouds.vue'
    export default {
        name: "MyNav",
        components: {
            clouds,
        },
        data() {
            return {
                isVisible: false, // 开门云
                clickCount: 0,
                RouterLink: [
                    { path: "/", text: "首页" },
                    { path: "/part1", text: "板块一" },
                    { path: "/part2", text: "板块二" },
                    { path: "/part3", text: "板块三" },
                    { path: "/part4", text: "板块四" },
                ],
                backImgPath: [ 
                    require('@/assets/homeImg.png'),//首页
                    require('@/assets/part1.jpg'),
                    require('@/assets/part2.jpg'),
                    require('@/assets/part3.jpg'),
                    require('@/assets/part4.jpg')
                ],
                roundelImgPath: [
                    require('@/assets/dragon.jpg'),//圆盘背景图
                    require('@/assets/roundelHomeImg.png'),
                    require('@/assets/part1.jpg'),
                    require('@/assets/part2.jpg'),
                    require('@/assets/part3.jpg'),
                    require('@/assets/part4.jpg')
                ]
            }
        },
        // async beforeMount(){
        //     await this.$sleep(20000);
        // },  // 无效
        mounted() {
            this.clickCount = 0;
            // this.$emit('initBackground', this.backImgPath[1]);//传首页的
            this.$emit('initBackground', this.backImgPath[0]);//父子组件间通信，传首页的， 开始构建页面时就通信
            this.initRoundelBackgrounds();

            // console.log("sessionStorage.getItem(firstVisit)")
            // console.log(sessionStorage.getItem('firstVisit'))
            if(!sessionStorage.getItem('firstVisit')){
                setTimeout(this.displayButtons, 8000);
            }else setTimeout(this.displayButtons, 1000); // 左右箭头出现时间
        },
        methods: {
            initRoundelBackgrounds(){
                var myNavUl = this.$refs.myNavul;
                //圆盘背景图
                this.$refs.myNavul.style.background = `url(${this.roundelImgPath[0]}) no-repeat center center/cover`; 
                //圆盘上的图
                for(var i = 1; i <= myNavUl.children.length; i++) 
                    myNavUl.children[i-1].style.background = `url(${this.roundelImgPath[i]}) no-repeat center center/cover`;
            
            },
            // clickNext(){ 

            //     this.clickCount ++;
            //     var angle = this.clickCount * (-72);
            //     this.$refs.myNavul.style.transform = 'rotateZ('+ angle + 'deg)';
            //     this.updateBackgroundImg();
            // },
            // clickPre(){
            //     this.clickCount --;
            //     var angle = this.clickCount * (-72);
            //     this.$refs.myNavul.style.transform = 'rotateZ('+ angle + 'deg)';
            //     this.updateBackgroundImg();
            // },
            clickBtn(event){ // 圆盘轮转
                // console.log(event.target.dataset)  // 原为btnPos, 若要使用则为btnpos, 全小写
                if(event.target.dataset.btnpos == "left") this.clickCount --;
                else if(event.target.dataset.btnpos == "right") this.clickCount ++;
                var angle = this.clickCount * (-72);
                this.$refs.myNavul.style.transform = 'rotateZ('+ angle + 'deg)';
                this.updateBackgroundImg();
            },
            updateBackgroundImg(){
                var index = this.clickCount > 0 ? this.clickCount%5 : (5+this.clickCount)%5;
                this.$emit('singleBackImgPath', this.backImgPath[index]);
            },
            displayButtons(){//按钮显示
                //mounted时，不能读取到DOM元素的样式，即console.log(this.$refs.buttons.children[0].style.opacity)，控制台什么也没有
                //但可以赋值
                var leftButton = this.$refs.buttons.children[0];
                var rightButton = this.$refs.buttons.children[1];
                leftButton.style.opacity = 1;
                rightButton.style.opacity = 1;

                var i = 0, value = 0;
                const timer = setInterval(function(){
                    //定时器中不能使用this.$refs.buttons，它会报读取不到buttons的错误
                    i++;
                    value = 1 - 0.05*i; // 
                    leftButton.style.opacity = value;
                    rightButton.style.opacity = value;
                    if(leftButton.style.opacity < 0) {
                        leftButton.style.opacity = 0;
                        rightButton.style.opacity = 0;
                        clearInterval(timer);
                    }
                }, 75)
            },
            runClouds(event){ // 跳转对应板块时出现的云效果

                // 设定某一时间后跳转
                const targetPath = event.currentTarget.getAttribute('href');
                setTimeout(()=>{
                    this.$router.push(targetPath);
                    this.isVisible = false;
                }, 500)

                this.isVisible = true;
                // 调用clouds方法，启动云
                this.$nextTick(()=>{
                    this.$refs.cloudsComponent.throttle();
                })

                // event.preventDefault(); // 无法阻止router_link默认行为，只能通过 其他标签加上router方法实现
                // event.stopPropagation(); // 可选：停止事件冒泡
                },
        }
    }
</script>

<style lang="less">
    #myNav { 
        position: relative;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        // border: 1px solid yellowgreen;
        .nav {
            margin: 0 auto;
            width: 1100px;
            height: 1100px;
            position: relative;
            border-radius: 50%;
            // border: 1px solid red;
            // background: url('@/assets/dragon.jpg') no-repeat center center/cover;
            transition: transform 0.5s;
            li {
                position: absolute;
                width: 350px;
                height: 350px;
                line-height: 300px;
                // border: 1px solid yellowgreen;
                text-align: center;
                font-size: 28px;
                font-family: '华文新魏';
                // background-color: red; 
                &.li0 {
                    top: -27.5%;
                    left: 50%;
                    transform: translateX(-50%);
                    // background: url('@/assets/roundelHomeImg.png') no-repeat center center/cover;
                    & a {
                        pointer-events: none;
                    }
                }
                &.li1 {
                    top: 18%; //0.69R // 0.345
                    right: -21%;//0.0245
                    transform: rotateZ(72deg);
                    // background: url('@/assets/part1.jpg') no-repeat center center/cover;
                }
                &.li2 {      //R+Rsin54deg 1.809R 
                    top: 85%; //0.9045
                    right: 1%;//0.206
                    transform: rotateZ(144deg);
                    // background: url('@/assets/part2.jpg') no-repeat center center/cover;
                }
                &.li3 {
                    top: 85%;
                    left: 1%;
                    transform: rotateZ(216deg);
                    // background: url('@/assets/part3.jpg') no-repeat center center/cover;
                }
                &.li4 {
                    top: 18%;
                    left: -21%;
                    transform: rotateZ(288deg);
                    // background: url('@/assets/part4.jpg') no-repeat center center/cover;
                }

                & a {
                    color: red;
                }
            
            }
        }

        .buttons {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            // border: 1px solid rgb(81, 50, 205);
            display: flex;
           div {
                position: relative;
                width: 550px;
                height: 1100px;
                // background-color: red;
                font-size: 26px;
                font-family: '华文行楷';
                // opacity: 0;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 4%;
                    width: 80px;
                    height: 80px;
                }
                &:hover {
                    cursor: pointer
                }
                &:nth-of-type(1) {
                    border-top-left-radius: 550px;
                    border-bottom-left-radius: 550px;
                    &::before {
                        right: 12%;
                        background: url('@/assets/arrowLeft.png') center center/cover;
                    }
                    
                }
                &:nth-of-type(2) {
                    border-top-right-radius: 550px;
                    border-bottom-right-radius: 550px;
                    &::before {
                        left: 12%;
                        background: url('@/assets/arrowRight.png') center center/cover;
                    }
                    
                }
           }
            
        }
        
        .clouds {
            position: absolute;
            top: -57.2%;
            // opacity: 0.5;
        }

        &::before {
            content: '';
            display: block;
            // height: inherit;//不用定位，铺满整个#home，使用径向渐变，但效果没定位的好
            // width: 100vw;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            position: absolute;
            top: -37%;
            left: 50%;
            // z-index: 10;
            transform: translateX(-50%);
            // // border: 1px dotted rgba(0, 0, 0, 0.1);
            // // background: radial-gradient(transparent 50%, rgba(0, 0, 0, 1));
            // //使用高斯模糊，border模糊，从而可以避免使用径向渐变实现过渡，也可以避免出现圆圈线的情况。
            background-color: transparent;
            box-shadow: 0px 0px 0px 2000px rgba(0, 0, 0, 0.4);
            filter: blur(15px);
        }
    }
</style>

 <!-- <style lang="less">
//grid布局
    display: grid;
    grid-template-rows: 6;
    grid-template-columns: 6;
//grid-area: 3 / 3 / span 2 / span 2;
//transform
//transition-delay
//&:not(:first-of-type)::before
效果：hover中间的圆，四个扇区依次出现
</style> -->