var Z = require('./Z');

Z.findMatches("abc", "aabcabbabcabca", '\0', function(matches) {
    console.log(matches);
});
