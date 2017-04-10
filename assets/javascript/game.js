$(document).ready(function() {

	var isCharacterSelected = false;
	var isEnemySelected = false;
	var character = {
		"healthPoints": 0,
		"attackPower": 0,
		"counterAttackPower":0

	};

	$(".character").on("click", function() {

		if (isCharacterSelected == false) {

			$("#characterList").hide();
			isCharacterSelected = true;

		}

		console.log($(this).attr("value"));
		console.log($(this).attr("class"));

		if($(this).attr("value") == "germany") {

			var imgSrc = "assets/images/germany.png";
		} 

		$("#yourCharacter").append("<img src=" + imgSrc + "></img>");

		var imgEnemy1 = "assets/images/france.png";

		var imgEnemy2 = "assets/images/italy.png";

		var imgEnemy3 = "assets/images/czech.png";

		$("#enemy-1").append("<img src=" + imgEnemy1 + "></img>");
		$("#enemy-2").append("<img src=" + imgEnemy2 + "></img>");
		$("#enemy-3").append("<img src=" + imgEnemy3 + "></img>");





	});

	$(".enemy").on("click", function(){

		if (isEnemySelected == false) {

			var imgEnemy1 = "assets/images/france.png";

			$(this).hide();
			isEnemySelected = true;
			$("#defender").append("<img src=" + imgEnemy1 + "></img>");

		}

		
	});




});