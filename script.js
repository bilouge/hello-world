//Timer attributes//
var farmerStack = 0;

//Timer//
setInterval(function(){
    farmerStack += farmerProd;
    if (farmerStack >= 10) {
        grapeCount += Math.round(farmerStack/10);

        farmerStack -= Math.round(farmerStack/10)*10;
    }
    document.getElementById("grape-count").innerHTML = grapeCount;
    document.getElementById("test").innerHTML = farmerProd + " " + farmerCount + " " + farmerStack;
},/*I will add a 'tick' variable, once a player buys a 'tick' upgrade, he'll affect the number on the right by diminishing it==>*/ 1000)

//Switches the tabs//
function tabSwitch(ind1, id1, selfind) {
    document.getElementsByClassName("tabcont")[ind1].style.display = "none";
    //document.getElementsByClassName("tabcont")[ind2].style.display = "none";//
    //document.getElementsByClassName("tabcont")[ind3].style.display = "none";//
    //document.getElementsByClassName("tabcont")[ind4].style.display = "none";//
    document.getElementById(id1).style.display = "block";
    document.getElementsByClassName("tabs")[selfind].style.backgroundColor = "#c0c0c0";
    document.getElementsByClassName("tabs")[ind1].style.backgroundColor = "inherit";
}

//Grapes Attributes//
var grapeCount = 0;
document.getElementById("grape-count").innerHTML = grapeCount;

//add one grape per click//
function btnClick() {
    grapeCount++;
    document.getElementById("grape-count").innerHTML = grapeCount;
}

//Farmer attributes//
var farmerCount = 0;
var farmerCost = 10;
//when I add items related to farmers, add a variable that affect farmerProd//
var farmerProd = farmerCount * 1;
document.getElementById("farmer-cost").innerHTML = "Cost: <b>" + farmerCost + "</b>";
document.getElementById("farmer-desc").innerHTML = "Collect 1 grape each 10 seconds<br><b>how ungrateful!</b><hr>Owned: <b>" + farmerCount + "</b>";

//add one farmer per click//
function farmerClick() {
    if (grapeCount >= farmerCost) {
        farmerCount++;
        grapeCount -= farmerCost;
        farmerCost = Math.round(farmerCost * 1.2);
        document.getElementById("farmer-cost").innerHTML = "Cost: <b>" + farmerCost + "</b>";
        document.getElementById("farmer-desc").innerHTML = "Collect 1 grape each 10 seconds<br><b>how ungrateful!</b><hr>Owned: <b>" + farmerCount + "</b>";
        document.getElementById("grape-count").innerHTML = grapeCount;
    }
    farmerProd = farmerCount * 1;
    document.getElementById("test").innerHTML = farmerProd + " " + farmerCount + " " + farmerStack;
}

document.getElementById("test").innerHTML = farmerProd + " " + farmerCount + " " + farmerStack;