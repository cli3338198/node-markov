"use strict";
/** Textual markov chain generator. */

const fsP = require("fs/promises");

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: implement this!
    const map = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      map[word] = map[word] || [];
      if (nextWord === undefined) {
        map[word].push(null);
      } else {
        map[word].push(nextWord);
      }
    }

    return map;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    const result = [this.words[0]];

    while (true) {
      const lastWord = result[result.length - 1];
      const nextWord = this.randomWord(lastWord);
      if (nextWord === null) break;
      result.push(nextWord);
    }

    return result.join(" ");
  }

  /**
   * random word generator
   * - takes in a word and returns a random 'next' word from the markov chain
   */
  randomWord(word) {
    const randomIdx = Math.floor(Math.random() * this.chains[word].length);
    return this.chains[word][randomIdx];
  }
}

// const catInHatMachine = new MarkovMachine(
//   "The cat is in the hat. The cat is the cat. The hat is a cat."
// );

// console.log(catInHatMachine.chains);
// console.log(catInHatMachine.getText());

// async function start(path) {
//   try {
//     const text = await fsP.readFile(path, "utf8");
//     const m = new MarkovMachine(text);
//     console.log(m.getText());
//   } catch (err) {
//     console.log(err.code);
//   }
//}

// start(process.argv[2]);

// const t = new MarkovMachine(fsP.readFile("eggs.txt", "utf8"));
// console.log(t.getText());
// console.log((new MarkovMachine("The cat is a cat").chains))
module.exports = MarkovMachine