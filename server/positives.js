const positives = require("./positives.json"); 
let globalId = 3;

module.exports = {
    getPositives: (req,res) => {
res.status(200).send(positives)
    },
    createPositive: (req, res) => {
          const {positiveItem} = req.body;
          const newItem = {
              id: globalId,
              positiveItem
          }
          console.log(`Backend newItem is ${newItem.id}`);
          positives.push(newItem)
          console.log(`Backend positives now has ` + positives[0].id);
          res.status(200).send(newItem)
          globalId++
      },
      deletePositive: (req, res) => {
          console.log(`Backend:req.params.id is ${req.params.id}`);
        let index = positives.findIndex(elem => { 
            console.log(`Elem is ${elem.id}`) 
            elem.id === +req.params.id
        });
        positives.splice(index,1)
        console.log(`Backend: Positives are spliced into ${positives}`);
        res.status(200).send(positives)
      }
    }