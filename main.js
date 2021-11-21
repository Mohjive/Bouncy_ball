// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// KONSTRUKTOR UTÖKAD MED DEFAULT_VÄRDEN OCH NYANS
function Ball(
  size = random(10, 20),
  x = random(0 + size, width - size),
  y = random(0 + size, height - size),
  velX = random(-3, 3),
  velY = random(-3, 3),
  hue = currentHue) //NYTT: NYANSSKALA
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
  if (isFireworks == true) { // SÄRSKILD UPPDATERING FÖR FYRVERKERI
    this.velY += 0.02;
  }
  else {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      if (raining == true) {
        this.y = 1 + this.size;
        this.velY = random(1, 7);
      }
      this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
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
// PAKETERAR BOLLSKAPANDET I EN FUNKTION
function makeBalls(amount = 25) {
  while (balls.length < amount) {
    let ball = new Ball();
    balls.push(ball);
  }
}
// define loop that keeps drawing the scene constantly
function loop() {
  if (isFireworks == true) { // SÄRSKILD OPACITET FÖR FYRVERKERI
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
  }
  else {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
  }

  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  // RITA ENDAST I PLAY-LÄGE
  if (play == true) {
    requestAnimationFrame(loop);
  }

}
let firework = [];
let play = true;
let raining = false;
let balls = [];
let currentHue = 0;
let isFireworks = false;
makeBalls();
loop();


// -------------- NYA FUNKTIONER

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

// Duplicering av bollskapare med input för antal bollar och tillägg för minskning
function quantity() {
  let amountOfBalls = document.querySelector("#amountOfBalls").value;
  while (balls.length < amountOfBalls) {
    let ball = new Ball();
    balls.push(ball);
  }

  while (balls.length > amountOfBalls) {
    balls.pop();
  }

}

// Start- och stoppfunktion 
function onoff() {
  if (play == true) {
    document.querySelector("#onoff").innerHTML = "starta";
    play = false;
  }
  else {
    requestAnimationFrame(loop);
    document.querySelector("#onoff").innerHTML = "pausa";
    play = true;
  }
}

// Regnfunktion
function rain() {
  raining = !raining;
  isFireworks = false;

  while (balls.length > 0) {
    balls.pop();
  }
  if (raining) {
    for (let i = 0; i < 100; i++) {
      let ball = new Ball(5, 
        random(5, width - 5), 
        random(5, height - 5), 
        0, 
        random(1.0, 3) 
      );
      balls.push(ball);
    }
  }
  else {
    makeBalls();
  }
}

// Fyrverkerifunktion
function makeFireworks() {
  if (isFireworks == false) {
    while (balls.length > 0) {
      balls.pop();
    }
  }

  isFireworks = true;
  for (i = 0; i < 3; i++) {
    x = random(70, width - 70);
    y = random(70, height / 3);
    for (i = 0; i < 70; i++) {
      ball = new Ball(random(1, 6), x, y, random(-1.1, 1.1), random(-1.1, 0.9), currentHue);
      balls.push(ball);
    }
  }

}