function getDate(){
	var dateObject = new Date();
	var day = dateObject.getUTCDate();
	var falseMonth = dateObject.getUTCMonth();
	var month = falseMonth + 1;
	var year = dateObject.getUTCFullYear();

	var date = day + "/" + month + "/" + year;
	return date;
}

function getIndex(){
	var selectedIndex = document.getElementById("startingIndex").value;
	var selectedIndexFloat = parseFloat(selectedIndex);
	var defaultIndex = document.getElementById("setIndex").innerHTML;
	if(selectedIndex == ''){
		if(defaultIndex < 1){
		}
		else {
			return defaultIndex;
		}
	}
	else {
		if (selectedIndexFloat < 1){
		}
		else {
			return selectedIndexFloat;
		}
	}
}

function getStartingAmount(){
	var defaultStartingAmount = document.getElementById("defaultGoal").innerHTML;
	var defaultAmountFloat = parseFloat(defaultStartingAmount).toFixed(8);
	var input = document.getElementById("startingAmount").value;
	var inputFloat = parseFloat(input).toFixed(8); 

	if (input.trim() != ''){
		return inputFloat;
	}
	else {
		return defaultAmountFloat;
	}
}

function goalCalc(){
	var defAmountFloat = getStartingAmount();
	var indexValueFloat = getIndex();
	var goalAmount = parseFloat(defAmountFloat * indexValueFloat);
	goalAmount = goalAmount.toFixed(8);
	return goalAmount;
}

function getLossAmount(){
	var startValue = getStartingAmount();
	var multipliedValue = goalCalc();
	var finalValue = parseFloat(startValue - (multipliedValue - startValue)).toFixed(8);
	return finalValue;

}

function createTr(){
		var trElement = document.createElement("tr");
		var tdElementDate = document.createElement("td");
		var tdElementStartingAmount = document.createElement("td");
		var tdElementGoal = document.createElement("td");
		var tdElementMaxLoss = document.createElement("td");
		var tdElementIndex = document.createElement("td");
		var tdDate = document.createTextNode(getDate());
		var tdStartingAmount = document.createTextNode(getStartingAmount());
		var tdGoal = document.createTextNode(goalCalc());
		var tdMaxLoss = document.createTextNode(getLossAmount());
		var tdIndex = document.createTextNode(getIndex());
		document.getElementById("defaultAmount").removeAttribute("id");
		document.getElementById("defaultGoal").removeAttribute("id");
		document.getElementById("setIndex").removeAttribute("id");
		tdElementDate.appendChild(tdDate);
		tdElementStartingAmount.appendChild(tdStartingAmount);
		tdElementGoal.appendChild(tdGoal);
		tdElementMaxLoss.appendChild(tdMaxLoss);
		tdElementIndex.appendChild(tdIndex);
		tdElementDate.setAttribute("class", "bg-dark text-white");
		tdElementStartingAmount.setAttribute("id", "defaultAmount");
		tdElementGoal.setAttribute("id", "defaultGoal");
		tdElementIndex.setAttribute("id", "setIndex");
		trElement.appendChild(tdElementDate);
		trElement.appendChild(tdElementStartingAmount);
		trElement.appendChild(tdElementGoal);
		trElement.appendChild(tdElementMaxLoss);
		trElement.appendChild(tdElementIndex);
		document.getElementById("tbody").appendChild(trElement);
		/*var trElement2 = trElement.cloneNode(true);
		document.getElementById("tbody").appendChild(trElement2);*/
}

function detectValue(){
	var indexSelected = document.getElementById("startingIndex").value;
	var indexDefault = document.getElementById("setIndex").innerHTML;

	if (indexSelected == ''){
		if (indexDefault != ''){
			if (indexDefault < 1){
				alert("Ingresa un index mayor o igual a 1.");
			} 
			else {
				createTr();
			}
		}
	}
	else {
		if (indexSelected < 1){
			alert("Ingresa un index mayor o igual a 1.");
		}
		else {
			createTr();
		}
	}
}

function start(){
	var elementExists = document.getElementById("defaultAmount");
	var strtAmount = document.getElementById("startingAmount").value;
	var strtIndex = document.getElementById("startingIndex").value;

	if (elementExists == null){
		if (strtAmount == ''){
			alert("Introduce una cantidad inicial.");
		}
		else {
			if (strtIndex == ''){
				alert("Introduce un índice.");
			}
			else {
				detectValue();
			}
		}
	}
	else {
		detectValue();
	}
}