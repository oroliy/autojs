auto.waitFor()
var actName = '双十二全民寻宝';
var tasks = ['去进店', '去浏览', '去搜索'];
run()


function openActPage() {
	sleep(1000);
	toastLog("打开手机淘宝");
	app.startActivity({
		packageName: "com.taobao.taobao",
		className: "com.taobao.search.searchdoor.SearchDoorActivity"
	});

	waitForActivity("com.taobao.search.searchdoor.SearchDoorActivity");
	sleep(1000);
	setText(actName);
	if (text("搜索").exists())
		text("搜索").findOne().click();
}
function openMissionPage() {
	click(1215, 2245);
	sleep(1500);
}

function signin() {
	if (textContains("签到").exists()) {
		textContains("签到").findOne().click();
		sleep(1600);
	}
}

function run() {
	openActPage();
	toastLog("进入活动页面")
	sleep(3000);

	openMissionPage();
	toastLog("进入任务页面")

	signin();
	toastLog("签到成功")

	var tbMain = 'com.taobao.tao.TBMainActivity'
	for (let index = 0; index < tasks.length; index++) {
		var times = 1;
		while (1) {
			if (textContains(tasks[index]).exists()) {
				toastLog("开始第" + String(times++) + "次" + tasks[index] + "任务")
				go(tasks[index])
				if (currentActivity() == tbMain) {
					openActPage()
					openMissionPage()
				}
			} else break;
		}
	};
	toastLog("任务已全部完成")
}

function go(task) {
	let x = device.width / 2, y = device.height / 5;
	click(textContains(task).findOne().click())
	toast("点击" + task)
	sleep(1000)
	if (textContains("今日已达上限").exists()) {
		toastLog('此任务已完成');
		back();
	}

	for (let index = 0; index < 30; index++) {
		swipe(x, 4 * y, x, y, 1000);
		if (textContains("任务完成").exists() || descContains("任务完成").exists() || descContains("今日已达上限").exists()) {
			toastLog('当前店铺完成');
			break;
		}
	}
	back()
	sleep(1000)
}