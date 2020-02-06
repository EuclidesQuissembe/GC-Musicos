/**
 * @author Euclides Bernardo
 * @param {*} str recebe a string onde os caracteres especiais serão substituídos
 * @param {*} tipo Recebe o tipo de substituição que será feito. Valor padrão é all.
 * @returns String
 */
module.exports = function(str, tipo = 'all') {

    var formatar = str

    // Verificando o tipo de substituição
    if (tipo === 'all') {

        const letras = ['a', 'e', 'i', 'o', 'u', 'c', 'A', 'E', 'I', 'O', 'U', 'C']

        for (letra of letras) {
            formatar = Letra(formatar, letra)
        }

    } else {

        var letras = tipo.replace(' ', '').split('')

        for (letra of letras) {
            formatar = Letra(formatar, letra)
        }

    }

    return formatar
}

/**
 * @author Euclides Bernardo
 * @returns String
 * @param {*} val String que será substituido os caracteres especiais
 * @param {*} letra O caracter que substituirá os outros caracteres especiais
 */
function Letra(val, letra) {

    var regExp = ''

    switch (letra) {
        case 'a':
            regExp = /(à)|(á)|(â)|(ã)/g
            break;
        case 'A':
            regExp = /(À)|(Á)|(Â)|(Ã)/g
            break;
        case 'e':
            regExp = /(è)|(é)|(ê)/g
            break;
        case 'E':
            regExp = /(È)|(É)|(Ê)/g
            break;
        case 'i':
            regExp = /(ì)|(í)|(î)/g
            break;
        case 'I':
            regExp = /(Ì)|(Í)|(Î)/g
            break;
        case 'o':
            regExp = /(ò)|(ó)|(ô)|(õ)/g
            break;
        case 'O':
            regExp = /(Ò)|(Ó)|(Ô)|(Õ)/g
            break;
        case 'u':
            regExp = /(ù)|(ú)|(û)/g
            break;
        case 'U':
            regExp = /(Ù)|(Ú)|(Û)/g
            break;
        case 'c':
            regExp = /(ç)/g
            break;
        case 'C':
            regExp = /(Ç)/g
            break;
        default:
            throw `Caracter especial não reconhecido '${letra}'`
    }

    return val.replace(regExp, letra)
}