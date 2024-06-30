## 介绍

最近在学习 TDD 的开发方式, 所有就有了这个项目,
[灵感来自这个项目](https://juejin.cn/post/7086017943120642078)
由于原项目不是用 TDD 方式开发的, 所以我就用 TDD 的开发方式重新实现了一遍, 这个游戏比较简单, 适合拿来练手, 所以我在原项目基础上增加了, 由于是 TDD 方式开发的, 所以测试覆盖率比较高, 和先写实现代码再补测试不一样

- 游戏关卡选择
- 地图编辑功能
- 单元测试

## 玩法介绍

- 将所有蓝色方块翻转为红色即可过关
- 点击盒子即可翻转颜色
- 翻转盒子时会将当前盒子的上右下左也一起翻转过来
- 如果任意方向没有盒子则忽略

## 快速开始

```sh
git clone https://github.com/liaohui5/tdd-flip-box-game.git ./flip-box

cd flip-box

pnpm i

pnpm run dev # http://localhost:8080

# unit tests
pnpm run test
```
