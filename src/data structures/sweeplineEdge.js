"use strict";

//Helper class for renderTo, used in the sweep line for Bentley-Ottmann.
//Encodes an object with properties leftVertex and rightVertexIndex.
//rightVertexIndex should be 0 if leftVertex.node0.value is to the right of leftVertex.value, 1 if leftVertex.node1.value is.
//This format is useful because an edge on the sweep line can only be cut to the right.
//That way, we don't need to modify the SL objects after the division process: only the nodes' connections change.
function SweeplineEdge(leftVertex, rightVertexIndex) {
	this.leftVertex = leftVertex;
	this.rightVertexIndex = rightVertexIndex;
	var rightVertex = this.rightVertex();
	
	//Calculates the slope.
	//This won't change even if the edge gets cut down to zero length, thus making the ordering consistent.
	this.slope = (leftVertex.value.coordinates[SweeplineEdge.indx1] - rightVertex.value.coordinates[SweeplineEdge.indx1])
	/ (leftVertex.value.coordinates[SweeplineEdge.indx0] - rightVertex.value.coordinates[SweeplineEdge.indx0]);
	
	//Gives the edge an immutable ID in terms of its vertices.
	//Uses the redirect table (read below).
	var x = leftVertex.id;
	var y = rightVertex.id;
	var newID = (x + y) * (x + y + 1) / 2 + y;
	this.id = (SweeplineEdge.redirectTable[newID] === undefined ? newID : SweeplineEdge.redirectTable[newID]);
};
		
SweeplineEdge.prototype.rightVertex = function() {
	return this.leftVertex.getNode(this.rightVertexIndex);
};
	
//An edge's ID must be immutable, even if the vertices themselves change, so that sorting can occur consistently.
//At the same time, it needs to be uniquely identified from the vertices, so searches can occur.
//To be able to do both things, I use a "redirect table".
//If the left vertex of an edge changes, I "redirect" the new calculated ID to the old one.
SweeplineEdge.redirectTable = [];

SweeplineEdge.prototype.updateID = function() {
	var x = this.leftVertex.id;
	var y = this.rightVertex().id;
	var newID = (x + y) * (x + y + 1) / 2 + y;
	SweeplineEdge.redirectTable[newID] = this.id;
}	;

//TO DELETE.
//Used for debugging purposes.
SweeplineEdge.prototype.toString = function(){
	return "([" + this.leftVertex.value.coordinates.toString() +"], ["+this.rightVertex().value.coordinates.toString()+"])";
};