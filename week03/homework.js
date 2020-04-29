function convertStringToNumber (string,x){
    if(arguments.length < 2){
        x = 10
    }
    var char = string.split('');
    var number = 0;
    var i = 0;
    while(i<char.length && char[i] !== '.'){
        number = number * x;
        number += char[i].codePointAt(0) - '0'.codePointAt(0);
        i++
    }
    if(char[i] === '.'){
        i++
    }
    var decimal = 1;
    while(i<char.length){
        decimal = decimal / x;
        number += (char[i].codePointAt(0) - '0'.codePointAt(0)) * decimal;
        i++
    }
    return number
}
convertStringToNumber('10.023')

function convertNumberToString (number,x){
    if(arguments.length < 2){
        x = 10
    }
    var integer = Math.floor(number);
    var decimal = number - integer;
    var string = '';
    while (integer > 0){
        string = String(integer % x) + string;
        integer = Math.floor(integer/x)
    }
    if(decimal > 0){
        string += '.'
    }
    while (decimal !== 0){
        decimal = decimal * x;
        string += Math.floor(decimal);
        decimal = decimal - Math.floor(decimal)
    }
    return string
}
convertNumberToString(10.02)