
class Quiz {

    static url_openTriviaDB = 'https://opentdb.com/api.php?amount=10&type=multiple'
    questions = []
    index = 0
    status = 'OPEN'
    progress = 1


    async init() {
        await this.loadQuestions()
        this.buildQuestion(this.questions[0])

    }


    async loadQuestions() {
        let response = await axios.get(Quiz.url_openTriviaDB)
        this.questions = response.data.results
    }


    buildQuestion(quiz) {

        const title = document.getElementById('title-text')
        const chooses = document.querySelector('.chooses')
        const progresso = document.getElementById('progress')
        const { question, category, incorrect_answers, correct_answer } = quiz

        const alternatives = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);


        //render titulo
        title.innerHTML = question

        //render alternativas
        chooses.innerHTML = ''
        alternatives.forEach(alternative => {
            chooses.innerHTML += `<button class='choose' onclick="quiz.confirm(this)" >${alternative}</button>`
        })

        //render progress

        progresso.innerHTML = `<span class="progress ">Pergunta: ${this.progress}/10`

    }


    confirm(element) {

        const { correct_answer } = this.questions[this.index]
        if (this.status == 'OPEN') {
            if (window.confirm('Tem Certeza?')) {
                this.status = "BLOCKED"
                if (element.textContent == correct_answer) {
                    element.classList.add('correct')
                } else {
                    element.classList.add('incorrect')
                }


            }

        }

    }

    async resetQuiz() {
        if (this.index == 9 && this.status == "BLOCKED") {
            await this.loadQuestions()
            this.buildQuestion(this.questions[0])
            this.status = "OPEN"
            this.index = 0
            this.progress = 1

            const final_message = document.querySelector('.final_message')
            final_message.style.display = 'none'

        }



    }

    nextQuestion() {
        if (this.status == "OPEN") {
            Swal.fire({
                title: 'Aviso',
                text: 'Defina Uma Alternativa',
                icon: 'warning',
                confirmButtonText: 'OK'
            })

            return
        }
        if (this.index < 9) {
            this.status = "OPEN"
            this.index++;
            this.progress++

            this.buildQuestion(this.questions[this.index])
        } else if(this.index == 9){
            const final_message = document.querySelector('.final_message')

            final_message.style.display = 'flex'

            this.progress = 1
        }

    }
}


let quiz = new Quiz();
quiz.init()











