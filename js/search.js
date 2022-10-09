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

// 加载DOM后执行脚本
window.addEventListener('DOMContentLoaded', function () {

    // 获取元素
    const searchBox = document.querySelector('.search-box');
    const searchLogo = searchBox.querySelector('.search-logo');
    const searchIco = document.querySelector('.search-bar').querySelector('.search-select');
    const searchInput = document.querySelector('.search-bar').querySelector('#searchInput');
    const searchBtn = searchBox.querySelector('.search-btn');
    const searchCard = document.querySelector('.search-bar').querySelector('.search-card');
    var flag = true;


    // 一、启动页面聚焦搜索栏
    searchInput.select();

    // 二、显示与隐藏搜索引擎选项卡 search-card
    // 1.点击searchIco显示/隐藏选项卡
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

    // 2.点击searchBox区域隐藏选项卡
    searchBox.addEventListener('click', function () {
        if (!flag) {
            searchCard.style.display = 'none';
            flag = true;
        }
    });

    // 三、生成搜索引擎选项
    // 1.根据搜索引擎数量自动生成searchCard中items信息
    for (let i = 0; i < searchInfo.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-index', i);   // 设置自定义属性index
        searchCard.querySelector('ul').appendChild(li);
        li.innerHTML = '<span class="search-items-ico"></span>' + searchInfo[i].name;
        li.querySelector('.search-items-ico').style.backgroundPosition = searchInfo[i].positionItemsIcon;
    }

    // 四、切换搜索引擎
    // 1.点击li，改变搜索引擎信息、Ico及Logo    事件委托
    var num = 0;
    searchCard.addEventListener('click', function (e) {
        let index = e.target.getAttribute('data-index') || e.target.parentNode.getAttribute('data-index');
        // 1.1切换selectIcon
        searchIco.style.backgroundPosition = searchInfo[index].positionIcon;
        // 1.2切换banner logo
        searchLogo.style.backgroundPosition = searchInfo[index].positionlogo;
        num = index;
    });

    // 五、点击搜索
    // 在新页面打开选项开关
    let newPageOn = true;
    searchBtn.addEventListener('click', function () {
        if (newPageOn) {
            window.open(searchInfo[num].url + searchInput.value);   // 新窗口打开
            searchInput.select();   // 搜索后选中
        } else {
            // 当前页面打开
            // location.assign(searchInfo[num].url + searchInput.value);
            location.href = searchInfo[num].url + searchInput.value;
        }
    });

    // 六、未聚焦回车聚焦,聚焦回车搜索
    // 判断聚焦输入栏状态
    var enter = true;
    searchInput.addEventListener('focus', function () {
        enter = true;
    });

    searchInput.addEventListener('blur', function () {
        enter = false;
    });

    window.addEventListener('keydown', function (e) {
        if (e.code === 'Enter' && enter) {
            searchBtn.click();
            console.log('回车搜索');
        } else if (e.code === 'Enter' && !enter) {
            searchInput.select();
            console.log('聚焦搜索框');
        }
    });

});