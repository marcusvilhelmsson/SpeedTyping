<template>
    <div class="container typer-container">
        <h1 class="text-center row h-10">SpeedTyper</h1>
        <div class="row h-20 text-container">
            <p><span v-for="word in words" :key="word.id">
                <span v-bind:class="{highlight: word.text === this.currentWord}">{{word.text}}</span>
                {{" "}}
            </span>
            </p>
        </div>
        <div class="row h-40 input-container">
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
            paragraph: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores ipsam sequi, quis minus architecto temporibus nihil officiis quisquam nisi laudantium doloremque voluptatibus laborum est, aspernatur ratione quibusdam. Asperiores, natus corporis!",
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