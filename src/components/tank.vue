<template>
    <div>
	   <canvas></canvas>
        <div class="hide"></div>
    </div>
</template>
<script>
import {loadImg}  from '@/assets/loadImg'
import Qtree from '@/assets/qtree'
import {Tank} from '@/assets/tank/tank'
import {mapDraw} from '@/assets/mapshow'
import {map} from '@/assets/map/map' 
export default {
	data(){
        return{
            w: 0,
            h: 0,
            c: null,
            ct: null,
            walls: null
        }
    },
    created(){
    },
    methods:{
        async start(level,ct){
            const _this = this
            const root = new Qtree()
            const _map = map(level)

            //root.formatMap(_map)
            

            const wallCanvas = this.createC()
            const tankPath = '/static/t.jpg'
            const wallPath = '/static/wall.png'
            const wall = await loadImg(wallPath)
            const tank = await loadImg(tankPath)

            const player1 = new Tank(32*6,32*12,0)
            let stop = false
            document.addEventListener('click',function(){
                stop = true
            },false)

            function draw(){
                if(stop)return
                //stop = true

                console.time('a')
                
                root.formatMap(_map)
                
                console.timeEnd('a')


                //
                //console.time('b')

                    /*const res = []
                    root.getArea(player1.rect, res)
                    console.log(res)*/
                    //console.time('draw')
                        //mapDraw(_map, wallCanvas.getContext('2d'), wall)
                    //console.timeEnd('draw')

                    //console.time('tank')
                        player1.draw(wallCanvas.getContext('2d'),tank)
                    //console.timeEnd('tank')
                    
                    //console.time('clear')
                        ct.clearRect(0,0,416,416)
                        ct.drawImage(wallCanvas,0,0)
                    //console.timeEnd('clear')
                    
                //console.timeEnd('b') 

                requestAnimationFrame(draw)
            }

            
            draw()
           
            this.addKeyboardHandle(player1,root)
        },
        createC(){
            const c = document.createElement('canvas')
            c.width = this.w
            c.height = this.h
            return c
        },
        addKeyboardHandle(tank,root){
            let timer = null //player1 方向定时器
            let dir = 0
            //w:87 上
            //a:65 左
            //s:83 下
            //d:68 右
            document.addEventListener('keydown',function(ev){
                switch(ev.keyCode){
                    case 87:
                        if(dir == 87)return;
                        dir = 87;
                        clearInterval(timer)
                        timer = setInterval(()=>{
                            const res = []
                            if(tank.y <= 0 ){
                                tank.y = 0
                                return;
                            }
                            root.getArea(tank.rect, res)
                            console.log(res)
                            for(let i =0; i < res.length; i++){
                                if(res.type){

                                }
                            }
                            tank.y--;
                        },20);
                        break;
                    case 65:
                        if(dir == 65)return;
                        clearInterval(timer)
                        dir = 65;
                        timer = setInterval(()=>{
                            if(tank.x<=0){
                                tank.x = 0
                                return;
                            }
                            tank.x--;
                        },20);
                        break;
                    case 83:
                        if(dir == 83)return;
                        clearInterval(timer)
                        dir = 83;
                        timer = setInterval(()=>{
                            if(tank.y>=416){
                                tank.y = 416
                                return;
                            }
                            tank.y++;
                        },20);
                        break;
                    case 68:
                        if(dir == 68)return;
                        clearInterval(timer)
                        dir = 68;
                        timer = setInterval(()=>{
                            if(tank.x>=416){
                                tank.x = 416
                                return;
                            }
                            tank.x++;
                        },20);
                        break;
                }
            },false)

            document.addEventListener('keyup',function(ev){
                if(ev.keyCode == dir){
                    dir = 0
                    clearInterval(timer)
                }
            },false)
        },
        collided(root,obj){
            const res = []
            root.getArea(obj.rect(), res)
            if(res.length){
                for(let i = 0; i < res.length; i++){
                    if(!this.isCollided(res[i], obj.rect())){
                        res.splice(i--,1)
                    }
                }
            }
            return res
        },
        isCollided (rect,block){
            if(rect.x > block.x + block.w){
                return false
            }

            if(rect.x + rect.w < block.x){
                return false
            }

            if(rect.y > block.y + block.h){
                return false
            }

            if(rect.y + rect.h < block.y){
                return false
            }

            return true
        }
    },
    mounted() {
        const c = document.querySelector('canvas')
        const ct = c.getContext('2d')
        this.ct = ct
        this.c = c
        this.w = 416
        this.h = 416
        c.width = 416
        c.height = 416
        
        //
        /*console.time('a')
        
        this.root = root
        const hideC = map(0)
        root.formatMap(hideC)

        let res = []
        root.getArea({x:0,y:0, w:40,h:40},res)
        
        console.timeEnd('a')*/

        //console.log(res) 
        //const root = this.init()
        //console.time('a')
        this.start(1,ct)
        //console.timeEnd('a')


        //初始一个root
        //拿到第一关的 地图信息
        //将地图 分发到 root中
        //创建 1个 离屏canvas
        //绘制地图到 1个离屏canvas
        //将1个离屏canvas 绘制到主canvas上
        //
        //添加键盘事件
        //
        //判断碰撞
        //
        //修改地图信息
        //
        //绘制地图到 5个离屏canvas
        //将5个离屏canvas 绘制到主canvas上
        //
        //
        //开始第二关
        //拿到第二关地图信息
        //清空root中 末节点
        //将地图 分发到 root中
        //
        //清空5个 离屏canvas
        //绘制地图到 5个离屏canvas
        //将5个离屏canvas 绘制到主canvas上
        //
        //添加键盘事件
        //
        //判断碰撞
        //
        //修改地图信息

    }
}
</script>
<style>
    div{
        width:100%;
        height: 100%;
        background: #fff;
        position: absolute;
        top:0;
        left:0;
    }
</style>