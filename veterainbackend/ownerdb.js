import mongoose from "mongoose";

const Ownerschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,

    },
    contact: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true,
        unique: false
    },
    state: {
        type: String,
        required: true,
        unique: false
    },
    country: {
        type: String,
        required: true,
        unique: false

    },
    zip: {
        type: String,
        required: true,
        unique: false
    },

    password: {
        type: String,
        required: true,
    },
    pet_name: {
        type: String,
        required: true
    },
    pet_species: {
        type: String,
        enum: ["Dog", "Cattle"],
        required: true,
    },
    weight: {
        type: String,
        required: true
    },




})
const Owner = mongoose.model('Owner', Ownerschema)
export default Owner
