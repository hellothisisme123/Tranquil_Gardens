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

// let cookiesAllowed = true

const setCookies = () => {
    let cookies = document.cookie
    cookies = cookies.split(';')
    console.log(cookies);

    cookies.forEach(cookie => {
        cookie = cookie.trim()
        cookie = cookie.split('=')
        // console.log(cookie[0]);
        
        window[cookie[0]] = cookie[1]
    });
    
    console.log(cookies, window)
}

const allowCookies = (setValue) => {
    const date = new Date()
    date.setTime(date.getTime() + 2592000000) // taken from https://www.w3schools.com/js/js_cookies.asp
    document.cookie = `cookiesAllowed=${setValue};${`expires=${date.toUTCString()}`};path=/;SameSite=None;Secure`

    // window.cookiesAllowed
    setCookies()
    console.log(window)
}

const setColorTheme = () => {
    if (window.cookiesAllowed == 'false') {
        document.documentElement.dataset.theme = 'regular'
    }

    document.documentElement.dataset.theme = window.colorThemeCookie
}



const colorTheme = (theme) => {
    if (window.cookiesAllowed == 'false') {
        console.log(window.cookiesAllowed);
        document.documentElement.dataset.theme = theme
    } else if (window.cookiesAllowed) {   
        
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
        const date = new Date()
        date.setTime(date.getTime() + 2592000000) // taken from https://www.w3schools.com/js/js_cookies.asp
        
        document.cookie = `colorThemeCookie=${theme};${`expires=${date.toUTCString()}`};path=/;SameSite=None;Secure`
        // console.log(document.cookie);
        
        setCookies()
        setColorTheme()
    }
}

setCookies()
setColorTheme()





window.addEventListener('resize', (e) => { checkWindowSize(1) })