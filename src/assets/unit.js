export default  {
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
}