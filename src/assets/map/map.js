import levels from './level/level'
import {mapStyle} from './map_style/map-style'
const blockWidth = 32
const blockHeight = 32

//level 关卡数 范围 [1,25]
export function map(level = 1){
	const arr = []
	const levelmap = levels[level-1]

	for(let i = 0; i < levelmap.length; i++){
		if(levelmap[i] == 0){
			arr[i] = {
				type: 0,
				isChange : 0,
			}
		}else{
			arr[i] = {
				map : mapStyle(levelmap[i]),
				isChange : 1,
				rect : {
					x: i%13*blockWidth, 
					y: Math.floor(i/13)*blockHeight, 
					w: blockWidth, 
					h: blockHeight,
				},
				type : levelmap[i],
				index: i,
			}
		}
	}
	return arr
}