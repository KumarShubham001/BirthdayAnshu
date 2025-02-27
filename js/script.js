$(window).load(function () { setTimeout(() => { $(".se-pre-con").fadeOut("slow") }, 500) });

// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
	if (video.paused) {
		video.play();
		btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
					</svg>`;
	} else {
		video.pause();
		btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
					</svg>
					`;
	}
}

$(document).ready(function () {
	// When the user scrolls down 20px from the top of the document, show the button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 20) {
			$('#topBtn').fadeIn();
		} else {
			$('#topBtn').fadeOut();
		}
	});

	// When the user clicks on the button, scroll to the top of the document
	$('#topBtn').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});
});

document.addEventListener("scroll", parallax);

function parallax() {
	this.querySelectorAll(".parallax-scroll").forEach((item) => {
		if (item.dataset.direction === "verticle") {
			const pos = window.pageYOffset * item.dataset.rate;

			item.style.transform = `translate3d(0, ${pos}px, 0)`;
			// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d()
		} else {
			const posX = window.pageYOffset * item.dataset.ratex;
			const posY = window.pageYOffset * item.dataset.ratey;

			item.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
		}
	});
}

$(document).ready(function () {
	// Append the photos to the slider

	// Initialize the slick slider
	$('.center').slick({
		lazyLoad: 'ondemand',
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		]
	});
});

// helper functions
const PI2 = Math.PI * 2;
const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
const timestamp = (_) => new Date().getTime();

// container
class Birthday {
	constructor() {
		this.resize();

		// create a lovely place to store the firework
		this.fireworks = [];
		this.counter = 0;
	}

	resize() {
		this.width = canvas.width = window.innerWidth;
		let center = (this.width / 2) | 0;
		this.spawnA = (center - center / 4) | 0;
		this.spawnB = (center + center / 4) | 0;

		this.height = canvas.height = window.innerHeight;
		this.spawnC = this.height * 0.1;
		this.spawnD = this.height * 0.5;
	}

	onClick(evt) {
		let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
		let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

		let count = random(3, 5);
		for (let i = 0; i < count; i++)
			this.fireworks.push(
				new Firework(
					random(this.spawnA, this.spawnB),
					this.height,
					x,
					y,
					random(0, 260),
					random(30, 110)
				)
			);

		this.counter = -1;
	}

	update(delta) {
		ctx.globalCompositeOperation = "hard-light";
		ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
		ctx.fillRect(0, 0, this.width, this.height);

		ctx.globalCompositeOperation = "lighter";
		for (let firework of this.fireworks) firework.update(delta);

		// if enough time passed... create new new firework
		this.counter += delta * 3; // each second
		if (this.counter >= 1) {
			this.fireworks.push(
				new Firework(
					random(this.spawnA, this.spawnB),
					this.height,
					random(0, this.width),
					random(this.spawnC, this.spawnD),
					random(0, 360),
					random(30, 110)
				)
			);
			this.counter = 0;
		}

		// remove the dead fireworks
		if (this.fireworks.length > 1000)
			this.fireworks = this.fireworks.filter((firework) => !firework.dead);
	}
}

class Firework {
	constructor(x, y, targetX, targetY, shade, offsprings) {
		this.dead = false;
		this.offsprings = offsprings;

		this.x = x;
		this.y = y;
		this.targetX = targetX;
		this.targetY = targetY;

		this.shade = shade;
		this.history = [];
	}
	update(delta) {
		if (this.dead) return;

		let xDiff = this.targetX - this.x;
		let yDiff = this.targetY - this.y;
		if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
			// is still moving
			this.x += xDiff * 2 * delta;
			this.y += yDiff * 2 * delta;

			this.history.push({
				x: this.x,
				y: this.y
			});

			if (this.history.length > 20) this.history.shift();
		} else {
			if (this.offsprings && !this.madeChilds) {
				let babies = this.offsprings / 2;
				for (let i = 0; i < babies; i++) {
					let targetX =
						(this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
					let targetY =
						(this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

					birthday.fireworks.push(
						new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
					);
				}
			}
			this.madeChilds = true;
			this.history.shift();
		}

		if (this.history.length === 0) this.dead = true;
		else if (this.offsprings) {
			for (let i = 0; this.history.length > i; i++) {
				let point = this.history[i];
				ctx.beginPath();
				ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
				ctx.arc(point.x, point.y, 1, 0, PI2, false);
				ctx.fill();
			}
		} else {
			ctx.beginPath();
			ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
			ctx.arc(this.x, this.y, 1, 0, PI2, false);
			ctx.fill();
		}
	}
}

let canvas = document.getElementById("birthday");
let ctx = canvas.getContext("2d");

let then = timestamp();

let birthday = new Birthday();
window.onresize = () => birthday.resize();
document.onclick = (evt) => birthday.onClick(evt);
document.ontouchstart = (evt) => birthday.onClick(evt);
(function loop() {
	requestAnimationFrame(loop);

	let now = timestamp();
	let delta = now - then;

	then = now;
	birthday.update(delta / 1000);
})();
