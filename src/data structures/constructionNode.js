"use strict";

//A ConstructionNode represents how a polytope has been built up
//ConstructionNodes come in types, and can have children
//"Children" are arrays containing objects, the specific objects depend on the node type
//Usually these objects are other nodes, but they can also be numbers or Polytopes.
//Children are essentially what a nodeC operates on
//The types of nodeC and their case number are given below:

//Has a single polytope as a child. (Should it just have the number of facets and dimensions as children?)
//Used for polytopes without a known name.
const POLYTOPE = 0;

//Has the factors of a prism product as children.
const MULTIPRISM = 1;

//Has the factors of a tegum product as children.
const MULTITEGUM = 2;

//Has the factors of a pyramid product as children.
const MULTIPYRAMID = 3;

//Has an antiprism based on the child node.
const ANTIPRISM = 4;

//Has a pyramid based on the child node.
const PYRAMID = 5;

//Has a cupola based on the child node.
const CUPOLA = 6;

//Has two children n, d, representing the regular polygonal small base {n/d}.
const CUPLOID = 7;

//Has two children n, d, representing the regular polygonal base {n/d}.
const CUPBLEND = 8;

//Has two children n, d, representing the regular polygonal base {n/d}.
const POLYGON = 9;

//Has a polytope's name as a child. (Should it also have the polytope as a child?)
//The default for imported polytopes, or polytopes not built out of anything else whose name is known.
const NAME = 10;

function ConstructionNode(type, children) {
	this.type = type;
	this.children = children;
};

ConstructionNode.prototype.getName = function() {
	switch(this.type) {		
		case POLYTOPE:
			var poly = this.children[0];
			return Translation.plain(poly.elementList[poly.elementList.length - 2].length, poly.dimensions);
		case MULTIPRISM:
			this.mergeChildren();
			return Translation.multiFamily(this.children, "prism", "dyad", "prism", this.gender);
		case MULTITEGUM:
			this.mergeChildren();
			return Translation.multiFamily(this.children, "tegum", "dyad", "bipyramid", this.gender);
		case MULTIPYRAMID:
			this.mergeChildren();
			return Translation.multiFamily(this.children, "pyramid", "point", "pyramid", this.gender);
		case ANTIPRISM:
			return Translation.familyMember(this.children[0], "antiprism", this.gender);
		case PYRAMID:
			return Translation.familyMember(this.children[0], "pyramid", this.gender);
		case CUPOLA:		
			return Translation.familyMember(this.children[0], "cupola", this.gender);
		case CUPLOID:		
			return Translation.familyMember(this.children[0], "cuploid", this.gender);
		case CUPBLEND:		
			return Translation.familyMember(this.children[0], "cupolaicBlend", this.gender);
		case POLYGON:
			return Translation.regularPolygonName(this.children[0], this.children[1], 0, this.gender);
		case NAME:
			return Translation.get(this.children[0]);
		default:
			throw new Error("Not yet implemented!");
	}
};

//Sets the gender of the noun representing the polytope type at all children nodes.
//e.g. in Spanish, we'd say "prisma cupoidal pentagrámico cruzado", not 
//"prisma cupoidal pentagrámica cruzada"; even though "cúpula" is femenine,
//the male "prisma" takes over.
ConstructionNode.prototype.setGenders = function() {	
	switch(type) {
		case POLYGON: //The gender of the plain polygon names
		case POLYTOPE: //The gender of the plain polytope names.
		case MULTIPRISM: //The gender of the word "multiprism".
		case ANTIPRISM: //The gender of the word "antiprism".
		case MULTITEGUM: //The gender of the word "multitegum".
			switch(LANGUAGE) {
				case SPANISH: this.gender = MALE; break;
				case GERMAN: this.gender = NEUTER; break;
				default: break;
			}
			break;
		case PYRAMID: //The gender of the word "pyramid".
		case CUPOLA: //The gender of the word "cupola".
			switch(LANGUAGE) {
				case SPANISH:
				case GERMAN: this.gender = FEMALE; break;
				default: break;;
			}
			break;
		case CUPBLEND: //The gender of the word "cupolaic blend".
			switch(LANGUAGE) {
				case SPANISH: this.gender = FEMALE; break;
				default: break;;
			}
			break;
		case CUPLOID: //The gender of the word "cuploid".
			switch(LANGUAGE) {
				case SPANISH: this.gender = MALE; break;
				default: break;
			}
			break;
	}
	
	this._setGenders();
};

ConstructionNode.prototype._setGenders = function() {
	for(var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if(child._setGenders) {
			child.gender = this.gender;
			child._setGenders();
		}
	}
}

//A multiprism of multiprisms is just a larger multiprism, 
//a multitegum of multitegums is just a larger multitegum, etc.
//This function removes children nodes of the same type,
//and replaces them by their children.
ConstructionNode.prototype.mergeChildren = function() {
	var oldLength = this.children.length;
	for(var i = 0; i < oldLength; i++) {
		if(this.children[i].type === this.type) {
			for(var j = 0; j < this.children[i].children.length - 1; j++)
				this.children.push(this.children[i].children.pop());
			this.children[i] = this.children[i].children.pop();
		}
	}
}