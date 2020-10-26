const mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("listening");
});


mongoose.connection.on('connected', function () {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db("myapp2");
    }
});
mongoose.connect("mongodb+srv://nillafruitssalem:nillafruitssalem@cluster0-qp8wu.mongodb.net/",
 { dbName: "myapp2", useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => {
    if (err) {

        console.log("TEST", err)
        return err;
    }
})

var Product = require('./schema/product')
var Customer = require('./schema/customer')
var Bill = require('./schema/bill');
var Saree = require('./schema/sareeproduct');
var Sareebill = require('./schema/sareeproductbill');

app.get("/",(req,res)=>{
    res.send("Connected");
    res.end();
})


// sareeproduct
app.post("/Saree",(req,res)=>{
    const saree = new Saree({   
sareeproductname:req.body.sareeproductname,
sareeqty:req.body.sareeqty,
sareerate: req.body.sareerate,
sareecode: req.body.sareecode,  
sareehsncode: req.body.sareehsncode,   
     date: req.body.date,
     
    })
    saree.save((err,data)=>{
        if(err){
            console.log(err,"while saving saree");
            return res.json({status:false,msg:err})
        }
        if(!err){           
            return res.json({status:true,msg:"Record created successfull"})
        }
    })
 })
 
 app.get("/Saree",(req,res)=>{    
    Saree.find({},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){       
            return res.json({status:true,data:data})
        }
    })
 })

 
app.put("/Saree/:sareecode",(req,res)=>{     
    Saree.findOneAndUpdate(
        {"sareecode":req.params.sareecode},
        {  "sareeproductname":req.body.sareeproductname,
            "sareeqty":req.body.sareeqty,
            "sareerate": req.body.sareerate,
            "sareehsncode": req.body.sareehsncode,   
             "date": req.body.date
        }).then(data =>{
            console.log(data)
            return res.json({status:true,msg:"Updated successfully"})
        }).catch(err =>{            
            return res.json({status:false,msg:err})
        })   
 })

 app.delete("/Saree/:sareecode",(req,res)=>{     
     console.log(req.params.sareecode)   
    Saree.findOneAndDelete(
        {"sareecode":req.params.sareecode}).then(data =>{
            return res.json({status:true,msg:"Deleted successfully"})
        }).catch(err =>{            
            return res.json({status:false,msg:err})
        })   
 })

 app.get("/Sareebillcount",(req,res)=>{    
    Sareebill.find({},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){       
            return res.json({status:true,count:data.length})
        }
    })
 })
 app.get("/Sareeproductcount",(req,res)=>{    
    Saree.find({},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){       
            return res.json({status:true,count:data.length})
        }
    })
 })
 app.get("/Customercount",(req,res)=>{    
    Customer.find({},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){       
            return res.json({status:true,count:data.length})
        }
    })
 })
 app.get("/Productcount",(req,res)=>{    
    Product.find({},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){       
            return res.json({status:true,count:data.length})
        }
    })
 })

 // product bill
 app.post("/Productbill",(req,res)=>{
     console.log(req.body.tax_details_addtional_bill_1,"****")
        const bill = new Bill({   
              name:req.body.customerdetails.customername,
              phonenumber:req.body.customerdetails.phoneumber,
              address:req.body.customerdetails.address,
              emailid:req.body.customerdetails.emailid,
              adhaarid:req.body.customerdetails.adhaarid,
              date:req.body.customerdetails.date,
              customerid:req.body.customerdetails.customerid,
              tabledatadet:req.body.tabledatadet,
              taxdet_totalamount:req.body.tax_details_addtional_bill_1['totamt'],
              taxdet_taxamount:req.body.tax_details_addtional_bill_1.taxamt,
              taxdet_totaltaxpercent:req.body.tax_details_addtional_bill_1.tottaxpercent,
              taxdet_cgsttaxamount:req.body.tax_details_addtional_bill_1.cgsttax,
              taxdet_sgsttaxamount:req.body.tax_details_addtional_bill_1.sgsttax,
              taxdet_totalwithtax:req.body.tax_details_addtional_bill_1.totamtwithtax,
              taxdet_roundoff:req.body.tax_details_addtional_bill_1.roundoff,
              invoicenumber:req.body.invoiceno,
              invoicedate:req.body.invoicedate
         
        })
        bill.save((err,data)=>{
            if(err){
                console.log(err,"while saving saree");
                return res.json({status:false,msg:err})
            }
            if(!err){  
                 return res.json({status:true,msg:"Record created successfull"})
                // console.log("length 1",temparray.length)
                // let count = 0;
                // temparray.forEach(async item =>{
                //     Saree.find({"sareeproductid": await item.sareeproductid})
                //     .then(async(res1) =>{
                //             Saree.findOneAndUpdate(
                //                 {"sareeproductid":res1[0].sareeproductid},
                //                 {
                //                     "sareeqty":await res1[0].sareeqty - await item.collected.qty
                //                 }).then(data =>{
                //                     count++;
                //                     // console.log("count",count)
                //                     if(temparray.length == count){
                //                         return res.json({status:true,msg:"Record created successfull"})
            
                //                     }   
                                      
                //               }).catch(err =>{            
                //                     return res.json({status:false,msg:err})
                //                 })                
                //     })            
                // })    
                
            }
        })
     })

     
// saree bill
 app.post("/Sareebill",(req,res)=>{
let temparray = [];
temparray.length = 0;
temparray = req.body.tabledatadet
    // console.log("***",req.body);
    // return res.end();
    const sareebill = new Sareebill({   
          name:req.body.customerdetails.customername,
          cust_phonenumber:req.body.customerdetails.phoneumber,
          cust_address:req.body.customerdetails.address,
          cust_emailid:req.body.customerdetails.emailid,
          cust_adhaarid:req.body.customerdetails.adhaarid,
          cust_date:req.body.customerdetails.date,
          cust_customerid:req.body.customerdetails.customerid,
          cust_tabledatadet:req.body.tabledatadet,
          custtaxdet_totalamount:req.body.tax_details.totamt,
          custtaxdet_taxamount:req.body.tax_details.taxamt,
          custtaxdet_totaltaxpercent:req.body.tax_details.tottaxpercent,
          custtaxdet_cgsttaxamount:req.body.tax_details.cgsttax,
          custtaxdet_sgsttaxamount:req.body.tax_details.sgsttax,
          custtaxdet_totalwithtax:req.body.tax_details.totamtwithtax,
          custtaxdet_roundoff:req.body.tax_details.roundoff,
          cust_invoicenumber:req.body.invoicenumber,
          cust_invoicedate:req.body.invoicedate,
          cust_invoicemonth:req.body.invoicemonth,
  cust_invoiceyear:req.body.invoiceyear,
     
    })
    sareebill.save((err,data)=>{
        if(err){
            console.log(err,"while saving saree");
            return res.json({status:false,msg:err})
        }
        if(!err){  
            // console.log("length 1",temparray.length)
            let count = 0;
            temparray.forEach(async item =>{
                Saree.find({"sareeproductid": await item.sareeproductid})
                .then(async(res1) =>{
                        Saree.findOneAndUpdate(
                            {"sareeproductid":res1[0].sareeproductid},
                            {
                                "sareeqty":await res1[0].sareeqty - await item.collected.qty
                            }).then(data =>{
                                count++;
                                // console.log("count",count)
                                if(temparray.length == count){
                                    return res.json({status:true,msg:"Record created successfull"})
        
                                }   
                                  
                          }).catch(err =>{            
                                return res.json({status:false,msg:err})
                            })                
                })            
            })    
            
        }
    })
 })
 

// customer
app.post("/Customer",(req,res)=>{
   const customer = new Customer({    
    customername:req.body.customername,
    phoneumber:req.body.phoneumber,
    address: req.body.address,
    emailid: req.body.emailid,   
    adhaarid: req.body.adhaarid,
    date: req.body.date,
    dob: req.body.dob
   })
   customer.save((err,data)=>{
       if(err){
           console.log(err,"while saving customer");
           return res.json({status:false,msg:err})
       }
       if(!err){           
           return res.json({status:true,msg:"Record created successfull"})
       }
   })
})

app.get("/Customer",(req,res)=>{    
   Customer.find({},(err,data)=>{
       if(err){           
           return res.json({status:false,msg:err})
       }
       if(!err){       
           return res.json({status:true,data:data})
       }
   })
})

app.get("/Customer/:customerid",(req,res)=>{    
    let cusid = req.params.customerid;
    Customer.findOne({customerid:cusid},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){           
            return res.json({status:true,data:data})
        }
    })
 })

app.put("/Customer/:customerid",(req,res)=>{        
    Customer.findOneAndUpdate(
        {customerid:req.params.customerid},
        {  customername:req.body.customername,
            phoneumber:req.body.phoneumber,
            address: req.body.address,
            emailid: req.body.emailid,        
            adhaarid: req.body.adhaarid,
            date: req.body.date,
            dob: req.body.dob
        }).then(data =>{
            return res.json({status:true,msg:"Updated successfully"})
        }).catch(err =>{            
            return res.json({status:false,msg:err})
        })   
 })

 // product
app.post("/Product",(req,res)=>{ 
   const _Product = new Product({      
    productname:req.body.productname,
    rate:req.body.rate,
    qty:req.body.qty,
    date:req.body.date
   })
   _Product.save((err,data)=>{
       if(err){           
           return res.json({status:false,msg:err})
       }
       if(!err){         
           return res.json({status:true,msg:"Record created successfull"})
       }
   })
})

app.get("/Product",(req,res)=>{    
    Product.find({},(err,data)=>{
       if(err){           
           return res.json({status:false,msg:err})
       }
       if(!err){          
           return res.json({status:true,data:data})
       }
   })
})

app.get("/Product/:productid",(req,res)=>{    
    let cusid = req.params.productid;
    Product.findOne({productid:cusid},(err,data)=>{
        if(err){           
            return res.json({status:false,msg:err})
        }
        if(!err){           
            return res.json({status:true,data:data})
        }
    })
 })

app.put("/Product/:productid",(req,res)=>{        
    Product.findOneAndUpdate(
        {productid:req.params.productid},
        {  customername:req.body.customername,
            productname:req.body.productname,
            rate:req.body.rate,
            qty:req.body.qty,
            date:req.body.date
        }).then(data =>{
            return res.json({status:true,msg:"Updated successfully"})
        }).catch(err =>{            
            return res.json({status:false,msg:err})
        })   
 })

app.get("/Bill",(req,res)=>{  
  bill_count().then(data =>{      
    return res.json({status:true,"count":data.length})
  })
})
 function bill_count(){
    // billcount = Bill
    return new Promise((reslove,reject)=>{
        Bill.find({}).then(data =>{
            reslove(data);            
        }).catch(err =>{            
            reslove(err);
        })
    })
    
 }


