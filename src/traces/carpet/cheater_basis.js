/**
* Copyright 2012-2016, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var isArray = require('../../lib').isArray;

/*
 * Construct a 2D array of cheater values given a, b, and a slope.
 * If
 */
module.exports = function(a, b, cheaterslope) {
    var i, j;
    var data = [];

    var na = isArray(a) ? a.length : a;
    var nb = isArray(b) ? b.length : b;
    var adata = isArray(a) ? a : null;
    var bdata = isArray(b) ? b : null;

    // If we're using data, scale it so that for data that's just barely
    // not evenly spaced, the switch to value-based indexing is continuous.
    // This means evenly spaced data should look the same whether value
    // or index cheatertype.
    if (adata) {
        var ascal = (adata.length - 1) / (adata[adata.length - 1] - adata[0]) / (na - 1);
    }

    if (bdata) {
        var bscal = (bdata.length - 1) / (bdata[bdata.length - 1] - bdata[0]) / (nb - 1);
    }

    for(j = 0; j < nb; j++) {
        var bval = bdata ? (bdata[j] - bdata[0]) * bscal : j / (nb - 1);
        data[j] = [];
        for(i = 0; i < na; i++) {
            var aval = adata ? (adata[i] - adata[0]) * ascal : i / (na - 1);
            data[j][i] = aval - bval * cheaterslope;
        }
    }

    return data;
};