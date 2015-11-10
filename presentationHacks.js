var Zalg = require('./Zalg');

var showWithIxs = function(S, off) {
    if (off === undefined) off = 0;
    var l10 = '', l1 = '';
    var i;

    for (i = off; i < S.length+off; i += 1) {
        if (i%10 == 0 || i == off) { l10 += Math.floor(i/10) % 10; }
        else                       { l10 += ' '; }
        l1 += i % 10;
    }
    console.log(l10);
    console.log(l1);
    console.log(S);
};

var showZ = function(S) {
    Zalg.compute_Z(S, function(Z) {
        var i;
        
        showWithIxs(S, 1);
        for (i = 0; i < Z.length; i += 1) {
            console.log("Z_{"+(i+1)+"}="+Z[i]);
        }
    });
};
