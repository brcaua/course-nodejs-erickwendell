/*#Entendo o fluxo das aplicações JavaScript com Callback
  @ Obter um usuário
  1 Obter o número de telefone do usuário a partir de seu ID
  2 Obter o endereço do user pelo ID
*/

function obterUser(callback){
  setTimeout (() => {
    return callback(null, {
      id: 1,
      name: 'Breno',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUser, callback){
  setTimeout( () => {
    return callback(null, {
      telefone: '989438444',
      ddd: 12
      })
  }, 2000)
}

function obterEndereco(idUser, callback){
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)
}

function resolverUser(erro, user){
  console.log('user', user)

}

obterUser(function resolverUser(error, user){
  if(error){
    console.error('Erro em USUÁRIO',error)
    return;
  }
  obterTelefone(user.id, function resolverTelefone(error1, telefone){
    if(error1){
      console.error('Erro em Telefone',error)
      return;
    }
    obterEndereco(user.id, function resolverEndereco(error2, endereco){
      if(error2){
        console.error('Erro em Endereco',error)
        return;
      }

      console.log(`
        Nome: ${user.name}
        Endereco: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd})${telefone.telefone}
      `)
    })
  })
})

//const user = obterUser()
// const telefone = obterNumTel(user.id)
// console.log('telefone:', telefone)