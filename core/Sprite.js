/**
 * Sprite(精灵类)
 * @constructor
 * @version 1.0.0
 * @author [Antilmid]
 * @description 最基本的显示对象，是可被控制的，有事件触发的
 */
class Sprite {
  // 初始化
  constructor(x = 0, y = 0, width = 100, height = 100, name = "unnamed") {
    // 基础属性初始化
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = 0;
    this.visiable = true;
    this.canCollision = false;
    this.canClick = false;
    this.canReadKey = false;
    this.tag = [];
    // 创建事件钩子
    this.$collision = (e) => {};
    this.$click = (e) => {};
    this.$readKey = (e) => {};
    // 创建默认对象
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.fatherScene = null;
  }

  // 初始化拦截属性
  get width() {
    return this.canvas.width;
  }

  set width(v) {
    this.canvas.width = v;
  }

  get height() {
    return this.canvas.height;
  }

  set height(v) {
    this.canvas.height = v;
  }

  /**
   * draw
   * @description 这是一个精灵最基本的函数，它决定了这个精灵的样貌，具体可以参考image.js
   */
  draw() {}

  /**
   * update(更新)
   * 更新精灵，并绘制到指定画板上
   * @param {CanvasContext2D} targetCanvasCtx 
   */
  update(targetCanvasCtx) {
    targetCanvasCtx.drawImage(this.canvas, this.x, this.y);
  }

  /**
   * findTag(查找精灵是否存在该标签)
   * @param {String} tagName 要查找的标签
   * @return {boolean} 标签存在返回true，否则返回false
   */
  findTag(tagName) {
    for (let i in this.tag) {
      if (this.tag[i] == tagName) {
        return true;
      }
    }
    return false;
  }

  collisionWith() {

  }
}
// node下导出
module.exports = Sprite;