import express, { request, response } from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());


//Middleware for handling CORS POLICY
//Option 1: Allow All origins with default of cors(*)
app.use(cors());

//Option 2: Allow Custom origins

// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get('/', ( request, response )=>{
    console.log(request);
    return response.status(234).send('welcome to Book Store')
});

app.use('/books', booksRoute); // here '/books' means add this prefix to booksRoute

mongoose
    .connect(mongoDBURL)
        .then(()=>{
            console.log("App is connected to database");
            app.listen(PORT, () => {
                console.log(`App is listening to port ${PORT}`);
            });
    })
        .catch((error)=>{
            console.log(error);
    })