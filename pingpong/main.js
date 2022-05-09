let add1 = document.getElementById('player1increment');
let add2 = document.getElementById('player2increment');
let player1input = document.getElementById('player1input');
let player2input = document.getElementById('player2input');
let terminate = document.getElementById('terminate');

let player1score = document.getElementById('player1score');
let player2score = document.getElementById('player2score');
let score1 = 0;
let score2 = 0;
let player1;
let player2;
let count = 1;
let player1turn = true;

let leaderboard = new Map();
let cumulativePoints = new Map();

map = new Map(JSON.parse(localStorage.myMap));
CumPoints = new Map(JSON.parse(localStorage.myCpoints));
leaderboard = map;
console.log(CumPoints);
cumulativePoints = CumPoints;
updateLeaderboard();

add1.addEventListener('click', function() {
    count += 1;
    score1 += 1;
    if (player1turn) {
        document.getElementById("turn1").innerHTML = "Your Turn";
        document.getElementById("turn2").innerHTML = "";
        if (count == 2) {
            player1turn = false;
            count = 0;
        }
    } else {
        document.getElementById("turn2").innerHTML = "Your Turn";
        document.getElementById("turn1").innerHTML = "";
        if (count == 2) {
            player1turn = true;
            count = 0;
        }
    }
    if (score1 > 10 && (score1 - score2) >= 2) {
        alert(player1 + " wins!");
        
        if (leaderboard.get(player1) == undefined) {
            leaderboard.set(player1, 1);
            cumulativePoints.set(player1, score1);
        } else {
            leaderboard.set(player1, leaderboard.get(player1) + 1);
            cumulativePoints.set(player1, cumulativePoints.get(player1) + score1);
        }
        score1 = 0;
        score2 = 0;
        updateLeaderboard();
    }
    player1score.innerHTML = score1;
    player2score.innerHTML = score2;
})

add2.addEventListener('click', function() {
    score2 += 1;
    count += 1;
    if (player1turn) {
        document.getElementById("turn1").innerHTML = "Your Turn";
        document.getElementById("turn2").innerHTML = "";
        if (count == 2) {
            player1turn = false;
            count = 0;
        }
        document.getElementById("turn2").innerHTML = "Your Turn";
        document.getElementById("turn1").innerHTML = "";
        if (count == 2) {
            player1turn = true;
            count = 0;
        }
    }
    if (score2 > 10 && (score2 - score1) >= 2) {
        alert(player2 + "wins!");
        
        if (leaderboard.get(player2) == undefined) {
            leaderboard.set(player2, 1);
            cumulativePoints.set(player2, score2);
        } else {
            leaderboard.set(player2, leaderboard.get(player2) + 1);
            cumulativePoints.set(player2, cumulativePoints.get(player2) + score2);
        }
        score2 = 0;
        score1 = 0;
        updateLeaderboard();
    }
    player2score.innerHTML = score2;
    player1score.innerHTML = score1;
})

player1input.addEventListener('click', function(e) {
    e.preventDefault();
    player1 = document.getElementById('player1name').value;
    document.getElementById('player1title').innerHTML = player1;
})

player2input.addEventListener('click', function(e) {
    e.preventDefault();
    player2 = document.getElementById('player2name').value;
    document.getElementById('player2title').innerHTML = player2;
})

terminate.addEventListener('click', function(e) {
    e.preventDefault();
    score1 = 0;
    score2 = 0;
    count = 0;
    player1turn = true;
    player1score.innerHTML = score1;
    player2score.innerHTML = score1;
    document.getElementById("turn1").innerHTML = "Your Turn";
    document.getElementById("turn2").innerHTML = "";
})

function updateLeaderboard() {
    console.log(cumulativePoints);
    localStorage.myMap = JSON.stringify(Array.from(leaderboard.entries()));
    localStorage.myCpoints = JSON.stringify(Array.from(cumulativePoints.entries()));
    let output = [];
    for (let [key, value] of leaderboard) {
        output.push({name: key, wins: value, score: cumulativePoints.get(key)})
    }
    output.sort((a, b) => {
        if(a.wins == b.wins) {
            return a.score - b.score;
        } else {
            return b.wins - a.wins;
        }
    })
    let board = document.getElementById('leaderboard');
    board.innerHTML = "";
    for (let element of output) {
        let score = document.createElement('div');
        score.innerHTML = "Wins: " + element.wins;
        let player = document.createElement('h3');
        player.innerHTML = element.name;
        let cPoints = document.createElement('div');
        cPoints.innerHTML = "Cumulative Points: " + element.score;
        let wholePlayer = document.createElement('div')
        wholePlayer.appendChild(player);
        wholePlayer.appendChild(score);
        wholePlayer.appendChild(cPoints);
        board.appendChild(wholePlayer);
    }
}

