// Direct approach for computing Z, quadratic time

var S = process.argv[2];

var Z = [ S.length ];
var k;
var m;                          // match length

for (k = 1; k < S.length; k += 1) {
    m = 0;
    while (S[k+m] === S[m]) { m += 1; }
    Z[k] = m;
}

for (k = 0; k < Z.length; k += 1) {
    console.log("Z_"+(k+1)+" = "+Z[k]);
}


