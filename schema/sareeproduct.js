var mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;
const sareeproductSchema = Schema({
sareeproductid: {
  'type': String,
  'default': shortid.generate
},
sareeproductname:String,
sareeqty:Number,
sareerate:Number,
sareecode:String,
date:String,
});
  module.exports = mongoose.model('Sareeproduct', sareeproductSchema);

 