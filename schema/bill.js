var mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const billSchema = Schema({
  billid:{
    'type': String,
    'default': shortid.generate
  },
  name:String,
  phonenumber:String,
  address:String,
  adhaarid:String,
  date:String,
  emailid:String,
  customerid:String,
  tabledatadet:[{}],
  taxdet_totalamount:Number,
  taxdet_taxamount:Number,
  taxdet_totaltaxpercent:Number,
  taxdet_cgsttaxamount:Number,
  taxdet_sgsttaxamount:Number,
  taxdet_totalwithtax:Number,
  taxdet_roundoff:Number,
  invoicenumber:Number,
  invoicedate:String,
  invoicemonth:String,
  invoiceyear:String
});
  module.exports = mongoose.model('Bill', billSchema);

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: { type: Schema.Types.ObjectId, ref: 'Person' }
//     // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
//   module.exports = mongoose.model('Story', storySchema);
