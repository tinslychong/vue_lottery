# vue_lottery
 vue-cli3&element-ui lottery project
 
 vue-cli3&element-ui实现的在线抽奖模拟器,具备配置导出导入的功能

效果预览:http://icelily.xyz/lottery

1.install安装
npm install

2.run运行
npm run dev

修改src/view/lottery/index.vue的91行:const allcfgs_url="";//改为抽奖配置地址的url

配置示例json

{
	"data": [{
		"id": 1,
		"name": "阴阳师-召唤",
		"path": "http://127.0.0.1/yys.json"
	},
		{
		"id": 2,
		"name": "龙族幻想-星云宝藏",
		"path": "http://127.0.0.1/lzhx_xybz.json"
	},
}

游戏配置示例json(上面的yys.json)

{"data":[{"name":"三星","value":"74"},{"name":"四星","value":"20"},{"name":"五星","value":"4.5"},{"name":"六星","value":"1.5"}]}

3.build发布
npm run build:prod
