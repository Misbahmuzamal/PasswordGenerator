import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useCallback,useEffect,useRef } from 'react';
import './index.css';
function Password() {
    const[Length,setLength]=useState(8)
    const[Password,setPassword]=useState('')
    const[characterAllowed,setCharacterAllowed]=useState(false)
    const[numberAllowed,setNumberAllowed]=useState(false)
    let passwordRef=useRef(null)
    function copyPasswordToClickbord(){
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(Password)
    }
    
    let passwordGenerator=useCallback(()=>{
        let pass='';
        let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        if(numberAllowed)str+='0123456789';
        if(characterAllowed)str+='~!@#$%^&*()+_-=;,./<>?|~';
        for (let i= 0; i < Length; i++) {
            let char=Math.floor(Math.random()*(str.length+1));
            pass+=str.charAt(char)
            
        }
        setPassword(pass)
    },[Length,characterAllowed,numberAllowed])
    useEffect(()=>{
        passwordGenerator()
    },[Length,characterAllowed,numberAllowed])
    return(
        <>
        <div className="container">
            <h1>Password Generator</h1>
            <div className="inputs">
                <input type="text" placeholder='password' className='password'
                ref={passwordRef} value={Password} />
                <button onClick={copyPasswordToClickbord}>Copy</button>
                </div>
                <div className="form">
                    <input type="range" className='range'
                    min={6} 
                    max={50}
                    value={Length}
                    onChange={(e)=>{
                        setLength(e.target.value)
                    }}/>{Length}:Length
                    <input type="checkbox" className='char' checked={characterAllowed}
                    onChange={()=>{
                        setCharacterAllowed((prev)=> !prev)
                    }}  />Character
                    <input type="checkbox" className='num' checked={numberAllowed}
                     onChange={()=>{
                        setNumberAllowed((prev)=> !prev)
                    }}  />Number
                </div>
        </div>
        </>
    )
}
export default Password
