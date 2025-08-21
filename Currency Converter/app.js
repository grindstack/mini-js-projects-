const BASE_URL = "https://v6.exchangerate-api.com/v6/9cf9ae9fb5a5c85f819fa2be/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const newMsg = document.querySelector(".msg");

for(let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "PKR"){
            newOption.selected = true;
        }else if(select.name === "to" && currCode === "MAD"){
            newOption.selected = true;
        }
   }
   select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
   });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal =amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    let URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    newMsg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal * rate} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img  = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});