<template>
    <div class="container typer-container">
        <div class="row text-center header-container mt-2">
            <h1 class="header">SpeedTyper</h1>
        </div>
        <div class="row h-25 text-container">
            <div v-if="countdown > 0" class="countdown"><span class="badge bg-secondary">{{countdown}}</span></div>
            <p v-else><span v-for="word in words" :key="word.id">
                <span v-bind:class="{
                    highlight: word.text === this.currentWord && word.id === this.counter, 
                    correct: word.text === this.currentWord && word.id === this.counter && this.currentWord === this.input,
                    incorrect: word.text === this.currentWord && word.id === this.counter && this.currentWord.length < this.input.length}"
                    >{{word.text}}</span>
                {{" "}}
            </span>
            </p>

        </div>
        <div class="row h-50 input-container">
            <form v-on:keydown.space="nextWord" v-on:submit.prevent>
                <input placeholder="..." type="text" class="input-field" v-model="input" autofocus>
            </form>
        </div>
        <div class="controls-container">
            <button type="button" @click="reload" class="btn btn-secondary btn-reload">Reload</button>
            <button type="button" @click="reset" class="btn btn-secondary btn-reset">Reset</button>
        </div>
    </div>
</template>

<script>
import highlightWords from 'highlight-words';

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
            let splitWords = this.text.split(" ") 
            let words = []
            
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
        },
        chunks: function() {
            return highlightWords({
                text: this.paragraph,
                query: this.input,
                matchExactly: true,
            })
        }
    },
    data: function(){
        return {
            paragraph: "Hello World! Have a great day",
            input: "",
            counter: 0,
            countdown: 5
        }
    },
    methods: {
        nextWord(e) {
            e.preventDefault()
            if(this.input == this.currentWord ) {
                if(this.counter < (this.words.length - 1)){
                    this.counter++
                }
                else {
                    console.log("Done")
                    this.input = ""
                    this.counter = 0
                }
                this.input = ""
            }
        },
        reset(e){
            e.preventDefault()
            this.counter = 0
            this.input = ""
            this.countDownTimer()
        },
        countDownTimer() {
            if(this.countdown > 0) {
                setTimeout(() => {
                    this.countdown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        }
    }
}
</script>