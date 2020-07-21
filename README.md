# LeetCode-Digest-Chrome

刷题的时候方便地生成 markdown 笔记，包括题目描述，代码，标签等等很多信息都可以自定义是否生成。

PS: 目前只支持中国区 LeetCode，且插件为中文界面。

---

## Preview

- 插件界面

![Screen Shot 2020-05-12 at 10.11.37 PM](assets/Screen%20Shot%202020-05-12%20at%2010.11.37%20PM.png)

- 生成 markdwon 预览效果

![Screen Shot 2020-05-12 at 10.12.56 PM](assets/Screen%20Shot%202020-05-12%20at%2010.12.56%20PM.png)

## Features

- [x] 难度、标签、额外标签、题目获赞数等信息供选择
- [x] 题目描述以及解题代码供选择
- [x] 复制 markdown 到粘贴板
- [ ] 相似题目推荐
- [ ] 国际版 leetcode 支持
- [ ] 自定义题目描述 CSS 样式
- [ ] 插件内 markdown 额外笔记编辑
- [ ] 下载保存为 markdown 文件
- [ ] 转到官方题解

## Download

[Chrome Web Store](https://chrome.google.com/webstore/detail/odmpdekbgnopnihflclpmokeogciimfb/)

## Others

抽空随手写的，可能 bug 较多，欢迎 fork 欢迎 PR ～

以前我是全部题放在一个 md 文件里，发现做的题多了以后渲染太卡了。现在这样每道题储存成单个文件，然后写个程序直接按照正则匹配检查每一个文件的 tag 和相关信息，然后可以生成一个 navigation 页面，也方便以后复习，不过这个有时间再写了。

## Bugs

- 目前由于是根据 web 选择器进行信息的抓取，leetcode 有时候会大改前端，所以有可能导致该插件不能用，我会及时更新。
- LeetCode 的代码部分不是普通的文本框，是个动态插件，我的插件在抓取 code 时只能抓取目前代码框里显示的代码，不能抓取不在当前框内的代码（也就是需要滑动滚动条才能看见的代码），所以保存的代码可能不全。如果你写的代码很多，建议`ctrl+减号`缩小网页尺寸，当能显示所有代码时，再进行一键保存。

## License

MIT
