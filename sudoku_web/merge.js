let arrayMain = new Array(9); //główna tablica, która będzie całkowicie rozwiązana
let arrayPlayable = new Array(9); //tablica dla gracza, w której będą dziury
let num; //liczba, którą chcemy wstawić do pustego pola
let emptySpace = {"row": "", "col": ""}; //koordynaty do pustego miejsca
let holes = 20; //liczba dziur, jaką chcemy zrobić
let arrayRandom = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //tablica do losowania wartości do pól tablicy
let main = document.getElementById("main");

for(i = 0; i < 9; i++){
    for(j = 0; j < 9; j++){
        arrayMain[i] = new Array(9);
        arrayMain[i][j] = 0;
    }
}

function rowCheck(arrayMain, emptySpace, num){
    if(arrayMain[emptySpace.rowIndex].find(column => column === num)){ //sprawdzenie, czy w wierszu, który jest podany w koordynatach, jest już liczba, którą chcemy wstawić
        return false;
    }
    return true;
}
function columnCheck(arrayMain, emptySpace, num){
    for(i = 0; i < 9; i++){
        if(arrayMain[i][emptySpace.colIndex] === num) return false; //sprawdzenie, czy w kolumnie, która jest podana w koordynatach, jest już liczba, którą chcemy wstawić
    }
    return true;
}
function boxCheck(arrayMain, emptySpace, num){
    //sprawdzenie, w jakim kwadracie 3x3 jest puste pole
    let boxRow = emptySpace.rowIndex - emptySpace.rowIndex % 3; 
    let boxColumn = emptySpace.colIndex - emptySpace.colIndex % 3;

    for(i = boxRow; i < boxRow + 3; i++){
        for(j = boxColumn; j < boxColumn + 3; j++){
            if(arrayMain[i][j] === num) return false; //sprawdzenie, czy w tym kwadracie jest już liczba, którą chcemy wstawić
        }
    }
    return true;
}
function allCheck(arrayMain, emptySpace, num){ //wszystkie funkcje sprawdzające w jednym miejscu
    if((!rowCheck(arrayMain, emptySpace, num)) || (!columnCheck(arrayMain, emptySpace, num)) || (!boxCheck(arrayMain, emptySpace, num))) return false;
    return true;
}
const nextEmptySpace = arrayToCheck => { //funkcja przechodząca do następnego pustego miejsca
    let emptySpace = {"rowIndex": "", "colIndex": ""}; //zadeklarowanie zmiennej, w której będą przechowywane koordynaty
    arrayToCheck.forEach( (row, rowIndex) => { //pętla sprawdzająca każdy wiersz w tablicy (row), jednocześnie pokazując numer wiersza (rowIndex)
        if(emptySpace.colIndex !== "") return; //jeśli zmienna emptySpace ma już zadeklarowaną kolumne, kończy pętle

        let zero = row.find(col => col === 0) //zmienna zero przechowująca koordynat kolumny, gdy w danym wierszu znajduje się 0

        if(zero === undefined) return; //jeśli nie znaleziono zera w danym wierszu, przechodzi do kolejnego wiersza
        emptySpace.rowIndex = rowIndex; //jeśli znaleziono, zadeklaruj zmienną emptySpace
        emptySpace.colIndex = row.indexOf(zero);
    })

    if(emptySpace.colIndex !== "") return emptySpace;
    return false;
}
const shuffleArray = array => { //przetasowanie tablicy
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

function fillArray(arrayToFill){ //wypełnienie tablicy wartościami
    emptySpace = nextEmptySpace(arrayToFill); //znajdujemy pustę pole
    if(!emptySpace) return arrayToFill; //jeśli nie znaleziono, zwraca tablice, gdyż oznacza to, że tablica jest już wypełniona
    for(num of shuffleArray(arrayRandom)){ //pętla, w której zmienna num (do wstawiania wartości do tablicy) przybiera wartości z przetasowanej tablicy z liczbami od 1-9
        counter++;
        if(counter > 6000000) throw new Error("Błąd w rekursji"); //jeśli funkcja będzie wykonywana zbyt dużo razy, zwróci błąd

        if(allCheck(arrayToFill, emptySpace, num)){ //jeśli wszystko się zgadza w kwestii zamieszczenia pola, umieść to wartość w pustę miejsce
            
            arrayToFill[emptySpace.rowIndex][emptySpace.colIndex] = num;
            //console.log(arrayToFill[emptySpace.row][emptySpace.column]);
            if(fillArray(arrayToFill)) return arrayToFill; //wykonanie rekursji, funkcja przejdzie do kolejnego pustego pola
            //jeśli któraś z funkcji zwróci wartość false, z powrotem zwróci do konkretnego pola 0 i cofnie się z polem o 1, próbując innej liczby z tablicy z liczbami od 1-9
            arrayToFill[emptySpace.rowIndex][emptySpace.colIndex] = 0;
            emptySpace.colIndex -= 1;
            if(emptySpace.colIndex < 0){
                emptySpace.colIndex = 8;
                emptySpace.rowIndex -= 1;
            }
        }
    }
    //jeśli żadna liczba nie pasuje do pustego pola, zwraca false, tym samym cofając pole o 1
    return false;
} 
function range(start, end){ //funkcja range, tworząca tablicę z liczbami od start do end
    const length = end - start + 1;
    return Array.from( {length} , (_ , i) => start + i);
}

function makeHoles(arrayPlayable, holes){ //funkcja robiąca dziury w tablicy
    let removedValues = []; //tablica, przechowująca kordynaty i poprzednie wartości pustych pól
    const arrayValues = shuffleArray(range(0,80)) //tablica z przetasowanymi liczbami od 0 do 80
    while(removedValues.length < holes){ //pętla, która wykona się dopóki liczba pustych pól nie będzie równa liczbie dziur, jakie chcieliśmy mieć
        const newValue = arrayValues.pop(); //zwrócenie wartości z ostatniego pola z tablicy arrayValues i tym samym usuwając to pole z tej tablicy 
        if (newValue === undefined) throw new Error ("Impossible Game") //jeśli nie ma żadnych wartości w arrayValues, zwraca błąd o niemożliwej grze, nie da się zrobić tylu dziur w tak wylosowanej tablicy
        //wylosowane koordynaty na podstawie wartości newValue
        let rowNum = Math.floor(newValue/9);
        let colNum = newValue % 9;

        if(!arrayPlayable[rowNum]) continue;
        if(arrayPlayable[rowNum][colNum] === 0) continue;
        removedValues.push({ //dodanie do tablicy pustych wartości koordynatów i wartości pola, które wyzerujemy
            row: rowNum,
            column: colNum,
            value: arrayPlayable[rowNum][colNum]
        })
        arrayPlayable[rowNum][colNum] = 0; //wyzerowanie wylosowanego pola
        if(checkIfMultipleSolutions(arrayPlayable.map( row => row.slice() ))){ //sprawdzenie, czy istnieje więcej niż 1 rozwiązanie
            arrayPlayable[rowNum][colNum] = removedValues.pop().value; //jeżeli istnieje, zwraca poprzednią wartość wylosowanego pola do tego pola i usuwa to pole z tablicy removedValues
        }
    }
    return [removedValues, arrayPlayable] 
}
function checkIfMultipleSolutions(arrayToCheck){ //sprawdzenie, czy istnieje więcej niż 1 rozwiązanie
    possibleSolutions = []; //tablica, do której dodawane będą możliwe rozwiązania
    emptySpaces = listEmptySpaces(arrayToCheck); //stworzenie tablicy ze wszystkimi pustymi wartościami w tablicy do sprawdzenia
    for(i = 0; i < emptySpaces.length; i++){
        /* pętla sprawiająca, że za każdym razem zmienia kolejność pól, do jakich będą wprowadzane wartości w celu sprawdzenia, jakie są wartości
            kolejność wstawiania wartości również ma znaczenia, dlatego musimy sprawdzić każdą kolejność
        */
        emptySpacesClone = [...emptySpaces] //tworzy klona tablicy z pustymi wartościami
        
        const startingPoint = emptySpacesClone.splice(i, 1); //bierze pole, które jest w indeksie numer i
        emptySpacesClone.unshift( startingPoint[0] ) //wstawia je na początek sklonowanej tablicy
        solution = solveArray(arrayToCheck, emptySpacesClone); //sprawdza rozwiązanie dla konkretnego wstawiania wartości do tablicy

        possibleSolutions.push(solution.join()); //dodaje rozwiązanie w postaci stringa (metoda join()) do tablicy z możliwymi rozwiązaniami
        if(Array.from(new Set(possibleSolutions)).length > 1) return true; //jeżeli tablica mająca w sobie tylko unikalne wartości z possibleSolutions (new Set) ma więcej niż 1 wartość, zwraca true (czyli że jest kilka rozwiązań)
    }
    return false;
}
function listEmptySpaces(arrayToCheck){ //funkcja tworząca tablice ze wszystkimi pustymi polami tablicy
    listOfEmptySpaces = [];
    for(row = 0; row < 9; row++){
        for(col = 0; col < 9; col++){
            if(arrayToCheck[row][col] === 0) listOfEmptySpaces.push({row, col});
        }
    }
    return listOfEmptySpaces;
}
function solveArray(arrayToCheck, emptySpaces){ //funkcja rozwiązująca tablicę z konkretnymi pustymi wartościami
    const emptySpace = nextEmptySpaceFromArray(arrayToCheck, emptySpaces); //znajdujemy pustę pole
    if(!emptySpace) return arrayToCheck; //jeśli nie znaleziono, zwraca tablice, gdyż oznacza to, że tablica jest już wypełniona
    for(num of shuffleArray(arrayRandom)){ //pętla, w której zmienna num (do wstawiania wartości do tablicy) przybiera wartości z przetasowanej tablicy z liczbami od 1-9
        counter++;
        if(counter > 60000000) throw new Error("Błąd w rekursji"); //jeśli funkcja będzie wykonywana zbyt dużo razy, zwróci błąd
        if(allCheck(arrayToCheck, emptySpace, num)){ //jeśli wszystko się zgadza w kwestii zamieszczenia pola, umieść to wartość w pustę miejsce
            arrayToCheck[emptySpace.rowIndex][emptySpace.colIndex] = num;
            //console.log(arrayToFill[emptySpace.row][emptySpace.column]);
            if(solveArray(arrayToCheck, emptySpaces)) return arrayToCheck; //wykonanie rekursji, funkcja przejdzie do kolejnego pustego pola
            arrayToCheck[emptySpace.rowIndex][emptySpace.colIndex] = 0;
        }
    }
    //jeśli żadna liczba nie pasuje do pustego pola, zwraca false, tym samym cofając pole o 1
    return false;
}
function nextEmptySpaceFromArray(arrayToCheck, emptySpaces){ //funkcja zwracająca pustą wartości z tablicy tylko dla koordynatów z emptySpaces
    for(coords of emptySpaces){
        if(arrayToCheck[coords.row][coords.col] === 0) {
            return {"rowIndex": coords.row, "colIndex": coords.col};
        }
    }
    return false;
}
function startNewGame(holes){ //funkcja rozpoczęcia gry
    try{ //try i catch obługują błędy, jeżeli w którejś funkcji trafi się błąd, zostanie wykonana rzecz w catchu
        counter = 0; //licznik iteracji dla funkcji
        for(i = 0; i < 9; i++){
            for(j = 0; j < 9; j++){
                arrayMain[i][j] = 0; //wyzerowanie głównej wartości
            }
            
        }
        fillArray(arrayMain); //wypełnienie głównej tablicy wartościami
        for(i = 0; i < 9; i++){
            arrayPlayable[i] = new Array(9);
            for(j = 0; j < 9; j++){
                arrayPlayable[i][j] = arrayMain[i][j]; //skopiowanie wartości z głównej tablicy do tablicy dla gracza
            }
            
        }
        
        makeHoles(arrayPlayable, holes) //zrobienie dziur w tablicy dla gracza
    }
    catch(error){
        return startNewGame(holes) //jeśli jakiś błąd się pojawi, spróbuje jeszcze raz zrobić nową grę
    }
}

startNewGame(40);

for(i = 0; i < 9; i++){
    for(j = 0; j < 9; j++){
        main.innerHTML += arrayPlayable[i][j];
    }
    main.innerHTML += "<br>";
}
//console.log(nextEmptySpace(arrayPlayable));
document.getElementById("main").innerHTML += "<br>";


var posX;
var posY;

function test() {
    console.log("test")
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 48 && charCode < 58) {
        return true;
    }
    return false;
}

function createBoard(boardLocation) {
    document.getElementById(boardLocation).innerHTML = "";
    for(let i = 0; i < 9; i++) {
        document.getElementById(boardLocation).innerHTML += '<tr class="boardRow" id="boardRow' + (i) + '"></tr>';
    }
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(arrayPlayable[i][j] == 0){
                document.getElementsByClassName("boardRow")[i].innerHTML += '<td class="empty" onclick="selectField(' + 
                (j) + ',' + (8-i) + ')" class="field' + (j) + '"><input type="text" maxlength="1", onkeypress=" return isNumber(event)""></td>'
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