const clientModel = require('../models/clientModel')

class clientController {

    // Register Client
  async saveClient(req, res) {
    let client = req.body
    const max = await clientModel.findOne({}).sort({ id: -1 })
    client.id = max == null ? 1 : max.id + 1

    if (await clientModel.findOne({ 'email': client.email })) {
      res.status(400).send({ error: 'Cliente já cadastrado!' });
  }

    const result = await clientModel.create(client)
    res.status(201).json(result)
  }

    // List Client 
  async listClient(req, res) {
    const result = await clientModel.find({})
    res.status(200).json(result)
  }

    //Seach Client by Id 
  async searchClient(req, res) {
    const id = req.params.id;
    const result = await clientModel.findOne({ 'id': id });
    res.status(200).json(result);
  }

    // Update Client 
  async updateClient(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id);

        const client = req.body;

        await clientModel.findByIdAndUpdate(String(_id), client);
        res.status(200).send();
  }

  // Delete CLient
  async deleteClient(req, res) {
    const id = req.params.id
    const _id = String((await clientModel.findOne({ 'id': id }))._id)
    await clientModel.findByIdAndRemove(String(_id))
    res.status(200).send()
  }
}

module.exports = new clientController()
