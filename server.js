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
    return res.json({"count":data.length})
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