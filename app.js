const BaseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selectOptions = document.querySelectorAll(".selectBox select");
let lastResult = document.querySelector(".lastResult");
let btn = document.querySelector("#submit");
let userInput = document.querySelector("#userValue");
let fromCurr = document.querySelector("#from");
let toCurr = document.querySelector("#to");

window.addEventListener("load", exchangeRate);

for(let select of selectOptions){
    for (codes in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = codes;
        newOptions.value = codes;
        select.append(newOptions);
        if(select.name == "from" && codes == "USD"){
            newOptions.selected = "selected"; 
        }
        else if(select.name == "to" && codes == "INR"){
            newOptions.selected = "selected"; 
        }
    }
    select.addEventListener("change", (event) =>{
        upgradeFlag(event.target);
    })
}

const upgradeFlag = (event)=>{
    let currCode = event.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    let img = event.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    exchangeRate();
})

async function exchangeRate() {

    const url = `${BaseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let amtValue = userInput.value * rate;
    lastResult.innerText = `${userInput.value} ${fromCurr.value} = ${amtValue} ${toCurr.value}`;
}