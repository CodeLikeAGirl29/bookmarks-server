const express = require('express')

const cardRouter = express.Router()
const bodyParser = express.json()

const cards = [{
    id: 1,
    title: 'Task One',
    content: 'This is card one'
  }];

cardRouter
  .route('/card')
  .get((req, res) => {
    res.json(cards);
  })
  .post(bodyParser, (req, res) => {
         const { title, content } = req.body
    
         if (!title) {
           logger.error(`Title is required`);
           return res
  }

cardRouter
  .route('/card/:id')
  .get((req, res) => {
         const { id } = req.params;
       const card = cards.find(c => c.id == id);
    
       // make sure we found a card
       if (!card) {
         logger.error(`Card with id ${id} not found.`);
         return res
           .status(404)
           .send('Card Not Found');
       }
    
       res.json(card);
  })
  .delete((req, res) => {
    const { id } = req.params;
    
       const cardIndex = cards.findIndex(c => c.id == id);
    
       if (cardIndex === -1) {
         logger.error(`Card with id ${id} not found.`);
         return res
           .status(404)
           .send('Not found');
       }
    
       //remove card from lists
       //assume cardIds are not duplicated in the cardIds array
       lists.forEach(list => {
         const cardIds = list.cardIds.filter(cid => cid !== id);
         list.cardIds = cardIds;
       });
    
       cards.splice(cardIndex, 1);
    
       logger.info(`Card with id ${id} deleted.`);
    
       res
         .status(204)
         .end();
  })

module.exports = cardRouter