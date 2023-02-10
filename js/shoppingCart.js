
// sets the shopping cart according to cookies
let shoppingCart = []
let cookies = document.cookie
cookies = cookies.split(';')
cookies.forEach((cookie, i) => {
    cookies[i] = cookies[i].trim()
    cookies[i] = cookies[i].split('=')

    if (cookies[i][0] == 'shoppingCart') {
        cookies[i][1] = JSON.parse(cookies[i][1])
        cookies[i][1] = cookies[i][1]

        shoppingCart = cookies[i][1]
    }
})
console.log(shoppingCart)

const emptynessTitle = document.querySelector('.emptynessTitle') 

// removes "Wow, so empty..." if the cart is full
if (shoppingCart.length > 0) emptynessTitle.remove()



// the amount of the item the user is buying input
const quantityInputs = document.querySelectorAll('.item > .dataWrapper > .amountWrapper')
quantityInputs.forEach(wrapper => {
    // variable initializations
    let upBtn = wrapper.querySelector('button.up'),
        downBtn = wrapper.querySelector('button.down'),
        input = wrapper.querySelector('input'),
        btns = wrapper.querySelectorAll('button')

    // limites to exclusively numbers
    input.addEventListener('change', e => {
        input.value = parseInt(input.value)
        if (isNaN(input.value)) input.value = 1
    })

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            // up and down increments
            if (btn == downBtn) input.value = parseInt(input.value) - 1
            else if (btn == upBtn) input.value = parseInt(input.value) + 1

            // min
            if (input.value < 0) {
                input.value = 0
            }

            // max
            if (input.value > 7) {
                input.value = 7
                let capLabel = document.createElement('div')
                capLabel.classList.add('capLabel')
                capLabel.innerHTML = `stock limit of ${7} reached`
                input.parentElement.appendChild(capLabel)
                setTimeout(() => {
                    capLabel.remove()
                }, 1000);
            }
        })
    })
})

// the remove item buttons
const removeItemBtns = document.querySelectorAll('.item > .dataWrapper > .removeItem')
removeItemBtns.forEach(btn => {
    // removes item from DOM
    let item = btn.parentElement.parentElement
    btn.addEventListener('click', e => {
        item.remove()
    })

    // remove item from cookies
})
