const items = document.querySelectorAll('.item'),
    expandBtns = document.querySelectorAll('.item > .expand-Btn')

expandBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const item = e.target.parentElement
        
        item.classList.toggle('maxedDesc')
    })
})

items.forEach(item => {
    item = {
        'select': item,
        'price': item.dataset.price,
        'name': item.dataset.name,
        'type': item.dataset.type,
        'stock': item.dataset.stock,
        'imgName': item.dataset.imgName,
        'orderNowBtn':item.querySelector('.btnWrapper').querySelector('.orderNow'),
        'addToCartBtn': item.querySelector('.btnWrapper').querySelector('.addToCart')
    }

    item.orderNowBtn.href = `./purchaseSingleItem.html?name=${item.name}&price=${item.price}&type=${item.type}&stock=${item.stock}&imgName=${item.imgName}`


    
    
})