const clientModel = require('../models/clientModel')

class clientController {

  async cadastrarCliente(req, res) {
    let cliente = req.body
    const max = await clientModel.findOne({}).sort({ id: -1 })
    cliente.id = max == null ? 1 : max.id + 1

    if (await clientModel.findOne({ 'email': cliente.email })) {
      res.status(400).send({ error: 'Cliente já cadastrado!' });
  }

    const resultado = await clientModel.create(cliente)
    res.status(201).json(resultado)
  }

  async listarCliente(req, res) {
    const resultado = await clientModel.find({})
    res.status(200).json(resultado)
  }

  async buscarPorIdCliente(req, res) {
    const id = req.params.id;
    const resultado = await clienteModel.findOne({ 'id': id });
    res.status(200).json(resultado);
  }

  async atualizarCliente(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id);

        const cliente = req.body;

        await clientModel.findByIdAndUpdate(String(_id), cliente);
        res.status(200).send();
  }

  async excluirCliente(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id)
    await clientModel.findByIdAndRemove(String(_id))
    res.status(200).send()
  }
}

module.exports = new clientController()
