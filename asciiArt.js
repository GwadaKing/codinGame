var L = parseInt(readline());
var H = parseInt(readline());
var s=0;
var indArr=[];
var alpAscii=[];
var myTab=[];
var str="";
var texte = readline();
var indice={A:0,B:L,C:L*2,D:L*3,E:L*4,F:L*5,G:L*6,H:L*7,I:L*8,
               J:L*9,K:L*10,L:L*11,M:L*12,N:L*13,O:L*14,P:L*15,
               Q:L*16,R:L*17,S:L*18,T:L*19,U:L*20,V:L*21,W:L*22,
               X:L*23,Y:L*24,Z:L*25,"?":L*26};
// on stocke l'alphabet Ascii
for (var i = 0; i < H; i++) {
    var alphabetAscii = readline();
    alpAscii[i]=alphabetAscii;
}
// on stocke dans indArr les indices de chaque lettres dans la chaine ascii
for (var s=0,le=texte.length;s<le;s++) {
    var lettre=texte.charAt(s).toUpperCase();
    if (lettre.match(/[a-z]/gi)) {
        indArr.push(indice[lettre]);
    }
    else {
        indArr.push(L*26);
    }
}
// on construit la séquence
for (var pos=0,l=indArr.length;pos<l;pos++) {
    for (var line=0;line<H;line++) {
       if (pos===0) {
           myTab[line]=alpAscii[line].substring(indArr[pos],indArr[pos]+L);
       }
       else if (pos>0) {
           myTab[line]+=alpAscii[line].substring(indArr[pos],indArr[pos]+L);
       }
    }
}
// puis on l'affiche
for (var i=0;i<myTab.length;i++) {
    print(myTab[i]);
}
