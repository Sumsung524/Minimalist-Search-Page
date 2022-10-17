# Minimalist-Search-Page

# ![Minimalist-Search-Page](/images/favicon.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/Sumsung524/Minimalist-Search-Page/blob/master/LICENSE) [![version:v1.1.0](https://img.shields.io/badge/version-v1.1.0-green.svg?style=flat-square)](https://github.com/Sumsung524/Minimalist-Search-Page/releases)

极简搜索聚合，还原搜索本质。

[Minimalist-Search-Page](https://github.com/Sumsung524/Minimalist-Search-Page)，一个极简高效的搜索聚合页面。

国外演示地址Demo:[极简搜索-Minimalist Search](https://sumsung524.github.io/Minimalist-Search-Page/index.html)

国内演示地址Demo:[极简搜索-Minimalist Search](https://sumsu_1.gitee.io/minimalist-search-page/)



## 一、功能介绍

- 简约设计。简单美观的搜索界面，远离广告。
- 轻快实用。专注搜索，极速访问，还原搜索本质。
- 多种引擎聚合。支持切换多种搜索引擎，高效搜索。
- 快捷键。内置功能快捷键，让你的搜索快人一步，成为你的生产力搜索神器。
- 动画设计。设计舒适的动画，让你拥有一次完美的搜索体验。
- 设备适配。根据PC端不同设备、浏览器窗口大小确定组件元素大小进行适配，获得良好的用户体验。
- 记住用户选择。可记住用户上次使用搜索引擎、夜间模式等偏好进行保存，尊重用户习惯。
- 多种自定义设置。页面支持自定义多种功能，例如夜间模式、天气插件、是否在新页面打开搜索结果等多种设置。
- 开源免费，开箱即用。详细使用教程，小白也能快速搭建属于自己的极简搜索页面。



## 二、使用说明

### 1.快捷键说明

- `Enter`键：光标未在搜索框，按`Enter`键直接锁定搜索框内容
- `Enter`键：光标已在搜索框，按`Enter`键直接进行搜索
- `Tab`键：`Tab`快速切换搜索引擎
- `Ctrl`+`~`组合键：快速切换夜间模式

tips：首次打开页面或选择页面右下角提示按钮可快速查看快捷键使用说明



### 2.其他交互说明

- 打开即搜。打开页面自动锁定搜索框，无需点击搜索框即可进入搜索。
- 记住用户使用习惯
  - 保存上次选择的搜索引擎配置。
  - 保存上次选择的所有用户配置选项。例如：夜间模式、自动切换夜间模式、是否在新页面打开搜索结果、是否开启天气插件等所有用户配置都会在进行保存，保证再下一次使用还能遵循设置。

- 通用交互习惯
  - 搜索引擎选项卡显示后，点击输入框左侧图标或空白区域都会隐藏选项卡。
  - 用户配置选项卡显示后，点击关闭按钮或遮罩区域都会隐藏选项卡。




### 3.使用范围

该项目主要适用于PC端，不适用于移动端、平板设备。屏幕过小可能会影响使用体验。

> 后期可能会考虑开发移动端极简搜索页面项目。



## 三、获取方式

如果你想体验或直接使用该项目的搜索引擎页面，可“直接获取”。



### 1.直接获取

直接保存国内演示地址([极简搜索-Minimalist Search](https://sumsung524.github.io/Minimalist-Search-Page/index.html))的网页链接，将保存的网页链接设置为浏览器启动页，确保在每次打开浏览器打开该页面。

> 如何将页面设置为浏览器的启动页，一般在浏览器设置中都可以找到，或者在网上搜索相关教程。

如果你需要：

1. 自行修改或自定义内部一些配置/功能。
2. 演示访问地址过长，不够简洁，需要自定义搜索页面访问地址。
3. 嵌入到网站或者其他页面中。

可以下载该项目进行进一步操作



### 2.本地搭建

你也可以下载本项目(项目右上角code→Download ZIP)，全部解压后，将`index.html`创建快捷方式至桌面，直接在本地环境使用。

作为开发者，内部代码带有详细注释，你可以将该项目进行自定义配置。甚至，将该页面上传至远程服务器，通过网址进行访问，将网址设置为浏览器启动页地址，代替那些满是广告带着商业气息的启动页。



### 3.远程服务搭建

如果该项目能够得到你的喜欢，并且打算长期使用，推荐将该项目上传至gitee国内免费仓库，开启pages服务进行访问。

只需要将下载的项目上传到gitee上根目录，开启pages服务即可进行访问。

> 能在Github上看项目的人相信都会，或者有疑问可搜索gitee上传仓库教程、开启pages服务教程等。



## 四、后续开发

后续可能新增功能

- 搜索热词功能，根据用户搜索内容显示相关搜索。
- 压缩项目代码，优化加载速度。
- 自定义背景，支持修改默认背景。
- 支持添加常用网站。

> 如果你有其他不错的需求，也可以在下方找到联系方式或者`pull request`的方式提供建议或意见。



## 五、关于

### 1.兼容性与问题汇总

- 低版本浏览器动画效果。页面动画基于CSS3动画开发，动画效果可能在低版本浏览器中无法呈现。
- 天气插件组件自适应。天气插件是经过互联网引入页面，未根据窗口大小对天气组件大小进行适配。未实现天气插件组件大小自适应。
- 天气插件加载。用户打开天气插件，会较未打开天气插件时加载时间长，但无明显影响用户体验的变化，不影响正常使用。



### 2.支持

如果你有更好的建议或者发现bug，你可以选择pull requests或发邮件me@xmq.plus与我取得联系。

如果项目能够帮到你，你可以：

- 帮我点亮这个项目的小星星⭐star，十分感谢~

或者你可以：

- 赞赏作者

<img src="https://xmq.plus/medias/reward/alipay.jpg" alt="支付宝" style="zoom:22%;" /><img src="https://xmq.plus/medias/reward/wechat.png" alt="微信" style="zoom:26%;" />