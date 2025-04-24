const mongoose = require("mongoose");

// asynch parce que on va devoir a chaque fois chercher une connexion et revenir 
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log("Mongo connecté")
        
    } catch (err) {
        console.log("Erreur de connexion Mongo:", err);
        process.exit(1);
    }
};

module.exports = connectDB;