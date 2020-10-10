var mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const billSchema = Schema({
  billid:{
    'type': String,
    'default': shortid.generate
  },
  purchaseDate:String,  
  customerid:String,
  productid:String,
  customername:String,
  phoneumber:String,
  address:String,
  emailid:String,  
  adhaarid:String,  
  dob:String,
  productname:String,
  rate:Number,
  qty:Number,
});
  module.exports = mongoose.model('Bill', billSchema);

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: { type: Schema.Types.ObjectId, ref: 'Person' }
//     // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
//   module.exports = mongoose.model('Story', storySchema);
