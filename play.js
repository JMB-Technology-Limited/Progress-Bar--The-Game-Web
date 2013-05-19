var gameStarted = false;
var levelRunning = false;
var level = 1;
var currentPercent = 0;
var pausePercent = 0;
var timePerPercent = 100;
var randomTimePerPercent = 100;
var progressBar;
var successMessages = [
	'Congratulations!',
	'Well done!',
	'Good work!',
	'Well played!',
	'Another level down!',
	'Another progress bar defeated!',
	'Great effort!',
];

function playButtonClicked() {
	if (gameStarted) {
		nextLevel();
	} else {
		startLevel();
		gameStarted = true;
	}
}

function startLevel() {
	$('#playButton').hide();	
	$('#message').hide();
	currentPercent = 0;
	timePerPercent = level * 75;
	randomTimePerPercent = level * 30;
	$('#header').html('<h1>Level '+level+'</h1>');
	drawProgressBar();
	pausePercent = getRandomInt(1,99);
	levelRunning = true;
	setTimeout("addOnePerCent()",getTimeTillNextPerCent());
}

function addOnePerCent() {
	currentPercent = currentPercent + 1;
	drawProgressBar();
	if (currentPercent >= 100) {
		levelRunning = false;
		showMessage(successMessages[getRandomInt(0,successMessages.length - 1)]);
		var pb = $('#playButton');
		pb.show();
		pb.val('Next Level');
		pb.focus();
	} else {
		setTimeout("addOnePerCent()",getTimeTillNextPerCent()); 
	}
}

function showMessage(msg) {
		var m = $('#message');
		m.html(msg);
		m.show();
		setTimeout("$('#message').hide()",4000);
}

function drawProgressBar() {
	var newWidth = $('#progressbar').width() * currentPercent / 100;
	$('#progressbarFiller').width(newWidth);
	$('#progressbarreading').html(currentPercent+'%');
}

function getTimeTillNextPerCent() {
		if (level > 2 && currentPercent == pausePercent && getRandomInt(1,4) == 1) {
			return 1000 + getRandomInt(1,level*2000);
		}
		return getRandomInt(timePerPercent-randomTimePerPercent,timePerPercent+randomTimePerPercent);
}

function nextLevel() {
	level += 1;
	startLevel();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#playButton').focus();
