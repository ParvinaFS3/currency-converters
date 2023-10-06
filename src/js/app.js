let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".icon");
let exchangeTxt = document.querySelector(".exchange_rate");
let getBtn = document.querySelector("button");
let select = document.querySelector('#selects');

// Define country_list with currency codes and country names
const country_list = {
  USD: "United States Dollar",
  INR: "Indian Rupee",
  // Add more currencies as needed
};

// Function to update the exchange rate
function updateExchangeRate(from, to, amount) {
  exchangeTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/1326268b652dd35285fdf509/latest/${from}`;
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.result === 'success') {
        const rate = data.conversion_rates[to];
        if (rate) {
          const convertedAmount = (amount * rate).toFixed(2);
          exchangeTxt.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
          exchangeTxt.innerText = "Exchange rate not available";
        }
      } else {
        exchangeTxt.innerText = "Something went wrong";
      }
    })
    .catch(() => {
      exchangeTxt.innerText = "Something went wrong";
    });
}

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected = i === 0 ? (currency_code === "USD" ? "selected" : "") : (currency_code === "INR" ? "selected" : "");

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
    select.innerHTML = optionTag;
  }

  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
}

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = document.querySelector("form input").value || 1;
  updateExchangeRate(fromCurrency.value, toCurrency.value, amount);
});

window.addEventListener("load", () => {
  const amount = document.querySelector("form input").value || 1;
  let a = updateExchangeRate(fromCurrency.value, toCurrency.value, amount);
  console.log(a);
});

icon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  const amount = document.querySelector("form input").value || 1;
  updateExchangeRate(fromCurrency.value, toCurrency.value, amount);
});
