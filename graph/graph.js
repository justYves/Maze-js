var Graph = function(){
  this.nodeList = [];
  this.edges
};


var Node = function(name){
  this.edgeList = [];
  this.name = name;
};

Array.prototype.contains = function(name){
  var i = this.length;
  while(i--){
    if (this[i].name === name){
      return this[i];
    }
    return false;
  }
};

Node.prototype.addEdge = function(end){
  this.edgeList.push(end);
};


Graph.prototype.addEdge = function(start,end) {
  var first = this.nodeList.contains(start);
  var second = this.nodeList.contains(end);

  if(!first){
    first = new Node(start);
    this.nodeList.push(first);
  }

  if(!second){
    second = new Node(end);
    this.nodeList.push(second);
  }
    first.addEdge(second);
    second.addEdge(first);
};

Graph.prototype.printNodes = function() {
  this.nodeList.forEach(function(node){
    console.log(node.name + ":");
    console.log(node.edgeList);
  });
};



