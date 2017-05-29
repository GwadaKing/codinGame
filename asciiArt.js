var posLettreList= {"A":0,"B":4,"C":8,"D":12,"E":16,"F":20,"G":24,
                    "H":28,"I":32,"J":36,"K":40,"L":44,"M":48,"N":52,"O":56,"P":60,
                    "Q":64,"R":68,"S":72,"T":76,"U":80,"V":84,"W":88,"X":92,"Y":96,"Z":100};
var L = parseInt(readline());
var H = parseInt(readline());
var TE = readline();
var rowArr=[];
var newArr=[];
for (var i = 0; i < H; i++) {
    var ROW = readline();
    rowArr.push(ROW);
}

// itère sur chaque caractère de la chaine donnée TE
for (var x=0;x<TE.length;x++) {
    var charByChar=TE.substring(x,x+1).toUpperCase();
    for (var a=0;a<rowArr.length;a++) {
        if (charByChar==="@") { charByChar="A"; }
        var lettre=rowArr[a].substring(posLettreList[charByChar] , posLettreList[charByChar]+4);
        newArr.concat(lettre);
        print(lettre);
    }
}
/*for (var y=0;y<newArr.length;y++) {
    print(newArr[y]);
}
 */ 
 
// cette fonction affiche une Lettre
function afficheUneLettre(charByChar) {
    var posLettreList= {"A":0,"B":4,"C":8,"D":12,"E":16,"F":20,"G":24,
                    "H":28,"I":32,"J":36,"K":40,"L":44,"M":48,"N":52,"O":56,"P":60,
                    "Q":64,"R":68,"S":72,"T":76,"U":80,"V":84,"W":88,"X":92,"Y":96,"Z":100};

}