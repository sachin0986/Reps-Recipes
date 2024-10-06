import express, { request, response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log('DataBase is connected successfully !!');
    app.listen(PORT, () => {
        console.log(`Server is Running on port - ${PORT}`);
    });
}).catch((error) => console.log(error));


const userSchema = new mongoose.Schema

const DrinkModula = mongoose.model("HealthyDrinks", userSchema);
const BreakFastModule = mongoose.model("MorningBreafasts", userSchema);
const LightDinner = mongoose.model("LightDinner", userSchema);
const MenuCard = mongoose.model("MenuCard", userSchema);





app.get("/", (request, response) => {
    response.send("Hey Gym Rat !!");
})

app.get("/dinner", async (request, response) => {
    LightDinner.find({}).then(function(dinner) {
        response.json(dinner)
    }).catch(function(err) {
        console.log(err)
    })
});


app.get("/api/data/all", async (request, response) => {
    MenuCard.find({}).then(function(allmenu) {
        response.json(allmenu)
    }).catch(function(err) {
        console.log(err)
    })
});


app.get("/breakfasts", async (request, response) => {
    BreakFastModule.find({}).then(function(breakfast) {
        response.json(breakfast)
    }).catch(function(err) {
        console.log(err)
    })
});


app.get("/drinks", async (request, response) => {
    DrinkModula.find({}).then(function(drinks) {
        response.json(drinks)
    }).catch(function(err) {
        console.log(err)
    })
});
