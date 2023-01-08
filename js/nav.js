const ying_yang_logo = document.querySelector('.nav_logo')
window.addEventListener('click', (e) => {
    if (ying_yang_logo.classList.contains('activeListener')) {
        const nav = document.querySelector('nav')
        const ying_yang_img = ying_yang_logo.childNodes[1]

        if (e.target != nav && e.target.parentElement != nav) { // prevents when clicked inside nav
            nav.classList.add('innactive')
        }
        if (e.target == ying_yang_img) { // only when clicked on the logo
            nav.classList.remove('innactive')
        } 
    }
})

const checkWindowSize = (e) => {
    let window_width = document.documentElement.clientWidth
    
    if (window_width <= 600) { // sets wether the logo button works
        document.body.click()
        ying_yang_logo.classList.add('activeListener')
        ying_yang_logo.removeAttribute('href')
    } else {
        ying_yang_logo.classList.remove('activeListener')
        ying_yang_logo.setAttribute('href', './index.html')

    }
}

checkWindowSize()

window.addEventListener('resize', (e) => { checkWindowSize(1) })