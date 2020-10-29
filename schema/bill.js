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
  taxdet_totalamountbeforetax:Number,
  taxdet_totalamountaftertax:Number,
  taxdet_totalamountoftax:Number,
  taxdet_totalamountofsgsttax:Number,
  taxdet_totalamountofcgsttax:Number,
  taxdet_taxpercenttage:Number,
  taxdet_role:String,
  invoicenumber:Number,
  invoicedate:String,
  invoicemonth:String,
  invoiceyear:String,
  partygstin:String
});
  module.exports = mongoose.model('Bill', billSchema);

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: { type: Schema.Types.ObjectId, ref: 'Person' }
//     // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
//   module.exports = mongoose.model('Story', storySchema);
