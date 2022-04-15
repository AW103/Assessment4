document.getElementById("quoteButton").onclick = function () {
    axios.get("http://localhost:4000/api/quote/")
        .then(function (response) {
          const data = response.data;
          printQuote(data)
        });
  };

  const printQuote = (data) => {
      const quoteCard = document.getElementById("quoteBox")
      let quote = document.createElement("h2")
      quote.textContent = data.q
      quoteCard.appendChild(quote)

      let author = document.createElement("p")
      author.textContent = data.a
      quoteCard.appendChild(author)
      console.log(quoteCard.children);
    
  }

  