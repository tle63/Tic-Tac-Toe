
//Event to start the game on the Start Button
$("#startButton").click( function(){
	
	// Hide the Start Button and show the Restart Button
	$("#startButton").hide()
	$("#restartButton").show()

	// Base varibales to hold the basic information
	let xPlayer = [];
	let oPlayer = [];
	let turn = 0;
	let size = 3;
	let drawCount = 0;

	buildBoard(size);
	
	// Adding events to each cell of the board/table
	$("td").on("click", function () {
		
		if (turn === 0){

			$(this).text("X");
			let returned = clicked(this);
			xPlayer.push(returned);
			xPlayer.push(returned.charAt(0));
			xPlayer.push(returned.charAt(1));
			turn++;
			drawCount++;
			checkWin(xPlayer, "X", drawCount);

		} else {

			$(this).text("O");
			let returned = clicked(this);
			oPlayer.push(returned);
			oPlayer.push(returned.charAt(0));
			oPlayer.push(returned.charAt(1));
			turn = 0;
			drawCount++;
			checkWin(oPlayer, "O", drawCount);
		}
		
	});
});

$("#restartButton").click( function(e){
	window.location.reload();
});

//Function to build the board with the use of a Table
function buildBoard(value){
	
	$("#theBoard").append("<table id='board'></table>");
	
	for(let i = 0; i<value; i++){
		$("#board").append("<tr id='row"+i+"'></tr>");
		
		for(let o = 0; o < value; o++){
			
			let rowId;
			if ( i === 0) {
				rowId = "a"
			} else if ( i === 1){
				rowId = "b"
			} else {
				rowId = "c"
			};

			$("#row"+i).append("<td id ='" + rowId + o + "'></td>");
		};
	};
};

//Function to get id of a tag
function clicked(input) {

	let a = $(input).attr("id");
	return a;
};

//Function to check the winning or draw conditions
function checkWin(arr,player,drawCounter){
	
	let count = {};
	arr.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	let winCheck = Object.values(count);
	
	let crossWin1 = ["a0", "b1", "c2"];
	let crossWin2 = ["a2", "b1", "c0"];

	let win1 = crossWin1.every(i => arr.includes(i));
	let win2 = crossWin2.every(i => arr.includes(i));
	

	if (win1 === true || win2 === true){
		alert( "Player " + player + " Win !");
	}

	for (let i in winCheck ){
		console.log(winCheck)
		if (winCheck[i] === 3 ) {
			alert( "Player " + player + " Win !");
		}
	}

	if ( drawCounter === 9){
		alert("Draw")
	}
	
};