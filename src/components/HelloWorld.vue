<template>
  <div>
    <!-- <button @click='quadratic'>start</button> -->
    <canvas></canvas>
  </div>
</template>

<script>
export default {
    data(){
        return{
            w:0,
            h:0,
            c:null,
            ct:null,
            circle: [
                {
                    x:500,
                    y:500,
                    r:10
                },
                {
                    x:500,
                    y:500,
                    r:10
                }
            ]
        }
    }, 
    created(){
    },
    methods:{
        draw(){
            const ct = this.ct
            const c1 = this.circle[0]
            const c2 = this.circle[1]
            ct.clearRect(0, 0, this.w, this.h)

            ct.beginPath()
            ct.moveTo(600,600)
            ct.bezierCurveTo(c1.x,c1.y,c2.x,c2.y,600,700)
            ct.strokeStyle = '#eee'
            ct.stroke()
            ct.closePath()

            ct.beginPath()
            ct.arc(c1.x, c1.y, c1.r, 0, 2*Math.PI,false)
            ct.fillStyle = '#eee'
            ct.fill()

            ct.beginPath()
            ct.arc(c2.x, c2.y, c2.r, 0, 2*Math.PI,false)
            ct.fillStyle = '#eee'
            ct.fill()
        },
        handle(){
            const _this = this
            const c = this.c

            c.addEventListener('mousedown',(ev)=>{
                let x = ev.pageX
                let y = ev.pageY
                let currentX = 0
                let currentY = 0
                const index = this.isCricle(x,y)
                console.log(index)
                if(index == -1){
                    return
                }
                c.addEventListener('mousemove',move,false)
                c.addEventListener('mouseup',up,false)
                function move(ev){
                    let x1 = ev.pageX
                    let y1 = ev.pageY
                    _this.circle[index].x += x1 - x
                    _this.circle[index].y += y1 - y
                    x = x1
                    y = y1
                }
                function up(ev){
                    c.removeEventListener('mousemove',move,false)
                    c.removeEventListener('mouseup',up,false)
                }
            },false)
        },
        isCricle(x,y){
            const rx1 = this.circle[0].x
            const ry1 = this.circle[0].y
            const rx2 = this.circle[1].x
            const ry2 = this.circle[1].y
            const r1 = this.circle[0].r
            const r2 = this.circle[1].r
            if( (x-rx1)*(x-rx1) + (y-ry1)*(y-ry1) < r1*r1){
                return 0
            }

            if( (x-rx2)*(x-rx2) + (y-ry2)*(y-ry2) < r2*r2 ){
                return 1
            }

            return -1
        }
    },
    mounted() {
        const clientW = document.documentElement.clientWidth
        const clientH = document.documentElement.clientHeight
        const c = document.querySelector('canvas')
        const ct = c.getContext('2d')
        this.ct = ct
        this.c = c
        this.w = clientW
        this.h = clientH
        c.width = clientW;
        c.height = clientH;
        this.handle()
        this.draw()
    },
    watch:{
        circle:{
            handler:function(){
                this.draw.call(this)
            },
            deep: true
        }
    }
}
</script>

<style>

</style>
