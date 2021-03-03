//Opgave 2
const DOS_Detector = require('./simple-DOS-detector');
const detectDos = new DOS_Detector(800);
const url = 'https://docs.google.com/document/d/16uX1YKzWGGz4tG112zlxp93oSTtH7SNiNvpXtdLW7nM/edit#'

detectDos.addUrl(url)

setTimeout(() => {
    detectDos.addUrl(url)
},500)