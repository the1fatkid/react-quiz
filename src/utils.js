import { Children } from "react";
import { reactMCQs } from "./questions";

let usedIndexes=[]

export function chooseRandomQuestion(){
    if (usedIndexes.length === reactMCQs.length) return null; // All questions used
    let randomIdx;
    do{
        randomIdx= Math.floor(Math.random()* reactMCQs.length)
    }while(usedIndexes.includes(randomIdx))
    usedIndexes.push(randomIdx)

    return reactMCQs[randomIdx]
}

export function resetUsedQuestions() {
    usedIndexes=[];
}
  