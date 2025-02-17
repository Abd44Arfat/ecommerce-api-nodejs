import { connect } from "mongoose";

export const dbConnection =connect("mongodb+srv://nodejsfullecommerce:06925270*aA@cluster0.6line1m.mongodb.net/fullecommerce").then(() => {
    console.log("Database connected");
})