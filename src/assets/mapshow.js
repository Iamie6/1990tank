function draw(map, type, ct, oImg, cx, cy){
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
			for (let i = 0; i < map.length; i++) {
				if(map[i] == 1){
					ct.drawImage(
						oImg,
						8 * (i % 4),
						Math.floor(i/4) * 8,
						8,
						8,
						cx + 8 * (i % 4),
						cy + Math.floor(i/4) * 8,
						8,
						8
					)
				}
			}
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
			for (let i = 0; i < map.length; i++) {
				if(map[i] == 1){
					ct.drawImage(
						oImg,
						16 * (i % 2),
						32 + Math.floor(i/2) * 16,
						16,
						16,
						cx + 16 * (i % 2),
						cy + Math.floor(i/2) * 16,
						16,
						16
					)
				}
			}
			break;
		case 19:
			ct.drawImage(
				oImg,
				0,
				32*2,
				32,
				32,
				cx,
				cy,
				32,
				32
			)
			break;
		case 20:
			ct.drawImage(
				oImg,
				0,
				32*3,
				32,
				32,
				cx,
				cy,
				32,
				32
			)
			break;
		case 21:
			ct.drawImage(
				oImg,
				0,
				32*4,
				32,
				32,
				cx,
				cy,
				32,
				32
			)
			break;
	}
}

//map {Array} [[brick], [stone], [water], [ice], [grass] ] 
//ctArr {Array} [brickCanvas, stoneCanvas, waterCanvas, iceCanvas, grassCanvas]
//oImg {Object} 图片对象
//first {Boolean} 是否方式第一次绘制
//width {Number} 主界面的宽
//height {Number} 主界面的高
export async function mapDraw(map, ct, oImg, width = 416, height = 416){

	let cx = 0
	let cy = 0
	let cw = width / 13
	let ch = height / 13

	let sx = 0
	let sy = 0
	let sw = 32
	let sh = 32
	
	for(let i = 0; i < map.length; i++){
		if(map[i].isChange == 0){
			continue
		}
		cx = i%13*cw
		cy = Math.floor(i / 13)*cw
		ct.clearRect(cx, cy, 32, 32)
		draw(map[i].map, map[i].type, ct, oImg, cx, cy)
		map[i].isChange == 0
	}
	
}


