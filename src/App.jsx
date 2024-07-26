/*eslint-disable*/
import { useState, useCallback, useEffect, useRef} from "react"

function App() {
  const [length,setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passwordReference = useRef(null);
  
  const copyToClip = useCallback(()=>{
    window.alert("Password copied to clipboard")
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="`~!@#$%^&*(){}-_+-/*" 

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword])

  useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-[80%] h-32 border-solid border-4 rounded-3xl border-yellow-400 flex justify-center flex-wrap">
        <h1 className="text-green-300 sm:text-5xl sm:bg-[#000] sm:w-[80%] sm:h-10 sm:rounded-lg items-center sm:justify-center sm:hidden md:flex ">Password Generator</h1>
        <input type="text" ref={passwordReference} value={password} readOnly placeholder="Password" className="w-[90%] text-center h-16 rounded-xl text-lg"></input>
      </div>
      <div className="w-[40%] h-16 mb-auto flex flex-wrap justify-around items-center">
        <label className="text-green-400">Range :{length}</label> 
        <input type="range" min={6} max={30} value={length} className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}/>
        <label htmlFor="numberAllow" className="text-green-400 cursor-pointer" >Add Number</label>
        <input type="checkbox" id="numberAllow" defaultChecked={numAllowed} onChange={()=>{setNumAllowed((previousvalue)=>!previousvalue)}}/>
        <label htmlFor="charAllow" className="text-green-400  cursor-pointer" >Add Character</label>
        <input type="checkbox" id="charAllow" defaultChecked={charAllowed} onChange={()=>{setCharAllowed ((previousvalue)=>!previousvalue)}}/>
        <button className="p-4 bg-green-400 text-blue-500 rounded-3xl mt-10 hover:bg-green-700 hover:text-white"
        onClick={copyToClip}
        >Copy password</button>
      </div>
    </>
  )
}

export default App
