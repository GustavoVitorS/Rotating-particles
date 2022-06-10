// apply the settings you want

// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
  x: innerWidth / 4,
  y: innerHeight / 4
};

const colors = ['#7DEDFF', '#7FB5FF', '#FFAEC0'];

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 8) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 8;
  this.velocity = 0.04;
  this.distanceFromCenter = {
    x: randomIntFromRange(80, 220),
    y: randomIntFromRange(80, 220)
  }

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y };
    this.radians += this.velocity;
    this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
    this.draw(lastPoint);
  };

  this.draw = lastPoint => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = '#3BACB6';
    c.fill();
    c.closePath();
    c.stroke();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 950; i++) {
    const radius = (Math.random() * 9) + 6;
    particles.push(new Particle(canvas.width / 6, canvas.height / 6, 9, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "#5B4B8A";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();