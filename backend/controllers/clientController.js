const clientModel = require('../models/clientModel')

class clientController {

    // Registrar cliente dentro do banco de dados através da API
  async saveClient(req, res) {
    let client = req.body
    const max = await clientModel.findOne({}).sort({ id: -1 })
    client.id = max == null ? 1 : max.id + 1

    // verificar se o cliente já está cadastrado no banco
    if (await clientModel.findOne({ 'email': client.email })) {
      return res.status(400).send({ error: 'Cliente já cadastrado!' });
  }

    const result = await clientModel.create(client)
    res.status(201).json(result)
  }

    // Listar os clientes buscando no banco de dados através da API
  async listClient(req, res) {
    const result = await clientModel.find({})
    res.status(200).json(result)
  }

    // Buscar o cliente por ID dentro do banco de dados através da API
  async findClientById(req, res) {
    const id = req.params.id;
    const result = await clientModel.findOne({ 'id': id });
    res.status(200).json(result);
  }

    // Atualizar o cliente encontrado no banco de dados, por ID, através da API
  async updateClient(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id);

        const client = req.body;

        await clientModel.findByIdAndUpdate(String(_id), client);
        res.status(200).send();
  }

  // Deletar cliente buscando por ID no banco de dados
  async deleteClient(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id)
    await clientModel.findByIdAndRemove(String(_id))
    res.status(200).send()
  }
}

//Exportação da função
module.exports = new clientController()
