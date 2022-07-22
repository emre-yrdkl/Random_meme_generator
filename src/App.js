import React, { useState,useEffect } from 'react';
import logo from "./meme-icon.png"
import { Draggable } from 'drag-react';


function App() {

  const [boxSize, setBoxSize] = useState({ w: 0, h: 0 })  //hold screensize
  const [memeArray, setmemeArray] = useState([])  //hold meme urls 
  const [randomNum, setrandomNum] = useState(0)  //hold random number
  const [text, setText] = useState({  //hold top and bottom text
    topText: "",
    bottomText:""
  })  

  useEffect(()=>{ //fetch memes and set meme array
    const search = async()=>{
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setmemeArray(data.data.memes)
    }
    search()
  },[])

  useEffect(() => { // get screen size and set box size

    setBoxSize({
        w: document.querySelector('body').clientWidth / 2, // i didn't want to center the text so i gave these values
        h: document.querySelector('body').clientHeight / 10
    });

}, []);


  console.log(memeArray[0]?.url)//soru işareti olmazsa url'ye erişemiyoruz hata veriyor
  console.log(text.bottomText)

  const randomMeme = () =>{ //create random num

    setrandomNum(Math.floor(Math.random() * (100)))
  }

  function handleChange(event){ //text updates

    const {name, value} = event.target;
    setText(prevMeme=>({
      ...prevMeme,
      [name] : value
    }))
  }


  return (
    <main >
      <div className='head-div'>
        <img className='meme-icon' src={logo} />
        <h1>RANDOM MEME GENERATOR</h1>
      </div>

      <div className='input-div'>
        <input type='text' placeholder='top text' name='topText' value={text.topText} onChange={handleChange} className="text"/>
        <input type='text' placeholder='bottom text' name='bottomText' value={text.bottomText} onChange={handleChange} className="text"/>
      </div>

      <button onClick={randomMeme} style={{marginLeft:15}}>random meme</button>


      <div className="img-div">
        <img src={memeArray[randomNum]?.url} className="img-div"/>

        <Draggable style={{position: 'absolute'}} >
          <div className='paragraph' style={{
                marginLeft: boxSize.w,
                marginTop: boxSize.h
            }}>
              {text.topText}</div>
        </Draggable>

        <Draggable style={{position: 'absolute'}}>
          <div className='paragraph' style={{
                marginLeft: boxSize.w,
                marginTop: (boxSize.h)*4
            }}>
              {text.bottomText}</div>
        </Draggable>
      </div>
    
    </main>
  
  );

}

export default App;
