// 在刷新页面时不仅要产生地图，还要产生两个小div 
// 分别对应贪吃蛇的 蛇头 以及身体
// 由于蛇头(红色) 食物(蓝色) 以及多个身体(黄色) 都是动态创建的div
// 封装一个方法 用于创建div元素 放入地图里
// 参数可以拓展函数 功能
var map = document.getElementById('map');
var bodyNodes = []; // 放置所有身体的
function createDiv(color) {
  // 创建一个div节点
  var div = document.createElement('div');
  // 位置是随机产生的 js随机数
  // Math.random()
  // 0-450之间 50的倍数 0-9倍
  // Math.random() 产生一个0-1的随机数(小数) 不包含1 [0, 1)
  // 产生一个0-9的随机数 parseInt(Math.random()*10)
  div.style.left = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.backgroundColor = color;
  // 添加到地图中
  map.appendChild(div);
  // return 就是函数执行后的返回结果 等于函数所创建的出来的div
  return div;
}
// 如何让蛇头移动起来 操作蛇头 js找到蛇头对应的div
// 蛇头移动 如何让蛇头移动起来 四个方向 
// 移动前需要判断一下当前蛇头是要向哪个方向进行移动
// .value 索引值 左 右 上 下
// 假设蛇头的默认移动方向是向左
var headNode = createDiv('red'); // 创建一个蛇头
headNode.value = '左'; // .value是判断蛇头的移动方向
// console.log(headNode.value);
var foodNode = createDiv('blue'); // 创建食物
// console.log(foodNode);
function move() {
  // 身体移动通过循环遍历让身体移动起来
  // 如何让身体跟随头部移动？？？
  // 身体跟随前一块移动
  if (bodyNodes.length > 0) {
    for (var n = 0; n < bodyNodes.length; n++) {
      // bodyNodes[n].value = headNode.value
      switch (bodyNodes[n].value) {
        case '左':
          bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) - 50 + 'px';
          break
        case '右':
          bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) + 50 + 'px';
          break
        case '上':
          bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) - 50 + 'px';
          break
        case '下':
          bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) + 50 + 'px';
          break
      }
      bodyNodes[n].value = bodyNodes[n - ].value
    }
  }
  // 判断当前蛇头的移动方向 .value属性
  switch (headNode.value) {
    case '左':
      headNode.style.left = parseInt(headNode.style.left) - 50 + 'px';
      break
    case '右':
      headNode.style.left = parseInt(headNode.style.left) + 50 + 'px';
      break
    case '上':
      headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
      break
    case '下':
      headNode.style.top = parseInt(headNode.style.top) + 50 + 'px';
      break
  }
  // 碰撞检测 检测是否和食物发生碰撞
  // 吃到食物了
  if (headNode.style.left === foodNode.style.left && headNode.style.top === foodNode.style.top) {
    // 产生一个新的身体 位置 跟在当前最后一块身体的后面 没有身体最后一块就是头部
    var bodyNode = createDiv('yellow');
    // 需要找到当前的最后一块 把所有的身体放入一个 数组里
    var lastNode = null;
    if (bodyNodes.length > 0) {
      lastNode = bodyNodes[bodyNodes.length - 1];
    } else {
      lastNode = headNode;
    }
    // 如何让新产生的身体，跟在最后一块的后面 需要知道当前最后一块的行走方向
    // 假如最后一块向左 新的身体在其右侧出现 .value 移动方向
    // 1. lastNode headNode .value
    // lastNode bodyNode
    // console.log(lastNode.value);
    switch (lastNode.value) {
      case '左':
        bodyNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
        bodyNode.style.top = lastNode.style.top;
        break
      case '右':
        bodyNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
        bodyNode.style.top = lastNode.style.top;
        break
      case '上':
        bodyNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
        bodyNode.style.left = lastNode.style.left;
        break
      case '下':
        bodyNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
        bodyNode.style.left = lastNode.style.left;
        break
    }
    bodyNode.value = lastNode.value // 新产生的身体需要跟随前一块
    bodyNodes.push(bodyNode)
    // 食物位置更新
    foodNode.style.left = parseInt(Math.random() * 10) * 50 + 'px';
    foodNode.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  }
}
var t = setInterval(move, 500)
// 通过键盘的按键 来改变蛇头的移动方向
// onkeydown 键盘按下事件 根据小键盘 上下左右键来更改 对应蛇头移动的位置
// 键盘的键值 通过不同键值 对应不同键
// e 表示事件对象 e.keyCode 键盘的键值
document.onkeydown = function (e) {
  // console.log(e.keyCode);
  switch (e.keyCode) {
    case 37:
      headNode.value = '左';
      break
    case 38:
      headNode.value = '上';
      break
    case 39:
      headNode.value = '右';
      break
    case 40:
      headNode.value = '下';
      break
  }
}