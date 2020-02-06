module.exports = function (str) {
  var regExp = /\s/g

  var nomes = str.split(regExp)

  if (nomes.length >= 2) {
    return (nomes[0] + '.' + nomes[nomes.length - 1]).toLowerCase()
  } else {
    return str.toLowerCase()
  }
}