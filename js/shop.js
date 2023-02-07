const items = document.querySelectorAll('.item'),
    expandBtns = document.querySelectorAll('.item > .expand-Btn')

expandBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const item = e.target.parentElement
        
        item.classList.toggle('maxedDesc')
    })
})

let shoppingCart = []

// broken
const getCookies = () => {
    let red = document.cookie
    console.log(red)
    red = red.split(';')
    red.forEach(cookie => {
        red = red.split('=')[1]
        red = JSON.parse(red)
        console.log(red)
    });
}

// works
const setJSONCookie = (cookie, title, expireDate) => {
    if (expireDate == undefined) expireDate = 30

    const date = new Date()
    date.setTime(date.getTime() + expireDate * 24 * 60 * 60)
    document.cookie = `${title}=${JSON.stringify(cookie)};expired=${date.toUTCString()};path=/;SameSite=None;Secure`

    // return getCookies()
}

// works
const setValueCookie = (cookie, title, expireDate) => {
    if (expireDate == undefined) expireDate = 30

    const date = new Date()
    date.setTime(date.getTime() + expireDate * 24 * 60 * 60)
    document.cookie = `${title}=${cookie};expired=${date.toUTCString()};path=/;SameSite=None;Secure`
}

// broken
const setCookiesToWindow = () => {
    console.log(document.cookie);
    let red = document.cookie.split(';')
    console.log(red)
    // document.cookie.split(';')
}

items.forEach(item => {
    item = {
        'select': item,
        'price': item.dataset.price,
        'name': item.dataset.name,
        'type': item.dataset.type,
        'stock': item.dataset.stock,
        'imgName': item.dataset.imgName,
        'description': item.querySelector('.description').innerText,
        'orderNowBtn':item.querySelector('.btnWrapper').querySelector('.orderNow'),
        'addToCartBtn': item.querySelector('.btnWrapper').querySelector('.addToCart')
    }

    item.orderNowBtn.href = `./purchaseSingleItem.html?name=${item.name}&price=${item.price}&type=${item.type}&stock=${item.stock}&imgName=${item.imgName}&description=${item.description}`

    item.addToCartBtn.addEventListener('click', e => {
        const item = {
            'select': e.target.parentElement.parentElement,
            'price': e.target.parentElement.parentElement.dataset.price,
            'name': e.target.parentElement.parentElement.dataset.name,
            'type': e.target.parentElement.parentElement.dataset.type,
            'stock': e.target.parentElement.parentElement.dataset.stock,
            'imgName': e.target.parentElement.parentElement.dataset.imgName,
            'addToCartBtn': e.target.parentElement.parentElement.querySelector('.btnWrapper').querySelector('.addToCart')
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
        shoppingCart.push(item)
        console.log(shoppingCart);

        const date = new Date()
        date.setTime(date.getTime() + 2592000000)
        document.cookie = `shoppingCart=${JSON.stringify(shoppingCart)};expired=${date.toUTCString()};path=/;SameSite=None;Secure`

        

        
        

        // console.log(tmpCookies);
        



    })
})