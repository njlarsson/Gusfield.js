// Suffix tree code.
//
// Caveat: these are written for demonstration and have not been
// extensively tested. If you find any problems, please report to
// jesper dot larsson at mah dot se.

var util = require('util');

// Naive method for building a trie containing all suffixes of the
// given string. Nodes are non-negative integers, 0 the root. Edges
// are object that have an endpoint attribute and a character
// attribute. Returns an object that contains outgoing edges: for
// instance, if e is an outgoing edge of node 4, whose character is x,
// then edges["4,x"] is e.
var trie = function(S) {
    var m = S.length;
    var edges = {};
    var nodeNo = 0;

    var newNode = function() { return nodeNo++; };

    var newEdge = function(v, c) {
        return {
            endpoint:   v,
            character:  c
        };
    };

    var root = newNode();
    
    var i, d;
    var u, s;
    var e, g;
    
    for (i = 0; i < m; i += 1) {
        u = root;
        d = 0;
        e = edges[u+","+S[i]];
        while (e) {
            v = e.endpoint;
            if (S[i] === e.character) {
                // Step down.
                d += 1;
                u = v;
                e = edges[u+","+S[i]];
            }
        }
        while (i+d < m) {
            // Add new leaf s below u, make g=(u,s).
            s = newNode();
            g = newEdge(s, S[i+d]);
            edges[u+","+S[i+d]] = g;
            d += 1;
            u = s;
        }
    }

    return edges;
};



// Naive quadratic-time method for building a suffix tree of the given
// string. Nodes are non-negative integers, 0 the root. Edges are
// object that have an endpoint attribute, a pos character that holds
// the starting position in S of the edge label, and a length
// attribute that holds the label length. Returns an object that
// contains outgoing edges: for instance, if e is an outgoing edge of
// node 4, whose first character is x, then edges["4,x"] is e.
var naive = function(S) {
    var m = S.length;
    var edges = {};
    var nodeNo = 0;

    var newNode = function() { return nodeNo++; };

    var newEdge = function(v, p, l) {
        return {
            endpoint:   v,
            pos:        p,
            length:     l
        };
    };

    var root = newNode();
    
    var i, off, d;
    var u, v, w, s;
    var e, f, g;
    
    for (i = 0; i < m; i += 1) {
        u = root;
        d = 0;
        e = edges[u+","+S[i]];
        while (e) {
            v = e.endpoint;
            off = 0;
            // Scan characters on e's label until end or mismatch
            while (off < e.length && S[i+off] === S[e.pos+off]) {
                off += 1;
                d += 1;
            }
            if (off === e.length) { // end of label, step down
                u = v;
                e = edges[u+","+S[i+off]];
            } else { // mismatch, split edge
                // Split e=(u,v) on new node w, and make f=(u,w).
                w = newNode();
                f = newEdge(w, e.pos, off);
                edges[u+","+S[e.pos]] = f;
                
                // Make e=(w,v).
                e.pos += off;
                e.length -= off;
                edges[w+","+S[e.pos]] = e;

                u = w;
                e = undefined;
            }
        }
        // Add new leaf s below u, make g=(u,s).
        s = newNode();
        g = newEdge(s, i+d, m-(i+d));
        edges[u+","+S[i+d]] = g;
    }

    return edges;
};

// Implementation of Ukkonen's algorithm for building a suffix tree of
// the given string. Nodes are non-negative integers, 0 the
// root. Edges are object that have an endpoint attribute, a pos
// character that holds the starting position in S of the edge label,
// and a length attribute that holds the label length. Returns an
// object that contains outgoing edges: for instance, if e is an
// outgoing edge of node 4, whose first character is x, then
// edges["4,x"] is e.
var ukkonen = function(S) {
    var m = S.length;
    var edges = {};              // outgoing edges
    var suf = {};               // suffix links
    var nodeNo = 0;

    var newNode = function() { return nodeNo++; };

    var newEdge = function(v, p, l) {
        return {
            endpoint:   v,
            pos:        p,
            length:     l
        };
    };

    var root = newNode();

    var i;                      // next character to include
    var a = root                // active point node
    var off = 0;                // active point offset from a
    var e;                      // edge we're going down from a
    var u;                      // node to get new leaf child
    var v;                      // newly added node, suflink pending
    var f;                      // new edge, upper part of split edge
    var s;                      // new leaf
    var g;                      // new edge leading to new leaf

    for (i= 0; i < m; i += 1) {
        if (off === 0) { e = edges[a+","+S[i]]; }
        while (true) {
            while (off > 0 && off >= e.length) { // rescan
                off -= e.length;
                a = e.endpoint;
                e = edges[a+","+S[i-off]];
            }
            if (off === 0) {
                if (e) {        // there is an edge for S[i] from a
                    off = 1;    // endpoint is one char out on e
                    break;      // done with this expansion step
                }
                u = a;          // a is the node to get new leaf child
            } else {
                if (S[i] === S[e.pos+off]) { // next char on e is S[i]
                    off += 1;   // endpoint one more position out on e
                    break;      // done with this expansion step
                }
                // Split e on new node u, make f=(a,u).
                u = newNode();
                f = newEdge(u, e.pos, off);
                edges[a+","+S[e.pos]] = f;

                // Make e=(u,e.endpoint).
                e.pos += off;
                e.length -= off;
                edges[u+","+S[e.pos]] = e;
            }
            // Add new leaf s below u, make g=(u,s).
            s = newNode();
            g = newEdge(s, i, NaN); // NaN used for floating label end
            edges[u+","+S[i]] = g;
            
            if (v) { suf[v] = u; } // set the pending suflink of v
            v = u;                 // save to set suflink next round

            // Move a, off and e to indicate shorter suffix.
            if (a === root) { 
                if (off > 0) { off -= 1; } // it's on the same edge
                else { break; } // there is no shorter suffix, done
            } else {
                a = suf[a];     // follow suffix link
            }
            e = edges[a+","+S[i-off]];
        }
        if (v) {                // one final suflink is pending
            suf[v] = a;
            v = undefined;
        }
    }
    
    return edges;
};


var S = "ababaab";

console.log(util.inspect(ukkonen(S)))
