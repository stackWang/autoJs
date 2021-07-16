
/**
 * 刷微博
 * 1080 * 2340
 * */ 



let singleSleep = 3;
let step = {
    hall2Task: () => {
        clickId('redpacketSave')
        sleep(3000)
         // 去掉积分提示的弹窗
         if(textStartsWith('连续签到第').findOnce() != null){
            log(clickTar(textStartsWith('连续签到第').findOnce().parent().child(2)))
        }
        var args = randSwipeArg(1800, 1800);
        swipe(args[0], args[1], args[2], args[3], args[4])
        sleep(1000)
    },
    reEnterTask: () => {
        clickId('titleLeft')
        sleep(500)
        step.hall2Task();
    },
    myWeiBo: () => {
        desc('我').findOnce().click()
        sleep(1000)
        clickTar(text('微博').findOnce())
        sleep(2000)
    }
}
let doTask = {
    关注: () => {
        let btn = className('android.widget.Button').text('关注').findOnce();
        if(btn == null){
            toastLog('任务不存在')
            return;
        }

        btn.click()
        sleep(singleSleep * 1000);
        let q = 5;
        while(--q >= 0 && Guanzhu()){
            toastLog(fmt('完成第%s个，休眠%s秒', q, singleSleep))
            sleep(singleSleep * 1000);
        }
        clickId('com.sina.weibo:id/rltitleBack')
    },
    转发: () => {
        let btn = className('android.widget.Button').text('转发').findOnce();
        if(btn == null){
            toastLog('任务不存在')
            return;
        }

        btn.click()
        sleep(singleSleep * 1000);
        let q = 2;
        while(--q >= 0 && Zhuanfa()){
            toastLog(fmt('完成第%s个，休眠%s秒', q, singleSleep))
            sleep(singleSleep * 1000);

            var args = randSwipeArg(1600, 2000);
            swipe(args[0], args[1], args[2], args[3], args[4])
            sleep(2000);
        }
        clickId('com.sina.weibo:id/rltitleBack')
    },
    评论: () => {
        let btn = className('android.widget.Button').text('评论').findOnce();
        if(btn == null){
            toastLog('任务不存在')
            return;
        }

        btn.click()
        sleep(singleSleep * 1000);
        let q = 2;
        while(--q >= 0 && Pinglun()){
            toastLog(fmt('完成第%s个，休眠%s秒', q, singleSleep))
            sleep(singleSleep * 1000);

            var args = randSwipeArg(1600, 2000);
            swipe(args[0], args[1], args[2], args[3], args[4])
            sleep(2000);
        }
        clickId('com.sina.weibo:id/rltitleBack')
    },
    发微博: () => {
        let btn = className('android.widget.Button').text('发微博').findOnce();
        if(btn == null){
            toastLog('任务不存在')
            return;
        }

        btn.click()
        sleep(singleSleep * 1000);
        let q = 1;
        while(--q >= 0 && Faweibo()){
            toastLog(fmt('完成第%s个，休眠%s秒', q, singleSleep))
            sleep(singleSleep * 1000);
        }
        clickId('com.sina.weibo:id/rltitleBack')
    },
    刷微博: () => {
        // clickId('titlebarTabView_hot')
        // sleep(3000)
        // clickId('com.sina.weibo:id/iv_close')
    
        var i = 0, validCount = 0;
        while(true){
            ++i;
            var args = randSwipeArg();
            swipe(args[0], args[1], args[2], args[3], args[4])
            let process = getProcess();
            toastLog(fmt('第%s次滑动:[%s,%s] => [%s,%s]: %s', i, args[0], args[1], args[2], args[3], process))
            sleep(2000)
        
            if(process === '没有'){
                if(!clickId('complete_rp_iv') && (++validCount > 7)){
                    toastLog('图标不在了 程序退出')
                    break;
                }
            }else{
                validCount = 0;
            }
        }
        sleep(2000)
    },
    
    collect: () => {
        while(className('android.widget.Button').textEndsWith('积分').find().size() > 0){
            let cur = className('android.widget.Button').textEndsWith('积分').findOnce()
            log(cur.text())
            cur.click();
            sleep(4000)    
        }
    },
    clear: () => {
        step.myWeiBo();

        let q = 0;
        while(true){
            // 删除单条
            if(!id('contentTextView').exists()){ break; }
            
            let contentDesc = id('contentTextView').findOnce().contentDescription.toString();
            let exe = contentDesc.indexOf('TestWeibo：') > -1 || contentDesc.indexOf('Waiting For Delete') > -1;
            if(!exe){ break; }

            clickId('contentTextView')
            sleep(2000)
            clickId('com.sina.weibo:id/detail_activity_header_right_button')
            sleep(1000)
            clickTar(className('android.widget.TextView').text('删除').findOnce())
            sleep(300)
            clickTar(text('确定'))
            sleep(1000)
            q++;

            // 刷新
            clickId('titleSave')
            sleep(1000)
            clickTar(text('刷新').findOnce())
            sleep(3000)
        }
        toastLog('清理完成')
        clickId('com.sina.weibo:id/titleBack')
        sleep(1000)
        desc('首页').findOnce().click()
    },
    start: () => {
        auto()
        toastLog(fmt("设备尺寸：%s*%s \n手机型号：%s \n安卓版本：%s", device.width, device.height, device.model, device.release));
        app.launchApp("微博");
        sleep(1000);
        clickTar(text('跳过').findOnce())
        sleep(1000);

        step.hall2Task();
       
        doTask.关注();
        sleep(1000)

        doTask.转发();
        sleep(1000)
        
        doTask.评论();
        sleep(1000)
        
        doTask.发微博();
        sleep(1000)

        step.reEnterTask()
        doTask.collect();
        clickId('titleLeft')
        sleep(1000)


        doTask.clear();

        toastLog('日常任务已完成，开始刷微博')
        doTask.刷微博()
        sleep(500)
    }
}

doTask.start()



function Faweibo() {
    toastLog("已尝试点击“发微博”任务按钮");
    sleep(1000);
    while (text("加载中").findOnce() != null) {
        toastLog("正在等待“发微博”加载……");
        sleep(2000);
    }
    if (id("com.sina.weibo:id/titleText").findOnce() != null) {
        if (id("com.sina.weibo:id/titleText").findOnce().text() == "发微博") {
            toastLog("已处于“发微博”页面");
            sleep(2000);
            if (Sendtime == null) {
                var Sendtime = 1;
            } else {
                Sendtime++;
            }
            setText("TestWeibo：" + Sendtime);
            sleep(1000);
            if (id("com.sina.weibo:id/titleSave").findOnce() != null) {
                var FS = id("com.sina.weibo:id/titleSave").findOnce().bounds();
                click(FS.centerX(), FS.centerY());
                toastLog("已尝试点击“发送”按钮");
                sleep(2000);
            }
        } else {
            var CW = id("com.sina.weibo:id/titleText").findOnce().text();
            toastLog("处于错误的界面:" + CW + "，即将重新进入活动…");
            sleep(2000);
        }
    } else {
        toastLog("未找到微博顶栏标题，即将重新进入活动…");
        sleep(2000);
    }
}

function Pinglun() {
    toastLog("已尝试点击“评论/抢沙发”任务按钮");
    sleep(1000);
    while (text("加载中").findOnce() != null) {
        toastLog("正在等待“评论列表”加载……");
        sleep(2000);
    }
    if (id("com.sina.weibo:id/titleText").findOnce() != null) {
        if (id("com.sina.weibo:id/titleText").findOnce().text() == "热门微博" ||
            id("com.sina.weibo:id/titleText").findOnce().text() == "快来抢沙发") {
            toastLog("已处于“评论列表”");
            sleep(2000);

            clickId('com.sina.weibo:id/midButton')
            sleep(2000)
            clickTar(text('评论').findOne())
            sleep(1000)
            if(id('element_editbox').exists()){
                let textStr = 'testComment' + random(2000, 3000);
                setText(textStr)
                clickId('com.sina.weibo:id/tv_send')
                sleep(3000)
                // 删除
                clickTar(text(textStr).findOne().parent())
                sleep(400)
                clickTar(className('android.widget.TextView').text('删除').findOne())
                sleep(400)
                clickTar(className('android.widget.TextView').text('确定').findOne())
                back();
                return true;
            }
        } else {
            var CW = id("titleText").findOnce().text();
            toastLog("处于错误的界面:" + CW + "，即将重新进入活动…");
            sleep(2000);
        }
    } else {
        toastLog("未找到微博顶栏标题，即将重新进入活动…");
        sleep(2000);
    }
    return false;
}

function Zhuanfa() {
    while (text("加载中").findOnce() != null) {
        toastLog("正在等待“转发列表”加载……");
        sleep(2000);
    }
    if (id("com.sina.weibo:id/titleText").findOnce() != null) {
        if (id("com.sina.weibo:id/titleText").findOnce().text() == "热门微博") {
            toastLog("已处于“转发列表”");
            sleep(2000);
            if (id("com.sina.weibo:id/leftButton").findOnce() != null) {
                id("com.sina.weibo:id/leftButton").findOnce().click();
                toastLog("已尝试点击“左转”按钮");
                sleep(2000);
                if (id("com.sina.weibo:id/forward_edit").findOnce() != null) {
                    id("com.sina.weibo:id/forward_edit").findOnce().click();
                    toastLog("已尝试点击“转发编辑”按钮");
                    sleep(2000);
                    if (id("com.sina.weibo:id/titleText").findOnce() != null) {
                        if (id("com.sina.weibo:id/titleText").findOnce().text() == "转发微博") {
                            setText(fmt("转发微博（Waiting For Delete & %s)", random(1000, 2000)));
                            sleep(1000);
                            var Fs = id("com.sina.weibo:id/titleSave").findOne().bounds();
                            click(Fs.centerX(), Fs.centerY());
                            toastLog("已尝试点击“发送”按钮");
                            sleep(2000);
                            return true;
                        }
                    }
                }
            }
        } else {
            var CW = id("com.sina.weibo:id/titleText").findOnce().text();
            toastLog("处于错误的界面:" + CW + "，即将重新进入活动…");
            sleep(2000);
        }
    } else {
        toastLog("未找到微博顶栏标题，即将重新进入活动…");
        sleep(2000);
    }
    return false;
}

function Guanzhu() {
    clickTar(text("推荐").findOnce())
    toastLog("已尝试点击“关注”任务按钮");
    sleep(2000);
    while (text("加载中").findOnce() != null) {
        toastLog("正在等待“关注列表”加载……");
        sleep(2000);
    }
    if (id("com.sina.weibo:id/titleText").findOnce() != null) {
        if (id("com.sina.weibo:id/titleText").findOnce().text() == "关注") {
            toastLog("已处于“关注列表”");
            sleep(3000);
            let btn = textStartsWith('粉丝数').findOnce().parent().parent().findOne(className('android.widget.Button').text('关注'))
            if (btn != null) {
                clickTar(btn.parent());
                toastLog("已尝试点击“关注”按钮");
                sleep(3000);
                if (text("已关注").findOnce() != null) {
                    var QXGZ = text("已关注").findOnce().bounds();
                    click(QXGZ.centerX(), QXGZ.centerY());
                    toastLog("已尝试点击“已关注”按钮");
                    sleep(3000);
                    if (className("android.widget.TextView").text("已关注").findOnce() != null) {
                        var Aqg = className("android.widget.TextView").text("已关注").findOnce().bounds();
                        click(Aqg.centerX(), Aqg.centerY());
                        toastLog("已尝试点击“已关注菜单”按钮");
                        sleep(2000);
                        if (className("android.widget.TextView").text("取消关注").findOnce() != null) {
                            var QG = className("android.widget.TextView").text("取消关注").findOnce().bounds();
                            click(QG.centerX(), QG.centerY());
                            toastLog("已尝试点击“取消关注”按钮");
                            sleep(2000);
                            if (className("android.widget.TextView").text("确定").findOnce() != null) {
                                className("android.widget.TextView").text("确定").findOnce().click();
                                toastLog("已尝试点击“确定取消关注”按钮");
                                sleep(500)
                                clickId('img_back')
                                return true;
                            }
                        }
                    }
                }
            }
        } else {
            var CW = id("titleText").findOnce().text();
            toastLog("处于错误的界面:" + CW + "，即将重新进入活动…");
            sleep(2000);
        }
    } else {
        toastLog("未找到微博顶栏标题，即将重新进入活动…");
        sleep(2000);
    }
    return false;
}





/** common */

function getProcess(){
    if(id('bottom_process_tv').exists()){
        return id('bottom_process_tv').findOne().text()
    }
    
    return '没有'
}

function fmt(str){
    var args = arguments, flag = true, i = 1;
    str = str.replace(/%s/g, function () {
        var arg = args[i++];
        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
}

function clickId(tid){
    if(id(tid).exists()){
        let target = id(tid).findOne();
        return clickTar(target);
    }
    return false;
}

function clickTar(target){
    if(target == null){
        return false;
    }

    if(target.clickable()){
        target.click();
    }else{
        let bounds = target.bounds()
        click(bounds.centerX(), bounds.centerY())
    }
    return true;
}
function randSwipeArg(minHight, maxHeight){
    var swipeCost = random(500, 800),
        randStartY = random(200, 400),
        randEndY = random(minHight || 1200, maxHeight || 1800),
        randStartX = random(20, 40),
        randEndX = random(20, 40)
    ;
    randStartX = (randStartX % 2 == 0) ? -randStartX : randStartX
    randEndX = (randEndX % 2 == 0) ? -randEndX : randEndX

    var startX = device.width / 2 + randStartX,
        startY = device.height - randStartY,
        endX = device.width / 2 + randEndX,
        endY = device.height - randEndY
    ;
    return [startX, startY, endX, endY, swipeCost];
}
