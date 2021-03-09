// ********THIS ENTIRE INTRO IS C IN CRUD******

const { Db } = require('mongodb');
const mongoose = require('mongoose');
//here mongo wil run on server 27017 and then autmactially create the DB if there isnt onr
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });
//this is how a Schema or DB blueprint is created for our mongoose to follow and we can specify requirements/validation here as well
const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Uh oh! No name specified, please try again"]
    },
    rating: { type: Number, min: 1, max: 10 },
    review: String
});
const usersSchema = new mongoose.Schema({
    name: String,
    age: Number

})
const User = mongoose.model('User', usersSchema)

const user = new User({
        name: "Johnson",
        age: 69
    })
    // user.save();

//mongo will automatically use lodash to match our casing to the schemas ie Fruit>fruits
const Fruit = mongoose.model('Fruit', fruitsSchema);
const fruit = new Fruit({
    name: 'Pear',
    rating: 6,
    review: "Weird but good fruit."
});
// fruit.save();
// const orange = new Fruit({
//     name: 'Orange',
//     rating: 7,
//     review: "Extremely nice and juicy, so orange and tangy!"
// });
// const grape = new Fruit({
//     name: 'Grape',
//     rating: 9,
//     review: "Best fruits ever, so freaking nice!"
// })

// const kiwi = new Fruit({
//     name: 'Kiwi',
//     rating: 10,
//     review: "Love this fruit! Love the hair"
// });
// Fruit.insertMany([kiwi, orange, grape], function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("WooHoo we saved all the fruits to our database");
//     }
// });

// *****THIS IS HOW TO READ FROM OUR MONGOOSE DATABASE******

Fruit.find(function(err, fruits) {
    mongoose.connection.close(); //good to always have our server shut itself down after CRUD
    if (err) {
        console.log(err);
    } else { //this loops through our fruit DB and we ask it to show all our names using dot notation
        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        })
    }

});
//*****HERE IS A WAY TO UPDATE PER THE DOCS*****
// Fruit.updateOne({ _id: '6047075fdab31808dcf851e8' }, { name: "Peach" },
//     function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(fruit);
//         }
//     }
// );

// *****THIS IS A WAY TO SEARCH AND DELETE, LIKE A DAGGONE SNIPER RIFLE*****
// Fruit.findOneAndDelete({ name: 'Peach' }, function(err) {

//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fruit.name);
//     }

// });