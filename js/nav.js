const ying_yang_logo = document.querySelector('.nav_logo')

const widthCheck = () => {
    let window_width = document.documentElement.clientWidth
    if (window_width <= 600) {
        ying_yang_logo.href = '#'
    } else {
        ying_yang_logo.href = './index.html'
    }
}
window.addEventListener('resize', (e) => widthCheck())
widthCheck()

window.addEventListener('click', (e) => {
    let window_width = document.documentElement.clientWidth
    if (window_width >= 600) return


    const nav = document.querySelector('nav')
    if (e.target == ying_yang_logo.children[0]) {
        e.preventDefault()
        nav.classList.toggle('innactive')
    }
    
    if (nav.classList.length < 1 && e.target != nav && e.target.parentElement != nav && e.target.parentElement.parentElement != nav && e.target.parentElement.parentElement.parentElement != nav) {
        nav.classList.toggle('innactive')
    }
})

const setCookies = () => {
    let cookies = document.cookie
    cookies = cookies.split(';')
    // console.log(cookies);

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
    document.cookie = `colorThemeCookie=regular;${`expires=${date.toUTCString()}`};path=/;SameSite=None;Secure`


    // window.cookiesAllowed
    setCookies()
    setColorTheme()
    console.log(window)
}

const setColorTheme = () => {
    if (window.cookiesAllowed == undefined) {
        document.documentElement.dataset.theme = 'regular'
        return
    }

    if (window.cookiesAllowed == 'true' && document.querySelector('.cookies_container')) {
        document.querySelector('.cookies_container').remove()
    }

    document.documentElement.dataset.theme = window.colorThemeCookie
}



const colorTheme = (theme) => {
    if (window.cookiesAllowed == undefined) {
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





// window.addEventListener('resize', (e) => { checkWindowSize(1) })