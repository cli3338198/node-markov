"use strict"
/** Command-line tool to generate Markov text. */
const fsP = require("fs/promises");
const MarkovMachine = require("./markov");
const axios = require("axios")

async function makeText(type,path) {
  try{
    if(type === "file"){
      const text = await fsP.readFile(path,"utf8")
      console.log((new MarkovMachine(text)).getText())
    } else {
      const url = new URL(path)
      const response = await axios.get(url)

      console.log((new MarkovMachine(response.data)).getText())
    }
  }
  catch(err){
    console.log(err.code)
  }
}

makeText(process.argv[2],process.argv[3])
