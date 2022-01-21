const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jjjsdppasd:DbmKGcuSz4Q@personal-finance-manage.rj0jy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

module.exports = {
    mongoose
}