
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

const emptynessTitle = document.querySelector('.emptynessTitle'),
      purchaseAll = document.querySelector('.purchaseAll')

// removes "Wow, so empty..." if the cart is full
if (shoppingCart.length > 0) {
    emptynessTitle.style.display = 'none'
} else {
    purchaseAll.style.display = 'none'
}

// creates the items from cookies
const cart = document.querySelector('.cart')

// sets the cost to purchase every item
const setPurchaseAllCost = () => {
    const purchaseAllTotalCost = document.querySelector('.purchaseAll .totalCost')
    let purchaseCost = 0
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    
    shoppingCart.forEach(item => {
        purchaseCost += item.amount * item.price
    })
    
    purchaseAllTotalCost.innerHTML = formatter.format(purchaseCost)    
}
setPurchaseAllCost()

shoppingCart.forEach(item => {
    console.log(item);
    const itemClone = document.querySelector('.item.display-none').cloneNode(true)
    itemClone.classList.toggle('display-none')
    cart.appendChild(itemClone)

    const title = itemClone.querySelector('.title > a'),
          img = itemClone.querySelector('img'),
          cost = itemClone.querySelector('.cost'),
          type = itemClone.querySelector('.type'),
          removeItemBtn = itemClone.querySelector('.removeItem'),
          amountWrapper = itemClone.querySelector('.amountWrapper'),
          ratingCount = itemClone.querySelector('.ratingCount'),
          starWrapper = itemClone.querySelector('.starWrapper')

    title.innerHTML = item.name
    title.href = `./shop.html`
    cost.innerHTML = item.price
    img.src = `./production/images/shop/${item.imgName}`
    img.alt = item.name
    type.innerHTML = `Type: ${item.type}`
    ratingCount.innerHTML = `${item.ratingCount} Ratings:`

    // fills in the stars accordingly to the starRating
    Array.from(starWrapper.children).forEach((star, i) => {
        if (star.tagName != 'I') return
        
        if (item.starRating - i > 0) {
            star.classList.remove('fa-regular')
            star.classList.add('fa-solid')
        } else {
            star.classList.add('fa-regular')
            star.classList.remove('fa-solid')
        }
    });

    // remove item button
    removeItemBtn.addEventListener('click', e => {
        // finds the item to be removed
        const removedItem = shoppingCart.indexOf(shoppingCart.find(x => x.name==`${e.target.parentElement.parentElement.querySelector('.title a').innerHTML}`))

        delete shoppingCart[removedItem]
        shoppingCart = shoppingCart.flat()
        
        // finalizes to cookies
        date = new Date()
        date.setTime(date.getTime() + 2592000000)
        document.cookie = `shoppingCart=${JSON.stringify(shoppingCart)};expired=${date.toUTCString()};path=/;SameSite=None;Secure`

        itemClone.remove()
        setPurchaseAllCost()

        // readds "Wow, so empty..." if cart is empty
        if (shoppingCart.length < 1) {
            console.log(shoppingCart)
            emptynessTitle.style.display = 'flex'
            purchaseAll.style.display = 'none'
        }

    })
    
    // amount input
    const amountInput = itemClone.querySelector('input'),
        amountBtns = amountWrapper.querySelectorAll('button'),
        downBtn = itemClone.querySelector('.amountWrapper > .down'),
        upBtn = itemClone.querySelector('.amountWrapper > .up')

    // sets the default amount of items to the amount defined in the cookies
    amountInput.value = item.amount

    amountInput.addEventListener('change', e => {
        amountInput.value = parseInt(amountInput.value)
        if (isNaN(amountInput.value)) amountInput.value = 1
    })

    amountBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            // up and down increments
            if (btn == downBtn) amountInput.value = parseInt(amountInput.value) - 1
            else if (btn == upBtn) amountInput.value = parseInt(amountInput.value) + 1

            // min
            if (amountInput.value < 1) {
                amountInput.value = 1
            }

            // max
            if (amountInput.value > item.stock) {
                amountInput.value = item.stock
                let capLabel = document.createElement('div')
                capLabel.classList.add('capLabel')
                capLabel.innerHTML = `stock limit of ${item.stock} reached`
                amountInput.parentElement.appendChild(capLabel)
                setTimeout(() => {
                    capLabel.remove()
                }, 1000);
            }

            // finalizes the items amount to the cookies
            item.amount = amountInput.value
            const date = new Date()
            date.setTime(date.getTime() + 2592000000)
            document.cookie = `shoppingCart=${JSON.stringify(shoppingCart)};expired=${date.toUTCString()};path=/;SameSite=None;Secure`

            // sets the purchase all cost
            setPurchaseAllCost()
        })
    })
})

