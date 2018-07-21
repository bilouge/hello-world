// Var for number of grapes
var numberOfGrapes;
numberOfGrapes = 0;
var grapesMulti = 0;
// Number of Grapes per click
var grapesClick = 0;
document.getElementById("numberOfGrapesPerClick").innerHTML = grapesClick;
// Add 1 per click to the number of grapes
document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
function updateClickCount() {
    numberOfGrapes = numberOfGrapes + ( Math.pow( 2 , grapesMulti ) );
	document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
}
// Var for gloves upgrades
var glovesUpgrades = 0;
document.getElementById("glovesUpgradesCount").innerHTML = glovesUpgrades;
// Multiplicator of gloves upgrades
var glovesMulti = 1;
// Add 1 per click to the gloves upgrades

document.getElementById("glovesCost").innerHTML = "("+ glovesMulti + ")";
function updateGlovesCount() {
    if (numberOfGrapes >= glovesMulti) {
        glovesUpgrades++;
        grapesMulti++;
        numberOfGrapes = numberOfGrapes - glovesMulti;
        glovesMulti = glovesMulti * 2;
        document.getElementById("glovesUpgradesCount").innerHTML = glovesUpgrades;
        document.getElementById("grapeNumber").innerHTML = numberOfGrapes;
        document.getElementById("glovesCost").innerHTML = "("+ glovesMulti + ")";
       grapesClick = Math.pow(2,grapesMulti); document.getElementById("numberOfGrapesPerClick").innerHTML = grapesClick;
        
    }
}

