// 加载DOM后执行脚本
window.addEventListener('DOMContentLoaded', function () {
    // 搜索引擎选项信息
    const searchInfo = [{
        name: "百度",
        positionItemsIcon: "-0.4167rem 0",
        positionIcon: "0 0",
        positionlogo: "0 0",
        url: "https://www.baidu.com/s?wd="
    }, {
        name: "谷歌",
        positionItemsIcon: "-0.5469rem 0",
        positionIcon: "-0.2083rem 0",
        positionlogo: "0 -0.4792rem",
        url: "https://www.google.com/search?q="
    }, {
        name: "必应",
        positionItemsIcon: "-0.4167rem -.5208rem",
        positionIcon: "0 -0.8333rem",
        positionlogo: "0 -0.9583rem",
        url: "https://cn.bing.com/search?q="
    }, {
        name: "知乎",
        positionItemsIcon: "-0.5469rem -0.5208rem",
        positionIcon: "-0.2083rem -0.8333rem",
        positionlogo: "0 -1.4375rem",
        url: "https://www.zhihu.com/search?type=content&q="
    }, {
        name: "GitHub",
        positionItemsIcon: "-0.4167rem -0.9115rem",
        positionIcon: "0 -1.4583rem",
        positionlogo: "0 -1.9167rem",
        url: "https://github.com/search?utf8=✓&q="
    }, {
        name: "英译中",
        positionItemsIcon: "-0.5469rem -0.1302rem",
        positionIcon: "-0.2083rem -0.2083rem",
        positionlogo: "0 -2.3958rem",
        url: "https://translate.google.cn/?sl=en&tl=zh-CN&text="
    }, {
        name: "B站",
        positionItemsIcon: "-0.5469rem -0.651rem",
        positionIcon: "-0.2083rem -1.0417rem",
        positionlogo: "0 -2.875rem",
        url: "http://search.bilibili.com/all?keyword="
    }, {
        name: "优酷",
        positionItemsIcon: "-0.5469rem -0.7813rem",
        positionIcon: "-0.2083rem -1.25rem",
        positionlogo: "0 -3.3542rem",
        url: "https://so.youku.com/search_video/q_"
    }, {
        name: "腾讯",
        positionItemsIcon: "-0.4167rem -0.1302rem",
        positionIcon: "0 -0.2083rem",
        positionlogo: "0 -3.8333rem",
        url: "https://v.qq.com/x/search/?q="
    }, {
        name: "网易云",
        positionItemsIcon: "-0.4167rem -0.7813rem",
        positionIcon: "0 -1.25rem",
        positionlogo: "0 -4.3125rem",
        url: "https://music.163.com/#/search/m/?s="
    }, {
        name: "值得买",
        positionItemsIcon: "-0.5469rem -0.9115rem",
        positionIcon: "-0.2083rem -1.4583rem",
        positionlogo: "0 -4.7917rem",
        url: "https://search.smzdm.com/?c=home&s="
    }, {
        name: "京东",
        positionItemsIcon: "-0.4167rem -0.3906rem",
        positionIcon: "0 -0.625rem",
        positionlogo: "0 -5.23rem",
        url: "http://search.jd.com/Search?keyword="
    }];

    // 写入初始用户配置
    if (!window.localStorage.getItem('FirstOpen')) { // 如果本次存储没有FirstOpen(第一次打开)，写入初始配置
        window.localStorage.setItem('darkMode', 'off'); // 设置夜间模式默认关闭
        window.localStorage.setItem('darkModeAuto', 'off'); // 设置默认不打开自动切换夜间模式
        window.localStorage.setItem('dayModeTime', '6,18');   // 设置默认白天时段
        window.localStorage.setItem('newPageOn', 'on'); // 设置默认在新页面打开
        window.localStorage.setItem('shortcutsTurn', 'on'); // 设置默认快捷键提示
        window.localStorage.setItem('weatherWidget', 'off'); // 设置默认天气插件关闭
    }

    // 获取元素
    const searchBox = document.querySelector('.search-box');
    const searchLogo = searchBox.querySelector('.search-logo');
    const searchIco = document.querySelector('.search-bar').querySelector('.search-select');
    const searchInput = document.querySelector('.search-bar').querySelector('#searchInput');
    const searchBtn = searchBox.querySelector('.search-btn');
    const searchCard = document.querySelector('.search-bar').querySelector('.search-card');

    // 初始变量
    let dayModeTime = window.localStorage.getItem('dayModeTime').split(',');    // 时段数组默认数组

    // 1.页面启动光标选中搜索栏
    searchInput.select();

    // 2.显示/隐藏搜索引擎选择选项卡 search-card
    // 2.1.点击事件 点击输入框左侧图标(searchIco)显示/隐藏选项卡 
    let flag = true;    // 判断选项卡的显示状态
    searchIco.addEventListener('click', function (e) {
        e.stopPropagation();    // 阻止事件冒泡，防止触发searchBox点击事件
        if (flag) {
            searchCard.style.display = 'block';
            flag = false;
        }
        else {
            searchCard.style.display = 'none';
            flag = true;
        }
    });
    // 2.2.点击searchBox区域隐藏选项卡
    searchBox.addEventListener('click', function () {
        if (!flag) {
            searchCard.style.display = 'none';
            flag = true;
        }
    });

    // 3.生成搜索引擎选项
    // 3.1.根据搜索引擎信息searchInfo自动生成searchCard中items信息
    for (let i = 0; i < searchInfo.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-index', i);   // 设置自定义属性index
        searchCard.querySelector('ul').appendChild(li);
        li.innerHTML = '<span class="search-items-ico"></span>' + searchInfo[i].name;
        li.querySelector('.search-items-ico').style.backgroundPosition = searchInfo[i].positionItemsIcon;
    }

    // 4.切换搜索引擎
    // 函数changeSearchFn(): 切换搜索引擎  index 索引号
    function changeSearchFn(index) {
        searchIco.style.backgroundPosition = searchInfo[index].positionIcon;    // 切换selectIcon
        searchLogo.style.backgroundPosition = searchInfo[index].positionlogo;   // 切换banner logo
        window.localStorage.setItem('searchItemIndex', index);
    }
    // 4.1.启动页面切换至上次用户选择的搜索引擎
    let searchItemIndex = window.localStorage.getItem('searchItemIndex') ? parseInt(window.localStorage.getItem('searchItemIndex')) : 0;    // 检测是否存在searchItemIndex
    changeSearchFn(searchItemIndex);
    // 4.2.事件委托 切换搜索引擎点击事件
    searchCard.addEventListener('click', function (e) {
        let index = e.target.getAttribute('data-index') || e.target.parentNode.getAttribute('data-index');
        changeSearchFn(index);
        searchItemIndex = index;    // 确保变量searchItemIndex与本地存储数据searchItemIndex实时同步
    });

    // 5.点击searchBtn搜索事件
    searchBtn.addEventListener('click', function () {
        if (window.localStorage.getItem('newPageOn') === 'on') {    // [在新页面打开] 选项开关
            window.open(searchInfo[searchItemIndex].url + searchInput.value);       // 新窗口打开
            searchInput.select();   // 搜索后选中输入文本
        } else if (window.localStorage.getItem('newPageOn') === 'off') {
            location.href = searchInfo[searchItemIndex].url + searchInput.value;    // 当前页面打开
        }
    });

    // 6.快捷键
    // 6.1.判断聚焦输入栏状态
    let enter = true;
    searchInput.addEventListener('focus', function () { enter = true; });
    searchInput.addEventListener('blur', function () { enter = false; });
    window.addEventListener('keydown', function (e) {
        // 6.2.回车Enter快捷键
        if (e.code === 'Enter' && enter) {
            searchBtn.click();      // 聚焦时进行搜索
        } else if (e.code === 'Enter' && !enter) {
            searchInput.select();   // 未聚焦时聚焦搜索栏
        }
        // 6.3.Tab快捷键，切换搜索引擎
        if (e.code === 'Tab') {
            e.preventDefault();   //阻止默认行为
            searchItemIndex++;
            if (searchItemIndex >= searchCard.querySelectorAll('li').length) searchItemIndex = 0;
            window.localStorage.setItem('searchItemIndex', searchItemIndex);    // 确保变量searchItemIndex与本地存储数据searchItemIndex实时同步
            searchCard.querySelectorAll('li')[searchItemIndex].click();
        }
    });

    // 7.第一次启动页面显示使用提示
    // 函数tipsCardFn()：显示tipscard
    function tipsCardFn(ele, positionTop, positionLeft, content) {  // ele 添加在ele元素内 positionTop positionLeft tipscard文字位置 content 文本内容
        let tipscard = document.createElement('div');
        tipscard.innerHTML = content + '<span></span>';
        // 提示卡样式 tipscard.style
        tipscard.style.position = 'absolute';
        tipscard.style.top = positionTop;
        tipscard.style.left = positionLeft;
        tipscard.style.fontSize = '.0625rem';
        tipscard.style.color = '#fff';
        tipscard.style.whiteSpace = 'nowrap';   // 阻止自动换行，防止换行导致标记位置不准确
        // 小三角样式 span.style
        tipscard.querySelector('span').style.position = 'absolute';
        tipscard.querySelector('span').style.bottom = '-0.0104rem';
        tipscard.querySelector('span').style.left = '.0208rem';
        tipscard.querySelector('span').style.transform = 'translateY(100%)';
        tipscard.querySelector('span').style.width = '0';
        tipscard.querySelector('span').style.height = '0';
        tipscard.querySelector('span').style.border = '.0521rem solid transparent';
        tipscard.querySelector('span').style.borderTopColor = '#fff';
        ele.appendChild(tipscard);  // 添加节点
    }
    // 函数startUseFn()：开始使用button 
    function startUseFn(ele, content, clearEle, parentNode) { // ele 添加在ele元素后 content 按钮文本内容 clearEle 删除元素(含本身) parentNode 删除元素父节点
        let startUse = document.createElement('button');
        // startUse.style
        startUse.style.position = 'absolute';
        startUse.style.top = '80%';
        startUse.style.left = '50%';
        startUse.style.fontSize = '.0625rem';
        startUse.style.color = '#fff';
        startUse.style.padding = '0.08rem';
        startUse.style.border = '.012rem solid #fff';
        startUse.style.borderRadius = '.03rem';
        startUse.style.backgroundColor = 'rgb(7 153 250)';
        startUse.style.cursor = 'pointer';
        startUse.innerHTML = content;
        ele.appendChild(startUse);  // 添加节点
        // 开始使用button点击事件
        const removeTips = startUse.addEventListener('click', function () {
            clearEle.style.opacity = '0';   // 隐藏遮罩动画
            window.localStorage.setItem('FirstOpen', 'off');    // 只有点击开始使用后，下次不再弹出使用提示
            setTimeout(function () {
                clearEle.innerHTML = '';
                parentNode.removeChild(clearEle);
                startUse.removeEventListener('click', removeTips);   //删除事件
            }, 1000);
        });
    }
    // 函数shadeFn()： 显示/关闭使用提示
    //遮罩层 shade
    let shade = document.createElement('div');
    function shadeFn(aTime, callback) {
        shade.style.position = 'absolute';
        shade.style.top = '0';
        shade.style.left = '0';
        shade.style.width = '100%';
        shade.style.height = '100%';
        shade.style.overflow = 'hidden';    // 阻止缩小缩小盒子内部内容超出
        shade.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        shade.style.opacity = '0';
        shade.style.transition = 'all 1s';
        searchBox.appendChild(shade);   // 添加遮罩至search-box盒子内
        window.setTimeout(function () { // 定时器 0.5s后
            shade.style.opacity = '1'; // 显示遮罩
            callback && callback();
        }, aTime);
    }
    // 7.1.第一次启动页面显示使用提示
    if (!window.localStorage.getItem('FirstOpen')) {
        shadeFn(100, function () {
            tipsCardFn(shade, '1.4rem', '3.18rem', '【Tab】键,快速切换搜索引擎。'); // 显示tab键提示
            tipsCardFn(shade, '1.4rem', '6.66rem', '光标聚焦搜索栏，【Enter】键，直接进行搜索。');      // 显示Enter键提示
            tipsCardFn(shade, '1.65rem', '4.4rem', '光标未聚焦搜索栏，【Enter】键，光标聚焦搜索栏。');  // 显示Enter键位提示
            tipsCardFn(shade, '2.05rem', '4.4rem', '【Ctrl】+【~】键，切换夜间模式。');  // 显示Enter键位提示
            startUseFn(shade, '开始使用', shade, searchBox);    // 开始使用及点击关闭提示信息事件
        });
    }

    // 8.显示/隐藏配置List
    let configMenuBtn = document.querySelector('.config-menu-btn');
    let configList = document.querySelector('.config-list');
    let configListFlag = true;  // 判断configList显示/隐藏状态

    //函数recoverMenuBtnClickFn()
    function recoverMenuBtnClickFn() {
        configMenuBtn.addEventListener('click', menuListToggleFn);  // 1.动画结束后，恢复显示/隐藏配置List的点击事件
        if (configListFlag) searchBox.removeChild(shade);   // 2.如果是关闭配置List，删除遮罩
        shade.removeEventListener('transitionend', recoverMenuBtnClickFn);  // 3.删除当前点击事件
    }

    // 函数menuListToggleFn():显示/隐藏配置List
    function menuListToggleFn() {
        configMenuBtn.removeEventListener('click', menuListToggleFn);   // 关闭菜单按钮点击事件
        if (configListFlag) {   // 显示配置List
            configMenuBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanbi"></use></svg>'
            configList.style.right = '0';
            configListFlag = false;
            shadeFn(100);   // 生成遮罩
        } else {    // 隐藏配置List
            configMenuBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-menu1"></use></svg>'
            configList.style.right = '';
            configListFlag = true;
            shade.style.opacity = '0';  // 隐藏遮罩
        }
        shade.addEventListener('transitionend', recoverMenuBtnClickFn); // 遮罩动画后触发事件
    }

    // 8.1点击事件 配置菜单按钮，显示/隐藏配置List
    configMenuBtn.addEventListener('click', menuListToggleFn);

    // 8.2点击事件 如果配置菜单未关闭，点击遮罩隐藏配置List
    shade.addEventListener('click', function () {
        if (!configListFlag) configMenuBtn.click();
    });

    // 9.点击事件 配置List选项按钮开关样式
    let configListBtns = configList.querySelectorAll('span');
    for (let i = 0; i < configListBtns.length; i++) {
        configListBtns[i].addEventListener('click', function () {
            this.classList.toggle('btnOn');
        });
    }

    // 10.手动切换夜间模式
    let darkMode = searchBox.querySelector('.dark-mode');   // 手动切换夜间模式按钮

    // 函数darkModeChangeFn(): 切换夜间模式
    function darkModeChangeFn() {
        if (window.localStorage.getItem('darkMode') === 'off') {
            darkModeFn(true);
            window.localStorage.setItem('darkMode', 'on');
        } else if (window.localStorage.getItem('darkMode') === 'on') {
            darkModeFn(false);
            window.localStorage.setItem('darkMode', 'off');
        }
    }

    // 函数darkModeFn()：白天夜间模式样式 true/false
    function darkModeFn(turnOn) {
        searchBox.style.backgroundColor = turnOn === true ? '#2c2e2f' : '';     // 背景底色
        searchInput.style.backgroundColor = turnOn === true ? '#424242' : '';   // 输入框背景颜色
        searchInput.style.borderColor = turnOn === true ? '#333' : '';  // 输入框边框颜色
        searchInput.style.color = turnOn === true ? '#fff' : '';  // 输入框字体颜色
        searchCard.style.backgroundColor = turnOn === true ? 'rgb(66, 66, 66)' : '';    // 选项卡背景颜色
        searchCard.style.borderColor = turnOn === true ? '#ffffff1f' : '';  // 搜索引擎选项卡边框颜色
        for (let i = 0; i < searchCard.querySelectorAll('li').length; i++) {    // 选项卡选项背景颜色及字体颜色
            searchCard.querySelectorAll('li')[i].style.backgroundColor = turnOn === true ? '#666666' : '';
            searchCard.querySelectorAll('li')[i].style.color = turnOn === true ? '#fff' : '';
        }
        document.querySelector('footer').style.color = turnOn === true ? '#ccc' : '';    // footer字体颜色
        document.querySelector('footer').querySelectorAll('a')[0].style.color = turnOn === true ? '#ccc' : '';    // footer链接字体颜色
        document.querySelector('footer').querySelectorAll('a')[1].style.color = turnOn === true ? '#ccc' : '';    // footer链接字体颜色
        // 修改伪元素样式
        // var style = document.createElement('style');
        // style.innerHTML = "#searchInput::selection{color:#fff;background-color:#36b36b;}";
        // document.head.appendChild(style);
    }

    // 10.1.点击事件，点击夜间模式按钮，切换夜间模式
    darkMode.addEventListener('click', darkModeChangeFn);

    // 10.2 [Ctrl]+[~] 切换夜间模式
    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.code == 'Backquote') {
            darkMode.click();
        }
    });

    // 11.自动切换夜间模式
    // 获取元素
    const darkModeAuto = searchBox.querySelector('#dark-mode-auto');    // 自动切换夜间模式按钮
    const darkModeTimeSetting = searchBox.querySelector('.dark-mode-timeSetting');  // 白天时段设置li
    const timeMin = searchBox.querySelector('#timeMin');    // 最小时间元素
    const timeMax = searchBox.querySelector('#timeMax');    // 最大时间元素

    // 函数timePointFn():获取min max时刻与打开页面时的毫秒数差值
    let openDate = new Date();  // 获取页面打开时间
    function timePointFn(hour, day) {   // hour 小时, day 0 当天, 1 后一天
        let maxDate = new Date(openDate.getFullYear() + '-' + (openDate.getMonth() + 1) + '-' + (openDate.getDate() + day) + ' ' + hour + ':00:00');
        return (maxDate.valueOf() - openDate.valueOf());
    }

    // 函数 darkModeAutoFN():自动切换夜间模式
    function darkModeAutoFN() {
        // 1.1白天时段+夜间模式开启→点击+timeMax定时器
        if (openDate.getHours() >= parseInt(dayModeTime[0]) && openDate.getHours() < parseInt(dayModeTime[1]) && window.localStorage.getItem('darkMode') === 'on') {
            darkMode.click();
            // 天黑后,开启夜间模式
            darkTimer || clearTimeout(darkTimer);
            var darkTimer = setTimeout(function () {    // 到夜间仍未开启夜间模式,则自动切换
                if (window.localStorage.getItem('darkMode') === 'off') {
                    darkMode.click();
                }
            }, timePointFn(parseInt(dayModeTime[1]), 0));
        }
        if ((openDate.getHours() < parseInt(dayModeTime[0]) || openDate.getHours() >= parseInt(dayModeTime[1])) && window.localStorage.getItem('darkMode') === 'off') {
            // 1.2晚间时段,夜间模式关闭→点击,timeMin定时器
            darkMode.click();
            // 天亮后,夜间模式关闭
            dayTimer || clearTimeout(dayTimer);
            var dayTimer = setTimeout(function () {
                if (window.localStorage.getItem('darkMode') === 'on') {
                    darkMode.click();
                }
            }, timePointFn(parseInt(dayModeTime[0]), 1));
        }
    }

    // 11.1.首次启动页面，判断:自动切换夜间模式/手动切换夜间模式
    if (window.localStorage.getItem('darkModeAuto') === 'on') { // 自动切换模式
        if (window.localStorage.getItem('darkMode') === 'on') {
            darkMode.classList.add('btnOn');    // 初始化按钮样式
            darkModeFn(true);   // 修改夜间模式样式
        };  // 初始化按钮样式
        darkModeAuto.classList.add('btnOn');    // 初始化按钮样式
        darkModeTimeSetting.style.display = 'block';    // 显示时间段设置
        darkModeAutoFN();
    } else { // 手动切换模式
        if (window.localStorage.getItem('darkMode') === 'on') { // 首次加载，如果用户设置为夜间模式，则打开夜间模式
            darkMode.classList.add('btnOn');
            darkModeFn(true);
        }
    }

    // 11.2.点击自动切换夜间模式，显示设置夜间时段
    darkModeAuto.addEventListener('click', function () {
        darkModeTimeSetting.style.display = this.className === 'btnOn' ? 'block' : 'none';
    });

    // 11.3.点击自动切换夜间模式
    darkModeAuto.addEventListener('click', function () {
        if (window.localStorage.getItem('darkModeAuto') === 'on') { // 关闭自动切换
            window.localStorage.setItem('darkModeAuto', 'off');
        } else {    // 开启自动切换
            window.localStorage.setItem('darkModeAuto', 'on');
            darkModeAutoFN();
        }
    });

    // 12. 白天时段
    // 12.1.初始化时间
    timeMin.innerText = dayModeTime[0];
    timeMax.innerText = dayModeTime[1];

    // 12.2.点击事件 设置白天时段
    let modifyFlag = true;  // 判断是否为修改状态
    darkModeTimeSetting.querySelector('button').addEventListener('click', function () {
        if (modifyFlag) {   // 设置时间
            this.innerText = '确定';
            timeMin.innerHTML = '<input type="number" min = "0" max = "23" value="' + timeMin.innerText + '">';
            timeMax.innerHTML = '<input type="number" min = "1" max = "24" value="' + timeMax.innerText + '">';
            modifyFlag = false;
        } else {    // 确定时间
            let a = parseInt(timeMin.querySelector('input').value); // 输入的最小值
            let b = parseInt(timeMax.querySelector('input').value); // 输入的最大值
            // 判断输入内容是否合规
            if (a < b) {    // 设置合规则设置夜间模式
                this.innerText = '修改';
                timeMin.innerText = a;
                timeMax.innerText = b;
                window.localStorage.setItem('dayModeTime', [a, b].toString());  // 写入本地储存
                dayModeTime = window.localStorage.getItem('dayModeTime').split(',');    // 获取本地储存数据
                darkModeAutoFN();   // 确认之后,确认是否需要切换夜间模式
                modifyFlag = true;
            } else {// 不合规，弹出提示
                alert('输入时段不合规，重新输入');
            }
        }
    });

    // 13. 天气插件
    const weatherWidget = document.querySelector('#weatherWidget');
    // 13.1.首次打开页面
    if (window.localStorage.getItem('weatherWidget') === 'on') {
        WIDGET = {
            "CONFIG": {
                "modules": "02",
                "background": "4",
                "backgroundColor": "E2E7F5",
                "tmpColor": "000000",
                "tmpSize": "16",
                "cityColor": "000000",
                "citySize": "16",
                "aqiColor": "FFFFFF",
                "aqiSize": "16",
                "weatherIconSize": "24",
                "alertIconSize": "18",
                "padding": ".0156rem",
                "shadow": "10",
                "language": "auto",
                "borderRadius": "5",
                "fixed": "true",
                "vertical": "top",
                "horizontal": "left",
                "left": "20",
                "top": "27",
                "key": "4925002e4708416c938bac2fe7bd95da"
            }
        };
        // 添加div
        let weatherDIV = document.createElement('div');
        weatherDIV.id = 'he-plugin-simple';
        document.body.appendChild(weatherDIV);
        // 添加脚本
        let weatherScript = document.createElement('script');
        weatherScript.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
        document.body.appendChild(weatherScript);
        weatherWidget.classList.add('btnOn');
    }

    weatherWidget.addEventListener('click', function () {
        if (window.localStorage.getItem('weatherWidget') === 'off') {
            window.localStorage.setItem('weatherWidget', 'on');
            configMenuBtn.click();
            configList.addEventListener('transitionend', function () { location.reload(); });
        } else {
            WIDGET = { "CONFIG": {} };
            window.localStorage.removeItem('_AMap_vectorlayer');
            window.localStorage.removeItem('_AMap_wgl');
            window.localStorage.removeItem('_AMap_overlay');
            window.localStorage.removeItem('_AMap_mouse');
            window.localStorage.removeItem('_AMap_sync');
            window.localStorage.removeItem('_AMap_AMap.CitySearch');
            window.localStorage.setItem('weatherWidget', 'off');
            configMenuBtn.click();
            configList.addEventListener('transitionend', function () { location.reload(); });
        }
    });

    // 13.点击事件 在新页面打开 newPageOn
    const newPageOn = searchBox.querySelector('#newPageOn');
    // 13.1.首次打开,如果用户配置为未打开,则开关按钮为关闭样式
    if (window.localStorage.getItem('newPageOn') === 'off') newPageOn.classList.remove('btnOn');

    // 13.2.点击事件 在新页面打开开关
    newPageOn.addEventListener('click', function () {
        this.className === 'btnOn' ? window.localStorage.setItem('newPageOn', 'on') : window.localStorage.setItem('newPageOn', 'off');
    });

    // 14.使用提示
    // 函数shortcutsBtnShowFn():显示快捷键按钮并添加点击事件
    let shortcuts = document.createElement('div');
    function shortcutsBtnShowFn() {
        // 生成按钮
        shortcuts.className = 'shortcuts';
        shortcuts.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-help"></use></svg>';
        searchBox.appendChild(shortcuts);
        // 快捷键Help按钮 点击事件→显示使用提示
        shortcuts.addEventListener('click', function () {
            shadeFn(100, function () {
                tipsCardFn(shade, '1.4rem', '3.18rem', '【Tab】键，快速切换搜索引擎。'); // 显示tab键提示
                tipsCardFn(shade, '1.4rem', '6.66rem', '光标聚焦搜索栏，【Enter】键，直接进行搜索。');      // 显示Enter键提示
                tipsCardFn(shade, '1.65rem', '4.4rem', '光标未聚焦搜索栏，【Enter】键，光标聚焦搜索栏。');  // 显示Enter键位提示
                tipsCardFn(shade, '2.05rem', '4.4rem', '【Ctrl】+【~】键，切换夜间模式。');  // 显示Enter键位提示
                startUseFn(shade, '开始使用', shade, searchBox);    // 开始使用及点击关闭提示信息事件
            });
        });
    }

    // 14.1.首次启动，使用提示开启→生成按钮+添加点击事件
    if (window.localStorage.getItem('shortcutsTurn') === 'on') {
        shortcutsBtnShowFn();
    } else {
        searchBox.querySelector('#shortcutsTurn').classList.remove('btnOn'); // 移除样式
    }

    // 14.2.使用提示开关按钮 点击事件
    searchBox.querySelector('#shortcutsTurn').addEventListener('click', function () {
        if (window.localStorage.getItem('shortcutsTurn') === 'on') {
            window.localStorage.removeItem('shortcutsTurn');    // 清除存储
            searchBox.removeChild(shortcuts);
        } else {
            window.localStorage.setItem('shortcutsTurn', 'on');
            shortcutsBtnShowFn();
        }
    });

    // 15.恢复默认设置按钮，清楚本地储存
    let reset = document.querySelector('#reset');
    reset.style.cursor = 'pointer';
    reset.addEventListener('click', function () {
        window.localStorage.clear();
        alert('恢复默认设置成功');
        location.reload();
    });

});