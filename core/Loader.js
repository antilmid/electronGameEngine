/**
 * Loader(加载器模块)
 * @version 1.0.0
 * @author [Antilmid]
 * @description 负责资源加载的模块
 */
module.exports = {
  /**
   * loadImage(图片加载器)
   * @description 加载图片，与默认的图片加载相比，这里主要解决了异步问题
   * @param {String} src 图片地址
   */
  loadImage(src) {
    // 构造一个Promise
    return new Promise((res, rej) => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        res(img)
      }
      setTimeout(() => {
        rej("图片加载超时")
      }, 5000);
    });
  }
}