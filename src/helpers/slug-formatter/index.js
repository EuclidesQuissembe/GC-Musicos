const CaracteresEspeciais = require('./functions/caracteres-especiais')

function Slug(str) {

    var espaces = /\s/g

    // Remover os espaços no início e no fim
    str = str.trim()

    // Colocar todas as letras em mínuscula
    str = str.toLowerCase()

    // Criar a url amigável
    try {

        var slug = CaracteresEspeciais(str).replace(espaces, '-')

        return slug

    } catch (error) {
        return error
    }
}

module.exports = Slug