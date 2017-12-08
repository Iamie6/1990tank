export function loadImg(path){
	return new Promise((resolve,reject)=>{
		const oImg = new Image()
		oImg.onload = function(){
			resolve(this);
		}
		oImg.onerror = function(){
			reject('加载失败')
		}
		oImg.src = path
	})
}