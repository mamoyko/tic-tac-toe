// JavaScript Document

let turn = 'X';
let gameSize = 0;
let winCondition;
let total_turns = 0;
let finished = false;


let selections = new Array(); 
	selections['X'] = new Array();
	selections['Y'] = new Array();

let scores = new Array(); 
  scores['X'] = 0;
  scores['Y'] = 0;

const generateGame = () => {
  resetParams();
  gameSize = Number($("#gameSize").val());
  $("#game-board").html('');

  const size = gameSize * gameSize;
  const arr = [];
  for (let i = 1; i <= size; i++){
    arr.push(i)
  }
  $("#game-board").append(createTable(arr, gameSize));

};

const createTable = (arr, size) => {
  let tbl = document.createElement("div");
  let tbody = tbl.appendChild(document.createElement("div"));
  for (let y = 0; y < size; y++) {
    let tr = tbody.appendChild(document.createElement("div"));
    tr.setAttribute("class", "grid-box-container")
    for (let x = 0; x < size; x++) {
      let td = tr.appendChild(document.createElement("div"));
        td.setAttribute("class", "btn grid-box")
        td.setAttribute("value", ' ')
        td.setAttribute("onclick", "markCheck(this)");
        td.setAttribute("id", arr[x + y * size] - 1);
        td.innerHTML = "+"
    }
  }
  return tbl;
}

const markCheck = (obj) => {
	obj.value = turn;
	total_turns++;
  obj.innerHTML = turn;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
	} else {
		obj.setAttribute("class", 'red-player');
	}

  obj.style.pointerEvents = "none";
	selections[turn].push(Number(obj.id));
	checkWinner();
	changeTurn();
}

const checkWinner = () => {

	let selected = selections[turn].sort();
	let win_patterns = winnerPatterns();

	finished = false;

	for (let x=0; x < win_patterns.length; x++) {
		
		if (finished != true) { 
			finished = isWinner(win_patterns[x], selections[turn]);
			if ( finished === true ) {
				
				// Updating score card
				scoreUpdate(turn);

				// On winning disabled all boxes
				disableAllBoxes();
				// alert('Player '+turn+' Won !!');
        alert(`Player ${turn} ${Won} !!`)
				break;
			}
		}
	}

	// If no one wins; declare DRAW
	if ( ( total_turns == (gameSize*gameSize) ) && finished === false ) { 
		alert(`Game Draw!`);
		finished = true;
		disableAllBoxes(); 
	}
}

const isWinner = (win_pattern, selections) => {
	let match = 0;

	for (let x = 0; x < win_pattern.length; x++) {
		for (let y = 0; y < selections.length; y++) {
			if (win_pattern[x] == selections[y]) {
				match++;
			}
		}
	}

	if (match == win_pattern.length) return true;

	return false;
}

const changeTurn = () => {
	if (turn == 'X') turn = 'Y';
	else turn = 'X';
};

const winnerPatterns = () => {
  let size = parseInt(gameSize);
    let totalSq = size * size;
    let numOfArr = size * 2;
    let wArr = new Array(numOfArr);
    let strD1 = "";
    let strD2 = "";

    for (let j = 0; j < size; j++) {
        strH = "";
        strV = "";
        for (let i = 0; i < totalSq; i++) {
            if (i / size == j) {
                strH += i + ",";
                for (let k = 1; k < size; k++) {
                    strH += i + k + ",";
                }
            }
            if (i % size == j) {
                strV += i + ",";
            }
        }
        strH = strH.substring(0, strH.length - 1);
        strV = strV.substring(0, strV.length - 1);
        let h = strH.split(",");
        let v = strV.split(",");

        wArr[j] = v;
        wArr[j + size] = h;
        strD1 += j * (size + 1) + ",";
        strD2 += (j + 1) * (size - 1) + ",";
    }
    strD1 = strD1.substring(0, strD1.length - 1);
    strD1 = strD1.split(",");
    wArr.push(strD1);

    strD2 = strD2.substring(0, strD2.length - 1);
    strD2 = strD2.split(",");
    wArr.push(strD2);
    winCondition = wArr;
    return winCondition;
};

const resetParams = () => {
	turn = 'X';
	total_turns = 0;
	robot = true;
	finished = false;
  gameSize = 0;

	selections['X'] = new Array();
	selections['Y'] = new Array();
  $('#play-game-btn').text("Play Game")
};

const scoreUpdate = (turn) => {
	scores[turn]++;
	document.getElementById('score-'+turn).innerHTML = scores[turn];
}

const disableAllBoxes = () => {
	let elements = document.getElementsByClassName("grid-box");
	for (let i = 0; i < elements.length; i++) {
    elements[i].style.pointerEvents = "none";
	}
  $('#play-game-btn').text("Reset Game")
}

