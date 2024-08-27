const express= require("express");
const app= express();
const path= require("path");
const mongoose= require("mongoose");
const Listing= require("./models/schema");
const methodOverried= require("method-override");
const ejsMate= require("ejs-mate");

app.set("views",path.join(__dirname,"views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"models")));
app.use(methodOverried("_method"));
app.engine("ejs", ejsMate);


app.listen(8080, () =>{
    console.log("app is listening on port 8080");
});



// connection with mongodb
main().then((res)=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect("mongodb://localhost:27017/travel");
};



// index route
app.get("/listings", async (req,res)=>{
    const lists= await Listing.find();
    res.render("index.ejs",{lists});
});


//  create new route
app.get("/listings/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/listings", async (req, res)=>{
    const data = new Listing(req.body.data);
    await data.save();
    res.redirect('/listings');
})




// edit page
app.get("/listings/:id/edit", async (req, res)=>{
    let{id}= req.params;
    const data= await Listing.findById(id);
    res.render("edit.ejs",{data});
});
// update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const updte= await Listing.findByIdAndUpdate(
        id,
        { ...req.body.data  }, 
        {new: true}
        );
    res.redirect("/listings");
});




// show route
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    let list= await Listing.findById(id);
    res.render("show.ejs",{list});
});



// delete route
app.delete("/listings/:id", async (req, res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});