/*
  #Refatorando Callbacks para Promises
  @ Obter um usuário
  1 Obter o número de telefone do usuário a partir de seu ID
  2 Obter o endereço do user pelo ID
*/
//importamos um módulo interno do node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      //return reject(new Error('AGORA FUDEU!'))
      return resolve({
        id: 1,
        name: "Breno",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUser) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "989438444",
        ddd: 12,
      });
    }, 2000);
  });
}

function obterEndereco(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

// Steps: add "async" in function 
main()
async function main (){
  try {
    console.time('medida-promise')
    const usuario = await obterUser()
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
      Nome: ${usuario.name},
      Telefone: (${telefone.add}) ${telefone.telefone},
      Endereco: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('Deu ruim mano', error)
  }
}

// const userPromise = obterUser();
// //para manipular o sucess usamos a função .then
// //para manipular erros usamos a função .catch
// userPromise
//   .then((usuario) => {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.name,
//           id: usuario.id,
//         },
//         telefone: result,
//       };
//     });
//   })
//   .then((resultado) => {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     }); 
//   })
//   .then((resultado) => {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//       Telefone:  (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `);
//   })
//   .catch((error) => {
//     console.error("DEU RUIM", error);
//   });
// // obterUser(function resolverUser(error, user){
// //   if(error){
// //     console.error('Erro em USUÁRIO',error)
// //     return;
// //   }
// //   obterTelefone(user.id, function resolverTelefone(error1, telefone){
// //     if(error1){
// //       console.error('Erro em Telefone',error)
// //       return;
// //     }
// //     obterEndereco(user.id, function resolverEndereco(error2, endereco){
// //       if(error2){
// //         console.error('Erro em Endereco',error)
// //         return;
// //       }
// //       console.log(`
// //         Nome: ${user.name}
//         Endereco: ${endereco.rua}, ${endereco.numero}
//         Telefone: (${telefone.ddd})${telefone.telefone}
//       `)
//     })
//   })
// })
