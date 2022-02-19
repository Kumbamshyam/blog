const mongoose = require('mongoose');

const db = process.env.DATABASE

mongoose.connect(db).then(()=>{
    console.log('database connected ✌️')
}).catch((err)=>{
    console.log(`this is database error 💀  ${err}`)
})