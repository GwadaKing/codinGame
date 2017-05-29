var MESSAGE = readline();
"use strict";
// MY VARS
var char=""; // Each character of the input
var binarizer; // the binary converter
var bit=""; //The current bit
var bitBefore=""; // The previous bit
var binaryArr=[]; // Table to stock binaries
var str2=""; // Concatenate binaryArr values to form one string
var str=""; // Final string

// CONVERTING FROM CHAR TO BINARY AND CONCATENATING THE RESULT IN ONE STRING
for (var a=0;a<MESSAGE.length;a++) {
    char=MESSAGE.substring(a,a+1);
    binarizer=char.charCodeAt().toString(2);
    binaryArr.push(binarizer);
    // handle the case where message is one character
    if (MESSAGE.length===1) {
        str2=binarizer;
    }
    // else concatenate
    else if (a>0) {
        str2+=binaryArr[a-1].concat(binaryArr[a]);
    }
}

// ITERATING OVER THE BINARY STRING
for (var k=0;k<str2.length;k++) {
    bitBefore=str2.substring(k-1,k);
    bit=str2.substring(k,k+1);
    // Handling first bit case... (no spaces before)
    if (k===0) {
        if (bit==="0") {
            str+="00 0";
        }
        else if(bit==="1") {
            str+="0 0";
        }
    }
    // ...and last bit case (no spaces after)
    else if (k===str2.length) {
        if (bit==="1") {
            if (bitBefore==="1") {
                str+="0";
            }
            else if (bitBefore==="0") {
                str+=" 0 0";
            }
        }
        else if (bit==="0") {
            if (bitBefore==="1") {
                str+=" 00 0";
            }
            else if (bitBefore==="0") {
                str+="0";
            }
        }
    }
    // Applying encoding rules
    else if ((k>0)&&(k<str2.length)) {
        if (bit==="1") {
            if (bitBefore==="1") {
                str+="0";
            }
            else if (bitBefore==="0") {
                str+=" 0 0";
            }
        }
        else if (bit==="0") {
            if (bitBefore==="1") {
                str+=" 00 0";
            }
            else if (bitBefore==="0") {
                str+="0";
            }
        }
    }
}
// Debugging
printErr("Binary string is : "+str2);
// Returning result
print(str);
