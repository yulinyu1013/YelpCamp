const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 1;
        const camp = new Campground({
            author: '61241413c865f23b79f123ea',
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:{
                type: "Point",
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            images: [{

                "url": "https://res.cloudinary.com/dak0crwfy/image/upload/v1629915269/YelpCamp/addvib1aubhsnyr0xbwy.jpg",
                "filename": "YelpCamp/addvib1aubhsnyr0xbwy"
            },
            {

                "url": "https://res.cloudinary.com/dak0crwfy/image/upload/v1629915269/YelpCamp/r0tbas5pznody23pse0t.jpg",
                "filename": "YelpCamp/r0tbas5pznody23pse0t"
            }],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis repellendus, aliquam quisquam officia atque quaerat recusandae! Facilis sint ipsa architecto! Fuga eos qui dolore ut natus, sequi temporibus facere explicabo.",
            price: price
        })
        await camp.save();


    }
}

seedDB().then(() => {
    mongoose.connection.close();
});