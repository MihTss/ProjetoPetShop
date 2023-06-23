const jwt = require('jsonwebtoken');
const auth = require('./app.json');
const bcryptjs = require('bcryptjs');


// Nesta função estamos recebendo o "cliente" do loginController, e incluímos um token para este cliente com tempo de expiração máximo de 3600 segundos, ou 1 hr
async function incluirToken(cliente) {
  const token = await jwt.sign({ 'id': cliente.id }, auth.appId, {
    expiresIn: 3600 // Expira em 3600 segundos ou 1 hora.
  });
  cliente.token = token;
  cliente.senha = undefined;
}

// Nesta função estamos criptografando a senha do cliente(usuario) 
async function gerarHash(usuario) {
  if (typeof usuario.senha !== 'undefined') {
    const hash = await bcryptjs.hash(usuario.senha, 10);
    usuario.senha = hash;
  }
  return usuario;
}

// Nesta função estamos fazendo uma verificação se o usuário está autorizado ou não a realizar o login
function autorizar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi enviado!' });
  }

  // split buscando dados em branco (divide uma string em um array de substrings com base em um separador especificado)
  const partes = authHeader.split(' ');

  // se nao encontrar duas partes, o token está incompleto
  if (partes && partes.length !== 2) {
    return res.status(401).send({ error: 'Token incompleto!' });
  }
  
  // separa o split em duas partes 
  const [tipo, token] = partes;

  // identificar se o token foi enviado da forma correta
  if (!/^Bearer$/i.test(tipo)) {
    return res.status(401).send({ error: 'Token mal formado!' });
  }
   
  // Identificar se o token é válido
  jwt.verify(token, auth.appId, (err, usuario) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido!' });
    }
    req.usuarioLogadoId = usuario.id;
    return next();
  });
}

//Exportação das funções
module.exports = {
  gerarHash,
  incluirToken,
  autorizar
};