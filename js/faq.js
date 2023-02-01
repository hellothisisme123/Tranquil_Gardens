let questions = document.querySelectorAll('.question')

questions.forEach(question => {
    question.addEventListener('click', (e) => {
        if (e.target.classList.length > 0) {
            console.log('direct');
        } else if (e.target.classList.length > 0)
        console.log(e.target);
    })
})