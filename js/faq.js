let questions = document.querySelectorAll('.question')

questions.forEach(question => {
    question.addEventListener('click', (e, target) => {
        if (e.target.dataset.state) target = e.target
        else if (e.target.parentElement.dataset.state) target = e.target.parentElement

        if (target.dataset.state == 'up') target.dataset.state = 'down'
        else if (target.dataset.state == 'down') target.dataset.state = 'up'
    })
})