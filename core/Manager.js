/**
 * Manager(管理器类)
 * @constructor
 * @version 1.0.0
 * @author [Antilmid]
 * @description 管理器是负责整个大方向的逻辑管理，主要由时间管理器、事件管理器、场景管理器三个组成
 */
class Manager {
  constructor(canvas) {
    // 初始化属性
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this._updater = []; // 私有属性，外部扩展更新函数集合
    // 初始化场景管理器
    this.sceneManager = {
      // 场景层，永远显示第0层
      scene: [],
      // 场景转场函数
      goto(scene) {
        this.scene[0] = scene;
      }
    };
    // 初始化事件管理器
    let _that = this;
    this.eventManager = {
      click(e) {
        // 判断场景第0层是否有场景
        if (_that.sceneManager.scene[0]) {
          let simpleEvent = {
            // 计算相对位置
            x: e.clientX - e.target.offsetLeft,
            y: e.clientY - e.target.offsetTop,
          };
          _that.sceneManager.scene[0].$click(simpleEvent, e);
          _that.sceneManager.scene[0]._$click(simpleEvent, e);
        };
      }
    };
    // 事件绑定
    this.canvas.addEventListener("click", this.eventManager.click);
  }

  /**
   * startTimeManager(开启时间管理器)
   * @description 开启后，开始按照一定周期执行管理器内容
   */
  startTimeManager() {
    requestAnimationFrame(() => {
      // 判断场景第0层是否有场景
      if (this.sceneManager.scene[0] && this.sceneManager.scene[0].update) {
        // 渲染场景
        this.sceneManager.scene[0].update(this.ctx);
      };
      for (let v in this._updater) {
        v();
      }
      this.startTimeManager();
    });
  };

  /**
   * addExternalUpdate(加入一个外部更新器)
   * @description 为了更好的扩展外部工具集合，满足刷新需求，开放了外部更新器
   * @param {Function} extFunc 外部更新器函数
   */
  addExternalUpdate(extFunc) {
    if (typeof extFunc == "function") {
      this._updater.push(extFunc);
    }
  }

}
module.exports = Manager;