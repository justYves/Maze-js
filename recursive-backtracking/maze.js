function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.cells = [];
  this.visited = [];
  this.stepInterval = 0;
  this.showDistance = false;
  this.i = 0;

  //Create the model
  for (var i = 0; i < this.width; i++) {
    this.cells[i] = [];
    for (var j = 0; j < this.height; j++) {
      this.cells[i][j] = new Cell(i, j);
    }
  }
  this.currentCell = this.start = this.cells[0][0];
  this.eachCell(getNeighbor);
}

Maze.prototype.visit = function(cell) {
  cell.visited = true;
};


//HTML ONLY
Maze.prototype.create = function() {
  // create <table> element
  var mazeTable = document.createElement("tbody");
  // build Table HTML
  var tablehtml = '';
  for (var h = 0; h < this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w = 0; w < this.width; w++) {
      tablehtml += "<td id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  mazeTable.innerHTML = tablehtml;

  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(mazeTable);
  this.board = board;
  this.setupBoardEvents();
  this.mapCells();
};

//Event for button
Maze.prototype.setupBoardEvents = function() {
  document.getElementById('step_btn').onclick = this.step.bind(this);
  document.getElementById('clear_btn').onclick = this.clear.bind(this);
  document.getElementById('play_btn').onclick = this.enableAutoPlay.bind(this);
};

//MAP MazeCells to hmtl
Maze.prototype.mapCells = function() {
  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      this.cells[i][j].location = document.getElementById(i + "-" + j);
    }
  }
  this.start.location.classList.add("start");
};

Maze.prototype.step = function() {
  if (!this.completed) {
    this.visit(this.currentCell);
    console.log(this.currentCell.neighors);


    if (neighbors.length > 0) {
      this.visited.push(this.currentCell);
      var i = Math.floor(Math.random() * neighbors.length);

      //Need to bring down the wall;
      var chosenNeighbor = neighbors[i];
      chosenNeighbor.value = this.currentCell.value + 1;
      this.showDistance ? chosenNeighbor.location.innerHTML = "<p>" + chosenNeighbor.value + "</p>" : "";
      this.updateWall(this.currentCell, chosenNeighbor);
      this.currentCell = chosenNeighbor;
    } else {
      this.visit(this.currentCell);
      this.currentCell.location.classList.remove("currentCell");
      this.currentCell = this.visited.pop();
    }
    this.currentCell.location.classList.add("currentCell");
    if (this.visited.length == 0) {
      this.enableAutoPlay();
      // this board = document.getElementsByTagName("td").forEach(function(element){
      //   console.log(element.classList);
      // });
      //
      var all = this.board.getElementsByTagName("td");
      for (var i = 0; i < all.length; i++) {
        all[i].classList.remove("currentCell");
        all[i].classList.remove("visited");
        all[i].classList.remove("revisited");
        this.completed = true;
      }
    }
  }
};

Maze.prototype.updateWall = function(currentCell, nextCell) {
  var path = [currentCell.x - nextCell.x, currentCell.y - nextCell.y];
  if (path[0] === 0) {
    if (path[1] === 1) {
      //UP
      currentCell.location.classList.add("top");
      nextCell.location.classList.add("bottom");
    } else {
      //DOWN
      currentCell.location.classList.add("bottom");
      nextCell.location.classList.add("top");
    }
  } else if (path[0] === 1) {
    //LEFT
    currentCell.location.classList.add("left");
    nextCell.location.classList.add("right");
  } else {
    //RIGHT
    currentCell.location.classList.add("right");
    nextCell.location.classList.add("left");
  }
};

Maze.prototype.play = function() {
  this.isPlaying = true;
  var playButton = document.getElementById('play_btn');
  playButton.textContent = 'Pause';
  playButton.classList.add('btn-danger');
  playButton.classList.remove('btn-primary');
  this.step();
  this.intervalId = setInterval(this.step.bind(this), this.stepInterval);
};

Maze.prototype.clear = function() {
  maze = new Maze(60, 30);
  maze.create();
  maze.mapCells();
}

Maze.prototype.pause = function() {
  this.isPlaying = false;
  var playButton = document.getElementById('play_btn');
  playButton.textContent = 'Play';
  playButton.classList.remove('btn-danger');
  playButton.classList.add('btn-primary');
  clearInterval(this.intervalId);
};

Maze.prototype.enableAutoPlay = function() {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval

  if (this.isPlaying) {
    this.pause();
  } else {
    this.play();
  }
};

function Cell(x, y) {
  this.border = [1, 1, 1, 1];
  this.x = x;
  this.y = y;
  this.neighbors = [];
  this.value = 0;
  this.visited = false;
}

var getNeighbor = function(cell) {
          console.log("called");
  console.log(cell);
  for (var x = cell.x - 1; x <= cell.x + 1; x++) {
    for (var y = cell.y - 1; y <= cell.y + 1; y++) {
      if ((cell.x == x || cell.y == y) && (!(cell.x == x && cell.y == y))) {
        var n = this.getCell(x, y);
        if (n) {
          cell.neighbors.push(n);
        }
      }
    }
  }
};

Maze.prototype.eachCell = function(iteratorFunc) {

  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      iteratorFunc.bind(this,this.cells[i][j]);
    }
  }
};

Maze.prototype.getCell = function(x, y) {
  if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    return this.cells[x][y];
  }
  return false;
};

maze = new Maze(40, 40);
maze.create();