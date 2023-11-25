let kn = document.querySelector("#kn");
let number = document.querySelector("#number");
let name = document.querySelector("#name");
let btn = document.querySelector(".btn");
let div = document.querySelector(".div");
// к карточки в json сервере
const API = "http://localhost:8000/Phons";
fetch(API)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((elem) => {
      // console.log(elem);
      div.innerHTML += `
    <div class="movie" style="
    width: 200px;
    text-align: center;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 30px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.37);
    ">
    <img src="${elem.img}" alt="">
    <h5>Тел: ${elem.number}</h5>
    <h4>Имя: ${elem.name}</h4>
    </div>
    `;
    });
  });

// введите эту команду что получить карточки с сервера -> json-server -w db.json -p 8000

// к карточки в json сервере

btn.addEventListener("click", () => {
  if (!kn.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  let obj = {
    img: kn.value,
    number: number.value,
    name: name.value,
  };
  setItemToStorage(obj);
  createElement();
  kn.value = "";
  number.value = "";
  name.value = "";
});
function setItemToStorage(img) {
  let data = JSON.parse(localStorage.getItem("task-data")) || [];
  data.push(img);
  localStorage.setItem("task-data", JSON.stringify(data));
}

function createElement() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("task-data"));
  div.innerHTML = "";
  newData.forEach((item, index) => {
    let img = document.createElement("div");
    let h5 = document.createElement("div");
    let h4 = document.createElement("div");
    // ? Обработчик событий
    div.innerHTML += `
    <div style="
         width: 200px;
         text-align: center;
         margin-right: 20px;
         margin-left: 20px;
         margin-top: 30px;
         border-radius: 20px;
         background-color: rgba(0, 0, 0, 0.37);
         ">
        <img src="${item.img}" alt="">
        <h5>Тел: ${item.number}</h5>
        <h4>Имя: ${item.name}</h4>
        <button id="btnD" style="
        color: white;
        background-color: black;
        font-size: 10px;
        margin-bottom: 20px;
        padding: 5px 20px;
        border-radius: 20px;
        border: 2px solid rgb(158, 52, 52);
        transition: all 0.3s;
        cursor: pointer;
        ">Delete</button>
        <button id="btnE" style="
        color: white;
        background-color: black;
        font-size: 10px;
        margin-bottom: 20px;
        padding: 5px 20px;
        border-radius: 20px;
        border: 2px solid rgb(158, 52, 52);
        transition: all 0.3s;
        cursor: pointer;
        ">Edit</button>
        </div>
    `;
    div.appendChild(h5);
    div.appendChild(img);
    div.appendChild(h4);
  });
}
createElement();
