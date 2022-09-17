const express = require('express');
const path = require('path');
const router = express.Router();
const bodyparser = require('body-parser');


const mongoose = require('mongoose');
const { strict } = require('assert');
const { stringify } = require('querystring');

const db ='mongodb+srv://divjyot15:Gurkirpa5*@cluster0.3nvvrws.mongodb.net/beacon_data?retryWrites=true&w=majority';
// mongoose.connect('mongodb://localhost/beacon')
mongoose.connect(db).then(() => {
    console.log("CONNECTED");
}).catch((err)=>{
    console.log("NOT CONNECTED");
});




// Body-parser middleware
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json())


var sample_schema = mongoose.Schema({
    username: String,
    password: String,
    name: String
});

var document_schema = mongoose.Schema({
    purpose: String,
    sno: String,
    name_of_company: String,
    consent_number: String,
    autorizing_off: String,
    Execution_place: String,
    packet_number: String,
    documents: [{
        name: String,
        date: Date,
        stamp_duty: Number,
        parties: String
    }]
});

var user = mongoose.model("users", sample_schema);

var document = mongoose.model("documents", document_schema);

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
})


router.post('/', (req, res) => {
    var info = req.body;
    console.log(info);

    console.log(info.username)

    if (info.username === "daljit57") {
        res.redirect('/fill')
    }

    // user.find({username: req.body.username}, (err,response)=>{
    //     console.log(response)
    //     var val = response.name;
    //     console.log(val);
    // })

    // let singlePerson = await user.find({username: info.username}).exec();
    // console.log("the answer is" +singlePerson.name);

})

router.get('/users', (req, res) => {
    user.find((err, response) => {
        res.json(response);
    })
})

// router.get('/view',async (req, res) => {
//     // document.find((err,response) =>{
//     //     res.send(response);
//     // })
//     await document.find((err,response) =>{
//         console.log(response);
//         res.render('display',{
//             doc_list: response
//         });
//     })
// })

router.get('/view', (req, res) => {
    // document.find((err,response) =>{
    //     res.send(response);
    // })
     document.find().then((response)=>{
        console.log(response);
        res.render('display',{
            doc_list: response
        })
     }).catch((err)=>{
        console.log(err);
     })
        
})

router.post('/fill', (req, res) => {
    var info = req.body;
    console.log(info);

    // if( !info.sno || !info.noc){
    //     res.send("pls provide full info")
    // }

    var new_data = document({
        purpose : info.purpose,
        sno: info.sno,
        name_of_company: info.noc,
        consent_number: info.cno,
        autorizing_off: info.ao,
        Execution_place: info.ep,
        packet_number: info.pn,
        documents: [{
            name: info.dn1,
            date: info.sd1,
            stamp_duty: info.sdp1,
            parties: info.sp1
        },
        {
            name: info.dn2,
            date: info.sd2,
            stamp_duty: info.sdp2,
            parties: info.sp2
        }
    ]
    })

    new_data.save((err,document) =>{
        if(err) console.log(err);
        else{
            res.send("ADDED SUCCESSFULLY")
        }
    })


})


router.get('/fill', (req, res) => {
    res.sendFile(path.join(__dirname, '../beacon.html'));
})



module.exports = router;