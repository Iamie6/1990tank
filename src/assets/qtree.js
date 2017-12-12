class Qtree{
	constructor ( bounds = {x:0,y:0,w:416,h:416}, level = 0){
		//本区域的范围
		this.bounds = bounds
		//本区域的层级
		this.level = level
		//存放本区域的 元素
		this.item = []
		//存放四个象限
		this.children = []
		//固定层级数
		this.max_level = 4

		//初始化
		this.init()
	}
	//初始化 创建一个 层级为 max_level 的对象
	init(){
		if(this.level == this.max_level) return;
		this.split()
	}
	//将 obj 放入到 对应的 象限中去 （最底层的象限）
	inset (rect,obj){
		if(this.level === this.max_level){
			this.item.push(obj)
		}else{
			for(let i = 0; i < this.children.length; i++){
				if(this.children[i].isCollided(rect)){
					this.children[i].inset(rect,obj)
				}
			}
		}
	}
	//循环 map 将 map的每一项  inset 
	formatMap(map){
		for(let i = 0; i<map.length; i++){
			//0 没有建筑   13 草坪
			if(map[i].type == 0 || map[i].type == 13)continue;
            if(this.isCollided(map[i].rect)){
                this.inset(map[i].rect, map[i])
            }
        }
	}

	//
	//	--------------------
	// |		  |			|
	// |		  |			|
	// |	1	  |		2	|
	// |		  |			|
	// |--------------------|
	// |		  |			|
	// |		  |			|
	// |	3	  |		4	|
	// |		  |			|
	//	--------------------
	//	
	// 分割象限
	split(){
		const level = this.level +1
		const bounds = this.bounds
		const x = bounds.x
		const y = bounds.y
		const w = bounds.w/2
		const h = bounds.h/2

		this.children.push(
			new Qtree({x:x, y:y, w:w, h:h}, level),
			new Qtree({x:x+w, y:y, w:w, h:h}, level),
			new Qtree({x:x, y:y+h, w:w, h:h}, level),
			new Qtree({x:x+w, y:y+h, w:w, h:h}, level)
		)
	}
	// 获取 rect 可能 碰撞物体的 集合
	getArea(rect,res){
		if(this.level === 4){
			for (let i = 0; i < this.item.length; i++) {
				if(!this.isContain(res, this.item[i]) &&  this.isCollided(rect,this.item[i].rect)){
					res.push(this.item[i])
				}
			}
		}else{
			for(let i = 0; i < this.children.length; i++){
				if(this.children[i].isCollided(rect)){
					this.children[i].getArea(rect,res)
				}
			}
		}
	}

	//判断是否 与当前 对象碰撞 
	isCollided (rect,bound){
		const bounds = bound || this.bounds; 
		if(
			rect.x > bounds.x + bounds.w || 
			rect.x + rect.w < bounds.x || 
			rect.y > bounds.y + bounds.h || 
			rect.y + rect.h < bounds.y
		){
			return false
		}

		return true
	}
	//判断数组中 是否包含对象
	isContain(arr, obj){
		for(let i = 0 ; i < arr.length; i++){
			if(arr[i] === obj){
				return true
			}
		}
		return false
	}
}


export default Qtree