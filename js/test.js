function roll(){
	var x = Math.floor(Math.random() * 10000);
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
}

$(document).ready(function(){
	$("#btnHi").click(function(){
		var x = Math.floor(Math.random() * 10000);
		var trueOrFalse = true;
		var betVar = "Hi";
		if (x > 5250) {
			trueOrFalse = true;
		}
		else {
			trueOrFalse = false;
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
			$("#msgTrueFalse").html("<p class=\"bg-success py-1\">¡Has ganado!</p>");
			var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"result\"><b class=\"text-success\">Win</b></td></tr>";
		}
		else {
			$("#msgTrueFalse").html("<p class=\"bg-danger py-1\">Has perdido...</p>");
			var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"result\"><b class=\"text-danger\">Lose</b></td></tr>";
		}
		$("#tbody").append(text);
	});

	$("#btnLo").click(function(){
		var x = Math.floor(Math.random() * 10000);
		var trueOrFalse = true;
		var betVar = "Lo";
		if (x < 4750) {
			trueOrFalse = true;
		}
		else {
			trueOrFalse = false;
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
			$("#msgTrueFalse").html("<p class=\"bg-success py-1\">¡Has ganado!</p>");
			var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"result\"><b class=\"text-success\">Win</b></td></tr>";
		}
		else {
			$("#msgTrueFalse").html("<p class=\"bg-danger py-1\">Has perdido...</p>");
			var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"result\"><b class=\"text-danger\">Lose</b></td></tr>";
		}
		$("#tbody").append(text);
	});
});