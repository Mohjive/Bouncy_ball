// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// FUNKTION UTÖKAD MED DEFAULT_VÄRDEN
function Ball(
  size = random(10, 20), //storlek på bollen
  x = random(0 + size, width - size), //startposition i x-led
  y = random(0 + size, height - size), // startposition i y-led
  velX = random(-3, 3), //riktning x-led
  velY = random(-3, 3), // riktning i y-led
  hue = currentHue) //NYTT: FÄRGSKALA
{
  this.size = size;
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.hue = hue;
  this.color = getColor(this.hue); // FÄRG BEROENDE PÅ FÄRGSKALA
}

// define ball draw method
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = getColor(this.hue);
      }
    }
  }
};

function makeBalls(amount = 25) {
  while (balls.length < amount) {
    let ball = new Ball();
    balls.push(ball);
  }
}
// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  // RITA OM DET FINNS EN PAUSA-KNAPP
  if (document.querySelector("#onoff").innerHTML == 'pausa') {
    requestAnimationFrame(loop);
  }

}
// START: INNAN ANVÄNDARE VALT NÅGOT ÄNNU
let balls = [];
let currentHue = 0;
makeBalls();
loop();

// NYA FUNKTIONER

function getColor(hue) {
  let r = random(0, 255);
  switch (hue) {
    // BLANDADE FÄRGER
    case 0: return 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')';
    // GRÅ
    case 1: return 'rgb(' + r + ', ' + r + ', ' + r + ')';
    // RÖD
    case 2: return 'rgb(' + 255 + ', ' + random(0, 130) + ', ' + random(0, 60) + ')';
    // GUL
    case 3: return 'rgb(' + random(140, 255) + ', ' + random(150, 255) + ', ' + 0 + ')';
    // GRÖN
    case 4: return 'rgb(' + random(0, 190) + ', ' + 255 + ', ' + random(0, 255) + ')';
    // BLÅ
    case 5: return 'rgb(' + random(0, 130) + ', ' + random(0, 255) + ', ' + 255 + ')';
    // LILA
    case 6: return 'rgb(' + random(130, 255) + ', ' + 0 + ', ' + random(130, 255) + ')';
  }
}
function changeColor(a) {
  currentHue = a;
  // VÄLJ FOR-SATS!!
  // for (let i in balls) {
  //   balls[i].color = getColor(balls[i].hue);
  // }

  // for (let ball of balls) {
  //   ball.color = getColor(ball.hue);
  // }

  // balls.forEach(function (ball) {
  //   ball.color = getColor(ball.hue)
  // });
  for (i = 0; i < balls.length; i++) {
    balls[i].hue = a;
    balls[i].color = getColor(balls[i].hue);
  }
}

// Duplicering av bollskapare med input för antal bollar
function quantity() {
  let amountOfBalls = document.querySelector("#amountOfBalls").value;
  while (balls.length < amountOfBalls) {
    //const size = random(10, 20);
    let ball = new Ball();
    balls.push(ball);
  }

  while (balls.length > amountOfBalls) {
    balls.pop();
  }

}

// Start- och stoppfunktion via texten på onoff-knappen
function onoff() {
  if (document.querySelector("#onoff").innerHTML == "pausa") {
    document.querySelector("#onoff").innerHTML = "starta";
  }
  else {
    requestAnimationFrame(loop);
    document.querySelector("#onoff").innerHTML = "pausa";
  }
}

function rain() {
  while (balls.length > 0) {
    balls.pop();
  }
  for (let i = 0; i < 20; i++) {
    let ball = new Ball(
      size = 5, //storlek på bollen
      x = random(0 + size, width - size), //startposition i x-led
      y = random(0 + size, height - size), // startposition i y-led
      velX = 0, //hastighet i x-led
      velY = random(1, 3), // hastighet i y-led
      hue = currentHue //NYTT: FÄRGSKALA
    );

    balls.push(ball);
  }
  for (let i in balls) {
  if ((this.y - this.size) <= height) {
    balls[i].color = 'rgb(' + 0 + ', ' + 0 + ', ' + 0 + ')';
    //balls.splice(i, 1);
  }
}
}




