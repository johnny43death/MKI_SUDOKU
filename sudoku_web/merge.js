let arrayMain = new Array(9);
let arrayDisp = new Array(9);
let num;
let emptySpace = {"row": "", "column": ""};

for(i = 0; i < 9; i++){
    arrayMain[i] = new Array(9);
    arrayDisp[i] = new Array(9);
    for(j = 0; j < 9; j++){
        arrayDisp[i][j] = 0;
        arrayMain[i][j] = 0;
        console.log(arrayMain[i][j]);
    }
}

function rowCheck(arrayMain, emptySpace, num){
    if(arrayMain[emptySpace.row].find(column => column === num)){
        return false;
    }
    return true;
}
function columnCheck(arrayMain, emptySpace, num){
    for(i = 0; i < 9; i++){
        if(arrayMain[i][emptySpace.column] === num) return false;
    }
    return true;
}
function boxCheck(arrayMain, emptySpace, num){
    let boxRow = emptySpace.row - emptySpace.row % 3;
    let boxColumn = emptySpace.column - emptySpace.column % 3;

    for(i = boxRow; i < boxRow + 3; i++){
        for(j = boxColumn; j < boxColumn + 3; j++){
            if(arrayMain[i][j] === num) return false;
        }
    }
    return true;
}
function allCheck(arrayMain, emptySpace, num){
    if((!rowCheck(arrayMain, emptySpace, num)) || (!columnCheck(arrayMain, emptySpace, num)) || (!boxCheck(arrayMain, emptySpace, num))) return false;
    return true;
}
function nextEmptySpace(emptySpace, arrayMain){
    if(emptySpace.row === "" && emptySpace.column === "") {
        emptySpace.row = 0; 
        emptySpace.column = 0;
    }
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if(arrayMain[i][j] === 0){
                emptySpace.row = i;
                emptySpace.column = j;
                console.log("row: ", emptySpace.row)
                console.log("column: ", emptySpace.column)
                return emptySpace;
            }
        }
    }
}
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
/*
console.log("empty space row before incrementation: ", emptySpace.row)
console.log("empty space column before incrementation: ", emptySpace.column)

emptySpace = nextEmptySpace(emptySpace);

console.log("empty space row after incrementation: ", emptySpace.row)
console.log("empty space column after incrementation: ", emptySpace.column)
*/
function fillArray(arrayMain, emptySpace){
    emptySpace = nextEmptySpace(emptySpace, arrayMain);
    if(!emptySpace) return true;
    arrayRandom = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(num of shuffleArray(arrayRandom)){
        //console.log('all check value: ', allCheck(arrayMain, emptySpace, num))
        if(allCheck(arrayMain, emptySpace, num)){
            
            arrayMain[emptySpace.row][emptySpace.column] = 0;

            console.log(arrayMain[emptySpace.row][emptySpace.column]);
            if(fillArray(arrayMain, emptySpace)) return arrayMain;
            arrayMain[emptySpace.row][emptySpace.column] = 0;
            emptySpace.column -= 1;
            if (emptySpace.column < 0) {
                emptySpace.row -= 1;
                emptySpace.column = 9;
            }
        }
        arrayMain[emptySpace.row][emptySpace.column] = num;
    }
    return false;
}

fillArray(arrayMain, emptySpace);

var posX;
var posY;

function test() {
    console.log("test")
}

function createBoard(boardLocation) {
    document.getElementById(boardLocation).innerHTML = "";
    for(let i = 0; i < 9; i++) {
        document.getElementById(boardLocation).innerHTML += '<tr class="boardRow" id="boardRow' + (i) + '"></tr>';
    }
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(arrayMain[i][j] == 0){
                document.getElementsByClassName("boardRow")[i].innerHTML += '<td class="empty" onclick="selectField(' + 
                (j) + ',' + (8-i) + ')" class="field' + (j) + '"><input type="text" maxlength="1"></td>'
            }else{
                document.getElementsByClassName("boardRow")[i].innerHTML += '<td class="field" onclick="selectField(' + 
                (j) + ',' + (8-i) + ')" class="field' + (j) + '">' + arrayMain[i][j] + '</td>'
            }
        }
    }
    console.log("Board Generated.");
}

function selectField(x, y) {
    posX = x;
    posY = y;
    console.log("posX = ", posX);
    console.log("posY = ", posY);
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return;
        }
      
        switch (event.key) {
            case "Digit0":
            break;
            case "Digit1":
            break;
            case "Digit2":
            break;
            case "Digit3":
            break;
            case "Digit4":
            break;
            case "Digit5":
            break;
            case "Digit6":
            break;
            case "Digit7":
            break;
            case "Digit8":
            break;
            case "Digit9":
            break;
          default:
            return;
        }
        event.preventDefault();
    }, true);
}