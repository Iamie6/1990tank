
function draw(map, type, ct, oImg, cx, cy){
	let y = 0
	switch(type){
		case 0:
			break;
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			break;
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
			y = 32
			break;
		case 19:
			y = 64
			break;
		case 20:
			y = 96
		case 21:
			y = 128
			break;
	}


	for (let i = 0; i < map.length; i++) {
		if(map[i] == 1){
			ct.drawImage(
				oImg,
				i % 2 * 8,
				y + Math.floor(i / 2)*8,
				8,
				8,
				cx + 8 * (i % 2),
				cy + Math.floor(i/2) * 8,
				8,
				8
			)
		}
	}
}

//map {Array} [[brick], [stone], [water], [ice], [grass] ] 
//ct {Object} 离屏canvas的context
//oImg {Object} 图片对象
//width {Number} 主界面的宽
//height {Number} 主界面的高
export function mapDraw(map, ct, oImg, width = 416, height = 416){	
	for(let i = 0; i < map.length; i++){
		if(map[i].isChange == 0){
			continue
		}
		const drawRect = map[i].draw
		ct.clearRect(drawRect.x, drawRect.y, 16, 16)
		draw(map[i].map, map[i].type, ct, oImg, drawRect.x, drawRect.y)
		map[i].isChange = 0
	}
	
}


