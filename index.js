var global = {
        picNum: 0, //到第几张图片
        speed: 8, //小羊运动的速度
        wrap: document.getElementById("wrap"),
        bottom: 0, //这两个值是确定小羊初始的位置
        top: 0, //这个top是记录序列帧图片是上面还是下面
        frequency: 80, //这是定时器的频率 来控制小羊的速度
        number: 0, //记录屏幕上羊的数目让其保持一定的数目
        maxNumber: 6
      };

      //生产小羊的构造函数
      function Sheep(obj) {
        this.sheep = document.createElement("div"); //生产出保存小羊图片的div
        obj.wrap.appendChild(this.sheep); //要把这个div添加到wrap div下面
        this.sheep.className = "sheep"; //给这个div添加class名称也就相当于给他动态添加样式
        this.speed = obj.speed; //小羊运动的速度
        this.sheepWidth = this.sheep.offsetWidth; //获取div的宽度
        this.picNum = obj.picNum;
        this.top = obj.top;
        this.bottom = obj.bottom + Math.floor(Math.random() * 100); //每一个小羊的位置
        this.frequency = Math.floor(Math.random() * obj.frequency) + 30; //用随机函数来制定不同的频率去控制小羊的速度
        this.disLeft = this.sheep.offsetLeft;
      }

      //小羊运动和序列帧图片运动的函数
      function sheepRun(sheepObj) {
        var timer = setInterval(function() {
          sheepObj.picNum = sheepObj.picNum + sheepObj.sheepWidth;
          if (sheepObj.picNum == sheepObj.sheepWidth * 8) {
            //如果运动到了序列帧图片的最后一帧，就置0从新开始
            sheepObj.picNum = 0;
          }
          sheepObj.sheep.style.backgroundPosition =
            -sheepObj.picNum + "px " + sheepObj.top + "px";
        }, sheepObj.frequency);

        var timer2 = setInterval(function() {
          sheepObj.disLeft -= sheepObj.speed;
          if (sheepObj.disLeft <= -sheepObj.sheepWidth) {
            clearInterval(timer);
            clearInterval(timer2);
            global.wrap.removeChild(sheepObj.sheep);
          }
          sheepObj.sheep.style.left = sheepObj.disLeft + "px";
        }, sheepObj.frequency);
      }

      //创造小羊的函数
      function createSheep() {
        var create = setInterval(function() {
          global.number = global.wrap.children.length;
          if (global.number <= global.maxNumber) {
            var sheep = new Sheep(global);
            sheep.sheep.style.bottom = sheep.bottom + "px";
            sheepRun(sheep);
          } else {
            return false;
          }
        }, 1500);
      }

      function init() {
        createSheep();
      }

      init();