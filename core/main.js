const Loader = require("./core/Loader");
const Manager = require("./core/Manager");
const Scene = require("./core/Scene");
let $Manager = new Manager(world);
$Manager.startTimeManager();

// 创建异步空间逻辑
(async function () {
  var ctx = world.getContext("2d");
  var img = await Loader.loadImage("./img/AA01.png");
  window.sprite_master01 = new SpriteImage(img, 0, 0, 200, 200, "1");
  img = await Loader.loadImage("./img/AA02.png");
  window.sprite_master02 = new SpriteImage(img, 50, 50, 200, 200, "2");
  // 创建一个测试场景
  window.scene_test = new Scene();

  scene_test.addSprite(sprite_master01);
  scene_test.addSprite(sprite_master02);
  $Manager.sceneManager.goto(scene_test);
  // 设置事件
  sprite_master01.$click = () => {
    console.log("精灵对象1被点击");
  }
  sprite_master01.canClick = true
  sprite_master02.canClick = true
  sprite_master02.$click = () => {
    console.log("精灵对象2被点击");
  }
}).call(this);