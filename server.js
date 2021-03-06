const mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("listening");
});


mongoose.connection.on('connected', function() {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db("shreejeyamsilver2020");
    }
});
mongoose.connect("mongodb+srv://bujuki18:bujuki18@cluster0.ejcez.mongodb.net/?retryWrites=true&w=majority", { dbName: "shreejeyamsilver2020", useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => {
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
const { json } = require('body-parser');

app.get("/", (req, res) => {
    res.send("Connected");
    res.end();
})


// sareeproduct
app.post("/Saree", (req, res) => {
    const saree = new Saree({
        sareeproductname: req.body.sareeproductname,
        sareeqty: req.body.sareeqty,
        sareerate: req.body.sareerate,
        sareecode: req.body.sareecode,
        sareehsncode: req.body.sareehsncode,
        date: req.body.date,

    })
    saree.save((err, data) => {
        if (err) {
            console.log(err, "while saving saree");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "Record created successfull" })
        }
    })
})

app.get("/Saree", (req, res) => {
    Saree.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})


app.put("/Saree/:sareecode", (req, res) => {
    Saree.findOneAndUpdate({ "sareecode": req.params.sareecode }, {
        "sareeproductname": req.body.sareeproductname,
        "sareeqty": req.body.sareeqty,
        "sareerate": req.body.sareerate,
        "sareehsncode": req.body.sareehsncode,
        "date": req.body.date
    }).then(data => {
        console.log(data)
        return res.json({ status: true, msg: "Updated successfully" })
    }).catch(err => {
        return res.json({ status: false, msg: err })
    })
})

app.delete("/Saree/:sareecode", (req, res) => {
    console.log(req.params.sareecode)
    Saree.findOneAndDelete({ "sareecode": req.params.sareecode }).then(data => {
        return res.json({ status: true, msg: "Deleted successfully" })
    }).catch(err => {
        return res.json({ status: false, msg: err })
    })
})

app.get("/Sareebillcount", (req, res) => {
    Sareebill.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, count: data.length })
        }
    })
})
app.get("/Sareeproductcount", (req, res) => {
    Saree.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, count: data.length })
        }
    })
})
app.get("/Customercount", (req, res) => {
    Customer.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, count: data.length })
        }
    })
})
app.get("/Productcount", (req, res) => {
        Product.find({}, (err, data) => {
            if (err) {
                return res.json({ status: false, msg: err })
            }
            if (!err) {
                return res.json({ status: true, count: data.length })
            }
        })
    })
    //  invoice month and year of product

app.post("/Productinvoicemonthandyear", (req, res) => {
        Bill.find({ "invoicemonth": req.body.invoicemonth, "invoiceyear": req.body.invoiceyear }, (err, data) => {
            if (err) {
                return res.json({ status: false, msg: err })
            }
            if (!err) {
                return res.json({ status: true, data: data })
            }
        })
    })
    //  invoice datewise of product
app.post("/Productinvoicedate", (req, res) => {
        Bill.find({ "invoicedate": req.body.invoicedate }, (err, data) => {
            if (err) {
                return res.json({ status: false, msg: err })
            }
            if (!err) {
                return res.json({ status: true, data: data })
            }
        })
    })
    //  invoice month and year of saree product

app.post("/Productsareeinvoicemonthandyear", (req, res) => {
        Sareebill.find({ "cust_invoicemonth": req.body.cust_invoicemonth, "cust_invoiceyear": req.body.cust_invoiceyear }, (err, data) => {
            if (err) {
                return res.json({ status: false, msg: err })
            }
            if (!err) {
                return res.json({ status: true, data: data })
            }
        })
    })
    //  invoice datewise of saree product
app.post("/Productsareeinvoicedate", (req, res) => {
    Sareebill.find({ "cust_invoicedate": req.body.cust_invoicedate }, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})

// product bill
app.post("/Productbill", (req, res) => {
    //  console.log(req.body,"****************************")
    const bill = new Bill({
        name: req.body.customerdetails.customername,
        phonenumber: req.body.customerdetails.phoneumber,
        address: req.body.customerdetails.address,
        emailid: req.body.customerdetails.emailid,
        adhaarid: req.body.customerdetails.adhaarid,
        partygstin: req.body.customerdetails.partygstin,
        date: req.body.customerdetails.date,
        customerid: req.body.customerdetails.customerid,
        tabledatadet: req.body.tabledatadet,
        taxdet_totalamountbeforetax: req.body.tax_details.taxdet_totalamountbeforetax,
        taxdet_totalamountaftertax: req.body.tax_details.taxdet_totalamountaftertax,
        taxdet_totalamountoftax: req.body.tax_details.taxdet_totalamountoftax,
        taxdet_totalamountofsgsttax: req.body.tax_details.taxdet_totalamountofsgsttax,
        taxdet_totalamountofcgsttax: req.body.tax_details.taxdet_totalamountofcgsttax,
        taxdet_taxpercenttage: req.body.tax_details.taxdet_taxpercenttage,
        invoicenumber: req.body.invoiceno,
        invoicedate: req.body.invoicedate,
        invoicemonth: req.body.invoicemonth,
        invoiceyear: req.body.invoiceyear,
        taxdet_role: req.body.taxdet_role


    })
    bill.save((err, data) => {
        if (err) {
            console.log(err, "while saving saree");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "Record created successfull" })

        }
    });
});


// saree bill
app.post("/Sareebill", (req, res) => {
    console.log("Incomming ***")
    console.log("***", req.body);
    let temparray = [];
    temparray.length = 0;
    temparray = req.body.tabledatadet;

    // return res.end();
    const sareebill = new Sareebill({
        cust_name: req.body.customerdetails.customername,
        cust_phonenumber: req.body.customerdetails.phoneumber,
        cust_address: req.body.customerdetails.address,
        cust_emailid: req.body.customerdetails.emailid,
        cust_adhaarid: req.body.customerdetails.adhaarid,
        cust_partygstin: req.body.customerdetails.partygstin,
        cust_date: req.body.customerdetails.date,
        cust_customerid: req.body.customerdetails.customerid,
        cust_tabledatadet: req.body.tabledatadet,
        custtaxdet_totalamount: req.body.tax_details.totamt,
        custtaxdet_taxamount: req.body.tax_details.taxamt,
        custtaxdet_totaltaxpercent: req.body.tax_details.tottaxpercent,
        custtaxdet_cgsttaxamount: req.body.tax_details.cgsttax,
        custtaxdet_sgsttaxamount: req.body.tax_details.sgsttax,
        custtaxdet_totalwithtax: req.body.tax_details.totamtwithtax,
        custtaxdet_roundoff: req.body.tax_details.roundoff,
        cust_invoicenumber: req.body.invoiceno,
        cust_invoicedate: req.body.invoicedate,
        cust_invoicemonth: req.body.invoicemonth,
        cust_invoiceyear: req.body.invoiceyear,

    })
    sareebill.save((err, data) => {
        if (err) {
            console.log(err, "while saving saree");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            // console.log("length 1",temparray.length)
            let count = 0;
            temparray.forEach(async item => {
                Saree.find({ "sareeproductid": await item.sareeproductid })
                    .then(async(res1) => {
                        Saree.findOneAndUpdate({ "sareeproductid": res1[0].sareeproductid }, {
                            "sareeqty": await res1[0].sareeqty - await item.collected.qty
                        }).then(data => {
                            count++;
                            // console.log("count",count)
                            if (temparray.length == count) {
                                return res.json({ status: true, msg: "Record created successfull" })

                            }

                        }).catch(err => {
                            return res.json({ status: false, msg: err })
                        })
                    })
            })

        }
    })
})


// customer
app.post("/Customer", (req, res) => {
    const customer = new Customer({
        customername: req.body.customername,
        phoneumber: req.body.phoneumber,
        address: req.body.address,
        emailid: req.body.emailid,
        adhaarid: req.body.adhaarid,
        date: req.body.date,
        dob: req.body.dob,
        partygstin: req.body.partygstin
    })
    customer.save((err, data) => {
        if (err) {
            console.log(err, "while saving customer");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "Record created successfull" })
        }
    })
})


// function test(){
//     Bill.find({"name":"Amar"})
//     .then(async (bill) =>{  
//         let data=[];
//         for(var i of await bill){
//             let payload ={
//                 total:"",
//                 invoicedate:"",
//                 all:[]
//             }
//             payload.total =await i.taxdet_totalamountaftertax;
//             payload.invoicedate =await i.invoicedate
//             // console.log(i)
//             for(var j of i.tabledatadet){
//                 payload.all.push(j);
//             }
//             data.push(payload);            
//         }
//         console.log(data)
//     })
//     .catch(e =>{
// console.log(e)
//     })
// }
// test();
// bill purchase details by customer name
app.post("/Customerpurchasbilldetails", (req, res) => {
        Bill.find(req.body)
            .then(async(bill) => {
                let data = [];
                for (var i of await bill) {
                    let payload = {
                        total: "",
                        invoicedate: "",
                        all: []
                    }
                    payload.total = await i.taxdet_totalamountaftertax;
                    payload.invoicedate = await i.invoicedate
                        // console.log(i)
                    for (var j of i.tabledatadet) {
                        payload.all.push(j);
                    }
                    data.push(payload);
                }
                // console.log(data)      
                return res.json({ status: true, data: data })
            })
            .catch(e => {
                return res.json({ status: false, msg: e })
            })
    })
    //saree bill purchase details by customer name
app.post("/Customerpurchasbillsareedetails", (req, res) => {
    Sareebill.find(req.body)
        .then(async(sareebill) => {
            return res.json({ status: true, data: await sareebill })
        })
        .catch(e => {
            return res.json({ status: false, msg: e })
        })
})

app.get("/Customer", (req, res) => {
    Customer.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})

app.get("/Customer/:customerid", (req, res) => {
    let cusid = req.params.customerid;
    Customer.findOne({ customerid: cusid }, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})

app.put("/Customer/:customerid", (req, res) => {
    Customer.findOneAndUpdate({ customerid: req.params.customerid }, {
        customername: req.body.customername,
        phoneumber: req.body.phoneumber,
        address: req.body.address,
        emailid: req.body.emailid,
        adhaarid: req.body.adhaarid,
        date: req.body.date,
        dob: req.body.dob
    }).then(data => {
        return res.json({ status: true, msg: "Updated successfully" })
    }).catch(err => {
        return res.json({ status: false, msg: err })
    })
})
app.delete("/Customer/:customerid", (req, res) => {
    console.log(req.params.customerid)
    Customer.findOneAndDelete({ "customerid": req.params.customerid }).then(data => {
        return res.json({ status: true, msg: "Deleted successfully" })
    }).catch(err => {
        return res.json({ status: false, msg: err })
    })
})

// product
app.post("/Product", (req, res) => {
    console.log(req.body, "**************************")
    const _Product = new Product({
        productname: req.body.productname,
        rate: req.body.rate,
        qty: req.body.qty,
        date: req.body.date
    })
    _Product.save((err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "Record created successfull" })
        }
    })
})

app.get("/Product", (req, res) => {
    Product.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})

app.get("/Product/:productid", (req, res) => {
    let cusid = req.params.productid;
    Product.findOne({ productid: cusid }, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})

app.put("/Product/:productid", (req, res) => {
    Product.findOneAndUpdate({ productid: req.params.productid }, {
        customername: req.body.customername,
        productname: req.body.productname,
        rate: req.body.rate,
        qty: req.body.qty,
        date: req.body.date
    }).then(data => {
        return res.json({ status: true, msg: "Updated successfully" })
    }).catch(err => {
        return res.json({ status: false, msg: err })
    })
})

app.get("/Bill", (req, res) => {
    bill_count().then(data => {
        return res.json({ status: true, "count": data.length })
    })
})

function bill_count() {
    // billcount = Bill
    return new Promise((reslove, reject) => {
        Bill.find({}).then(data => {
            reslove(data);
        }).catch(err => {
            reslove(err);
        })
    })

}