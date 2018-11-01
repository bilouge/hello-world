/*IDEA TO IMPLEMENT: rather than having the description as a ToolTip, create a div between the multi-bar and upgrades, and when hovering
display the description in the div area*/

/*IMPORTANT: on this version of the game, a couple of things are set for testing purposes; those variables MUST be changed in future version
AFTER receiving feedback on the game. Those variables are: 1) The Upgrade-Cost-Percentage added each time (20%) here represented by the number 
1.2; use CTRL+F to find it. 2) The Cost from one upgrade to another is multiplied by 5. i.e. (10 'Son price' * 5 'Multiplier' = 50 'Daughter price')
*/
whipProd = 1;
//Timer attributes
//Add all items with multiplicative properties to the stack
var stack = 0;

//Timer//
setInterval(function(){
    stack = stack + sonProd + daughterProd + farmerProd + tronProd;
    //FOR TESTING PURPOSES
    console.log(`Stack: ${stack/10}`);
    if (stack >= 10) {
        grapeCount += Math.floor(stack/10);
        stack -= Math.floor(stack/10)*10;
    }
    //Use K abbreviation for big numbers
    if (grapeCount >= 1000) {
        document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
    }
    else document.getElementById("grape-count").innerHTML = grapeCount;
},/*I will add a 'tick' variable, once a player buys a 'tick' upgrade, he'll affect the number on the right by diminishing it==>*/ 1000)

//Switches the tabs//
function tabSwitch(ind1, ind2, id1, selfInd) {
    document.getElementsByClassName("tabcont")[ind1].style.display = "none";
    document.getElementsByClassName("tabcont")[ind2].style.display = "none";//
    //document.getElementsByClassName("tabcont")[ind3].style.display = "none";//
    //document.getElementsByClassName("tabcont")[ind4].style.display = "none";//
    document.getElementById(id1).style.display = "block";
    document.getElementsByClassName("tabs")[selfInd].style.backgroundColor = "#c0c0c0";
    document.getElementsByClassName("tabs")[ind1].style.backgroundColor = "inherit";
    document.getElementsByClassName("tabs")[ind2].style.backgroundColor = "inherit";
}

//Disables AND/OR hides the tabs

farmerUnlock = 15;
document.getElementById("items-tab").style.visibility = "hidden";
document.getElementById("items-tab").disabled = true;
var itemsUnlock = farmerUnlock - 10;

//Multi Attributes
var multi = 1;
var multiWidth = 0;
var multi1Cost = 50000;
var multiUnlock = 30;
document.getElementById("multi-tab").innerHTML = `[LOCKED]<br>Buy ${multiUnlock} more <b>\"Ungrateful Son\"</b> to unlock`;
document.getElementById("multi-tab").disabled = true;
document.getElementById("multi1-cost").innerHTML = `<b>Cost: ${multi1Cost/1000}K</b>`;

function multiClick() {
    //This is the condition: if first multiplicator hasn't been bought
    if (document.getElementById("multi1").style.display != "none") {
        if (grapeCount >= multi1Cost) {
            grapeCount -= multi1Cost;
            document.getElementById("multi1").style.display = "none";
            document.getElementById("multi-bar-out").style.display ="block";
            //REMOVE WHEN YOU HAVE MULTIPLE UPGRADES
            document.getElementById("multi-btn").style.display = "none";
        }
    }
}

//Grapes Attributes
var grapeCount = 10000000;
document.getElementById("grape-count").innerHTML = grapeCount;

//add one grape per click
function btnClick() {
    grapeCount++;
    //Use K abbreviation for big numbers
    if (grapeCount >= 1000) {
        document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
    }
    else document.getElementById("grape-count").innerHTML = grapeCount;
    //multi-bar code
    //PUT AFTER TESTING: if (the multiplier button is not displayed, run the code)
    if (multiWidth < 99 && document.getElementById("multi1").style.display === "none"){
        multiWidth += 2;
        document.getElementById("multi-bar-in").style.width = `${multiWidth}%`
    }
    //This line deals with OCD players who like the see the bar constantly full
    else if (multiWidth === 100) multiWidth += 2;
}

//Decrease bar size as time goes by
setInterval(function(){
    
    if (multiWidth > 0) {
        multiWidth -= 1;
        if (multiWidth < 100) document.getElementById("multi-bar-in").style.width = `${multiWidth}%`;
        if (multiWidth >= 80) {
            multi = 2;
            document.getElementById("multi-bar-in").style.backgroundColor = "red";
        }
        else { 
            multi = 1;
            document.getElementById("multi-bar-in").style.backgroundColor = "grey";
        }
    }
    //"Refreshes" values
    sonProd = sonCount * 1 * whipProd * multi;
    daughterProd = daughterCount * 2 * whipProd * multi;
    farmerProd = farmerCount * 10 * whipProd * multi;
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
},250)


//son attributes//
var sonCount = 0;
var sonCost = 10;
//when I add items related to sons, add a variable that affect sonProd
var sonProd = sonCount * 1 * whipProd * multi;
var individualSonProd = whipProd; //Used in description

document.getElementById("son-cost").innerHTML = `<b>Cost: ${sonCost}</b>`;
document.getElementById("son-desc").innerHTML = `Collect 1 grape each 10 seconds<br><b>how ungrateful!</b><hr>Owned: <b>${sonCount}</b>`;

//add one son per click//
function sonClick() {
    individualSonProd = 1 * whipProd;
    if (grapeCount >= sonCost) {
        daughterUnlock--;
        multiUnlock--;
        sonCount++;
        grapeCount -= sonCost;
        sonCost = Math.floor(sonCost * 1.2);
        document.getElementById("son-cost").innerHTML = `<b>Cost: ${sonCost}</b>`;
        //Only refresh this description if the whip is NOT unlocked
        if (document.getElementById("whip-btn").disabled === false)
            document.getElementById("son-desc").innerHTML = 
                `Collect 1 grape each 10 seconds<br><b>How ungrateful!</b><hr>Owned: <b>${sonCount}</b>`;
        else document.getElementById("son-desc").innerHTML = 
            `Collect ${individualSonProd/10} grape each second<br><b>How ungrateful!</b><hr>Owned: <b>${sonCount}</b>`;
        //Use K abbreviation for big numbers
        if (grapeCount >= 1000) {
            document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
        }
        else document.getElementById("grape-count").innerHTML = grapeCount;
        if (document.getElementById("multi-tab").disabled === true )
            document.getElementById("multi-tab").innerHTML = `[LOCKED]<br>Buy ${multiUnlock} more <b>\"Ungrateful Son\"</b> to unlock`;
        if (multiUnlock === 0) { 
            document.getElementById("multi-tab").innerHTML = "<b>Multiplier</b>";
            document.getElementById("multi-tab").disabled = false;
        }
    }
    //Update count to unlock daughter
    if (daughterUnlock > 0) {
        document.getElementById("daughter-desc").innerHTML = `Buy ${daughterUnlock} more <b>\"Ungrateful Sons\"</b> to unlock`;
    }
    //When daughter is unlocked, change display of the btn AND make first tab visible
    else {
        document.getElementById("daughter-btn").disabled = false;
        document.getElementById("daughter-btn").innerHTML = 
            "Appreciative Daughter<p id='daughter-cost'></p><span id='daughter-desc' class='description'></span>";
        document.getElementById("daughter-desc").style.top = "-20px";
        document.getElementById("daughter-desc").style.fontWeight = "100";
        if (document.getElementById("whip-btn").disabled === false)
        document.getElementById("daughter-desc").innerHTML = 
            `Collect 1 grape each 5 seconds<br><b>\"You should take your sister as an example\"</b><hr>Owned: <b>${daughterCount}</b>`;
        else document.getElementById("daughter-desc").innerHTML = 
            `Collect ${individualDaughterProd/10} grape each second<br><b>\"You should take your sister as an example\"</b><hr>Owned: <b>${daughterCount}</b>`;
        document.getElementById("daughter-cost").innerHTML = `<b>Cost: ${daughterCost}</b>`;
        document.getElementById("items-tab").style.visibility = "visible";
        document.getElementById("farmer-btn").style.visibility = "visible";
        if (itemsUnlock > 0) 
            document.getElementById("items-tab").innerHTML = `[LOCKED]<br>Buy ${itemsUnlock} more <b>\"Appreciative Daughter\"</b> to unlock`;
    }
    //"Refreshes" the values
    sonProd = sonCount * 1 * whipProd * multi;
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
}

//daughter attribute
var daughterCount = 0;
var daughterCost = 50;
var daughterProd = daughterCount * 2 * whipProd * multi;
var individualDaughterProd = 2 * whipProd;
//Disabling the daughter btn on launch
document.getElementById("daughter-btn").disabled = true;
document.getElementById("daughter-btn").innerHTML = "[LOCKED]<br>hover for more info <span id='daughter-desc' class='description'></span>";

var daughterUnlock = 10;
document.getElementById("daughter-desc").innerHTML = `Buy ${daughterUnlock} more <b>\"Ungrateful Son\"</b> to unlock`;


//Add one daughter per Click
function daughterClick() {
    individualDaughterProd = 2 * whipProd;
    if (grapeCount >= daughterCost) {
        farmerUnlock--;
        daughterCount++;
        grapeCount -= daughterCost;
        daughterCost = Math.floor(daughterCost * 1.2);
        document.getElementById("daughter-cost").innerHTML = `<b>Cost: ${daughterCost}</b>`;
        //Only refresh this description if the whip is NOT unlocked
        if (document.getElementById("whip-btn").disabled === false)
            document.getElementById("daughter-desc").innerHTML = 
                `Collect 1 grape each 5 seconds<br><b>\"You should take your sister as an example\"</b><hr>Owned: <b>${daughterCount}</b>`;
        else document.getElementById("daughter-desc").innerHTML = 
            `Collect ${individualDaughterProd/10} grape each second<br><b>\"You should take your sister as an example\"</b><hr>Owned: <b>${daughterCount}</b>`;
        //Use K abbreviation for big numbers
        if (grapeCount >= 1000) {
            document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
        }
        else document.getElementById("grape-count").innerHTML = grapeCount;
    }
    //Update count to unlock farmer
    if (farmerUnlock > 0) {
        document.getElementById("farmer-desc").innerHTML = `Buy ${farmerUnlock} more <b>\"Ungrateful Daughter\"</b> to unlock`;
    }
    //When farmer is unlocked, change display of the btn AND display GrapeTron3000
    else {
        document.getElementById("farmer-btn").disabled = false;
        document.getElementById("farmer-btn").innerHTML = 
            "Farmer<p id='farmer-cost'></p><span id='farmer-desc' class='description'></span>";
        document.getElementById("farmer-desc").style.top = "-20px";
        document.getElementById("farmer-desc").style.fontWeight = "100";
        document.getElementById("farmer-desc").innerHTML = 
            `Collect ${individualFarmerProd/10} grape each second<br><b>\"You should take my daughter as an example\"<br>"Wait, what!?"</b><hr>Owned: <b>${farmerCount}</b>`;
        document.getElementById("farmer-cost").innerHTML = `<b>Cost: ${farmerCost}</b>`;
        document.getElementById("tron-btn").style.visibility = "visible";
    }
    //"Refreshes" values
    daughterProd = daughterCount * 2 * whipProd * multi;
    itemsUnlock = farmerUnlock - 10;
    if (itemsUnlock > 0) 
            document.getElementById("items-tab").innerHTML = `[LOCKED]<br>Buy ${itemsUnlock} more <b>\"Appreciative Daughter\"</b> to unlock`;
    else {
        document.getElementById("items-tab").disabled = false;
        document.getElementById("items-tab").innerHTML = "<b>Items</b>";
    }
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
}

//farmer attribute
var farmerCount = 0;
var farmerCost = 150;
var farmerProd = farmerCount * 10 * whipProd * multi;
var individualFarmerProd = 10 * whipProd;
//Disabling AND hiding the farmer btn on launch
document.getElementById("farmer-btn").style.visibility = "hidden";
document.getElementById("farmer-btn").disabled = true;
document.getElementById("farmer-btn").innerHTML = "[LOCKED]<br>hover for more info<span id='farmer-desc' class='description'></span>";
var farmerUnlock;
document.getElementById("farmer-desc").innerHTML = `Buy ${farmerUnlock} more <b>\"Appreciative Daughter\"</b> to unlock`;

//Add one farmer per Click
function farmerClick() {
    individualFarmerProd = 10 * whipProd;
    if (grapeCount >= farmerCost) {
        tronUnlock--;
        farmerCount++;
        grapeCount -= farmerCost;
        farmerCost = Math.floor(farmerCost * 1.2);
        document.getElementById("farmer-cost").innerHTML = `<b>Cost: ${farmerCost}</b>`;
        document.getElementById("farmer-desc").innerHTML = 
            `Collect ${individualFarmerProd/10} grape each second<br><b>\"You should take my daughter as an example\"<br>"Wait, what!?"</b><hr>Owned: <b>${farmerCount}</b>`;
        //Use K abbreviation for big numbers
        if (grapeCount >= 1000) {
            document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
        }
        else document.getElementById("grape-count").innerHTML = grapeCount;
        console.log(tronUnlock);
        if (tronUnlock === 0) {
            document.getElementById("tron-btn").innerHTML = "GrapeTron3000<p id='tron-cost'></p><span id='tron-desc' class='description'></span>";
            document.getElementById("tron-desc").innerHTML =
                `Collect ${individualTronProd/10} grape each second<br><b>\"01001001 00100000 01101000 01000001 01110110 01000101 00100000 01000110 01000101 01000101 01101100 01101001 01001110 01000111 01110011"</b><hr>Owned: <b>${tronCount}</b>`;
            document.getElementById("tron-btn").disabled = false;
            document.getElementById("tron-cost").innerHTML = `<b>Cost: ${tronCost}</b>`;
        }
    }
    //"Refreshes" values
    farmerProd = farmerCount * 10 * whipProd * multi;
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
    if (tronUnlock > 0) document.getElementById("tron-desc").innerHTML = `Buy ${tronUnlock} more <b>\"Farmer\"</b> to unlock`;
}

//GrapeTron3000 attribute
var tronCount = 0;
var tronCost = 10000;
var tronProd = tronCount * 500 * whipProd * multi;
var individualTronProd = 500 * whipProd;
//Disabling AND hiding the GrapeTron3000 btn on launch
document.getElementById("tron-btn").style.visibility = "hidden";
document.getElementById("tron-btn").disabled = true;
document.getElementById("tron-btn").innerHTML = "[LOCKED]<br>hover for more info<span id='tron-desc' class='description'></span>";
var tronUnlock = 30;
document.getElementById("tron-desc").innerHTML = `Buy ${tronUnlock} more <b>\"Farmer\"</b> to unlock`;

function tronClick() {
    individualTronProd = 500 * whipProd;
    if (grapeCount >= tronCost) {
        //tronUnlock--; (REPLACE BY WHATEVER I DO NEXT)
        tronCount++;
        grapeCount -= tronCost;
        tronCost = Math.floor(tronCost * 1.2);
        document.getElementById("tron-cost").innerHTML = `<b>Cost: ${tronCost}</b>`;
        document.getElementById("tron-desc").innerHTML =
            `Collect ${individualTronProd/10} grape each second<br><b>\"01001001 00100000 01101000 01000001 01110110 01000101 00100000 01000110 01000101 01000101 01101100 01101001 01001110 01000111 01110011"</b><hr>Owned: <b>${tronCount}</b>`;
        //Use K abbreviation for big numbers
        if (grapeCount >= 1000) {
            document.getElementById("grape-count").innerHTML = `${Math.round(grapeCount/1000)}K`;
        }
        else document.getElementById("grape-count").innerHTML = grapeCount;
    }
    //"Refreshes" values
    tronProd = tronCount * 500 * whipProd * multi;
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
}

//whip attributes
var whipCost = 500;
var whipProd = 1;
document.getElementById("whip-cost").innerHTML = `<b>Cost: ${whipCost} </b>`;
document.getElementById("whip-desc").innerHTML = `Multiply productivity by 10<br><b>It's Super Effective!</b>`;

//Add whip
function whipClick() {
    if (grapeCount >= whipCost) {
        grapeCount -= whipCost;
        whipProd = 10;
        individualSonProd = 1 * whipProd;
        individualDaughterProd = 2 * whipProd;
        individualFarmerProd = 10 * whipProd;
        individualTronProd = 500 * whipProd;
        document.getElementById("whip-btn").disabled = true;
        document.getElementById("whip-cost").innerHTML = `<b>OWNED</b>`;
        document.getElementById("son-desc").innerHTML = `Collect ${individualSonProd/10} grape each second<br><b>How ungrateful!</b><hr>Owned: <b>${sonCount}</b>`;
        if (daughterUnlock <= 0) document.getElementById("daughter-desc").innerHTML = 
                `Collect ${individualDaughterProd/10} grape each second<br><b>\"You should take your sister as an example\"</b><hr>Owned: <b>${daughterCount}</b>`;
        if (farmerUnlock <= 0) document.getElementById("farmer-desc").innerHTML = 
            `Collect ${individualFarmerProd/10} grape each second<br><b>\"You should take my daughter as an example\"<br>"Wait, what!?"</b><hr>Owned: <b>${farmerCount}</b>`;
        if (tronUnlock <= 0)
        document.getElementById("tron-desc").innerHTML =
            `Collect ${individualTronProd/10} grape each second<br><b>\"01001001 00100000 01101000 01000001 01110110 01000101 00100000 01000110 01000101 01000101 01101100 01101001 01001110 01000111 01110011"</b><hr>Owned: <b>${tronCount}</b>`;
    }
    //"Refreshes" values (ADD PROD WHEN YOU HAVE NEW ITEM)
    sonProd = sonCount * 1 * whipProd * multi;
    daughterProd = daughterCount * 2 * whipProd * multi;
    farmerProd = farmerCount * 10 * whipProd * multi;
    tronProd = tronCount * 500 * whipProd * multi;
    if (multiWidth >= 80)
        document.getElementById("productivity").innerHTML = `<b>Productivity:</b> <span style="color: red">${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second</span>`;
    else document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;
}

//Display productivity (PUT AT THE END OF CODE)
document.getElementById("productivity").innerHTML = `<b>Productivity:</b> ${(sonProd + daughterProd + farmerProd + tronProd)/10} grapes/second`;