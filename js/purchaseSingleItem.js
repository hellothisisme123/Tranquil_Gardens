let itemData = Object.fromEntries(new URLSearchParams(location.search))
console.log(itemData);

const title = document.querySelector('.title'),
      cost = document.querySelector('.cost'),
      starRatingWrapper = document.querySelector('.starRatingWrapper'),
      ratingCount = document.querySelector('.ratingCount'),
      description = document.querySelector('.description'),
      img = document.querySelector('.imgWrapper > img')
      stock = document.querySelector('.stock')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

title.innerHTML = itemData.name
description.innerHTML = itemData.description
cost.innerHTML = formatter.format(itemData.price)
ratingCount.innerHTML = `${Math.floor(Math.random()*258)} Ratings`
stock.innerHTML = `Only ${itemData.stock} Left`

img.src = `./production/images/shop/${itemData.imgName}`
img.alt = itemData.name

// fills in the stars accordingly to the starCount
const starCount = Math.floor(Math.random() * 5 + 1)
Array.from(starRatingWrapper.children).forEach((star, i) => {
    if (star.tagName != 'I') return
    
    if (starCount - i > 0) {
        star.classList.remove('fa-regular')
        star.classList.add('fa-solid')
    } else {
        star.classList.add('fa-regular')
        star.classList.remove('fa-solid')
    }
});

