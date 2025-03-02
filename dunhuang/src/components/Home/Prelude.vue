<template>
    <div id="prelude" ref="prelude">

        <video v-if="isVisible" ref="video" muted disablePictureInPicture>
            <source src="@/assets/prologue.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

    </div>
</template>

<script>
    export default {
        name: "prelude",
        data(){
            return {
                isVisible: true,  
            }
        },
        mounted() {
            setTimeout(()=>{
                // this.videoMoveUp();
                this.$refs.video.play();
            }, 1000) //1s后视频开始播放

            setTimeout(()=>{
                this.$refs.video.classList.add('fadeOut');
            }, 6000) // 消失持续2s，视频时长为5s

            setTimeout(()=>{
                this.isVisible = false;
                this.$refs.prelude.style.zIndex = -1;
            }, 7700) //8s后去除 视频 //提早一点去除，方便点击箭头
            
        },
    }
</script>  

<style lang="less">


@keyframes fadeOut {
    from { opacity: 1;}
    to { opacity: 0; }
}
// 视频淡出
.fadeOut {
  animation: fadeOut 2s forwards; 
}

    #prelude {
        width: 100vw;
        height: 100vh;
        position: relative;
        z-index: 5;
        // border: 10px solid blue;

        video {
            // background-color: red;
            // z-index: 99;
            width: 100%;
            // position: absolute;
            // top: 100vh;
            // z-index: 1;
        }

    }
</style>