const textBox = document.getElementById("textBox");
const positivesBox = document.getElementById("positivesBox");
const form = document.querySelector("form");

const baseURL = `http://localhost:4000/api/`;

const submitHandler = (event) => {
  event.preventDefault();
  let input = document.querySelector("#goodThing");
  let newObj = { positiveItem: input.value };
  console.log(`newObj is ${newObj}`);
  createPositive(newObj);
  input.value = "";
};

// Compliment req and functions ----------------------
document.getElementById("complimentButton").onclick = function () {
  axios.get(`${baseURL}compliment`).then(function (response) {
    const data = response.data;
    printCompliment(data);
  });
};
const printCompliment = (data) => {
  if (textBox.children) {
    while (textBox.firstChild) {
      textBox.removeChild(textBox.firstChild);
    }
  }
  let compliment = document.createElement("h2");
  compliment.textContent = data;
  textBox.appendChild(compliment);
};
// -----------------------------------------------------

// Fortune req and functions -----------------------------------------
document.getElementById("fortuneButton").onclick = function () {
  axios.get(`${baseURL}fortune`).then(function (response) {
    const data = response.data;
    printFortune(data);
  });
};
const printFortune = (data) => {
  if (textBox.children) {
    while (textBox.firstChild) {
      textBox.removeChild(textBox.firstChild);
    }
  }
  let fortune = document.createElement("h2");
  fortune.textContent = data;
  textBox.appendChild(fortune);
};
// ---------------------------------------------------------------------


// Quote req and functions -----------------------------------------
document.getElementById("quoteButton").onclick = function () {
  axios.get(`${baseURL}quote`).then(function (response) {
    const data = response.data;
    printQuote(data);
  });
};
const printQuote = (data) => {
  if (textBox.children) {
    while (textBox.firstChild) {
      textBox.removeChild(textBox.firstChild);
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
// ---------------------------------------------------------

// Rant and Breath section -----------------------------------------
//   rant 
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

// -----------------------------------------------------------------

// Positives req and functions -------------------------------------
const positivesCallback = ({data: positive}) => displayPositives(positive);
const getPositives = () => {
  axios.get(baseURL).then(positivesCallback)
}
const createPositive = (body) => {
  axios.post(`${baseURL}form`, body).then((res) => {
    const data = res.data;
    createPositiveCard(data);
    console.log(`frontend data is ${data.positiveItem}`);
  });
};
const deletePositive = (id) => {
  axios.delete(`${baseURL}formDelete/${id}`).then(positivesCallback);
};

const createPositiveCard = (data) => {
  console.log(`PositiveCard data is ${data}`);
  let itemsList = document.getElementById("itemsList");
  if (!data) {
    return alert("Looks like you forgot to type something.");
  }
  const positiveCard = document.createElement("li");
  positiveCard.classList.add("item");
  positiveCard.innerHTML= `${data.positiveItem}<button onclick="deletePositive(${data.id})">X</button>`;
  itemsList.append(positiveCard);
  positivesBox.appendChild(positiveCard);
};

const displayPositives = (arr) => {
  console.log(`displayPositive arr is ${arr}`);
  for (let i = 0; i < arr.length; i++) {
    createPositiveCard(arr[i])
}
};

form.addEventListener("submit", submitHandler);
getPositives();
