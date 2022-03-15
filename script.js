const dropList = document.querySelectorAll(".drop-list Select ");
 fromCurrency= document.querySelector(".from Select ");
 toCurrency = document.querySelector(".to Select ");
getButton = document.querySelector("form button");

for (let i = 0 ; i < dropList.length; i++){
    for(currency_code in country_code){
        //este script seleciona BRL e USD como taxa de câmbio padrão
        let selected;
        if(i == 0){
            selected = currency_code == "BRL" ? "selected" : "";
        } else if(i == 1){
            selected = currency_code == "USD" ? "selected" : "";
        }

        //criando uma option tag com o valor currency code como texto e valor
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserindo options tag dentro de um tag selecionado
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change" , e =>{
        LoadFlag(e.target); 
    });
}
function LoadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src =`https://countryflagsapi.com/png/${country_code[code]}`
        }
    }
}

window.addEventListener("load", () =>{
   getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click" , ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value =  toCurrency.value;
    toCurrency.value = tempCode;
    LoadFlag( fromCurrency); 
    LoadFlag( toCurrency); 
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "calculando câmbio...";
    let url = `https://v6.exchangerate-api.com/v6/c0c3a44b3c6b1d69fabb64eb/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let ExchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * ExchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        const exchangeRateTxt = document.querySelector(".exchange-rate");
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} =${totalExchangeRate} ${toCurrency.value}`;
    }) .catch(()=>{
        exchangeRateTxt.innerText = "Um problema ocorreu";
    });

}