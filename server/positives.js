const positives = require("./positives.json"); 
const colors = ["red", "blue", "orange", "purple", "pink", "white"];
let globalId = 2;

module.exports = {
    getPositives: (req,res) => {
res.status(200).send(positives)
    },
    createPositive: (req, res) => {
          const {positiveItem, color} = req.body;
          const newItem = {
              id: globalId,
              positiveItem,
              color
          }
        //   console.log(`Backend newItem is ${newItem.id}`);
          positives.push(newItem)
        //   console.log(`Positives.js: Backend positives now has ` + positives[0].id);
          res.status(200).send(newItem)
          globalId++
      },
      deletePositive: (req, res) => {
          let {id} = req.params;
        //   console.log(`Positives.js id is ${id}`);
        let index = positives.findIndex((elem) => elem.id === +id);
        // console.log(`Positives.js: Index is ${index}`);
        positives.splice(index,1)
        // console.log(`Positives.js: Positives arr are spliced into ${JSON.stringify(positives)}`);
        res.status(200).send(positives)
      },
      updatePositive: (req, res) => {
        let randomNumber = Math.floor(Math.random() * 4);
        let { id } = req.params;
        console.log(`ID inside the backend method: ${id}`);
        positives[id].color = colors[randomNumber];
        // console.log(`Updated positiveItem with new color: ${JSON.stringify(positives[id])}`);
        // console.log(`Positives array to send back: ${JSON.stringify(positives)}`);
        res.status(200).send(positives);
      }
}