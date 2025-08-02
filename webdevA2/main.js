// audio
const popAudio = new Audio("audio/popsound.mp3");
const correctAudio = new Audio("audio/correct.mp3");
const incorrectAudio = new Audio("audio/incorrect.mp3");

// ------------------ fullscreen code -------------------
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

function enterFullscreen() { //must be called by user generated event
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (document.documentElement.mozRequestFullScreen) { // Firefox
		document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
		document.documentElement.webkitRequestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
		document.documentElement.msRequestFullscreen();
	}
	btnWS.style.display = "inline-block";
	btnFS.style.display = "none";
}
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen();
	}
	btnFS.style.display = "inline-block";
	btnWS.style.display = "none";
}


// ----------- scrolling animation logic -----------
const elements = document.querySelectorAll('.scroll-hidden');
window.addEventListener('scroll', function () {
	for (let element of elements) {
		const rect = element.getBoundingClientRect();

		if (rect.top < window.innerHeight - 100) {
			element.classList.add('scroll-show');
		}
		else {
			element.classList.remove('scroll-show');
		}
	}
});

// ----------- header logic -----------
// get all header buttons
const allButtons = document.querySelectorAll(".header-buttons button");

let currentIndex = 0;

// list of content for header
const headerContentData = {
	headerButton1: {
		text: 'Recent AI Innovations',
		url: 'images/ai.jpg'
	},
	headerButton2: {
		text: 'History of AI',
		url: 'images/AIHistory.jpg'
	},
	headerButton3: {
		text: 'Everyday Use of AI',
		url: 'images/geminiOnIpad.jpg'
	},
	headerButton4: {
		text: 'AI in Healthcare and Research',
		url: 'images/AIHealthcare.jpg'
	}
};

// get header buttons parent
const headerButtonsContainer = document.querySelector(".header-buttons");

// hover header button
headerButtonsContainer.addEventListener('mouseover', handleHeaderHover);

function handleHeaderHover(event) {
	const id = event.target.id;

	if (!(id in headerContentData)) return;

	// reset backgrounds
	for (let button of allButtons) {
		button.style.backgroundColor = "";
	}

	event.target.style.backgroundColor = "green";

	// find button index
	for (let i = 0; i < allButtons.length; i++) {
		if (allButtons[i].id === id) {
			currentIndex = i;
			break;
		}
	}

	// Change header content
	const data = headerContentData[id];
	changeContent(data.text, data.url);
}

// click header button
headerButtonsContainer.addEventListener('click', handleHeaderClick);

function handleHeaderClick(event) {
	const id = event.target.id;

	if (!(id in headerContentData)) return;

	// Find the button index
	for (let i = 0; i < allButtons.length; i++) {
		if (allButtons[i].id === id) {
			show(i + 1);
			popAudio.play();
			break;
		}
	}
}

// get image and text elements in header
const headerImage = document.getElementById("headerImage");
const headerText = document.getElementById("headerText");

function changeContent(text, imageUrl) {
	headerImage.src = imageUrl;
	headerText.innerText = text;
}

// ----------- page logic -----------
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


// navbar buttons
var allpages = document.querySelectorAll(".page");

navbar.addEventListener("click", function (e) {
	let id = e.target.id;
	switch (id) {
		case "page1btn":
			show(1);
			popAudio.play();
			closeMenu();
			break;
		case "page2btn":
			show(2);
			popAudio.play();
			closeMenu();
			break;
		case "page3btn":
			show(3);
			popAudio.play();
			closeMenu();
			break;
		case "page4btn":
			show(4);
			popAudio.play();
			closeMenu();
			break;
		case "hamIcon":
			toggleMenus();
			break;
	}
});

hideall();
const hamIcon = document.querySelector("#hamIcon");

function closeMenu() {
	menuItemsList.classList.remove("menuShow");
	hamIcon.innerHTML = "☰";
}

function toggleMenus() {
	/*open and close menu*/
	//if menuItemsList dont have the class "menuShow", add it, else remove it
	menuItemsList.classList.toggle("menuShow");
	//if menu is showing (has the class “menuShow”)
	if (menuItemsList.classList.contains("menuShow")) {
		hamIcon.innerHTML = "^"; //change button text to chose menu
	} else {
		//if menu NOT showing
		hamIcon.innerHTML = "☰"; //change button text open menu
	}
}


// ----------- card logic -----------
const allClickCards = document.querySelectorAll(".clickCard");

for (let card of allClickCards) {
	const details = card.querySelector(".card-details");
	const header = card.querySelector(".card-header");

	details.addEventListener("click", function () {
		details.classList.toggle("open");
		header.classList.toggle("open");
	});
	header.addEventListener("click", function () {
		details.classList.toggle("open");
		header.classList.toggle("open");
	});
}

// ----------- cat game logic -----------
const spawner = document.querySelector("#spawner");
const gameScreen = document.querySelector("#gameScreen");
const score = document.querySelector("#score");

let gameWidth = gameScreen.offsetWidth;
let currentScore = 0;
let isSpawningActive = false;
let ballSpawnIntervalId = null;

function spawnBall() {
	var newDiv = document.createElement('div');
	newDiv.className = 'balls';

	// Pick a random number from 1 to 9
	const randomNum = Math.floor(Math.random() * 9) + 1;

	// Example: Randomly choose between AI cats or normal cats
	const isAI = Math.random() < 0.5; // 50% chance

	// Assign class like "aicat3" or "cat7"
	newDiv.classList.add((isAI ? 'aicat' : 'cat') + randomNum);


	const startX = Math.floor(Math.random() * (gameWidth - 100));
	newDiv.style.left = startX + "px";
	newDiv.style.top = "-100px";

	newDiv.addEventListener("animationend", function (event) {
		newDiv.remove();

		// Check if it is AI or real cat by class name
		const classes = event.target.classList;
		let pointsChange = 0;

		for (const c of classes) {
			if (c.startsWith('aicat')) { // Check if ai cat
				pointsChange = 1;
				break;
			} else if (c.startsWith('cat')) {
				pointsChange = -1;  // Check if real cat
				break;
			}
		}

		currentScore += pointsChange;
		score.innerHTML = "Score: " + currentScore;
	});

	gameScreen.appendChild(newDiv);
}

gameScreen.addEventListener("click", function (e) {
	if (e.target.classList.contains("balls")) {
		// Remove the clicked ball
		e.target.remove();

		// Check if it is AI or real cat by class name
		const classes = e.target.classList;
		let pointsChange = 0;

		for (const c of classes) {
			if (c.startsWith('aicat')) { // Check if ai cat
				pointsChange = -1;
				break;
			} else if (c.startsWith('cat')) {
				pointsChange = 1;  // Check if real cat
				break;
			}
		}

		currentScore += pointsChange;
		score.innerHTML = "Score: " + currentScore;
	}
});

setInterval(function () {
	const balls = document.querySelectorAll('.balls');
	for (let i = 0; i < balls.length; i++) {
		const ball = balls[i];
		const currentX = parseFloat(ball.style.left || 0);
		// random number from -2 to 2
		const drift = (Math.random() - 0.5) * 4;
		let x = currentX + drift;

		// Clamp wind position
		if (x < 0) x = 0;
		if (x > gameWidth - 100) x = gameWidth - 100;

		ball.style.left = x + 'px';
	}
}, 50);

spawner.addEventListener("click", function () {
	if (isSpawningActive) {
		// If spawning is active, clear the interval (stop spawning).
		clearInterval(ballSpawnIntervalId);
		ballSpawnIntervalId = null; // Reset the ID
		isSpawningActive = false; // Update the state
		spawner.innerHTML = "Start Spawning"; // Optional: Change button text to reflect new state
	} else {
		// If spawning is not active, start the interval (resume spawning).
		// Store the new interval ID.
		ballSpawnIntervalId = setInterval(spawnBall, 2000);
		isSpawningActive = true; // Update the state
		spawner.innerHTML = "Stop Spawning"; // Optional: Change button text
	}
});

setInterval(function () {
	gameWidth = gameScreen.offsetWidth;
}, 300);


// ------------------ quiz code -------------------
var questions = [
	"What is the Turing Test known for?",
	"In which year was the term 'Artificial Intelligence' coined?",
	"What were the Logic Theorist and General Problem Solver?",
	"What were the 'AI Winters'?",
	"What are expert systems designed to do?",
	"What was significant about IBM’s Deep Blue in 1997?",
	"What shift occurred in AI during the 2000s?",
	"What is AlexNet known for in 2012?",
	"What major AI development happened in 2017?"
];

var questionOptions = [
	["A machine-learning algorithm", "A benchmark test for robot speed", "A test for machine intelligence", "A chess-playing computer"],
	["1950", "1956", "1965", "1972"],
	["AI chatbots", "Foundational AI programs from the early days", "Robots", "Neural networks"],
	["Government restrictions on AI research", "Mass layoffs in tech", "Periods of reduced funding and interest in AI", "Overuse of expert systems"],
	["Generate art", "Mimic expert decision-making in specific domains", "Understand emotions", "Play games like humans"],
	["It passed the Turing Test", "It defeated a world chess champion", "It created art", "It became self-aware"],
	["From human-programmed rules to learning from data", "From text processing to robotics", "From hardware to cloud", "From theory to laws"],
	["A rule-based AI system", "A deep learning model that outperformed others in image recognition", "The first LLM", "A chatbot system"],
	["Introduction of the Transformer architecture", "Launch of GPT-1", "AI regulation in the EU", "The first AI winter"]
];

var answers = [
	"A test for machine intelligence",
	"1956",
	"Foundational AI programs from the early days",
	"Periods of reduced funding and interest in AI",
	"Mimic expert decision-making in specific domains",
	"It defeated a world chess champion",
	"From human-programmed rules to learning from data",
	"A deep learning model that outperformed others in image recognition",
	"Introduction of the Transformer architecture"
];

var currentQuestions = 0;
var quizScore = 0;
var answered = false;
var shuffledQuestions = [];

function shuffle(arr) {
	const newArr = arr.slice();
	for (let i = newArr.length - 1; i > 0; i--) {
		// get random index
		const j = Math.floor(Math.random() * (i + 1));

		var temp = newArr[i];
		newArr[i] = newArr[j];
		newArr[j] = temp;
	}
	return newArr;
}

function createQuestionIds() {
	// array from 0 to question length
	var numberList = [];
	var i;
	for (i = 0; i < questions.length; i++) {
		numberList[i] = i;
	}
	return numberList;
}

function start() {
	// set default states
	shuffledQuestions = shuffle(createQuestionIds());
	currentQuestions = 0;
	quizScore = 0;
	answered = false;
	document.querySelector("#nextBtn").style.display = "none";
	document.querySelector("#restartBtn").style.display = "none";

	showQ();
}

function showQ() {
	if (currentQuestions >= shuffledQuestions.length) {
		finish();
		return;
	}

	answered = false;

	var questionIndex = shuffledQuestions[currentQuestions];

	// unshuffle the question
	var question = questions[questionIndex];
	var options = questionOptions[questionIndex];

	// shuffle options
	var shuffledOptions = shuffle(options);

	// update question number
	document.querySelector("#progress").innerHTML = "Question " + (currentQuestions + 1) + " of " + shuffledQuestions.length;

	// update question
	var questionContainer = document.querySelector("#question");
	questionContainer.innerHTML = "";
	var h3 = document.createElement("h3");
	h3.innerHTML = question;
	questionContainer.appendChild(h3);

	// update options
	var optionsContainer = document.querySelector("#options");
	optionsContainer.innerHTML = "";

	for (var i = 0; i < shuffledOptions.length; i++) {
		var label = document.createElement("label");
		label.className = "option";

		var input = document.createElement("input");
		input.type = "radio";
		input.name = "currentQuestions";
		input.value = shuffledOptions[i];

		label.appendChild(input);
		label.appendChild(document.createTextNode(shuffledOptions[i]));

		optionsContainer.appendChild(label);
	}

	// show select button and hide next button
	document.querySelector("#selectBtn").style.display = "inline-block";
	document.querySelector("#nextBtn").style.display = "none";
}

function submitSelection() {
	if (answered) return;

	// get selected option
	var selected = document.querySelector('input[name="currentQuestions"]:checked');

	// check if any option is selected
	if (!selected) {
		return;
	}

	answered = true;

	// hide select button
	document.querySelector("#selectBtn").style.display = "none";


	var questionIndex = shuffledQuestions[currentQuestions];
	var correct = answers[questionIndex];
	var radioButtons = document.querySelectorAll('input[name="currentQuestions"]');

	// find correct option and make it green
	for (var i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].value == correct) {
			radioButtons[i].parentNode.className = "option correct";
		}
	}

	// check if option is correct
	if (selected.value == correct) {
		quizScore = quizScore + 1;
		correctAudio.play();
	}
	else {
		incorrectAudio.play();
	}

	// update score text
	document.querySelector("#quizScore").innerHTML = "Score: " + quizScore;

	// check if there is more questions
	if (currentQuestions < shuffledQuestions.length - 1) {
		document.querySelector("#nextBtn").style.display = "inline-block";
	} else {
		setTimeout(finish, 1500);
	}
}

function nextQ() {
	currentQuestions = currentQuestions + 1;
	console.log(currentQuestions);
	showQ();
}

function finish() {
	// display results
	document.querySelector("#progress").innerHTML = "Quiz Done!";
	document.querySelector("#question").innerHTML = "<h3>Final Score: " + quizScore + " / " + shuffledQuestions.length + "</h3>";
	document.querySelector("#options").innerHTML = "";
	document.querySelector("#nextBtn").style.display = "none";
	document.querySelector("#restartBtn").style.display = "inline-block";
}

function restart() {
	start();
}

start();

const quizBox = document.querySelector("#quizBox");
quizBox.addEventListener("click", function (e) {
	let id = e.target.id;

	switch (id) {
		case "selectBtn":
			submitSelection();
			break;
		case "nextBtn":
			nextQ();
			break;
		case "restartBtn":
			restart();
			break;
	}
});