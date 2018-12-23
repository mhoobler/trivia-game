//timer logic
var counter = 10;
var intervalId;
var clockRunning = false;

//$("#start").on("click", startClock);
//$("#start").on("click", startClock(true));
//$("#stop").on("click", stopClock);


function count() {
	counter--;
	currentTime = timeConverter(counter);
	$("#timer").text(currentTime);
	console.log(counter);
	if(counter === 0){
		resetClock();
		current_question++;
		updateQuestion(current_question);
	}
}

function startClock() {
//function startClock(bool) {
	if(!clockRunning) {
		clockRunning = true;
		intervalId = setInterval(count, 1000);
	}
	console.log("start");
	startGame();
	//wanted to add boolean to see if timer should start game or not
	//this is bugging out my code however
	//if(bool){
	//	startGame();
	//};
}

function stopClock() {
	if(clockRunning) {
		console.log("Stop");
		clockRunning = false;
		clearInterval(intervalId);
	}
}

function resetClock() {
	clockRunning = false;
	clearInterval(intervalId);
	counter = 10;
	//tartClock(false);
}

function timeConverter(x) {
	var minutes = Math.floor(x/60);
	var seconds = x - (minutes*60);

	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	if(minutes === 0){
		minutes = "00"
	} else if(minutes < 10) {
		minutes = "0" + minutes;
	}

	return minutes + ":" + seconds;
}


// Trivia game logic

var game_running = false;
var current_question = 0;
var score = 0;
var trivia_array = [];

function trivia_object(q, c1, c2, c3, c4, correctChoice) {
	this.question = q,
	this.choices = [],
	this.choices.push(c1),
	this.choices.push(c2),
	this.choices.push(c3),
	this.choices.push(c4),
	this.correct = this.choices[correctChoice]
	
}

var question1 = new trivia_object(
	"What is an apple?",
	"fruit",
	"vegetable",
	"clothing",
	"language",
	0
);

var question2 = new trivia_object(
	"Where is Germany?",
	"North America",
	"Asian",
	"Africa",
	"Europe",
	3
);

var question3 = new trivia_object(
	"What is the Konami Code?",
	"Up, Down, Up, Down, Left, Left, Right, Right, A, B, START",
	"A113",
	"Up, Up, Down, Down, Left, Right, Left, Right, B, A, START",
	"188848258832",
	2
);

var question4 = new trivia_object(
	"When was DOOM released?",
	"1992",
	"1990",
	"1993",
	"1989",
	2
);

var question5 = new trivia_object(
	"What's the best selling video game of all time?",
	"Minecraft",
	"Tetris",
	"Mario",
	"Pacman",
	1
);


trivia_array.push(question1);
trivia_array.push(question2);
trivia_array.push(question3);
trivia_array.push(question4);
trivia_array.push(question5);

function startGame() {
	/*game_running = true;
	current_question = 0;
	score = 0;
	trivia_array = [];
	trivia_array.push(question1);
	trivia_array.push(question2);
	trivia_array.push(question3);
	trivia_array.push(question4);
	trivia_array.push(question5);*/
	score = 0;
	current_question = 0;
	var display = $("#child-display");
	display.empty();
	var arr = [$("<div id='timer'>"), $("<div id='question'>"), $("<div id='choices'>")];

	for(i=0; i<arr.length; i++){
		var row = $("<div class='row text-center'>");
		arr[i].attr("class", "col-md-12 text-center");
		row.append(arr[i]);
		display.append(row);
	}
	updateQuestion(current_question);

}

function updateQuestion(x) {
	if(x < trivia_array.length) {
		$("#question").text(trivia_array[current_question].question);
		$("#choices").empty();
		for(i=0; i<trivia_array[0].choices.length; i++) {
			var ch = $("<input type='radio' name='choice'>");
			ch.attr("value", trivia_array[current_question].choices[i]);
			var label= $("<label>")
			label.text(trivia_array[current_question].choices[i]);

			$("#choices").append(ch);
			$("#choices").append(label);
		}
	} else {
		endGame();
	}
}

function submitAnswer() {
	var value = $("input[name='choice']:checked").val();
	console.log(value);
	console.log(trivia_array[current_question].correct);
	if(value === trivia_array[current_question].correct){
		score++;
		console.log(score);
	}else{
		//Maybe add something
	};

	current_question++;
	resetClock();
	updateQuestion(current_question);
}

function endGame() {
	var display = $("#child-display");
	display.empty();
	stopClock();
	var arr = [$("<div id='score-header'>"), $("<div id='score-board'>")]
	arr[0].html("<h2> Game Over </h2>")
	arr[1].text("Score: "+score);
	for(i=0; i<arr.length; i++){
		arr[i].addClass("col-md-12 text-center");
		display.append(arr[i]);
	}
	current_question=0;
};

//$("#submit-answer").on("click", submitAnswer);

$(document).ready(function() {
	$(document).on("click", "#submit-answer", submitAnswer);
	$(document).on("click", "#start", startClock);
	$(document).on("click", "#stop", endGame);
});
