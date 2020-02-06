var count = 2

$(function () {
  'use strict'

  var $adicionar = $('#adicionar')

  // Iniciando com o segundo artista

  $('#formulario').on('submit', (e) => {

    var $inputs = $('.nome-artistas')

    var array = []

    $inputs.each(index => {
      array.push($inputs[index].value)
    })

    $('#artista').val(array)
  })

  $adicionar.on('click', () => AdicionarCampo())
})

function AdicionarCampo(nome = "") {

  var $divArtistas = $('#artistas')

  $divArtistas.attr('class', 'border p-3')

  // Div Container
  var div = document.createElement('div')
  div.setAttribute('class', 'form-group')

  // Label
  var label = document.createElement('label')
  label.setAttribute('for', 'artista-' + count)
  var text = document.createTextNode('Artista Parceiro')
  label.appendChild(text)

  // Input
  var input = document.createElement('input')
  input.setAttribute('list', 'list-artistas')
  input.setAttribute('id', 'artista-' + count)
  input.setAttribute('name', 'artista-' + count)
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('class', 'form-control nome-artistas')
  input.setAttribute('value', nome)

  // Adicionando os filhos
  div.appendChild(label)
  div.appendChild(input)

  // Adicionando a DIV criada
  $divArtistas.append(div)

  count++
}