<template>
    <div class="container typer-container">
        <div class="row text-center header-container mt-2">
            <h1 class="header">SpeedTyper <span class="badge bg-secondary">NICE!</span></h1>
        </div>
        <div class="row h-25 text-container">
            <p><span v-for="word in words" :key="word.id">
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
            for(let i = 0 ; i <= splitWords.length; i++) {
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
            paragraph: "I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world. - Albert Einstein",
            input: "",
            counter: 0,
        }
    },
    methods: {
        nextWord(e) {
            e.preventDefault()
            if(this.input == this.currentWord) {
                this.counter++
                this.input = ""
            }
        },
    }
}
</script>