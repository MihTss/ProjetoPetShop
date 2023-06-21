const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoCreate: true,
  },
  precoTotal: Number,
  listaProdutos: [{
    idProduct:{ type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantidade: Number,
  }],
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', require: true },
  dateTime: {
    type: Date,
    default: Date.now,
    require: true,
    autoCreate: true,
  },
  status: {
    type: String,
    default: "Aguardando Pagamento",
    autoCreate: true,
  },
});

module.exports = mongoose.model('orders', userSchema);
