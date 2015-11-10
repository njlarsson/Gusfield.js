var Zalg = require('./Zalg');

// Z-based Knuth–Morris–Pratt spʹ-computation, page 26.
var compute_spʹ = function(P, callback) {
    Zalg.compute_Z(P, function(Z) {
        var n = P.length;
        var spʹ = [];
        var i, j;

        for (i = 0; i < n; i += 1) { spʹ[i] = 0; }
        for (j = n-1; j >= 1; j -= 1) {
            i = j + Z[j]-1;
            spʹ[i] = Z[j]
        }
        callback(spʹ, P);
    });
};

var findMatches = function(spʹ, P, T, callback) {
    var n = P.length, m = T.length;
    var c = 0, p = 0;
    var matches = [];

    while (c + (n-p) <= m) {
        while (P[p] === T[c] && p < n) { p += 1; c += 1; }
        if (p === n) { matches.push(c-n); }
        if (p === 0) { c += 1; }
        else         { p = spʹ[p-1]; }
    }
    callback(matches);
};

exports.compute_spʹ = compute_spʹ;
exports.findMatches = findMatches;
