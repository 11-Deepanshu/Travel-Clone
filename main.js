const mongoose= require("mongoose");
const initData= require("./data");
const Listing= require("../models/schema");


main().then((res)=>{
    console.log("Connected Successfully");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://localhost:27017/travel");
}

const initDB= async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}

initDB();