/* Dice Game Exercise */

/*
 1. This programme feature three dices or more (Default as 3). When the rollAllDice() is ran the programme will display the value of the three dices.
 2. It will then check if two of the dices have the same value or three dices have the same value.
 3. It also calculate the total socre, report the results of current roll and give a summary of all rolls.

Additional note:
Only the higherest number same of a kind is counted i.e.,
Dice roll: 6 6 6 6 3 3 
four of a kind: true
three of a kind: false
two of a kind: false
*/


// Faces of each dice?
const SIDES = 6;

// Define variable: How many dice?
var numDice;

// Define variable: An array for the dice values
var diceValues;

/*
* Following variables used to store results
*/

// Define variable: Store each total score separately
var resultsTotal;

// Define variable: Count of how many rolls featured 2 or more of a kind
var resultsSame;


/* setupDice() 
 *
 * This function initialises the game
 *
 */
function setupDice() 
{	
	//How many dice?
	numDice = document.getElementById("dices").value;
	//Create a new array for the dice values
	diceValues = new Array(numDice);
	//Create new array to store each total score separately
	resultsTotal = new Array();
	//Create new array to count how many rolls featured 2 of a kind or more
	resultsSame = {2:0, 3:0, 4:0, 5:0, 6:0}

	//Reset display if there are previous results
	document.getElementById("showDice").innerHTML = "";
	document.getElementById("showResults").innerHTML = "";

	// Get handle of display section
	var display = document.getElementById("showDice");
	
	// For each dice in the array, set the initial value.
	// rollDice() should return a number 1-6
	for (var i = 0; i < numDice; i++) 
	{
		diceValues[i] = rollDice();
		
		// Create a <td> element, which will be added to our display
		var diceElement = document.createElement('td');

		// Dice elements will have unique id values
		// These will be used to modify innerHTML of each dice
		// id will be dice0, dice1, etc.
		diceElement.setAttribute('id','dice'+String(i)); 

		// Setup the class attribute for the new <td> element, which will allows us to use css styling
		diceElement.setAttribute('class','diceFace');

		// Add the new element as a child of the table row prepared in HTML (i.e. <tr> with id "showDice")
		display.appendChild(diceElement); 
	}

	// Display all dice values
	displayDice(); 
	
}


/*
 * rollAllDice()
 *
 * 1) loop for all dice, setting a new value using rollDice()
 * 2) call the displayDice() function
 * 3) call the updateResults() function
 *
 */
function rollAllDice()
{
	//roll new value to each dice, assign each value using rollDice()
	for (i in diceValues){
		diceValues[i] = Number(rollDice());
	}

	//check the result of diceValues through console
	console.log("New Dice Role Result: " + String(diceValues));
	
	//display the results onto HTML through displayDice()
	displayDice();

	//update results on HTML
	updateResults();
}


/*
 * displayDice()
 *
 * This function update the innerHTML property for each dice using the id attributes created in setupDice()
 *
 */
function displayDice()
{
	for (i in diceValues){
		for (var i = 0; i < numDice; i++){
			document.getElementById("dice"+String(i)).innerHTML = diceValues[i];
		}
	}
}


/*
 * rollDice()
 *
 * This function return a number between 1 and SIDES
 *
 */
function rollDice()
{
	return Math.floor(Math.random()*(6-1+1)+1);
}


/*
 * updateResults()
 *
 * This function shows results after each roll.
 *
 * 1) find the total score by adding all dice
 * 2) add that as a new entry to the array resultsTotal
 * 3) determine whether this result has two dice the same; if so increment the resultsTwoSame variable 
 * 4) determine whether this result has three dice the same; if so increment the resultsTwoSame variable 
 * 5) Show the results for this roll: total score, whether two the same, whether three the same
 * 6) Show overall results: how many rolls, how many two the same, how many three the same 
 *
 */
function updateResults()
{
	var output = "<h2>Results</h2>";
	
	//Result Section: This Roll
	output += "<h3>This Roll</h3><ul>"; 
	//calculate the total of all dices
	let score = 0;
	for (i in diceValues){
		score += Number(diceValues[i]);
	}
	//display total score in console, onto HTML, and store in resultsTotal
	console.log("Total score: " + String(score));
	output += (`<li id="total_score">Total score: ${String(score)}</li>`);
	resultsTotal.push(Number(score)); 
	//check how many same faces among the dices
	let dice_count = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0}; 
	for (i in diceValues){
		dice_count[diceValues[i]] += 1;
	}
	//display result of same faces onto HTML, for more dices number only the highest(max) number of same faces will return true
	highest_count = Math.max(...Object.values(dice_count));
	resultsSame[highest_count] += 1
	for (var i = 2; i <= numDice; i++){
		output += `<li id="${i}_same_faces">${i} same faces?: ${i==highest_count ? true : false}</li>`;
	}
	output+="</ul>";

	//Result Section: All Roll
	output += "<h3>All Roll</h3><ul>";
	//display number of rolls attempt 
	output += `<li id="total_rolls">Total rolls: ${resultsTotal.length}</li>`;
	//display the result of same faces of all role onto HTML, only the highest(max) number of same faces will be counted
	for (var i = 2; i <= numDice; i++){
		output += `<li id="total_${i}_same_faces">Total ${i} same faces: ${resultsSame[i]} (${((resultsSame[i]/resultsTotal.length)*100).toFixed(0)}%)</li>`;
	}
	output+="</ul>";

	//Create Result Section: Graph
	output += "<h3>Graph</h3><ul>";

	for (var i = 3; i <= 6*numDice; i++){
		output += `<div id="graph_number_${i}">${i}: </div>`;
	}

	//Display the output(result) onto the HTML
	document.getElementById("showResults").innerHTML = output;

	//Update Result Section: Graph
	for (i in resultsTotal){
		document.getElementById(`graph_number_${resultsTotal[i]}`).innerHTML += "#";
	}

}


