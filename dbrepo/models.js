var mongoose = require("mongoose");



let dbURI = "mongodb+srv://pak:pak@cluster0.hrkro.mongodb.net/pak?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true,
useUnifiedTopology: true });


mongoose.connection.on('connected', function (){
    console.log("mongoose is connected");
});

mongoose.connection.on('disconnected', function(){
    console.log("mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err){
    console.log('mongoose connection error:', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function(){
        console.log('Mongoose default connection is closed');
        process.exit(0);
    });
    
});



var userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "gender": String,
    "createdOn": { "type": Date,"default": Date.now},

});



var userModel = mongoose.model("users", userSchema);

var otpSchema = new mongoose.Schema({
    "email": String,
    "otpCode": String,
    "createdOn": { "type": Date, "default": Date.now},


});

var optModel = mongoose.model("users", userSchema);

var otpSchema = new mongoose.Schema({
    
})