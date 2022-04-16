const positives = require("./positives.json"); 
let globalId = 2;

module.exports = {
    createPositive: (req, res) => {
          const {positiveItem} = req.body;
          const newItem = {
              id: globalId,
              positiveItem
          }
          console.log(`newItem is ${newItem}`);
          positives.push(newItem)
          globalId++
          console.log(`positives now has ${positives}`);
          res.status(200).send(newItem.positiveItem)
      }
    }