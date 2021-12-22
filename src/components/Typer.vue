<template>
    <div class="container typer-container">
        <div class="row text-center header-container mt-2">
            <h1 class="header">Speed<span class="alt">Typer</span></h1>
        </div>
        <div class="row h-25 text-container">
            <div>
                <p>
                    <span v-for="word in words" :key="word.id">
                        <span v-bind:class="{
                            highlight: word.text === this.currentWord && word.id === this.counter, 
                            correct: word.text === this.currentWord && word.id === this.counter && this.currentWord === this.input,
                            incorrect: word.text === this.currentWord && word.id === this.counter && this.currentWord.length < this.input.length}"
                            >{{word.text}}</span>
                        {{" "}}
                    </span>
                </p>
                <p class="author">- {{author}}</p>
            </div>
            <div v-if="countdown > 0" class="countdown"><span class="badge bg-secondary">{{countdown}}</span></div>
        </div>
        <div class="row h-50 input-container">
            <form v-on:keydown.space="nextWord" v-on:submit.prevent>
                <input placeholder="..." type="text" ref="inputField" class="input-field" v-model="input" autofocus :disabled="countdown > 0">
            </form>
            <ul>
                <li>Latest WPM: {{latestWpm}}</li>
                <li>Highest WPM: {{highestWpm}}</li>
            </ul>
        </div>
        <div class="controls-container text-center">
            <button type="button" @click="reload" class="btn btn-secondary btn-reload">Reload</button>
            <button type="button" @click="reset" class="btn btn-secondary btn-reset">Reset</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Typer',
    components: {},
    computed: {
        text: function() {
            return this.paragraph
        },
        result: function () {
            return this.input   
        },
        words: function () {
            let splitWords = this.text.split(/[ ]+/) 
            let words = []

            splitWords = this.filterText(splitWords)

            for(let i = 0 ; i < splitWords.length; i++) {
                let word = {
                    id : i,
                    text : splitWords[i]
                }
                words[i] = word
            }
            return words
        },
        currentWord: function() {
            return this.words[this.counter].text
        }
    },
    mounted(){
        this.reload()
    },
    data: function(){
        return {
            paragraph: "",
            author: "",
            input: "",
            counter: 0,
            countdown: 3,
            highestWpm: 0,
            latestWpm: 0,
            startTime: 0
        }
    },
    methods: {
        async nextWord(e) {
            if(e) e.preventDefault()
            if(this.input == this.currentWord ) {
                if(this.counter < (this.words.length - 1)){
                    this.counter++
                }
                else {
                    this.updateWpm()
                    this.reload()
                }
                this.input = ""
            }
        },

        getWpm() {
            if(this.startTime) {
                let currentTime = new Date()
                let minutes = this.getMinutesBetween(currentTime, this.startTime)
                let characters = this.getCharacterCount()
                return ((characters / 5) / minutes) 
            }
            else {
                return 0
            }
        },

        updateWpm() {
            const wpm = this.getWpm() 
            this.latestWpm = wpm
            if(this.highestWpm < wpm) this.highestWpm = wpm
        },

        getCharacterCount() {
            let characterCount = 0
            const words = this.words
            for(const word in words){
                characterCount += words[word].text.length
            }
            return characterCount
        },

        filterText(array){
            const filteredCharacters = ['‘','—']
            for(let filteredCharacter in filteredCharacters) {
                if(array.includes(filteredCharacter)) {
                    array.splice(array.indexOf(filteredCharacter), 1); 
                }
            }
            return array
        },

        reset(e) {
            if(e) e.preventDefault()
            this.counter = 0
            this.input = ""
            this.countdown = 3
            this.countDownTimer()
        },

        async reload(e) {
            this.getNewQuote()
            this.reset(e)
        },

        countDownTimer() {
            if(this.countdown > 0) {
                setTimeout(() => {
                    this.countdown -= 1
                    this.countDownTimer()
                }, 1000)
            } else {
                this.$nextTick(() => this.$refs.inputField.focus())
                this.startTimer()
            }
        },

        startTimer() {
            this.startTime = new Date()
        },

        getMinutesBetween(currentTime, startTime) {
            const msDiff = currentTime - startTime 
            const minutes = (msDiff/1000/60)
            return minutes
        },

        async getNewQuote() {
            let context = this
            
            var options = {
                method: 'GET',
                url: 'https://quotes15.p.rapidapi.com/quotes/random/',
                headers: {
                    'x-rapidapi-host': 'quotes15.p.rapidapi.com',
                    'x-rapidapi-key': 'b8075e33fcmshd4b8d70bedd73b2p1a9b93jsnc9376d4ff162'
                }
            };

            await axios.request(options).then(function (response) {
                console.log(response.data)
                //context.paragraph = response.data.content
                context.paragraph = "This is a test string"
                context.author = response.data.originator.name
            }).catch(function (error) {
                console.error(error);
            });
            
        }
    }
}
</script>