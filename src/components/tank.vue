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
            let _map = map(level)
            root.formatMap(_map)
            const wallCanvas = this.createC()
            const tankPath = '/static/t.jpg'
            const wallPath = '/static/wall.png'
            const wall = await loadImg(wallPath)
            const tank = await loadImg(tankPath)

            const player1 = new Tank(32*4+16,32*12,0,root)
            const tank_bullet = [player1]

            tank_bullet.push(new Tank(0,0,2,root))
            
            let stop = false
            document.addEventListener('click',function(){
                //stop = true
                //_map[322].map = [0,0,0,1]
                //_map[322].isChange = 1
            },false)

            function draw(){
                if(stop)return
                //stop = true
                //
                //console.time('b')

                //     /*const res = []
                //     root.getArea(player1.rect, res)
                //     console.log(res)*/
                //     console.time('draw')
                        mapDraw(_map, wallCanvas.getContext('2d'), wall)
                //     console.timeEnd('draw')

                //     console.time('tank')
                        for (let i = 0; i < tank_bullet.length; i++) {
                            tank_bullet[i].draw(wallCanvas.getContext('2d'),tank)
                        }
                //     console.timeEnd('tank')
                    
                //     console.time('clear')
                        ct.clearRect(0,0,416,416)
                        ct.drawImage(wallCanvas,0,0)
                //     console.timeEnd('clear')
                    
                //console.timeEnd('b') 

                requestAnimationFrame(draw)
            }

            
            draw()
           
            this.addKeyboardHandle(tank_bullet[0], root)
        },
        createC(){
            const c = document.createElement('canvas')
            c.width = this.w
            c.height = this.h
            return c
        },
        addKeyboardHandle(tank,root){
            const _this = this
            let timer = null //player1 定时器
            let dir = 0
            //w:87 上
            //a:65 左
            //s:83 下
            //d:68 右
            //tank.dir: 0上  1右  2下  3左
            document.addEventListener('keydown',function(ev){
                switch(ev.keyCode){
                    case 87:
                        if(dir == 87)return
                        clearInterval(timer)
                        dir = 87
                        tank.dir = 0
                        timer = setInterval(()=>{
                            if(tank.y <= 0 ){
                                tank.y = 0
                                return;
                            }
                            console.time('go')
                            tank.y -= gogogo()
                            console.timeEnd('go')
                            /*if(go == 1){
                                tank.y --
                            }else if(go == 2){
                                tank.y -= 2
                            }*/
                        },20);
                        break;
                    case 65:
                        if(dir == 65)return;
                        clearInterval(timer)
                        dir = 65
                        tank.dir = 3
                        timer = setInterval(()=>{
                            if(tank.x<=0){
                                tank.x = 0
                                return;
                            }
                            tank.x -= gogogo()
                            /*if(go == 1){
                                tank.x --
                            }else if(go == 2){
                                tank.x -= 2
                            }*/
                        },20);
                        break;
                    case 83:
                        if(dir == 83)return;
                        clearInterval(timer)
                        dir = 83
                        tank.dir = 2
                        timer = setInterval(()=>{
                            if(tank.y >= 384){
                                tank.y = 384
                                return;
                            }
                            tank.y += gogogo()
                            /*if(go == 1){
                                tank.y ++
                            }else if(go == 2){
                                tank.y += 2
                            }*/
                        },20);
                        break;
                    case 68:
                        if(dir == 68)return;
                        clearInterval(timer)
                        dir = 68
                        tank.dir = 1
                        timer = setInterval(()=>{
                            if(tank.x >= 384){
                                tank.x = 384
                                return;
                            }
                            tank.x += gogogo()
                            /*if(go == 1){
                                tank.x ++
                            }else if(go == 2){
                                tank.x += 2
                            }*/
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

            function gogogo(){
                const res = []
                root.getArea(tank.rect, res)

                if(res.length === 0)return 1;

                if(res.length > 1 && res[0].type > res[1].type){
                    const tmp = res[0]
                    res[0] = res[1]
                    res[1] = tmp
                }

                for(let i =0; i < res.length; i++){
                    if(res[i].type < 20){
                        return 0
                    } else if(res[i].type == 20){
                        return 2
                    }
                }
                return 1
            }
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