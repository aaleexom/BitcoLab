var startedAutoRoll = false;
var maxWinChance = 95;
var maxRollNumbers = 10000;

var winChanceValue = 47.50;
var winChanceValueFix = 47.50;
var payoutValue = 2.00;
var payoutValueFix = 2.00;
var betAmountValue = 0.00000001;
var betAmountValueFix = 0.00000001;
var winProfitValue = 0.00000001;

var btcCounter = 0.00000000;

var lower = 4750;
var lowerFix = 4750;
var higher = 5250;
var higherFix = 5250;

var betTo = "Auto";

var betCount = 0;
var lastBet = "Hi";
var resultCounter = false;

var prevAmount = parseFloat(0.00000000).toFixed(8);
var winLoseAmount = parseFloat(0.00000000).toFixed(8);
var afterAmount = parseFloat(0.00000000).toFixed(8);
var plusMinus = "+";


function rndBet(){
	var randomBet = Math.floor(Math.random() * (1 + 1));
	var rndBetResult = "Hi";
	if (randomBet == 0) {
		rndBetResult = "Hi";
	}
	else if (randomBet == 1) {
		rndBetResult = "Lo";
	}
	return rndBetResult;
}

function checkHi(i){
	if (i > higherFix) {
		plusMinus = "+";
		return true;
	}
	else {
		plusMinus = "-";
		return false;
	}
}

function checkLo(i){
	if (i < lowerFix) {
		plusMinus = "+";
		return true;
	}
	else {
		plusMinus = "-";
		return false;
	}
}

function roll(){
	prevAmount = parseFloat($("#btcCounter").text()).toFixed(8);

	var localLastBet = lastBet;
	var localResultCounter = resultCounter;
	var x = Math.floor(Math.random() * 10000);
	var trueOrFalse = true;
	if (betTo) {
		if (betTo == "Hi") {
			var betVar = "Hi";
			lastBet = "Hi";
		}
		else if (betTo == "Lo"){
			var betVar = "Lo";
			lastBet = "Lo";
		}
		else{
			var betVar = rndBet();
			lastBet = betVar;
		}
	}

	if (betVar == "Hi"){
		trueOrFalse = checkHi(x);
		resultCounter = trueOrFalse;
	}
	else if(betVar == "Lo"){
		trueOrFalse = checkLo(x);
		resultCounter = trueOrFalse;
	}

	if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
		betCount = betCount + 1;
	}
	else {
		betCount = 1;
	}

	var xLength = x.toString().length;
	if(xLength == 1){
		x = "0000" + x;
	}
	else if (xLength == 2){
		x = "000" + x;
	}
	else if (xLength == 3){
		x = "00" + x;
	}
	else if (xLength == 4){
		x = "0" + x;
	}
	$("#rndNumber").text(x);

	if (trueOrFalse == true) {
		$("#btcCounter").text(addCoins);
		afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
		$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center\">" + betCount + "</span>");
		var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
	}
	else {
		$("#btcCounter").text(removeCoins);
		afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
		$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center\">" + betCount + "</span>");
		var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
	}
	$("#tbody").prepend(text);
}

function autoRoll(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var betAmountCounter = $("#betAmount").val();
	var betAmountCounterFix = parseFloat(betAmountCounter);

	if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
		var delay = $("#msDelay").val();

		if (startedAutoRoll == true){
			roll();
			setTimeout(autoRoll, delay);
		}
	}
	else {
		$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		switchAuto();
	}
}

function addCoins(){
	var actualBTC = $("#btcCounter").text();
	var actualBTCFix = parseFloat(actualBTC);
	var addedBTC = $("#winProfit").text();
	var addedBTCFix = parseFloat(addedBTC);
	winLoseAmount = parseFloat(addedBTCFix).toFixed(8);
	var totalBTC = parseFloat(actualBTCFix + addedBTCFix).toFixed(8);
	//alert("BTC antes de ganar: " + actualBTCFix + "\nCantidad ganada: " + addedBTCFix + "\nCantidad total: " + totalBTC);
	return totalBTC;
}

function removeCoins(){
	var actualBTC = $("#btcCounter").text();
	var actualBTCFix = parseFloat(actualBTC);
	var removedBTC = $("#betAmount").val();
	var removedBTCFix = parseFloat(removedBTC);
	winLoseAmount = parseFloat(removedBTCFix).toFixed(8);
	var totalBTC = parseFloat(actualBTCFix - removedBTCFix).toFixed(8);
	//alert("BTC antes de perder: " + actualBTCFix + "\nCantidad perdida: " + addedBTCFix + "\nCantidad total: " + totalBTC);
	return totalBTC;
}

function switchAuto(){
	if (startedAutoRoll == false){
		startedAutoRoll = true;
		$("#start").text("Stop");
	}
	else {
		startedAutoRoll = false;
		$("#start").text("Start");
	}
	return startedAutoRoll;
}

function updateFromWinChance(){
	alert("Holi");
}

$(document).ready(function(){

	var shownAuto = false;

	$("#autoRollBody").hide();

	$("#btnHi").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var betAmountCounter = $("#betAmount").val();
		var betAmountCounterFix = parseFloat(betAmountCounter);

		if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
			var localLastBet = lastBet;
			var localResultCounter = resultCounter;
			var x = Math.floor(Math.random() * 10000);
			var trueOrFalse = true;
			lastBet = "Hi";
			var betVar = "Hi";
			trueOrFalse = checkHi(x);
			resultCounter = trueOrFalse;

			if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
				betCount = betCount + 1;
			}
			else {
				betCount = 1;
			}

			var xLength = x.toString().length;
			if(xLength == 1){
				x = "0000" + x;
			}
			else if (xLength == 2){
				x = "000" + x;
			}
			else if (xLength == 3){
				x = "00" + x;
			}
			else if (xLength == 4){
				x = "0" + x;
			}
			$("#rndNumber").text(x);

			if (trueOrFalse == true) {
				$("#btcCounter").text(addCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			else {
				$("#btcCounter").text(removeCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			$("#tbody").prepend(text);
		}
		else {
			$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		}
	});

	$("#btnLo").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var betAmountCounter = $("#betAmount").val();
		var betAmountCounterFix = parseFloat(betAmountCounter);

		if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
			var localLastBet = lastBet;
			var localResultCounter = resultCounter;
			var x = Math.floor(Math.random() * 10000);
			var trueOrFalse = true;
			lastBet = "Lo";
			var betVar = "Lo";
			trueOrFalse = checkLo(x);
			resultCounter = trueOrFalse;

			if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
				betCount = betCount + 1;
			}
			else {
				betCount = 1;
			}

			var xLength = x.toString().length;
			if(xLength == 1){
				x = "0000" + x;
			}
			else if (xLength == 2){
				x = "000" + x;
			}
			else if (xLength == 3){
				x = "00" + x;
			}
			else if (xLength == 4){
				x = "0" + x;
			}
			$("#rndNumber").text(x);

			if (trueOrFalse == true) {
				$("#btcCounter").text(addCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			else {
				$("#btcCounter").text(removeCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			$("#tbody").prepend(text);
		}
		else {
			$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		}
	});

	$("#autoRoll").click(function(){
		if (shownAuto == false){
			shownAuto = true;
			$("#autoRollBody").show();
		}
		else {
			shownAuto = false;
			$("#autoRollBody").hide();
		}
	});

	$("#start").click(function(){
		switchAuto();
		autoRoll();
	});

	$("#winChance").change(function(){
		winChanceValue = $("#winChance").val();
		winChanceValueFix = parseFloat(winChanceValue).toFixed(2);

		if (winChanceValueFix > 95){
			winChanceValueFix = parseFloat(95).toFixed(2);
		}
		else if(winChanceValueFix < 0.02){
			winChanceValueFix = parseFloat(0.02).toFixed(2);
		}
		$("#winChance").val(winChanceValueFix);

		betAmountValue = $("#betAmount").val();

		payoutValue = maxWinChance / winChanceValueFix;
		payoutValueFix = parseFloat(payoutValue).toFixed(2);
		$("#payout").val(payoutValueFix);

		winProfitValue = (betAmountValue * payoutValueFix) - betAmountValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);

		lower = maxRollNumbers * (winChanceValueFix/100);
		lowerFix = parseInt(lower);
		$("#lower").text(lowerFix);
		higher = maxRollNumbers - lower;
		higherFix = parseInt(higher);
		$("#higher").text(higherFix);
	});

	$("#payout").change(function(){
		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		if (payoutValueFix > 4750){
			payoutValueFix = parseFloat(4750).toFixed(2);
		}
		else if(payoutValueFix < 1){
			payoutValueFix = parseFloat(1).toFixed(2);
		}
		$("#payout").val(payoutValueFix);

		betAmountValue = $("#betAmount").val();

		winChanceValue = maxWinChance / payoutValueFix;
		winChanceValueFix = parseFloat(winChanceValue).toFixed(2);
		$("#winChance").val(winChanceValueFix);

		winProfitValue = (betAmountValue * payoutValueFix) - betAmountValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);

		lower = maxRollNumbers * (winChanceValueFix/100);
		lowerFix = parseInt(lower);
		$("#lower").text(lowerFix);
		higher = maxRollNumbers - lower;
		higherFix = parseInt(higher);
		$("#higher").text(higherFix);
	});

	$("#betAmount").change(function(){
		betAmountValue = $("#betAmount").val();
		betAmountValueFix = parseFloat(betAmountValue).toFixed(8);
		$("#betAmount").val(betAmountValueFix);

		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (betAmountValueFix * payoutValueFix) - betAmountValueFix;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	});

	$("#autoHi").click(function(){
		if (betTo != "Hi") {
			$("#autoHi").removeClass("bg-primary");
			$("#autoHi").addClass("bg-primary-selected");
			$("#autoAuto").removeClass("bg-primary-selected");
			$("#autoAuto").addClass("bg-primary");
			$("#autoLo").removeClass("bg-primary-selected");
			$("#autoLo").addClass("bg-primary");
			betTo = "Hi";
		}
	});

	$("#autoAuto").click(function(){
		if (betTo != "Auto") {
			$("#autoHi").removeClass("bg-primary-selected");
			$("#autoHi").addClass("bg-primary");
			$("#autoAuto").removeClass("bg-primary");
			$("#autoAuto").addClass("bg-primary-selected");
			$("#autoLo").removeClass("bg-primary-selected");
			$("#autoLo").addClass("bg-primary");
			betTo = "Auto";
		}
	});

	$("#autoLo").click(function(){
		if (betTo != "Lo") {
			$("#autoHi").removeClass("bg-primary-selected");
			$("#autoHi").addClass("bg-primary");
			$("#autoAuto").removeClass("bg-primary-selected");
			$("#autoAuto").addClass("bg-primary");
			$("#autoLo").removeClass("bg-primary");
			$("#autoLo").addClass("bg-primary-selected");
			betTo = "Lo";
		}
	});

	$("#x2").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var inputBTC = $("#betAmount").val();
		var inputBTCFix = parseFloat(inputBTC);
		var x2BTC = inputBTCFix * 2;
		var x2BTCFix = parseFloat(x2BTC).toFixed(8);
		
		if (pocketBTCFix >= x2BTCFix){
			$("#betAmount").val(x2BTCFix);

			payoutValue = $("#payout").val();
			payoutValueFix = parseFloat(payoutValue).toFixed(2);

			winProfitValue = (x2BTCFix * payoutValueFix) - x2BTCFix;
			winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
			$("#winProfit").text(winProfitValueFix);
		}
		else {
			$("#betAmount").val(pocketBTCFix);
			$("#winProfit").text(pocketBTCFix);
		}
	});

	$("#d2").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var inputBTC = $("#betAmount").val();
		var inputBTCFix = parseFloat(inputBTC);
		var x2BTC = inputBTCFix / 2;
		var x2BTCFix = parseFloat(x2BTC).toFixed(8);
		
		if (pocketBTCFix >= x2BTCFix){
			$("#betAmount").val(x2BTCFix);

			payoutValue = $("#payout").val();
			payoutValueFix = parseFloat(payoutValue).toFixed(2);

			winProfitValue = (x2BTCFix * payoutValueFix) - x2BTCFix;
			winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
			$("#winProfit").text(winProfitValueFix);
		}
		else {
			$("#betAmount").val(pocketBTCFix);
			$("#winProfit").text(pocketBTCFix);
		}
	});

	$("#minCoins").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var inputBTC = $("#betAmount").val();
		var inputBTCFix = parseFloat(inputBTC);
		var minValue = parseFloat(0.00000001).toFixed(8);

		if (pocketBTCFix >= 0.00000001){
			$("#betAmount").val(minValue);

			payoutValue = $("#payout").val();
			payoutValueFix = parseFloat(payoutValue).toFixed(2);

			winProfitValue = (minValue * payoutValueFix) - minValue;
			winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
			$("#winProfit").text(winProfitValueFix);
		} else {
			$("#betAmount").val(parseFloat(0.00000000).toFixed(8));
			$("#winProfit").text(parseFloat(0.00000000).toFixed(8));
		}
	});

	$("#maxCoins").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var inputBTC = $("#betAmount").val();
		var inputBTCFix = parseFloat(inputBTC);
		var maxValue = pocketBTCFix;

		$("#betAmount").val(maxValue);
		
		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (maxValue * payoutValueFix) - maxValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	});
});