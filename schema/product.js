var mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;
const productSchema = Schema({
productid: {
  'type': String,
  'default': shortid.generate
},
productname:String,
rate:Number,
qty:Number,
date:String,
});
  module.exports = mongoose.model('Product', productSchema);

