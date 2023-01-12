const express = require('express');
const { Op } = require('sequelize');
const app = express();
const { Joke } = require('./db');

 
// returns in a json format 
app.use(express.json());
// returns an empty object in the terminal 
app.use(express.urlencoded({extended:true}));


// TODO - filter the jokes by tags and content
let jokes =[];
app.get('/jokes', async (req,res, next) => {
  // the code checks whether the the query parameters "tags" or "content" is present in the request 
  // if a "tags" query parameter is present, use the Sequelize "findAll" method to filter joke by this tag 
  // if a "content" query parameter is present, use the findAll method again to filter by this substring 
  // if neither is present, will return all the jokes in the database and sends the filtered jokes as a response 
    try {
        if(req.query.tags) {
            jokes = await Joke.findAll({where: { tags:{[Op.substring]: req.query.tags }}})
          } 
          if(req.query.content)
          {
            jokes = await Joke.findAll({where: { joke: {[Op.substring]: req.query.content }}})
          }
          if(!req.query.tags && ! req.query.content)
          {
            jokes = await Joke.findAll()
          }
          res.send(jokes);
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//Adding a joke to the database. Should accept both columns in the req.body 
app.post("/jokes", async (req,res) => {
  const data = {
    tags: req.body.tags, 
    joke: req.body.joke
  }

  const joke = await Joke.create(data);
  res.send(joke);
})


//Delete a joke from the database by ID 
app.delete("/jokes/:id", async(req,res) => {
  //passing the id in the URL
  const  id  = req.params.id;
  const jokeToDelete = await Joke.destroy({
    where: {id}
  })

  if (jokeToDelete === "") {
    return(`No joke exists with id ${id} in the database`)
  } else {
    res.status(200).send(`Joke with id of ${id} has been deleted`)
  }

})
//Editing a joke by ID, should accept both/either columns in the req.body 
app.put("/jokes/:id", async (req,res) => {
  const id = req.params.id
  const data = {
    tags: req.body.tags, 
    joke: req.body.joke
  }

  const jokeToBeEdited = await Joke.findByPk(id);

// need to check if it exists first
  if (jokeToBeEdited === "") {
    return(`No joke exists with id ${id} in the database`)
  } else {
    jokeToBeEdited.update(
      {tags: data.tags}, 
      {joke: data.joke}
    )
    res.send(`Joke with id of ${id} has been edited `)
  }
 
  });

 
// we export the app, not listening in here, so that we can run tests
module.exports = app;