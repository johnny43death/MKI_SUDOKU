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
            document.getElementsByClassName("boardRow")[i].innerHTML += '<td class="field" onclick="selectField(' + (j) + ',' + (8-i) + ')" class="field' + (j) + '"></td>'
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