const textBox = document.getElementById("textBox");
const item = document.getElementById("item");
const positivesBox = document.getElementById("positivesBox");
const form = document.querySelector("form");
let positiveCard;

// const baseURL = `http://localhost:3000/api/`;

axios.get("/").then(res => {
  console.log("print the stuff");
  getPositives(res)
});
const submitHandler = (event) => {
  event.preventDefault();
  let input = document.querySelector("#goodThing");
  let newObj = { positiveItem: input.value, color: input.style.color };
  // console.log(`newObj is ${newObj}`);
  createPositive(newObj);
  input.value = "";
  console.log(input);
};

// Compliment req and functions ----------------------
document.getElementById("complimentButton").onclick = function () {
  axios.get(`/api/compliment`).then(function (response) {
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
  axios.get(`/api/fortune`).then(function (response) {
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
  axios.get(`/api/quote`).then(function (response) {
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
  // console.log(textBox.children);
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
  // console.log("Flower clicked");
  flower.classList.toggle("flower");
};
flower.addEventListener("click", breathingFlower);

// -----------------------------------------------------------------

// Positives req and functions -------------------------------------
const positivesCallback = ({ data: positive }) => displayPositives(positive);

const getPositives = () => {
  axios.get("/api/").then(positivesCallback);
};
const createPositive = (body) => {
  axios.post(`/api/form`, body).then((res) => {
    const data = res.data;
    createPositiveCard(data);
    // console.log(`Main.js: createPositive data is ${data.positiveItem}`);
  });
};
const deletePositive = (id) => {
  axios.delete(`/api/formDelete/${id}`).then(positivesCallback);
  // console.log(`Main.js: delete id is ${id}`);
};

const updatePositive = id => {
  console.log(`ID that passed to updatePositive: ${id}`);
  axios.put(`/api/updatePositive/${id}`).then(res => {
    let newColor = res.data[id].color;
    // console.log(newColor);
    let element = document.getElementById("positivesBox").children[id]; 
    console.log(element);
    element.style.color = newColor;
  });
};

const createPositiveCard = (data) => {
  console.log(`Main.js: createPositiveCard data is ${data}`);
  if (!data) {
    return alert("Looks like you forgot to type something.");
  }
  positiveCard = document.createElement("li");
  positiveCard.setAttribute("id", "item");
  positiveCard.classList.add("item");
  positiveCard.innerHTML = `${data.positiveItem}
  <button class="btn btn-sm btn-outline-secondary add" onclick="deletePositive(${data.id})">DELETE</button>
  <button class="btn btn-sm btn-outline-secondary add" onclick="updatePositive(${data.id})"><i style="font-size: 1rem; color: gray;" class="bi bi-palette"></i></button>`;
  positivesBox.appendChild(positiveCard);
};

const displayPositives = (arr) => {
  positivesBox.innerHTML = ``;
  console.log(`Main.js: displayPositive arr is ${JSON.stringify(arr)}`);
  for (let i = 0; i < arr.length; i++) {
    createPositiveCard(arr[i]);
  }
};

form.addEventListener("submit", submitHandler);
// getPositives();
