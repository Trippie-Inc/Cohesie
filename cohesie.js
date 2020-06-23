var inputs = [['A', 2], ['B', 3], ['C', 6]];
var checkOn = ['*', '/', '+', '-'];
var tempOutcomes = [];
var outcome = 3;
var pairs = [];
var finalOutcomes = [];
var tries = 1;
var maxTries = 2;

function Pair(inputs_) {
    var tempInputs = [];
    for(var i = 0; i <= inputs_.length - 1; i++) {
        tempInputs = [...inputs_];
        tempInputs.splice(i, 1)
        for(var t = 0; t <= tempInputs.length - 1; t++) {
            pairs.push([inputs_[i], tempInputs[t]]);
        }
    }
    return pairs;
}

function addStandards(inputs_) {
    for(var s = 0; s <= inputs_.length - 1; s++) {
        tempOutcomes.push(inputs_[s]);
        tempOutcomes.push([inputs_[s][0] + '^2', Math.pow(inputs_[s][1], 2)]);
        tempOutcomes.push([inputs_[s][0] + '^3', Math.pow(inputs_[s][1], 3)]);
        tempOutcomes.push(['√' + inputs_[s][0], Math.sqrt(inputs_[s][1])]);
    }
}

function addTempOutcomes(pairs_, tempOutcomes_) {
    for(var a = 0; a <= pairs.length - 1; a++) {
        if (checkOn.includes('*')) {
            //checken op vermenigvuldigen
            tempOutcomes.push([pairs[a][0][0] + ' * ' + pairs[a][1][0], pairs[a][0][1] * pairs[a][1][1]])

        }

        if (checkOn.includes('/')) {
            //checken op delen
            tempOutcomes.push([pairs[a][0][0] + ' / ' + pairs[a][1][0], pairs[a][0][1] / pairs[a][1][1]])
        }

        if (checkOn.includes('+')) {
            //checken op optellen
            tempOutcomes.push([pairs[a][0][0] + ' + ' + pairs[a][1][0], pairs[a][0][1] + pairs[a][1][1]])
        }

        if (checkOn.includes('-')) {
            //checken op aftrekken
            tempOutcomes.push([pairs[a][0][0] + ' - ' + pairs[a][1][0], pairs[a][0][1] - pairs[a][1][1]])
        }
    }

    return tempOutcomes_;

}

function checkTillFormula(outcome_, tempOutcomes_, finalOutcomes_, tries_) {

    for(var f = 0; f <= tempOutcomes.length - 1; f++) {
        if (tempOutcomes[f][1] == outcome) {
            finalOutcomes.push(tempOutcomes[f]);
        }
    }

    if (tries < maxTries) {
        if (finalOutcomes.length == 0) {
            tries = tries + 1;

            addTempOutcomes(Pair(tempOutcomes));
            checkTillFormula(outcome, tempOutcomes)
        }
    }
}

function zoekInput() {
    var goedeInputs = [];
    var uniekeGoedeInputs = [];
    var uniekeVolledigeInputs = [];
    for(var g = 0; g <= tempOutcomes.length - 1; g++) {
        goedeInputs.push(['*', outcome / tempOutcomes[g][1]]);
        goedeInputs.push(['/', outcome * tempOutcomes[g][1]]);
        goedeInputs.push(['+', outcome - tempOutcomes[g][1]]);
        goedeInputs.push(['-', outcome + tempOutcomes[g][1]]);
    }
    for(var z = 0; z <= goedeInputs.length - 1; z++) {
        if (!uniekeGoedeInputs.includes(goedeInputs[z][1])) {
            uniekeGoedeInputs.push(goedeInputs[z][1]);
            if (Number.isInteger(goedeInputs[z][1])) {
                uniekeVolledigeInputs.push(goedeInputs[z]);
            }
        }
    }
    return uniekeVolledigeInputs;
}

function voerUit(inputs_, pairs_, outcome_, tempOutcomes_, finalOutcomes_) {
    Pair(inputs_);
    addStandards(inputs_, tempOutcomes_);
    addTempOutcomes(pairs_);
    checkTillFormula(outcome_, finalOutcomes_)
}


function start(inputs_, outcome_) {
    inputs = inputs_;
    checkOn = ['*', '/', '+', '-'];
    tempOutcomes = [];
    outcome = outcome_[1];
    pairs = [];
    finalOutcomes = [];
    tries = 1;
    maxTries = 2;

    voerUit(inputs, pairs, outcome, tempOutcomes, finalOutcomes, tries);

    if (finalOutcomes.length != 0) {
        return [finalOutcomes, true];
    } else {
        console.log(zoekInput().length + ' opties');
        console.log(zoekInput());
        return ['Niets gevonden.', false];
    }
}

function vergelijkMeerdere(inputMeerdere_) {
    //start([['A', 2], ['B', 3], ['C', 6]], ['*', '/', '+', '-'], ['R', 213747])
    genoegFinalOutcomes = [];
    duplicateFinalOutcomes = [];

    for(var m = 0; m <= inputMeerdere_.length - 1; m++) {
        returnStart = start(inputMeerdere_[m][0], inputMeerdere_[m][1]);
        for(var ma = 0; ma <= returnStart[0].length - 1; ma++) {
            genoegFinalOutcomes.push(returnStart[0][ma][0]);
        }
    }

    for(var mz = 0; mz <= genoegFinalOutcomes.length - 1; mz++) {
        if (genoegFinalOutcomes.filter((v) => (v === genoegFinalOutcomes[mz])).length == inputMeerdere_.length) {
            duplicateFinalOutcomes.push(genoegFinalOutcomes[mz]);
        }
    }


    uniekeDuplicates = []
    for(var ud = 0; ud <= duplicateFinalOutcomes.length - 1; ud++) {
        if (!uniekeDuplicates.includes(duplicateFinalOutcomes[ud])) {
            uniekeDuplicates.push(duplicateFinalOutcomes[ud])
        }
    }

    if (uniekeDuplicates.length != 0) {
        document.getElementById('recht-boven-bar').innerHTML = "Deze formules werken voor deze situatie!"; 
        document.getElementById('rechts-midden-bar').innerHTML = "";
        for(var ud = 0; ud <= uniekeDuplicates.length - 1; ud++) {
            document.getElementById('rechts-midden-bar').innerHTML += (outcomeVar + ' = ' + uniekeDuplicates[ud] + '<br><br>')
        }
    } else {
        document.getElementById('recht-boven-bar').innerHTML = "Kijk of deze inputs zich in jouw situatie bevinden, zo ja dan kan je een formule opbouwen."; 
        document.getElementById('rechts-midden-bar').innerHTML = "";
        for(var zi = 0; zi <= zoekInput().length - 1; zi++) {
            document.getElementById('rechts-midden-bar').innerHTML += (zoekInput()[zi][1] + ', ')
        }
        
    }
    console.log(uniekeDuplicates);
}

function HTMLtoJS() {
    var completeString = []
    var inputsString = []

    outcomeBar = document.getElementsByClassName("OutcomeBar");
    inputBars = document.getElementsByClassName("InputBar");
    outcomeVar = document.getElementById("outcomeVar").value;
    aantalInputsX = document.getElementsByClassName("inputVal").length / inputBars.length;    

    for(var ht = 0; ht <= aantalInputsX - 1; ht++) {
        var tempInputValues = [];
        for(var hf = 0; hf <= inputBars.length - 1; hf++) {
            tempInputValues.push([inputBars[hf].getElementsByClassName("inputVar")[0].value, parseInt(inputBars[hf].getElementsByClassName("inputVal")[ht].value)])
        }
        inputsString.push(tempInputValues);
    }   

    for(var ft = 0; ft <= inputsString.length - 1; ft++) {
        completeString.push([inputsString[ft], [outcomeVar, parseInt(outcomeBar[0].getElementsByClassName("outcomeVal")[ft].value)]])
    }
    vergelijkMeerdere(completeString);


}



function AddRow() {
    var inputToClone = document.getElementById("idToClone");
    var clonedInput = inputToClone.cloneNode(true);
    var parentElement = document.getElementsByClassName("Midden-Midden-Bar")[0];
    var removeId = parentElement.appendChild(clonedInput);
    removeId.removeAttribute("id");
    removeId.getElementsByClassName("inputVar")[0].value = "";
    for(var ri = 0; ri <= removeId.getElementsByClassName("inputVal").length - 1; ri++) {
        removeId.getElementsByClassName("inputVal")[ri].value = "";
    }
}

function AddColumn() {
    var inputToClone = document.getElementsByClassName("OutcomeBar")[0].getElementsByClassName("outcomeVal")[0];
    var clonedInput = inputToClone.cloneNode(true);
    var parentElement = document.getElementsByClassName("OutcomeBar")[0];
    var newElement = parentElement.appendChild(clonedInput);
    newElement.value = "";

    for(var ac = 0; ac <= document.getElementsByClassName("InputBar").length - 1; ac++) {
        inputToClone = document.getElementsByClassName("InputBar")[ac].getElementsByClassName("inputVal")[0];
        clonedInput = inputToClone.cloneNode(true);
        parentElement = document.getElementsByClassName("InputBar")[ac];
        newElement = parentElement.appendChild(clonedInput);
        newElement.value = "";
    }
}