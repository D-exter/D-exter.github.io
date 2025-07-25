
// ----------- navbar logic starts here -----------
// navbar scroll effect
const navbar = document.querySelector("#navbar");
const colorLighting = document.querySelector("#topGlowContainer");
var prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', () => {
	// colorLighting follow scroll
	colorLighting.style.transform = `translateY(${window.scrollY}px)`;

	// hide/show navbar on scroll
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		navbar.style.top = "0";
	} else {
		navbar.style.top = "-60px";
	}

	prevScrollpos = currentScrollPos;

	// change navbar background transparency on scroll
	const maxScroll = 100;
	const scrollTop = window.scrollY;
	const opacity = Math.max(0, Math.min((scrollTop - 200) / maxScroll, 1));

	navbar.style.backgroundColor = `rgba(51, 51, 51, ${opacity})`;
});

// navbar buttons
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const menuItemsList = document.querySelector("ul");
const hamIcon = document.querySelector("#hamIcon");
var allpages = document.querySelectorAll(".page");


// ----------- header logic starts here -----------
// get image and text elements in header
const headerImage = document.getElementById("headerImage");
const headerText = document.getElementById("headerText");

// get header buttons parent
const headerButtonsContainer = document.querySelector(".header-buttons");

// get all header buttons
const allButtons = document.querySelectorAll(".header-buttons button");

// interval cycle variables
let cycleIntervalId = null;
let currentIndex = 0;

// list of content for header
const headerContentData = {
	headerButton1: {
		text: 'Recent AI Innovations',
		url: 'images/ai.jpg'
	},
	headerButton2: {
		text: 'History of AI',
		url: 'images/ai.jpg'
	},
	headerButton3: {
		text: 'Everyday Use of AI',
		url: 'images/ai.jpg'
	},
	headerButton4: {
		text: 'AI in Healthcare and Research',
		url: 'images/ai.jpg'
	}
};

function handleHeaderHover(event) {
	const hoveredButton = event.target;
	if (hoveredButton.tagName === 'BUTTON') {
		// reset hover color
		for (let button of allButtons) {
			button.style.backgroundColor = "";
		}
		// hover color
		hoveredButton.style.backgroundColor = "green";


		// get button id
		const buttonId = hoveredButton.id;

		// find index
		let foundIndex = 0;
		for (let i = 0; i < allButtons.length; i++) {
			if (allButtons[i].id === hoveredButton.id) {
				foundIndex = i;
				break;
			}
		}

		currentIndex = foundIndex;

		// get content from id
		const data = headerContentData[buttonId];
		if (data) {
			changeContent(data.text, data.url);
		}
	}
}

function handleHeaderClick(event) {
	const clickededButton = event.target;
	if (clickededButton.tagName === 'BUTTON') {
		const buttonIds = clickededButton.id;

		// find index
		let foundIndex = 0;
		for (let i = 0; i < allButtons.length; i++) {
			if (allButtons[i].id === buttonIds) {
				foundIndex = i;
				break;
			}
		}
		show(foundIndex + 1);
		popAudio.play();
	}
}

headerButtonsContainer.addEventListener('mouseover', handleHeaderHover);
headerButtonsContainer.addEventListener('click', handleHeaderClick);

function changeContent(text, imageUrl) {
	headerImage.src = imageUrl;
	headerText.innerText = text;
}
function runCycleStep() {
	for (let button of allButtons) {
		button.style.backgroundColor = "";
	}

	const currentButton = allButtons[currentIndex];

	currentButton.style.backgroundColor = "green";

	const buttonId = currentButton.id;
	const data = headerContentData[buttonId];

	if (data) {
		changeContent(data.text, data.url);
	}

	currentIndex = (currentIndex + 1) % allButtons.length;
}

clearInterval(cycleIntervalId);
cycleIntervalId = setInterval(runCycleStep, 3000);

// ----------- page logic starts here -----------
//select all subtopic pages
function hideall() {
	//function to hide all pages
	for (let onepage of allpages) {
		//go through all subtopic pages
		onepage.style.display = "none"; //hide it
	}
}
function show(pgno) {
	//function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage = document.querySelector("#page" + pgno);
	onepage.style.display = "block"; //show the page
}

// test add audio
const popAudio = new Audio("audio/popsound.mp3");

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
	show(1);
	popAudio.play();
});
page2btn.addEventListener("click", function () {
	show(2);
	popAudio.play();
});
page3btn.addEventListener("click", function () {
	show(3);
	popAudio.play();
});
page4btn.addEventListener("click", function () {
	show(4);
	popAudio.play();
});
hamIcon.addEventListener("click", function () {
	toggleMenus();
});
hideall();

function toggleMenus() {
	/*open and close menu*/
	//if menuItemsList dont have the class "menuShow", add it, else remove it
	menuItemsList.classList.toggle("menuShow");
	//if menu is showing (has the class “menuShow”)
	if (menuItemsList.classList.contains("menuShow")) {
		hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
	} else {
		//if menu NOT showing
		hamBtn.innerHTML = "Open Menu"; //change button text open menu
	}
}


// ----------- ball logic starts here -----------
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = (ballY = 0); //assign initial position of ball
//functions to update variables to control ball position
function ResetPos() {
	ballX = ballY = 0; //reset to zero
	UpdateBallStyle();
}
function MovePos(leftInc, topInc) {
	if (ballX + leftInc < 0 || ballY + topInc < 0) {
		return; //exit function
	}
	ballX += leftInc;
	ballY += topInc;
	UpdateBallStyle();
}
//function to update ball css as well as display text
function UpdateBallStyle() {
	ball.style.left = ballX + "px"; //set left property to ball x variable
	ball.style.top = ballY + "px"; //set top property to ball x variable
	ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}

function MoveLeft() {
	MovePos(-10, 0);
}
//eventlisteners to activate MovePos
leftBtn.addEventListener("click", MoveLeft);
//leftBtn.addEventListener("click", MoveLeft(-10,0)); //wrong
//cannot do like this. MoveLeft(-10,0) will execute immediately
//using anonymous function to pass in arguments from eventlistener
rightBtn.addEventListener("click", function () {
	MovePos(+10, 0);
});
upBtn.addEventListener("click", function () {
	MovePos(0, -10);
});
downBtn.addEventListener("click", function () {
	MovePos(0, +10);
});
resetBtn.addEventListener("click", ResetPos);

document.addEventListener("keydown", (e) => {
	if (e.code === "ArrowRight") {
		MovePos(10, 0);
	}
	if (e.code === "ArrowLeft") {
		MoveLeft();
	}
	if (e.code === "ArrowDown") {
		MovePos(0, +10);
	}
	if (e.code === "ArrowUp") {
		MovePos(0, -10);
	}
	//Need to inform user what keys to press. Better option: use switch case instead
});

var velX, velY;
const minLeft = (minTop = 0);
const maxTop = (maxLeft = 300);
//function to pick random number from a min-max range
function RandomRange(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
//function to activate automove
function StartAutoMove() {
	velX = RandomRange(-10, 10);
	velY = RandomRange(-10, 30);
	setInterval(MoveIt, 100);
}
//callback function for setInterval
function MoveIt() {
	MovePos(velX, velY); //move at random velocity picked earlier
}
StartAutoMove();

function MovePosWifCollision() {
	ballX += velX;
	ballY += velY;
	/*check if reach min/max left/top and flip velocity*/
	if (ballX > maxLeft) {
		velX = -velX; //reverse the X velocity
		ballX = maxLeft; //snap ballX to maxLeft
	}
	if (ballY > maxTop) {
		velY = -velY;
		ballY = maxTop; //snap ballY to maxTop
	}
	if (ballX < minLeft) {
		velX = -velX;
		ballX = minLeft;
	}
	if (ballY < minTop) {
		velY = -velY;
		ballY = minTop;
	}
	UpdateBallStyle();
}
//Modify StartAutoMove function
function StartAutoMove() {
	velX = RandomRange(0, 1) ? 1 : -1;
	velY = RandomRange(0, 1) ? 1 : -1;;
	//setInterval(MoveIt,100); don't use this anymore
	setInterval(MovePosWifCollision, 10); //use this instead
}
