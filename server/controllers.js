const quotes = require("./db.json");

module.exports = {
    getCompliment: (req, res) => {
        const compliments = [
          "Gee, you're a smart cookie!",
          "Cool shirt!",
          "Your Javascript skills are stellar.",
        ];
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        res.status(200).send(randomCompliment);
      },
      getFortune:  (req, res) => {
        const fortunes = [
          "Many blessings will enter your life soon.",
          "A light heart carries you through all the hard times.",
          "Allow compassion to guide your decisions.",
          "Don't let your limitations overshadow your talents.",
          "Failure is the path of lease persistence.",
          "It is better to deal with problems before they arise.",
        ];
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
        res.status(200).send(randomFortune);
      },
      getQuote: (req, res) => {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomIndex];
        console.log(randomQuote);
        res.status(200).send(randomQuote);
      }
}