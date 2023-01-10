const left = document.querySelector('.contact_type.left'),
      middle = document.querySelector('.contact_type.middle'),
      right = document.querySelector('.contact_type.right'),
      transitional = document.querySelector('.transitional'),
      container = document.querySelector('.container')
      

const suggestions =     document.querySelector('.contact_section[data-type="suggestions"]'),
      webComplaints =   document.querySelector('.contact_section[data-type="web_complaint"]'),
      storeComplaints = document.querySelector('.contact_section[data-type="store_complaint"]'),
      sections = [suggestions, webComplaints, storeComplaints] 

const clearSections = (notCleared) => {
    sections.forEach((section, i) => { 
        if (section != notCleared) {
            section.remove()
            transitional.style.gridTemplateColumns = 'repeat(1, 1fr)'
        }
    });

    setTimeout(() => {
        left.remove()
        middle.remove()
        right.remove()            
    }, aniTime);
}

const aniTime = 750

left.addEventListener('click', (e) => {
    console.log(left)
    // transitional.style.display = 'grid'
    // transitional.style.display = 'grid'
    transitional.removeAttribute('data-preClick')
    setTimeout(() => {
        transitional.style.transition = `left ${aniTime}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
        transitional.style.left = '0'
    
        clearSections(suggestions)
    }, 0);
})

middle.addEventListener('click', (e) => {
    console.log(middle)
    // transitional.style.display = 'grid'
    transitional.removeAttribute('data-preClick')
    transitional.style.backgroundColor = 'var(--color_2)'

    setTimeout(() => {
        transitional.style.transition = `left ${aniTime}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
        transitional.style.left = '0'

        clearSections(webComplaints)
    }, 0);
})

right.addEventListener('click', (e) => {
    console.log(right)
    // transitional.style.display = 'grid'
    transitional.removeAttribute('data-preClick')

    setTimeout(() => {
        transitional.style.transition = `left ${aniTime}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
        transitional.style.left = '0'

        clearSections(storeComplaints)
    }, 0);
})


