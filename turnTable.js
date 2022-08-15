// luckywheel

var prizesImg = {
  src: "./lucky wheel-prize.png",
  width: "384px",
  height: "384px",
  rotate: true,
};

var prizesBtnImg = {
  src: "./lucky-btn.png",
  width: "87px",
  height: "87px",
  top: "-50px",
};

let finalCount = document.getElementById("finalCount");
let count = 5;
finalCount.innerText = `剩餘次數:${count}次`;

const myLucky = new LuckyCanvas.LuckyWheel("#my-lucky", {
  width: "384px",
  height: "384px",
  blocks: [
    {
      imgs: [prizesImg],
      padding: "40px",
    },
  ],
  prizes: [
    {
      range: 3,
      fonts: [
        {
          text: "ipad",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "醫美診所",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "抗藍光螢幕",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "現金5e",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "iPhone13",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "switch",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 3,
      fonts: [
        {
          text: "ps5",
          fontSize: "10px",
        },
      ],
    },
    {
      range: 79,
      fonts: [
        {
          text: "再接再厲",
          fontSize: "10px",
        },
      ],
    },
  ],
  defaultConfig: {
    accelerationTime: 4000,
    decelerationTime: 12000,
    speed: 10,
    offsetDegree: 360 / 8 / 2,
  },
  buttons: [
    {
      radius: "20%",
      imgs: [prizesBtnImg],
    },
  ],

  start: function () {
    if (count <= 0) {
      alert("已經沒次數了");
      return false;
    } else {
      // 開始
      myLucky.play();
      // 遊戲結束
      setTimeout(() => {
        myLucky.stop();
        count--;
      }, 3000);
    }
  },

  end: function (prizes) {
    alert(`恭喜中獎 ${prizes.fonts[0].text}`);
    myLucky.init();
    finalCount.innerText = `剩餘次數:${count}次`;
  },
});

// canvas && add css class

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cw = canvas.width;
let ch = canvas.height;

function reOffset() {
  let BB = canvas.getBoundingClientRect();
  offsetX = BB.left;
  offsetY = BB.top;
}

let offsetX, offsetY;
reOffset();

window.onscroll = function (e) {
  reOffset();
};
window.onresize = function (e) {
  reOffset();
};

let isDown = false;
let starX, starY;

let cursors = ["default", "pointer"];
var currentCursor = 0;

let shapes = [];

shapes.push({
  points: [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ],
  cursor: 1,
});

for (var i = 0; i < shapes.length; i++) {
  var s = shapes[i];
  definePath(s.points);
  ctx.stroke();
}

canvas.addEventListener("mousemove", function (e) {
  handleMouseMove(e);
});

function definePath(p) {
  ctx.beginPath();
  ctx.arc(2, -5, 35, 0, Math.PI * 2, true);
  ctx.moveTo(p[0].x, p[0].y);
  for (var i = 1; i < p.length; i++) {
    ctx.lineTo(p[i].x, p[i].y);
  }
  ctx.closePath();
}

function handleMouseMove(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);

  // Put your mousemove stuff here
  var newCursor;
  for (var i = 0; i < shapes.length; i++) {
    var s = shapes[i];
    definePath(s.points);
    if (ctx.isPointInPath(mouseX, mouseY)) {
      newCursor = s.cursor;
      break;
    }
  }
  if (!newCursor) {
    if (currentCursor > 0) {
      currentCursor = 0;
      canvas.style.cursor = cursors[currentCursor];
    }
  } else if (!newCursor == currentCursor) {
    currentCursor = newCursor;
    canvas.style.cursor = cursors[currentCursor];
  }
}
