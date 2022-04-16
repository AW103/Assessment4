
const textBox = document.getElementById("textBox");
const positivesBox = document.getElementById("positivesBox");
const form = document.querySelector("form");

document.getElementById("complimentButton").onclick = function () {
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data;
    printCompliment(data);
  });
};
const printCompliment = data => {
    if(textBox.children) {
        while (textBox.firstChild) {
            textBox.removeChild(textBox.firstChild)
        }
    }
      let compliment = document.createElement("h2");
      compliment.textContent = data;
      textBox.appendChild(compliment);
}

document.getElementById("fortuneButton").onclick = function () {
  axios.get("http://localhost:4000/api/fortune/").then(function (response) {
    const data = response.data;
    printFortune(data);
  });
};
const printFortune = (data) => {
  if(textBox.children) {
      while (textBox.firstChild) {
          textBox.removeChild(textBox.firstChild)
      }
  }
    let fortune = document.createElement("h2");
    fortune.textContent = data;
    textBox.appendChild(fortune);
}

document.getElementById("quoteButton").onclick = function () {
  axios.get("http://localhost:4000/api/quote/").then(function (response) {
    const data = response.data;
    printQuote(data);
  });
};
// quote printing
const printQuote = (data) => {
    if(textBox.children) {
        while (textBox.firstChild) {
            textBox.removeChild(textBox.firstChild)
        }
    }
  let quote = document.createElement("h2");
  quote.textContent = data.q;
  textBox.appendChild(quote);

  let author = document.createElement("p");
  author.textContent = data.a;
  textBox.appendChild(author);
  console.log(textBox.children);
};

//   Rant section
const releaseBtn = document.getElementById("release");
const release = (event) => {
  let rantText = document.querySelector("input");
  rantText.value = "";
};
releaseBtn.addEventListener("click", release);

// flower
const flower = document.querySelector("img");
const breathingFlower = (event) => {
  console.log("Flower clicked");
  flower.classList.toggle("flower");
};
flower.addEventListener("click", breathingFlower);

// positives
const createPositive = (body) => {
  axios.post("http://localhost:4000/api/form/", body).then((res) => {
    const data = res.data;
    displayPositives(data);
    console.log(`frontend data is ${data}`);
  });
};

const submitHandler = (event) => {
  event.preventDefault();
  let input = document.querySelector("#goodThing");
  let newObj = { positiveItem: input.value };
  createPositive(newObj);
  input.value = "";
};

const createPositiveCard = (data) => {
    let itemsList = document.getElementById("itemsList")
    if(!data){
        return alert("Looks like you forgot to type something.")
    }
  const positiveCard = document.createElement("li");
  positiveCard.classList.add("item");
  positiveCard.textContent = `${data}`;
  itemsList.append(positiveCard)
  positivesBox.appendChild(positiveCard);
};

const displayPositives = (arr) => {
  createPositiveCard(arr);
};
form.addEventListener("submit", submitHandler);
