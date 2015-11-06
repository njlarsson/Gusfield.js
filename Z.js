// Z algorithm, page 9

var compute = function(S, callback) {
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
    callback(Z);
};

var findMatches = function(P, T, $, callback) {
    compute(P+$+T, function(Z) {
        var matches = [];
        var n = P.length, i;

        for (i = n+1; i < Z.length; i += 1) {
            if (Z[i] === n) { matches.push(i-(n+1)); }
        }
        callback(matches);
    });
}

exports.compute = compute;
exports.findMatches = findMatches;
