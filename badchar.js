//  Bad character rule, page 17.
var compute_R = function(P, callback) {
    var i;
    var R = [];

    for (i = 0; i < P.length; i += 1) {
        R[P.charCodeAt(i)] = i;
    }
    callback(R);
};

// Extended bad character rule, page 18.
var compute_extR = function(P, callback) {
    var i, c;
    var R = [];

    for (i = 0; i < P.length; i += 1) {
        c = P.charCodeAt(i);
        
        if (R[c]) { R[c].push(i); }
        else      { R[c] = [ i ]; }
    }
    callback(R);
};

exports.badchar = badchar;
exports.extBadchar = extBadchar;
