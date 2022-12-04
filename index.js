let cardNumberDefault = '#### #### #### ####'
let cardNumberLabel = document.getElementById("cardNumberLabel")
let cardItem = document.querySelector("#card-item")

for (let i in cardNumberDefault){
    let span = document.createElement("span")
    span.innerHTML=`<div>${cardNumberDefault[i]}</div>`
    span.id = i
    if (cardNumberDefault[i] === ' ') span.className = "card-item-numberItem active"
    else span.className = "card-item-numberItem"
    cardNumberLabel.append(span)
}

cardNumberInput.oninput = function(event){
    event.target.value = event.target.value.replace(/[^\s\d]/g, '')
    let value = event.target.value 
        for (let i in cardNumberDefault){
            if (value.length>i){
                if ((i>=5 && i<=8) || (i>=10 && i<=13)){
                    document.getElementById(`${i}`).innerText = "*"
                } 
                else if (cardNumberDefault[i]==' '){
                    document.getElementById(`${+i+1}`).innerText = `${value[i]}`
                }
                else {
                    document.getElementById(`${i}`).innerText = `${value[i]}`   
                }
            }
            else if (document.getElementById(`${i}`).innerText!=`${cardNumberDefault[i]}`){
                document.getElementById(`${i}`).innerText=`${cardNumberDefault[i]}`
            }
        }
}
cardNumberInput.onkeyup = function(event){
    let value = event.target.value 
    let groupOfNumbers1 = value.match(/^\d{5}$/)
    let groupOfNumbers2 = value.match(/^\d{4}\s\d{5}$/)
    let groupOfNumbers3 = value.match(/^\d{4}\s\d{4}\s\d{5}$/)
    if ((groupOfNumbers1 || groupOfNumbers2 || groupOfNumbers3) && event.code!="Backspace"){
        event.target.value  = value.replace(/.$/, " ")+ event.key;
    }
}

cardItem.onclick = function(event){
    let focus = cardItem.querySelector(".card-item-focus")
    if (event.target.closest("#cardNumberLabel")){
        focus.className = "card-item-focus active"
        focus.style.cssText = "width: 376px; height: 47px; transform: translateX(15px) translateY(114px);"
        cardNumberInput.focus()
    }
    if (event.target.closest(".card-item-name")){
        focus.className = "card-item-focus active"
        focus.style.cssText = "width: 315px; height: 57px; transform: translateX(15px) translateY(196px);"
        cardHolderInput.focus()
    }
    if (event.target.closest(".card-item-date")){
        focus.className = "card-item-focus active"
        focus.style.cssText = "width: 80px; height: 57px; transform: translateX(335px) translateY(196px);"
        if (event.target.closest("#cardMonth")){
            cardMonthSelect.focus()
        }
        if (event.target.closest("#cardYear")){
            cardYearSelect.focus()
        }
    }
}
    

let cardHolderInput = document.querySelector("#cardHolderInput")
let cardHolder = document.querySelector("#cardHolder")

cardHolderInput.addEventListener("input", function(event){
    event.target.value = event.target.value.replace(/[^a-z A-Zа-яА-Я]/g, '')
    let value = event.target.value
    cardHolder.innerText = value
    if (value === ''){
        cardHolder.innerText = "FULL NAME"
    }
})

// Month and Year

let cardYearSelect = document.querySelector("#cardYearSelect")
let cardMonthSelect = document.querySelector("#cardMonthSelect")
let minCardYear = new Date().getFullYear()
let cardMonth = document.querySelector('#cardMonth')
let cardYear = document.querySelector('#cardYear')

for (let i=1; i<=12; i++){
    let option = document.createElement("option")
    if (i<10){
        option.innerText="0"+`${i}`
    }
    else {
        option.innerText=`${i}`
    }
    option.id = "o"+`${i}`
    option.value = i
    cardMonthSelect.append(option)
}

for (let i=0; i<12; i++){
    let option = document.createElement("option")
    option.innerText=`${+i+minCardYear}`
    cardYearSelect.append(option)
}

cardMonthSelect.onchange = function(event){
    let value = event.target.value
    if (value<10){
        cardMonth.innerText="0"+`${value}`
    }
    else cardMonth.innerText = value
}
cardYearSelect.onchange = function(event){
    let value = event.target.value
    cardYear.innerText = "/"+value.slice(-2)
    if (value == minCardYear){
        if (cardMonthSelect.value < new Date().getMonth() + 1){
            cardMonthSelect.value=''
        }
        for (let i=1; i<=12; i++){
            let option = document.getElementById("o"+`${i}`)
            if(option.value < new Date().getMonth() + 1){
                option.setAttribute('disabled', true)
            }
        }
    }
    else{
        for (let i=1; i<=12; i++){
            let option = document.getElementById("o"+`${i}`)
            if (option.disabled){
                option.removeAttribute('disabled')
            }
        }
    }
}


// cvv

let cardCvvInput = document.querySelector("#cardCvvInput")
let cvv = document.querySelector("#cvv")


cardCvvInput.onfocus = function(){
    cardItem.className = "card-item active"
}
cardCvvInput.onblur = function(){
    cardItem.className = "card-item"
}
cardCvvInput.oninput = function(event){
    event.target.value = event.target.value.replace(/\D/g, '')
    cvv.innerText += '*'
}