import express from "express";
import Router from "./Routers/index.js";
import reply from "./Common/reply.js";
import dotenv from "dotenv";
import Stripe from 'stripe';
import bodyparser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config();
// import 'dotenv/config'
import cors from "./Common/cors.js";

const publishable_key="pk_test_51MLmP1SFtMACslTJwOelYU7kIv3WiqWBf9GS5NiAhvgAPAX2DDs8UwDotQDe4gR6CsVYdHBydUE3CiYa6xgTa8KV00axnMHLkc"
const secert_key="sk_test_51MLmP1SFtMACslTJa6NdMEvP2y6dk75FWOLV7UhvSvB0iQ1Q7zD4rByOfzlAtiauoE74nirgziXi2KO4vNFADH1r00wm9JlgAA"
const app = express();

const stripe = new Stripe(secert_key);


app.use(express.json());
app.use(cors);

const PORT = 5000;
app.use(Router);


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View Engine Setup
app.set('views', './views');

app.set('view engine', 'ejs');
// app.set('view options', {
//   layout: false
// });


app.get("/", (req, res) => {
    res.render("Home.ejs",{
       key:publishable_key
    })
    // res.send("working")
});


const customer = await stripe.customers.create({
  email: 'customer@example.com',
})

app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
