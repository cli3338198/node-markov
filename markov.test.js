"use strict";
const MarkovMachine = require("./markov");

describe("getChains", function () {
  test("map", function () {
    const phrase =
      "I like cats"
      ;
    const newMarkovMachine = new MarkovMachine(phrase);
    expect(newMarkovMachine.getChains()).toEqual({
      "I": ["like"],
      "like": ["cats"],
      "cats": [null],
    });
  });
});

describe("getText", function () {
  test("randomized text", function () {
    const phrase =
      "I am learning programming.";
    const newMarkovMachine = new MarkovMachine(phrase);
    expect(newMarkovMachine.getText()).toEqual(
      "I am learning programming.");
  });
});

describe("randomWord", function () {
  test("random word", function () {
    const phrase =
    "I am learning programming.";
    const newMarkovMachine = new MarkovMachine(phrase);
    expect(newMarkovMachine.chains["I"]).toEqual(
      ["am"]);
  });
});


describe("getText", function () {
  test("randomized text", function () {
    const phrase =
      "The cat is a cat";
    const newMarkovMachine = new MarkovMachine(phrase);
    expect(newMarkovMachine.getText()).toMatch(
      /The cat(\.+)?/);
  });
});

// test each word is in the next words possibilities using a loop

describe("getText", function () {
  test("randomized text", function () {
    const phrase =
      "The cat is a cat";
    const newMarkovChain = new MarkovMachine(phrase);
    expect(newMarkovChain.chains['The']).toEqual(["cat"]);
    expect(newMarkovChain.chains['cat']).toEqual(['is',null]);
    expect(newMarkovChain.chains['is']).toEqual(['a']);
    expect(newMarkovChain.chains['a']).toEqual(['cat']);
})});