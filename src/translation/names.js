"use strict";

//The part of the Translation class that gives translated names for families.

//-, one, two, three, four, five, six, seven, eight, nine, to Greek, back to each language.
Translation._units = [
["", "hen", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "ennea"], //English
["", "hen", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "enea"], //Spanish
["", "hen", "di", "tri", "tetra", "penta", "hexa", "hepta", "okto", "ennea"] //German
];

//ten, tenfold, twenty, twenty-, hundredfold, thousandfold, ten-thousandfold, to Greek, back to each language.
Translation._joiners = [
["deca", "conta", "icosa", "icosi", "hecto", "chilia", "myria"], //English
["deca", "conta", "icosa", "icosi", "hecta", "chilia", "miria"], //Spanish
["deka", "conta", "ikosa", "ikosi", "hekto", "chilia", "myria"] //German
];

//Converts n into a greek prefix.
//Works only from 0 to 99999.
//Based on https://www.georgehart.com/virtual-polyhedra/greek-prefixes.html
//Defaults to n-.
Translation.greekPrefix = function(n, options) {	
	if(n === 0) {
		switch(LANGUAGE) {
			case ENGLISH:
			case GERMAN:
				if(options & UPPERCASE)
					return "Nulli";
				return "nulli";
			case SPANISH:
				if(options & UPPERCASE)
					return "Nuli";
				return "nuli";
		}
	}
	
	if(n === 1) {		
		if(options & UPPERCASE)
			return "Mono";
		return "mono";
	}
	
	if(n >= 100000)
		return n + "-";
	
	var res = "";
	var units = n % 10; n = Math.floor(n / 10);
	var tens = n % 10; n = Math.floor(n / 10);
	var hundreds = n % 10; n = Math.floor(n / 10);
	var thousands = n % 10; n = Math.floor(n / 10);
	var tenThousands = n % 10;
	
	switch(tenThousands) {
		case 0:
			break;
		case 1:
			res += Translation._joiners[LANGUAGE][6];
			break;
		default:
			res += Translation._units[LANGUAGE][tenThousands] + Translation._joiners[LANGUAGE][6];
			break;
	}
	
	switch(thousands) {
		case 0:
			break;
		case 1:
			res += Translation._joiners[LANGUAGE][5];
			break;
		default:
			res += Translation._units[LANGUAGE][thousands] + Translation._joiners[LANGUAGE][5];
			break;
	}
	
	switch(hundreds) {
		case 0:
			break;
		case 1:
			res += Translation._joiners[LANGUAGE][4];
			break;
		default:
			res += Translation._units[LANGUAGE][hundreds] + Translation._joiners[LANGUAGE][4];
			break;
	}
	
	switch(tens) {
		case 0:
			res += Translation._units[LANGUAGE][units];
			break;
		case 1:
			switch(units) {
				case 0:
					res += Translation._joiners[LANGUAGE][0];
					break;
				case 2:
					res += "do" + Translation._joiners[LANGUAGE][0];
					break;
				default:
					res += Translation._units[LANGUAGE][units] + Translation._joiners[LANGUAGE][0];
					break;
			}
			break;
		case 2:
			if(units)
				res += Translation._joiners[LANGUAGE][2] + Translation._units[LANGUAGE][units];
			else
				res += Translation._joiners[LANGUAGE][1];			
			break;
		default:
			res += Translation._units[LANGUAGE][tens] + Translation._joiners[LANGUAGE][1] + Translation._units[LANGUAGE][units];
			break;
	}
	
	if(options & UPPERCASE)		
		return Translation.firstToUpper(res);
	return res;
};

//The name for an d-element, according to http://os2fan2.com/gloss/pglosstu.html
//Works for up to 20 dimensions, we very probably don't need more than that.
Translation.elementName = function(d, options) {
	var res;
	switch(LANGUAGE) {
		case ENGLISH:
			switch(d) {
				case 0:
					if(options & PLURAL) res = "vertices"; else res = "vertex"; break;
				case 1:
					if(options & PLURAL) res = "edges"; else res = "edge"; break;
				case 2:
					if(options & PLURAL) res = "faces"; else res = "face"; break;
				case 3:
					if(options & PLURAL) res = "cells"; else res = "cell"; break;
				case 4:
					if(options & PLURAL) res = "tera"; else res = "teron"; break;
				case 5:
					if(options & PLURAL) res = "peta"; else res = "peton"; break;
				case 6:
					if(options & PLURAL) res = "exa"; else res = "exon"; break;
				case 7:
					if(options & PLURAL) res = "zetta"; else res = "zetton"; break;
				case 8:
					if(options & PLURAL) res = "yotta"; else res = "yotton"; break;
				case 9:
					if(options & PLURAL) res = "xenna"; else res = "xennon"; break;
				case 10:
					if(options & PLURAL) res = "daka"; else res = "dakon"; break;
				case 11:
					if(options & PLURAL) res = "hendaka"; else res = "hendakon"; break;
				case 12:
					if(options & PLURAL) res = "doka"; else res = "dokon"; break;
				case 13:
					if(options & PLURAL) res = "tradaka"; else res = "tradakon"; break;
				case 14:
					if(options & PLURAL) res = "teradaka"; else res = "teradakon"; break;
				case 15:
					if(options & PLURAL) res = "petadaka"; else res = "petadakon"; break;
				case 16:
					if(options & PLURAL) res = "exdaka"; else res = "exdakon"; break;
				case 17:
					if(options & PLURAL) res = "zettadaka"; else res = "zettadakon"; break;
				case 18:
					if(options & PLURAL) res = "yottadaka"; else res = "yottadakon"; break;
				case 19:
					if(options & PLURAL) res = "xendaka"; else res = "xendakon"; break;
				case 20:
					if(options & PLURAL) res = "ica"; else res = "icon"; break;
				default:
					if(options & PLURAL) res = d + "-elements"; else res = d + "-element"; break;
			}
			
			break;
		case SPANISH:
			switch(d) {
				case 0:
					res = "vértice"; break;
				case 1:
					res = "arista"; break;
				case 2:
					res = "cara"; break;
				case 3:
					res = "celda"; break;
				case 4:
					res = "tera"; break;
				case 5:
					res = "peta"; break;
				case 6:
					res = "exa"; break;
				case 7:
					res = "zeta"; break;
				case 8:
					res = "yota"; break;
				case 9:
					res = "xena"; break;
				case 10:
					res = "daca"; break;
				case 11:
					res = "hendaca"; break;
				case 12:
					res = "doca"; break;
				case 13:
					res = "tradaca"; break;
				case 14:
					res = "teradaca"; break;
				case 15:
					res = "petadaca"; break;
				case 16:
					res = "exadaca"; break;
				case 17:
					res = "zettadaca"; break;
				case 18:
					res = "yottadaca"; break;
				case 19:
					res = "xendaca"; break;
				case 20:
					res = "ica"; break;
				default:
					res = d + "-elemento"; break;
			}
			
			if(options & PLURAL)
				res += "s";
			break;
		case GERMAN:
			switch(d) {
				case 0:
					if(options & PLURAL) res = "Eck"; else res = "Ecke"; break;
				case 1:
					if(options & PLURAL) res = "Kante"; else res = "Kanten"; break;
				case 2:
					if(options & PLURAL) res = "Fläche"; else res = "Flächen"; break;
				case 3:
					if(options & PLURAL) res = "Zell"; else res = "Zellen"; break;
				case 4:
					if(options & PLURAL) res = "Tera"; else res = "Teras"; break;
				case 5:
					res = "Peta"; break;
				case 6:
					res = "Exa"; break;
				case 7:
					res = "Zetta"; break;
				case 8:
					res = "Yotta"; break;
				case 9:
					res = "Xena"; break;
				case 10:
					res = "Daka"; break;
				case 11:
					res = "Hendaka"; break;
				case 12:
					res = "Doka"; break;
				case 13:
					res = "Tradaka"; break;
				case 14:
					res = "Teradaka"; break;
				case 15:
					res = "Petadaka"; break;
				case 16:
					res = "Exadaka"; break;
				case 17:
					res = "Zettadaka"; break;
				case 18:
					res = "Yottadaka"; break;
				case 19:
					res = "Xendaka"; break;
				case 20:
					res = "Ika"; break;
				default:
					res = d + "-Element"; break;
			}
			
			if(options & PLURAL)
				res += "s";
			break;
	}	
	
	if(options & UPPERCASE)		
		return Translation.firstToUpper(res);
	return res;
};

//The ending in the name for a d-polytope.
Translation.polytopeEnding = function(d, options) {
	var res = "";
	switch(LANGUAGE) {
		case ENGLISH:
			switch(d) {
				case 1:
					if(options & PLURAL) res = "tela"; else res = "telon"; break;
				case 2:
					if(options & PLURAL) res = "gons"; else res = "gon"; break;
				case 3:
					if(options & PLURAL) res = "hedra"; else res = "hedron"; break;
				case 4:
					if(options & PLURAL) res = "chora"; else res = "choron"; break;
				default:
					if(d > 20)
						return n + "-polytope" + (options & PLURAL ? "s" : "");
					return Translation.elementName(d - 1, options);
			}
			
			break;
		case SPANISH:
			switch(d) {
				case 1:
					res = "telo"; break;
				case 2:
					res = "gono"; break;
				case 3:
					res = "edro"; break;
				case 4:
					res = "coro"; break;
				default:
					if(d > 20)
						res = n + "-politopo";
					else
						res = Translation.elementName(d - 1, options);
					break;
			}
			
			if(options & PLURAL)
				res += "s";
			break;
		case GERMAN:
			switch(d) {
				case 1:
					if(options & PLURAL) res = "tela"; else res = "telon"; break;
				case 2:
					if(options & PLURAL) res = "gone"; else res = "gon"; break;
				case 3:
					res = "eder"; break;
				case 4:
					if(options & PLURAL) res = "chora"; else res = "choron"; break;
				default:
					if(d > 20)
						return n + "-polytop" + (options & PLURAL ? "en" : "");
					return Translation.elementName(d - 1, options);
			}
			
			break;
	}
	
	if(options & UPPERCASE)		
		return Translation.firstToUpper(res);
	return res;
};

//A plain name for the polytope is simply [greek facet count prefix] [greek dimension Ending].
Translation.plain = function(n, dimension, options) {
	switch(LANGUAGE) {
		case ENGLISH:
			return Translation.greekPrefix(n, options & UPPERCASE) + Translation.polytopeEnding(dimension, options & PLURAL);
		case GERMAN:		
			return Translation.greekPrefix(n, UPPERCASE) + Translation.polytopeEnding(dimension, options & PLURAL);
		case SPANISH:
			if(dimension === 2) //"Pentágono" en vez de "pentagono".
				return Translation._lastVowelTilde(Translation.greekPrefix(n, options & UPPERCASE)) + "gono" + (options & PLURAL ? "s" : "");
			return Translation.greekPrefix(n, options & UPPERCASE) + Translation.polytopeEnding(dimension, options & PLURAL);
		default:
			return n;
	}
};

//Converts a nodeC into its the corresponding member of the specified family's name.
Translation.familyMember = function(node, family, gender) {
	var name = node.getName();
	switch(LANGUAGE) {
		case ENGLISH:
			return Translation.toAdjective(name) + " " + Translation.get(family);
		case SPANISH:
			return Translation.get(family) + " " + Translation.toAdjective(name, gender);
		case GERMAN:
			return Translation.toAdjective(name, gender) + " " + Translation.get(family);
		default:
			return name;
	}
};

//Converts a set of nodeCs into their prism product/tegum product/pyramid product's name.
//The family is which product is used ("prism", "tegum", "pyramid").
//specialFactor is an element that, when in the product, is considered differently.
//specialFactorModify specifies what this element becomes into within the product.
//e.g. for a multiprism, specialFactor = "dyad", specialFactorModify = "prism".
//For a multipyramid, specialFactor = "point", specialFactorModify = "pyramid".
Translation.multiFamily = function(nodes, family, specialFactor, specialFactorModify, gender) {
	var names = [], 
	FAMILY = Translation.get(family),
	FAMILYADJ = Translation.toAdjective(FAMILY, gender),
	SPECIAL = Translation.get(specialFactor),	
	SPECIALMOD = Translation.get(specialFactorModify), 
	SPECIALMODADJ = Translation.toAdjective(SPECIALMOD, gender),
	specialCount = 0, 
	tempName, concatName, allNamesSame = true;
	
	//Counts special factors.
	for(var i = 0; i < nodes.length; i++) {
		tempName = nodes[i].getName();
		if(tempName === SPECIAL)
			specialCount++;
		else 
			names.push(tempName);
	}
	
	var prefix; //The prefix before [family], e.g. *duo*[family], *trio*[family], ...
	switch(names.length) {
		//All special factors.
		case 0:
			names.push(SPECIAL);
			specialCount--;
			/*prefix = ""; //Fun fact: this code works the same
			break; //without these two lines!*/
		case 1:
			prefix = ""; break;
		case 2:
			prefix = "duo"; break;
		default:
			prefix = Translation.greekPrefix(names.length);	break;
	}
	
	switch(LANGUAGE) {
		case ENGLISH:
			tempName = names.pop();
			concatName = Translation.toAdjective(tempName);
			
			while(names.length > 0) {
				concatName += "-" + Translation.toAdjective(names[names.length - 1]);
				if(names.pop() !== tempName)
					allNamesSame = false;
			}
			
			if(!specialCount) {				
				//X multi[family]
				if(allNamesSame)
					return Translation.toAdjective(tempName)+ " " + prefix + FAMILY;
				
				//X-Y-Z multi[family]
				return concatName + " " + prefix + FAMILY;
			}
			
			//Same as before, but adds as many ...[family-adj] [family]	as needed at the end.
			if(allNamesSame)
				concatName = Translation.toAdjective(tempName) + " ";
			else
				concatName += " ";
			
			//We aren't calling a single polytope X an "X mono[family]", are we?
			if(prefix)
				concatName += prefix + FAMILYADJ + " ";
			
			while(--specialCount)
				concatName += SPECIALMODADJ + " ";
			return concatName + SPECIALMOD;
		case SPANISH:
			tempName = names.pop();
			concatName = Translation.toAdjective(tempName, gender);
			
			while(names.length > 0) {
				concatName += "-" + Translation.toAdjective(names[names.length - 1], gender);
				if(names.pop() !== tempName)
					allNamesSame = false;
			}
			
			if(!specialCount) {
				//Multi[familia] X
				if(allNamesSame)
					return prefix + FAMILY + " " + Translation.toAdjective(tempName, gender);
				
				//Multi[familia] X-Y-Z
				return prefix + FAMILY + " " + concatName;
			}
			
			//Igual que antes, pero con tantos [familia] [familia-adj]... como se requieran al inicio.
			if(allNamesSame)
				concatName = Translation.toAdjective(tempName, gender);
			
			//No estamos llamando a un politopo X un "mono[familia] X", ¿o sí?
			if(prefix)
				concatName = prefix + FAMILYADJ + " " + concatName;
			
			while(--specialCount)
				concatName = SPECIALMODADJ + " " + concatName;
			return SPECIALMOD + " " + concatName;
	}
};

//Spanish helper function.
//Adds a tilde to the last vowel of a word.
//E.g. penta -> pentá
Translation._lastVowelTilde = function(str) {
	for(var i = str.length - 1; i >= 0; i--) {
		switch(str.charAt(i)) {
			case "a":
				return Translation._replaceAt(str, i, "á");
			case "e":
				return Translation._replaceAt(str, i, "é");
			case "i":
				return Translation._replaceAt(str, i, "í");
			case "o":
				return Translation._replaceAt(str, i, "ó");
			case "u":
				return Translation._replaceAt(str, i, "ú");
		}
	}
	
	throw new Error("No vowel to replace!");
};

//https://stackoverflow.com/a/1431113
Translation._replaceAt = function(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

//Gives a name for {n / d}.
//For polygons with up to five non-compound stellations, uses the [small/-/medial/great/grand] n-gram naming scheme.
//For everything else, uses d-strophic n-gon.
Translation.regularPolygonName = function(n, d, options, gender) {
	if(d === undefined)
		d = 1;
	//"Crossed" polygons, as in the crossed pentagrammic antiprism.
	else if(d > n / 2) {
		switch(LANGUAGE) {
			case ENGLISH:
				if(options & UPPERCASE)
					return "Crossed " + Translation.regularPolygonName(n, n - d, options & PLURAL);
				return "crossed " + Translation.regularPolygonName(n, n - d, options & PLURAL);
			case SPANISH:
				return Translation.regularPolygonName(n, n - d, options) + " cruzad" + (gender === MALE ? "o" : "a") + (options & PLURAL ? "s" : "");
		}
	}
	
	//THIS CODE IS CURSED AND SHOULD PROBABLY BE REPLACED REGARDLESS OF WHATEVER EXPLANATION I GAVE BELOW.
	var res;
	//I just need a quick to calculate function on n and d
	//to distinguish the stars with up to 42 sides.
	//I could just use the Euler totient function to give names without this enormous switch,
	//but this is ever so slightly faster so whatever.
	switch(64 * n + d) {
		case 193:
			return Translation.get("triangle", options);
		case 257:
			return Translation.get("square", options);
		case 322:
			res = Translation._starName(NONE, 5); break;
		case 386:
			res = Translation._starName(NONE, 6); break;
		case 450:
			res = Translation._starName(NONE, 7); break;
		case 451:
			res = Translation._starName(GREAT, 7); break;
		case 515:
			res = Translation._starName(NONE, 8); break;
		case 578:
			res = Translation._starName(NONE, 9); break;
		case 580:
			res = Translation._starName(GREAT, 5); break;
		case 643:
			res = Translation._starName(NONE, 10); break;
		case 706:
			res = Translation._starName(SMALL, 11); break;
		case 707:
			res = Translation._starName(NONE, 11); break;
		case 708:
			res = Translation._starName(GREAT, 11); break;
		case 709:
			res = Translation._starName(GRAND, 11); break;
		case 773:
			res = Translation._starName(NONE, 12); break;
		case 834:
			res = Translation._starName(SMALL, 13); break;
		case 835:
			res = Translation._starName(NONE, 13); break;
		case 836:
			res = Translation._starName(MEDIAL, 13); break;
		case 837:
			res = Translation._starName(GREAT, 13); break;
		case 838:
			res = Translation._starName(GRAND, 13); break;
		case 899:
			res = Translation._starName(NONE, 14); break;
		case 901:
			res = Translation._starName(GREAT, 14); break;
		case 962:
			res = Translation._starName(SMALL, 15); break;
		case 964:
			res = Translation._starName(NONE, 15); break;
		case 967:
			res = Translation._starName(GREAT, 15); break;
		case 1027:
			res = Translation._starName(SMALL, 16); break;
		case 1029:
			res = Translation._starName(NONE, 16); break;
		case 1031:
			res = Translation._starName(GREAT, 16); break;
		case 1157:
			res = Translation._starName(NONE, 18); break;
		case 1159:
			res = Translation._starName(GREAT, 18); break;
		case 1283:
			res = Translation._starName(SMALL, 20); break;
		case 1287:
			res = Translation._starName(NONE, 20); break;
		case 1289:
			res = Translation._starName(GREAT, 20); break;
		case 1346:
			res = Translation._starName(SMALL, 21); break;
		case 1348:
			res = Translation._starName(NONE, 21); break;
		case 1349:
			res = Translation._starName(MEDIAL, 21); break;
		case 1352:
			res = Translation._starName(GREAT, 21); break;
		case 1354:
			res = Translation._starName(GRAND, 21); break
		case 1411:
			res = Translation._starName(SMALL, 22); break;
		case 1413:
			res = Translation._starName(NONE, 22); break;					
		case 1415:
			res = Translation._starName(GREAT, 22); break;
		case 1417:
			res = Translation._starName(GRAND, 22); break;
		case 1541:
			res = Translation._starName(SMALL, 24); break;
		case 1543:
			res = Translation._starName(NONE, 24); break;
		case 1547:
			res = Translation._starName(GREAT, 24); break;
		case 1667:
			res = Translation._starName(SMALL, 26); break;
		case 1669:
			res = Translation._starName(NONE, 26); break;
		case 1671:
			res = Translation._starName(MEDIAL, 26); break;
		case 1673:
			res = Translation._starName(GREAT, 26); break;
		case 1675:
			res = Translation._starName(GRAND, 26); break;
		case 1795:
			res = Translation._starName(SMALL, 28); break;
		case 1797:
			res = Translation._starName(NONE, 28); break;
		case 1801:
			res = Translation._starName(MEDIAL, 28); break;
		case 1803:
			res = Translation._starName(GREAT, 28); break;
		case 1805:
			res = Translation._starName(GRAND, 28); break;
		case 1927:
			res = Translation._starName(SMALL, 30); break;
		case 1931:
			res = Translation._starName(NONE, 30); break;
		case 1933:
			res = Translation._starName(GREAT, 30); break;
		case 2309:
			res = Translation._starName(SMALL, 36); break;
		case 2311:
			res = Translation._starName(NONE, 36); break;
		case 2315:
			res = Translation._starName(MEDIAL, 36); break;
		case 2317:
			res = Translation._starName(GREAT, 36); break;
		case 2321:
			res = Translation._starName(GRAND, 36); break;
		case 2693:
			res = Translation._starName(SMALL, 42); break;
		case 2699:
			res = Translation._starName(NONE, 42); break;
		case 2701:
			res = Translation._starName(MEDIAL, 42); break;
		case 2705:
			res = Translation._starName(GREAT, 42); break;
		case 2707:
			res = Translation._starName(GRAND, 42); break;
		default:
			if(d === 1)
				return Translation.plain(n, 2, options);
			
			switch(LANGUAGE) {
				case ENGLISH:
					res = Translation.greekPrefix(d) + "strophic " + Translation.greekPrefix(n) + "gram"; break;
				case SPANISH:
					res = Translation.greekPrefix(n) + "grama " + Translation.greekPrefix(d) + "estrófic" + (gender === MALE ? "o" : "a"); break;
				case GERMAN: //Todo: conjugate strophisch.
					res = Translation.firstToUpper(Translation.greekPrefix(d)) + "strophisches " + Translation.greekPrefix(n, UPPERCASE) + "gramm"; break;
			}
	}
	
	//Adds plural and uppercase.
	//The plurals aren't always like this in the languages below, but they work for all polygon names.
	if(options & PLURAL) {
		switch(LANGUAGE) {
			case ENGLISH:
			case SPANISH:
				res += "s"; break;
			case GERMAN:
				res += "e"; break;
		}
	}
	if(options & UPPERCASE)
		return Translation.firstToUpper(res);
	return res;
};

Translation._starModifiers = [
	["small", "medial", "great", "grand"], //English
	["pequeño", "mediano", "grande", "mayor"], //Spanish
	["Kleines", "Mittel", "Großes", "Größtes"] //German THE LAST ONE IS PROBABLY WRONG
];

//Helper function for regularPolygonName.
//Is the one actually giving the names.
Translation._starName = function(mod, n) {
	if(mod === NONE) {
		switch(LANGUAGE) {
			case ENGLISH:
				return Translation.greekPrefix(n) + "gram";
			case GERMAN:
				return Translation.firstToUpper(Translation.greekPrefix(n)) + "gramm";
			case SPANISH:
				return Translation.greekPrefix(n) + "grama";
		}
	}
	
	switch(LANGUAGE) {
		case ENGLISH:
			return Translation._starModifiers[LANGUAGE][mod] + " " + Translation.greekPrefix(n) + "gram";
		case GERMAN:
			return Translation._starModifiers[LANGUAGE][mod] + " " + Translation.firstToUpper(Translation.greekPrefix(n)) + "gramm";
		case SPANISH:
			return Translation.greekPrefix(n) + "grama" + " " + Translation._starModifiers[LANGUAGE][mod];
	}
};
