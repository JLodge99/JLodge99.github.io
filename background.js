const particlesArray = [];
var hue = 0;

var density = 100;
setDensity();

var distance = 100;
setDistance();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 5;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
    this.color = hue;
    hue += 300 / density;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = "rgba(148, 148, 148, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = 0; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= distance) {
        let lightness = (dist / distance) * 100;
        let grad = ctx.createLinearGradient(
          particlesArray[i].x,
          particlesArray[i].y,
          particlesArray[j].x,
          particlesArray[j].y
        );
        grad.addColorStop(
          0,
          "hsla(" +
            particlesArray[i].color +
            ", 100%, 50%, " +
            (1 - dist / distance) +
            ")"
        );
        grad.addColorStop(
          1,
          "hsla(" +
            particlesArray[j].color +
            ", 100%, 50%, " +
            (1 - dist / distance) +
            ")"
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }

    if (
      particlesArray[i].x < -20 ||
      particlesArray[i].x > canvas.width + 20 ||
      particlesArray[i].y < -20 ||
      particlesArray[i].y > canvas.height + 20
    ) {
      particlesArray.splice(i, 1);
      i--;
    } else if (particlesArray[i].x <= 0) particlesArray[i].speedX *= -1;
    else if (particlesArray[i].y <= 0) particlesArray[i].speedY *= -1;
    else if (particlesArray[i].x > canvas.width) particlesArray[i].speedX *= -1;
    else if (particlesArray[i].y > canvas.height)
      particlesArray[i].speedY *= -1;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!canvasInView) return;

  if (particlesArray.length < density) particlesArray.push(new Particle());
  else if (particlesArray.length > density) particlesArray.pop();

  handleParticles();
  requestAnimationFrame(animate);
}

function burst(count) {
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle());
  }
}

function setDensity() {
  if (window.innerWidth <= 600) {
    density = 50;
  } else if (window.innerWidth <= 1024) density = 70;
  else density = 100;
}

function setDistance() {
  if (window.innerWidth <= 600) {
    distance = 70;
  } else if (window.innerWidth <= 1024) distance = 80;
  else distance = 100;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
letters.innerHTML = letters.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

const introanimation = anime
  .timeline()
  .add({
    targets: "#titlename",
    opacity: 1,
  })
  .add({
    targets: ".letter",
    opacity: [0, 1],
    easing: "easeOutExpo",
    translateY: [200, 0],
    duration: 500,
    delay: (el, i) => 70 * (i + 1),
  })
  .add({
    targets: ".line",
    scaleX: [0, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: "-=875",
    delay: (el, i, l) => 80 * (l - i),
  })
  .add(
    {
      targets: aboutmebtn,
      opacity: [0, 1],
      translateY: [-70, 0],
      duration: 1500,
    },
    "-=200"
  );

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  setDensity();
});

/*
titlename.addEventListener("click", (event) => {
  
})

const titlenameX = titlename.getBoundingClientRect().left
const titlenameY = titlename.offsetTop - titlename.offsetHeight
const titlenameWidth = titlename.offsetWidth
const titlenameHeight = titlename.offsetHeight
*/

animate();
introanimation.play();
