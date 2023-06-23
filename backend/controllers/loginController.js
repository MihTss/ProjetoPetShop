const clienteModel = require('../models/clientModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    // Buscando através do email e senha digitados pelo usuário, se o mesmo existe ou não dentro do banco de dados, caso não exista, é retornado 'Usuário não encontrado!'
    async login(req, res) {
        const { email, senha } = req.body;
        const cliente = await clienteModel.findOne({ 'email': email }).select('+senha')
        
        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }
        
        // Caso a senha estiver errada, é retornado 'senha inválida'
        if (!await bcryptjs.compare(senha, cliente.senha)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }
    
        // Caso o login esteja correto, ele chama a função "incluirToken", e cria um token para o cliente com tempo de expiração de 3600 segundos
        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }
}

//Exportação da função
module.exports = new LoginController();