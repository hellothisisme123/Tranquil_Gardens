const items = document.querySelectorAll('.item'),
    expandBtns = document.querySelectorAll('.item > .expand-Btn')

expandBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const item = e.target.parentElement
        
        item.classList.toggle('maxedDesc')
    })
})

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

console.log({'initialCart': shoppingCart})




items.forEach(item => {
    item = {
        'select': item,
        'price': item.dataset.price,
        'name': item.dataset.name,
        'type': item.dataset.type,
        'stock': item.dataset.stock,
        'imgName': item.dataset.imgName,
        'description': item.querySelector('.description').innerHTML,
        'orderNowBtn':item.querySelector('.btnWrapper').querySelector('.orderNow'),
        'addToCartBtn': item.querySelector('.btnWrapper').querySelector('.addToCart'),
        'ratingCount': item.dataset.ratingCount,
        'starRating': item.dataset.starRating,
        'amount': item.dataset.amount
    }

    item.orderNowBtn.href = `./purchaseSingleItem.html?name=${item.name}&price=${item.price}&type=${item.type}&stock=${item.stock}&imgName=${item.imgName}&description=${item.description}&ratingCount=${item.ratingCount}&starRating=${item.starRating}&amount=${item.amount}`

    item.addToCartBtn.addEventListener('click', e => {
        const item = {
            'select': e.target.parentElement.parentElement,
            'price': e.target.parentElement.parentElement.dataset.price,
            'name': e.target.parentElement.parentElement.dataset.name,
            'type': e.target.parentElement.parentElement.dataset.type,
            'stock': e.target.parentElement.parentElement.dataset.stock,
            'imgName': e.target.parentElement.parentElement.dataset.imgName,
            'addToCartBtn': e.target.parentElement.parentElement.querySelector('.btnWrapper').querySelector('.addToCart'),
            'starRating': e.target.parentElement.parentElement.dataset.starRating,
            'ratingCount': e.target.parentElement.parentElement.dataset.ratingCount,
            'amount': e.target.parentElement.parentElement.dataset.amount
        }
        item.cartBtnBoundBox = item.addToCartBtn.getBoundingClientRect()

        // creates a leaf element
        let leaf = document.createElement('img')
        leaf.src = './production/svg/leaf.svg'
        leaf.classList.add('leafIcon')
        item.addToCartBtn.appendChild(leaf)

        // animated the leaf to the cart icon
        // it takes a reasonable amount of time each time
        let leafAniDuration = 450 * item.cartBtnBoundBox.top / 800
        setTimeout(() => leaf.remove(), leafAniDuration / 1.025);
        leaf.animate(
            [
                {
                    left: '0',
                    top: '0'
                },
                {
                    left: `${document.documentElement.clientWidth / 1.1 - item.cartBtnBoundBox.left}px`,
                    top: `-${item.cartBtnBoundBox.top}px`
                }
            ],
            {
                duration: leafAniDuration,
                iterations: 1,
                easing: 'cubic-bezier(.57,.34,.83,.67)'
                
            }
        )
        
        // adds item to cart cookie
        delete item['cartBtnBoundBox']
        delete item['addToCartBtn']
        delete item['orderNowBtn']
        delete item['select']
        
        let newItem = true
        // console.log(item)
        shoppingCart.forEach(cartItem => {
            if (cartItem.name == item.name) {
                newItem = false
            }
        })
        
        // adds a new item into the shopping cart
        if (newItem) {
            shoppingCart.push(item)
            console.log(shoppingCart);
        } else { // increments the amount of items when 1 is already in the cart
            // increases the new items amount
            item.amount = parseInt(shoppingCart[shoppingCart.indexOf(shoppingCart.find(x => x.name == item.name))].amount) + 1
            if (item.amount > item.stock) item.amount = item.stock

            // removes the old item
            delete shoppingCart[shoppingCart.indexOf(shoppingCart.find(x => x.name == item.name))]
            shoppingCart = shoppingCart.flat()
            
            // adds the new item to the cart
            shoppingCart.push(item)
        }

        // finalizes the cart items to the cookies
        const date = new Date()
        date.setTime(date.getTime() + 2592000000)
        document.cookie = `shoppingCart=${JSON.stringify(shoppingCart)};expired=${date.toUTCString()};path=/;SameSite=None;Secure`
    })
})
