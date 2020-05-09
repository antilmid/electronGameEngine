const Sprite = require("./Sprite");
/**
 * Scene(场景类)
 * @constructor
 * @version 1.0.0
 * @author [Antilmid]
 * @description 场景可以理解为一个舞台，我们将演员（Sprite）有序放入场景后，规划好演员的行动，
 *              当场景管理器切换到设定好的场景，那么那些演员们就可以开始表演了。
 */
class Scene {
  constructor() {
    // 精灵对象集合，第一层数组表示图层，第二层表示对应图层下的精灵集合
    this.children = {};
    // 创建事件钩子
    this.$click = (e, ve) => {};
    this.$keyPress = (e) => {};
  }
  /**
   * Update(刷新器)
   * @description 场景刷新器，在时间管理器的驱动下，它会按照一定周期运行
   * @param {CanvasContext2D} 画笔
   * @param {Number} 画布最大宽度
   * @param {Number} 画布最大高度
   */
  update(targetCanvasCtx, maxWidth = 50000, maxHeight = 50000) {
    targetCanvasCtx.clearRect(0, 0, maxWidth, maxHeight);
    let delTable = [];
    // 遍历图层
    for (let key in this.children) {
      let current = this.children[key];
      // 精灵链表遍历
      while (current != null) {
        let spriteObj = current.sprite;
        // 判断精灵是否显示
        if (spriteObj.visiable) {
          targetCanvasCtx.drawImage(spriteObj.canvas, spriteObj.x, spriteObj.y);
        }
        // 判断是否提层
        if (key * 1 != spriteObj.z) {
          // 不是头指针
          if (current.before) {
            current.before.next = current.next;
          } else {
            let start = this.children[key];
            this.children[key] = current.next;
            // 重新指向尾部指针
            if (this.children[key]) {
              this.children[key].end = start.end;
            }
          }
          // 是否为尾指针
          if (current.next) {
            current.next.before = current.before;
          } else {
            // 重新指向尾部指针
            if (this.children[key]) {
              this.children[key].end = current.before;
            }
          }
          // 开始提层
          this.addSprite(current.sprite);
          // 该层是否空了
          if (!this.children[key]) {
            delTable.push(key);
          }
        }
        // 指针下移一位
        current = current.next;
      }
    }
    // 清除空图层
    for (let key of delTable) {
      delete this.children[key];
    }
  }


  /**
   * addSprite(添加精灵到场景)
   * @description 将精灵对象加载到场景，不建议私自操作children属性
   * @param {Sprite} sprite 要加入到场景的精灵
   */
  addSprite(sprite) {
    // 验证参数是否合法
    if (sprite instanceof Sprite) {
      let z = sprite.z;
      // 构造一个节点
      let spriteChain = {
        before: null,
        sprite: sprite,
        next: null,
        end: null // 头指针才有指向尾指针的能力
      }
      // 如果图层为空，则单独开设图层
      if (!this.children[z]) {
        spriteChain.end = spriteChain;
        this.children[z] = spriteChain;
      } else {
        // 通过找到尾部指针的方法插入指针
        let end = this.children[z].end;
        let start = this.children[z];
        end.next = spriteChain;
        spriteChain.before = end;
        start.end = spriteChain;
      }
    }
  }

  removeSprite(sprite) {

  }
  /**
   * _$click(私有点击钩子)
   * @description 不建议外部更改
   * @param {Object} e 简易事件对象
   * @param {Object} ve 原生事件对象
   */
  _$click(e, ve) {
    // 倒序获取图层是为了精灵优先级来触发点击事件
    wrap: for (let z = this.children.length - 1; z >= 0; z--) {
      let ozVeiw = this.children[z];
      // 倒序获取精灵是为了精灵优先级来触发点击事件
      if (ozVeiw instanceof Array) {
        for (let i = ozVeiw.length - 1; i >= 0; i--) {
          let sp = ozVeiw[i];
          // 判断这个精灵是否开启点击事件
          if (!sp.canClick) {
            continue;
          };
          // 判断点击点是否落在精灵上
          let judge = e.x >= sp.x && e.x <= sp.x + sp.width;
          judge = judge && e.y >= sp.y && e.y <= sp.y + sp.height;
          if (judge) {
            sp.$click(e, ve);
            break wrap;
          };
        };
      };
    }
  }


}
module.exports = Scene;