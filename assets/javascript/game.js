
//global variables declaration

var isCharacterSelected = false;
var isDefenderSelected = false;
var healthPoints;
var attackPower;
var enemyList = [];
var yourCharacter = "";
var yourDefender = "";
var isGameEnded = false;
var characterList;

var character = {

	"Bruce Lee" : [0,0,"assets/images/brucelee.jpg"],
	"Jean Claude Van Damme" : [0,0,"assets/images/jcvd.jpg"],
	"Terminator" : [0,0,"assets/images/terminator.jpg"],
	"Iron Man" : [0,0,"assets/images/ironman.jpeg"]

};

function init() {

	characterList = Object.keys(character);
	isGameEnded = false;

	//Healthpoint and attack power will be assigned randomly from these arrays

	healthPoints = [80,85,90,95,70,100,105,110];
	
	attackPower = [2,30,50,2,40,1,2,1];

	isCharacterSelected = false;
	isDefenderSelected = false;
	enemyList = [];
	yourCharacter = "";
	
	for (var i =0;i < characterList.length;i++) {

		var index = Math.floor(Math.random()*(8-i));

		//healthpoints
		character[characterList[i]][0] = healthPoints[index];
		//attack point
		character[characterList[i]][1] = attackPower[index];

		//remove this healthpoint and attackpoint from list to avoid character having same healthpoints

		var j = i+1;

		$("#character"+j).prepend("<p>Original HealthPoints " + 
			healthPoints[index] + "</p>");

		healthPoints.splice(index,1);
		attackPower.splice(index,1);

		

	}

}

//user click to select yourcharacter

$(".character").on("click", function() {

	if(isCharacterSelected == false) {

		var tempList = characterList;

		isCharacterSelected = true;

		$(".character").html("");

		yourCharacter = $(this).attr("value");

		var imgSrc = character[yourCharacter][2];
		var yourHealPoints = character[yourCharacter][0];

		tempList.splice(characterList.indexOf(yourCharacter),1);

		enemyList = tempList;

		$("#you").append("<p>Original HealthPoints " + yourHealPoints + "</p><img src=" + imgSrc + "></img>");

		updateEnemyFigure();

	}

});

function updateEnemyFigure() {

	//update enemy list available to select

	for (var i = 0;i<3;i++) {

		$("#"+"enemy"+i).html("");

	}

	$.each(enemyList, function(index,value) {

		var imgSrc =  character[value][2];
		var healthPoints = character[value][0];

		$("#"+"enemy"+index).attr("value",value);

		$("#"+"enemy"+index).append('<p>Original Healthpoint ' +healthPoints+' </p>');

		$("#"+"enemy"+index).append('<a href="#"> <img src="'+imgSrc+ '"></img></a>');

	});

}

$(".enemy").on("click", function(){

	//user click a enemy character in enemy list available to select

	if (isDefenderSelected == false && isGameEnded == false) {

		isDefenderSelected = true;

		yourDefender = $(this).attr("value");

		$(this).html("");

		var imgSrc = character[yourDefender][2];
		var healthPoints = character[yourDefender][0];

		$("#defender").html('<img src="'+imgSrc+ '"></img>');
		$("#defender").prepend('<p>Original Healthpoint ' +healthPoints+' </p>');

		var tempList = enemyList;

		tempList.splice(enemyList.indexOf(yourDefender),1);

		enemyList = tempList;

		updateEnemyFigure();

	}

});


$("#attack").on("click",function(){

	if (isCharacterSelected == true && isDefenderSelected == true && isGameEnded == false) {

		character[yourCharacter][0] = character[yourCharacter][0] - character[yourDefender][1];
		
		character[yourDefender][0] = character[yourDefender][0] - character[yourCharacter][1];

		resultDisplay();

		//attack power  of your character double after each attack

		character[yourCharacter][1] = character[yourCharacter][1]*2;

		if (character[yourCharacter][0] > 0 && character[yourDefender][0] < 0 ) {

			//you win this defender, set isDefenderSelected to false, reset defender name

			isDefenderSelected = false;

			yourDefender = "";

			//display user to select another defender

			gameDisplay("win");

			if (enemyList.length == 0) {

				//all enemies defeated, you win this game

				isGameEnded = true;

				gameDisplay("win");

			}

		}

		//you lose

		else if (character[yourCharacter][0] <0) {

				isGameEnded = true;

				gameDisplay("lose");
		
			}
	}

});

function gameDisplay(result) {
	
	if (isGameEnded == false && result == "win") {

		$("#result").prepend("<p>Please select another Defender</p>");
	}
	else if (isGameEnded == true && result == "lose") {

		$("#result").prepend("<p>You LOSE! Please press Restart to start</p>");

	}

	else if (isGameEnded == true && result == "win") {

		$("#result").prepend("<p>You WIN! Please press Restart to start</p>");

	}
	
}

function resultDisplay() {

	//update result column to show updated healthpoints and attack point

	$("#result").html("<p>You, " +yourCharacter + " has HealthPoints " + character[yourCharacter][0] + "</p>");
	$("#result").append("<p>You, " +yourCharacter+ " has AttackPoints " + character[yourCharacter][1] +  "</p>");
	$("#result").append("<p>Defender, " + yourDefender + " has HealthPoints " + character[yourDefender][0] +  "</p>");
	$("#result").append("<p>Defender, " + yourDefender +" has AttackPoints " + character[yourDefender][1] +  "</p>");

}

function htmlImageReset() {

	//reset to orignial layout

	$("#result").html("");
	$("#you").html("");
	$("#defender").html("");
	$(".enemy").html("");


	$.each(characterList, function(index,value) {

		var imgSrc =  character[value][2];

		index = index+1;

		$("#"+"character"+index).append('<a href="#"> <img src="'+ imgSrc+
		 '"></img></a><p>'+ value + '</p>');

	});
	
}

$("#restart").on("click",function() {

	if (isGameEnded == true){

		//game is ended, reset the whole game

		init();
		htmlImageReset();

	}
	
});

//page loading start here

init();

