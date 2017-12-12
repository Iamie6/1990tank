import levels from './level/level'
import {mapStyle} from './map_style/map-style'
const blockWidth = 32
const blockHeight = 32
const half = blockWidth/2

//level 关卡数 范围 [1,25]
export function map(level = 1){
	const arr = []
	const levelmap = levels[level-1]

	for(let i = 0; i < levelmap.length; i++){
		if(levelmap[i] == 0){
			arr[i*4] = {type: 0,isChange : 0}
			arr[i*4 + 1] = {type: 0,isChange : 0}
			arr[i*4 + 2] = {type: 0,isChange : 0}
			arr[i*4 + 3] = {type: 0,isChange : 0}
			continue
		}
		const key = mapStyle(levelmap[i])

		for(let j = 0; j < key.length; j++){
			if(key[j] == 0){
				arr.push({type: 0,isChange : 0})
				continue
			}
			arr.push({
				map : [1,1,1,1],
				draw :  { //绘制
					x: i%13*blockWidth + j%2*half,
					y: Math.floor(i/13)*blockHeight + Math.floor(j/2)*half, 
					w: half,
					h: half,
				},
				isChange : 1,
				rect : { //碰撞检测
					x: i%13*blockWidth + j%2*half, 
					y: Math.floor(i/13)*blockHeight + Math.floor(j/2)*half, 
					w: half,
					h: half,
				},
				type : levelmap[i],
				index: i*4 + j,
			})
		}
		
	}
	return arr
}