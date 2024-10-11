"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fisherYatesShuffle = void 0;
// Fisher-Yates Shuffle Algorithm for shuffling elements in an array.
// This algorithm guarantees a uniform random permutation.
// Returns a copy of the shuffled array.
// Refer to Fisher-Yates Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function fisherYatesShuffle(array) {
    var _a;
    // Clone the array to avoid modifying the original
    var shuffledArray = __spreadArray([], array, true);
    // Iterate through the array in reverse order
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index 'j' between 0 and i (inclusive)
        var j = Math.floor(Math.random() * (i + 1));
        // Swap the elements at indices 'i' and 'j'
        _a = [shuffledArray[j], shuffledArray[i]], shuffledArray[i] = _a[0], shuffledArray[j] = _a[1];
    }
    return shuffledArray;
}
exports.fisherYatesShuffle = fisherYatesShuffle;
