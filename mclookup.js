const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const https = require('https');

const getFromUrl = async url => await new Promise((rslv, rjct) => {
    const data = [];
    https.get(url, res => {
        res.on('data', chunk => {
            data.push(chunk);
        })
        res.on('end', () => {
            rslv(Buffer.concat(data).toString());
        })
    });
});

const csvToArr = csv => csv
    .split('\n')
    .filter(v => v != '')
    .map(v => v.split(','))
    ;

const findMatch = (oldArr, newArr, symbol) => {
    let match = '';
    for ( let i = 0 ; i < oldArr.length ; i++ ) {
        if ( oldArr[i][1] == symbol ) {
            match = oldArr[i][0];
            break;
        }
    }
    if ( match == '' ) return symbol;
    for ( let i = 0 ; i < newArr.length ; i++ ) {
        if ( newArr[i][0] == match ) {
            return newArr[i][1];
        }
    }
    return symbol;
};

const main = async () => {
    const csv1 = 'https://mcp.thiakil.com/data/1.12/snapshot/20171003/methods.csv';
    const csv2 = 'https://mcp.thiakil.com/data/1.12/stable/39/methods.csv';

    let args = process.argv.slice(2);

    const arr1 = csvToArr(await getFromUrl(csv1));
    const arr2 = csvToArr(await getFromUrl(csv2));
    const match = findMatch(arr1, arr2, args[0]);
    console.log(match);
}

main();