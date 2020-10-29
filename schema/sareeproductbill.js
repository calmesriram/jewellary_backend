var mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const sareeproductbillSchema = Schema({
  billid:{
    'type': String,
    'default': shortid.generate
  },  
  cust_name:String,
  cust_phonenumber:String,
  cust_address:String,
  cust_emailid:String,
  cust_adhaarid:String,
  cust_date:String,
  cust_customerid:String,
  cust_tabledatadet:[{}],
  custtaxdet_totalamount:Number,
  custtaxdet_taxamount:Number,
  custtaxdet_totaltaxpercent:Number,
  custtaxdet_cgsttaxamount:Number,
  custtaxdet_sgsttaxamount:Number,
  custtaxdet_totalwithtax:Number,
  custtaxdet_roundoff:Number,
  cust_invoicenumber:Number,
  cust_invoicedate:String,
  cust_invoicemonth:String,
  cust_invoiceyear:String,
  cust_partygstin:String

});
  module.exports = mongoose.model('SareeBill', sareeproductbillSchema);

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: { type: Schema.Types.ObjectId, ref: 'Person' }
//     // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
//   module.exports = mongoose.model('Story', storySchema);
