import {createContext,useState} from "react";
import runChat from '../config/gemini'; 
import { createPortal } from "react-dom";
export const Context= createContext();
const ContextProvider=(props)=>{ 
    const [input, setInput]=useState("");
    const [recentPrompt, setRecentPrompt]=useState("");
    const  [prevPrompts, setPrevPrompts]=useState([]);
    const [showResult, setShowResult]=useState(false);
    const [loading, setLoading]=useState(false);
    const [resultData, setResultData]=useState("");
    const delayParam=(index,nextWord)=>{
            setTimeout(()=>{
                    setResultData(prev=>prev+nextWord);
            },75*index)
    }
    const onSent=async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input)
       const res =  await runChat(input);
       let responseArray= res.split("**");
       let newArray;
       for(let i=0;i<responseArray.length;i++){
        if(i===0||i%2!==1){
            newArray+=responseArray[i];
        
        }   else {
            newArray+="<b>"+responseArray[i]+"<b>";
        
        }
        }
        let newArray2= newArray.split("*").join("<br>");
        let newResponseArray= newArray2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayParam(i,nextWord);
        }
        setLoading(false);
     
        setInput("");

    }



    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider; 
