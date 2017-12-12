//tank 类型 map
//
//player1  四种形态
//或 
//player2  四种形态
// 1 	2 	 3	  4
//上上 上上 上上 上上
//右右 右右 右右 右右
//下下 下下 下下 下下
//左左 左左 左左 左左
//3232 3232 3232 3232
//
//AI_1 普通型 和 AI_1 普通型 (红)
//或 
//AI_2 快速型 或 AI_2 快速型 (红)
// 1 	2 
//上上 上上
//右右 右右
//下下 下下
//左左 左左
//3232 3232
//
//AI_3 重型 三种形态 和 AI_3 重型 (红)
// 1 	2 	 3	  红 
//上上 上上 上上 上上
//右右 右右 右右 右右
//下下 下下 下下 下下
//左左 左左 左左 左左
//3232 3232 3232 3232


export class Tank {

	d = 0;
	step = 0;  //tank实例 移动 左右脚（0:左脚  1:右脚）
	state = 0; //tank实例 的 状态 （player 吃了五角星之后，state+1

	//x y  tank实例 画布的 位置 (宽高固定 32 * 32)
	//
	//type tank 类型 范围[0,4]  {0:player1, 1:player2, 2:AI普通型, 3:AI快速型, 4:AI重型}
	//
	//picX picY tank 在 图片上 位置 
	//
	//H W tank 检测碰撞时 用的 宽高
	//X Y tank 检测碰撞时 用的 位置
	constructor(x, y, type, root){
		this.x = x
		this.y = y

		this.type = type
		this.dir = type > 1 ? 2 : 0; 	//方向 0上  1右  2下  3左

		this.W = 28
		this.H = 32
		this.X = this.x + 2
		this.Y = this.y

		this.preX = 0
		this.preY = this.type * 128

		if(type > 1){
			this.move(root)
		}
	}

	move(root){
		setInterval(()=>{
			let a = this.gogogo(root)
			switch(this.dir){
				case 0:
					if(this.y <=0){
						this.y = 0
						a = 0
					}else{
						this.y -= a
					}
					break;
				case 1:
					if(this.x >=384){
						this.x = 384
						a = 0
					}else{
						this.x += a
					}
					break;
				case 2:
					if(this.y >= 384){
						this.y = 384
						a = 0
					}else{
						this.y += a
					}
					break;
				case 3:
					if(this.x <= 0){
						this.x = 0
						a = 0
					}else{
						this.x -= a
					}
					break;
			}
			if(a == 0 || Math.random() < 0.01){
				this.dir = this.random()
			}
		}, 24)
	}

	gogogo(root){
        const res = []
        root.getArea(this.rect, res)

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

	draw(ct, tank){
		ct.drawImage(
			tank,
			this.picX,
			this.picY,
			32,32,
			this.x,
			this.y,
			32,32
		)
	}

	random(){
		return Math.floor(Math.random()*4)
	}

	get rect(){
		switch(this.dir){
			case 0: 	// 上
				this.X = this.x + 2
				this.Y = this.y
				this.W = 28
				this.H = 30
				break;
			case 1: 	// 右
				this.X = this.x + 2
				this.Y = this.y + 2
				this.W = 30
				this.H = 28
				break;
			case 2: 	// 下
				this.W = 28
				this.H = 30
				this.X = this.x + 2
				this.Y = this.y + 2
				break;
			case 3: 	// 左
				this.W = 30
				this.H = 28
				this.X = this.x
				this.Y = this.y + 2
				break;
		}
		return {
			x: this.X,
			y: this.Y,
			w: this.W,
			h: this.H,
		}
	}

	get picX(){
		return this.preX + this.state * 64 + this.step * 32
	}

	get picY(){
		return this.preY + this.dir * 32
	}

	get dir(){
		return this.d
	}

	set dir(v){
		const interimX = this.x % 16
		const interimY = this.y % 16

		if(interimX < 8){
			this.x -= interimX
		}else {
			this.x += (16 - interimX)
		}

		if(interimY < 8){
			this.y -= interimY
		}else {
			this.y += (16 - interimY)
		}

		this.d = v
	}
}