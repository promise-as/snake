// 在刷新页面时不仅要产生地图，还要产生两个小div 
// 分别对应贪吃蛇的 蛇头 以及身体
// 由于蛇头(红色) 食物(蓝色) 以及多个身体(黄色) 都是动态创建的div
// 封装一个方法 用于创建div元素 放入地图里
// 参数可以拓展函数 功能
var map = document.getElementById('map');
var bodyNodes = []; // 放置所有身体的
var Nodes = []; // 放置整个蛇
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
Nodes.push(headNode);
headNode.value = '右'; // .value是判断蛇头的移动方向
// console.log(headNode.value);
var foodNode = createDiv('blue'); // 创建食物
// console.log(foodNode);
function move() {
  if (bodyNodes.length > 0) {
    // 身体移动通过循环遍历让身体移动起来
    // 如何让身体跟随头部移动？？？
    // 身体跟随前一块移动 让他走上一块上一次行走的方向
    // 反向循环为什么就可以了？
    for (var i = bodyNodes.length - 1; i >= 0; i--) {
      // bodyNode[0] 的移动方向会永远和headnode保持一致
      // if (n == 0) {
      //   bodyNodes[n].value = headNode.value
      // } else {
      //   bodyNodes[n].value = bodyNodes[n - 1].value
      // }
      // bodyNodes[n].value上一块上一次的行走方向
      switch (bodyNodes[i].value) {
        case '左':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) - 50 + 'px';
          break
        case '右':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) + 50 + 'px';
          break
        case '上':
          bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) - 50 + 'px';
          break
        case '下':
          bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) + 50 + 'px';
          break
      }
      // bodyNode[0] headNode上一次的方向
      if (i == 0) {
        bodyNodes[i].value = headNode.value
      } else {
        bodyNodes[i].value = bodyNodes[i - 1].value
      }
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
  // 判断是否出边界
  if (parseInt(headNode.style.left) < 0 || parseInt(headNode.style.left) > 450
    || parseInt(headNode.style.top) < 0 || parseInt(headNode.style.top) > 450) {
    clearInterval(t);
    alert('撞墙了')
  }
  // 判断是否咬到身体
  if (bodyNodes.length > 0) {
    for (var i = 0; i < bodyNodes.length; i++) {
      if (headNode.style.left === bodyNodes[i].style.left && headNode.style.top === bodyNodes[i].style.top) {
        clearInterval(t);
        alert('咬到身体了')
      }
    }
  }
  // 碰撞检测 检测是否和食物发生碰撞(两个元素重合了 headNode foodNode)
  if (headNode.style.left === foodNode.style.left && headNode.style.top === foodNode.style.top) { // 吃到食物了
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
    bodyNode.value = lastNode.value; // 新产生的身体需要跟随前一块
    bodyNodes.push(bodyNode);
    Nodes.push(bodyNode);
    // 食物位置更新 更新后和身体重合到一起(身体太长会重合)
    // 水平
    var level = parseInt(Math.random() * 10) * 50;
    // 垂直
    var vertical = parseInt(Math.random() * 10) * 50;
    // 5
    // 0 1 2 3 4
    // Nodes 这个蛇的数组 除了 bodyNodes 多了一个蛇头
    for (var i = 0; i < Nodes.length; i++) {
      if (parseInt(Nodes[i].style.left) == level && parseInt(Nodes[i].style.top) == vertical) {
        level = parseInt(Math.random() * 10) * 50;
        vertical = parseInt(Math.random() * 10) * 50;
        i = -1;
      }
    }
    foodNode.style.left = level + 'px';
    foodNode.style.top = vertical + 'px';
  }
}
// 定时器，定时器时间
var t = null,
  time = 500;
function clickHandle(btn, time) {
  document.querySelector(btn).addEventListener('click', function () {
    clearInterval(t);
    t = setInterval(move, time)
  })
}
clickHandle('#fast', 300);
clickHandle('#middle', 500);
clickHandle('#slow', 1000);
t = setInterval(move, time);

// 通过键盘的按键 来改变蛇头的移动方向
// onkeydown 键盘按下事件 根据小键盘 上下左右键来更改 对应蛇头移动的位置
// 键盘的键值 通过不同键值 对应不同键
// e 表示事件对象 e.keyCode 键盘的键值
document.onkeydown = function (e) {
  // console.log(e.keyCode);
  switch (e.keyCode) {
    case 37:
      // 如果正在向右，不让掉头(向左)，只有一个头的情况例外
      if (headNode.value != '右' || bodyNodes.length == 0) {
        headNode.value = '左';
      }
      break
    case 38:
      if (headNode.value != '下' || bodyNodes.length == 0) {
        headNode.value = '上';
      }
      break
    case 39:
      if (headNode.value != '左' || bodyNodes.length == 0) {
        headNode.value = '右';
      }
      break
    case 40:
      if (headNode.value != '上' || bodyNodes.length == 0) {
        headNode.value = '下';
      }
      break
  }
}