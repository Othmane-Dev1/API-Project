// On importe notre modèle Mongoose pour interagir avec la collection "posts" dans la DB
const PostModel = require("../models/post.models");

module.exports.getPosts = async (req, res) => {
    // PostModel.find() retourne tous les documents de la collection posts
    const posts = await PostModel.find(); // async parce qu'on fait une opération MongoDB = base de données = ça prend un petit délai on attend avec await 
    res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  //  Vérifie que le champ "message" est bien présent dans la requête
    if (!req.body.message) {
      // Si pas de message on renvoie une erreur 400
      res.status(400).json({ message: "Merci d'ajouter un message" });
    }

// On crée un nouveau post dans la base de données
    const post = await PostModel.create({
      message: req.body.message, // Le contenu du message (envoyé depuis le frontend)
      author: req.body.author,   // L'auteur du message (optionnel selon ton besoin)
    });

    // On renvoie le post créé au client avec un statut 200 
    res.status(200).json(post);
};

module.exports.editPosts = async (req, res)=> {
    const post = await PostModel.findById(req.params.id)

    if (!post){
        res.status(400).json({ message: "Ce post n'existe pas"});
    }

    const updatePost = await PostModel.findByIdAndUpdate(post, req.body,
        {new: true});

    res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (!post){
        res.status(400).json({ message: "Ce post n'existe pas"});
    }

    await post.deleteOne();
    res.status(200).json("Message supprimé "+ req.params.id);

};

module.exports.likePost = async (req, res) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {likers: req.body.userId }},
            {new: true}
        );
        if (!updatedPost){
            return res.status(404).json({ message: "Post non trouvé" });
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json(err)
    }
};
module.exports.dislikePost = async (req, res) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {likers: req.body.userId }},
            {new: true}
        );
        if (!updatedPost){
            return res.status(404).json({ message: "Post non trouvé" });
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json(err)
    }
};