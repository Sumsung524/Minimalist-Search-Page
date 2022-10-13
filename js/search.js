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

    // 获取元素
    const searchBox = document.querySelector('.search-box');
    const searchLogo = searchBox.querySelector('.search-logo');
    const searchIco = document.querySelector('.search-bar').querySelector('.search-select');
    const searchInput = document.querySelector('.search-bar').querySelector('#searchInput');
    const searchBtn = searchBox.querySelector('.search-btn');
    const searchCard = document.querySelector('.search-bar').querySelector('.search-card');

    // 1.页面启动光标选中搜索栏
    searchInput.select();

    // 2.显示/隐藏搜索引擎选项卡 search-card
    // 2.1.输入框左侧图标(searchIco)显示/隐藏选项卡 点击事件
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
    let newPageOn = true;   // [在新页面打开] 选项开关
    searchBtn.addEventListener('click', function () {
        if (newPageOn) {
            window.open(searchInfo[searchItemIndex].url + searchInput.value);       // 新窗口打开
            searchInput.select();   // 搜索后选中输入文本
        } else {
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
    // 函数useTipsFn()： 显示/关闭使用提示
    function useTipsFn(aTime) {
        //遮罩层 shade
        let shade = document.createElement('div');
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
            tipsCardFn(shade, '1.4rem', '3.18rem', '【Tab】键,快速切换搜索引擎。'); // 显示tab键提示
            tipsCardFn(shade, '1.4rem', '6.66rem', '光标聚焦搜索栏，【Enter】键，直接进行搜索。');      // 显示Enter键提示
            tipsCardFn(shade, '1.65rem', '4.4rem', '光标未聚焦搜索栏，【Enter】键，光标聚焦搜索栏。');  // 显示Enter键位提示
            startUseFn(shade, '开始使用', shade, searchBox);    // 开始使用及点击关闭提示信息事件
        }, aTime);
    }
    // 7.1.第一次启动页面显示使用提示
    if (!window.localStorage.getItem('FirstOpen')) { useTipsFn(100); }
    // 7.2.快捷键Hel按钮 点击事件 显示使用提示
    searchBox.querySelector('.shortcuts').addEventListener('click', function () { useTipsFn(100); });


    // 8.测试按钮，清楚本地储存
    let reset = document.createElement('button');
    reset.innerHTML = '清理本地存储数据';
    searchBox.appendChild(reset);
    reset.addEventListener('click', function () {
        window.localStorage.clear();
    });

});