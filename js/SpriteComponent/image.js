let Sprite = require("../../core/Sprite");
/**
 * SpriteImage(精灵类:图片组件)
 * @constructor
 * @version 1.0.0
 * @author [Antilmid]
 * @description 这是继承于精灵的图片对象，专门用于显示静态图片使用
 */
class SpriteImage extends Sprite {
  constructor(img, x = 0, y = 0, width = 100, height = 10, name = "unnamed") {
    // 继承
    super(x, y, width, height, name);
    // 初始化私有属性
    this._img = null;
    this.img = img;
  }

  // 初始化拦截器
  get img() {
    return this._img;
  }
  set img(v) {
    this._img = v;
    this.draw();
  }

  /**
   * draw
   * @description 这是一个精灵最基本的函数，它决定了这个精灵的样貌
   */
  draw() {
    this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
  }
}
module.exports = SpriteImage;