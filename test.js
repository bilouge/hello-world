/* The games "time interval", after each second, values are added to numberOfGrapes */
document.onload = setInterval(timerFunction(), 1000);
// The function executed by the timer
	

/* I need to create a local variable that adds the productivity until the productivity becomes an integer, as soon as it becomes an integer; add the value to the number of grapes 
		*/
var prodAccumulation = farmerProductivity;
function timerFunction() {
	if (prodAccumulation % 1 != 0) {
		prodAccumulation += farmerProductivity;
	}
	else {
		numberOfGrapes += prodAccumulation;
		prodAccumulation = farmerProductivity;
	}
	document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
}



// Var for number of grapes
var numberOfGrapes = 0;
var grapesMulti = 0;
// Var for Grapes/second
var grapesPerSecond = 0;
// Number of Grapes per click
var grapesClick = 1;
document.getElementById("numberOfGrapesPerClick").innerHTML = `${grapesClick} Grapes per Click`;
// Add 1 per click to the number of grapes
document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
function updateClickCount() {
    numberOfGrapes = numberOfGrapes + ( Math.pow( 2 , grapesMulti ) );
	document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
}
// Var for gloves upgrades
var glovesUpgrades = 0;
document.getElementById("glovesUpgradesCount").innerHTML = `LVL ${glovesUpgrades}`;
// Multiplicator of gloves upgrades
var glovesMulti = 100;
// Add 1 per click to the gloves upgrades

document.getElementById("glovesCost").innerHTML = `Cost: ${glovesMulti}`;
function updateGlovesCount() {
    if (numberOfGrapes >= glovesMulti) {
        glovesUpgrades++;
        grapesMulti++;
        numberOfGrapes = numberOfGrapes - glovesMulti;
        glovesMulti = glovesMulti * 5;
        document.getElementById("glovesUpgradesCount").innerHTML = `LVL ${glovesUpgrades}`;
        document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
        document.getElementById("glovesCost").innerHTML = `Cost: ${glovesMulti}`;
       grapesClick = Math.pow(2,grapesMulti); document.getElementById("numberOfGrapesPerClick").innerHTML = `${grapesClick} Grapes per Click`;
        
    }
}

// Farmer variables
var farmerMulti = 10;
var farmerProductivity = 0;
var farmerNumber = 0;
/* This variable is not used yet; it will be used once I incorporate upgrade for the farmer */
var upgradesToFarmer = 0;
var individualFarmerProductivity = 0.1 * upgradesToFarmer;


document.getElementById("farmerCost").innerHTML = `Cost: ${farmerMulti}`;

function updateFarmerCount() {
	if (numberOfGrapes >= farmerMulti) {
		numberOfGrapes -= farmerMulti;
		farmerNumber++;
		document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
		farmerProductivity += (individualFarmerProductivity * farmerNumber);
		farmerMulti *= 1.2;
		if (farmerMulti % 1 != 0) {
			// x is used as increment to find the decimal point
			var x = 0;
			var farmerArray = [];
			for (let farmerCostString = farmerMulti.toString(); farmerCostString[x] !== "."; x++) {
				farmerArray.push(farmerCostString[x]);
				farmerMulti = farmerArray.join("");
			}
			farmerMulti = Number(farmerMulti);
		}
		document.getElementById("farmerCost").innerHTML = `Cost: ${farmerMulti}`;
	}
}