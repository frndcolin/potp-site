const path = require('path');

module.exports = {
    entry: './src/js/potp',
    output: {
        filename: 'bundled.js',
        path: path.join(__dirname, 'dist/public/js')
    }
};