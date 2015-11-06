// Z algorithm, p. 9

var S = process.argv[2];

var Z = [ S.length ];
var k, r = 0, l = 0;
var m;                          // match length
var kʹ;

for (k = 1; k < S.length; k += 1) {
    if (k > r) {                // 1
        m = 0;
        while (S[k+m] === S[m]) { m += 1; }
        Z[k] = m;
        if (m > 0) { r = k+m-1; l = k; }
    } else {                    // 2
        kʹ = k-l;
        if (Z[kʹ] <= r-k) {     // 2a
            Z[k] = Z[kʹ];
        } else {                // 2b
            m = 1;
            while (S[r+m] === S[r-k+1+m]) { m += 1; }
            Z[k] = r+m-k;
            r = r+m-1;
            l = k;
        }
    }
}

for (k = 0; k < Z.length; k += 1) {
    console.log("Z_"+(k+1)+" = "+Z[k]);
}


