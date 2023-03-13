import React, {useEffect,useState} from 'react';
import './MemeStyle.css';


function Meme() {
       // using state to import the data from the API
       const [memes, setMemes] = useState([]);
       // using usestate to allow the next button to change the picture
       const [memeIndex, setMemeIndex] = useState(0);
       // adding Text to picture
       const [topText, setTopText] = useState('');
       const [bottomText, setBottomText] = useState('');
       
       // function to input text to the picture
       function handleTopTextChange(event) {
              setTopText(event.target.value);
       }
       function handleBottomTextChange(event) {
              setBottomText(event.target.value);
       }
       
       // using function with useState to change the picture Next and Previous
       function handleNextClick(){
              setMemeIndex((memeIndex + 1) % memes.length)
       }
       function handlePrevClick(){
              if (memeIndex === 0) {
                     setMemeIndex(memes.length - 1);
              }else {
                     setMemeIndex(memeIndex - 1);
              }
       }
       
       // generate meme with updated text 
       function handleGenerateMemeClick(){
              const currentMeme = memes[memeIndex];
              const newUrl = `https://api.imgflip.com/caption_image?template_id=${currentMeme.id}&username=Momtaz1992&password=Momtaz_2022&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}`;

              fetch(newUrl)
                .then(res => res.json().then(res => {
                  const newMeme = {
                    id: currentMeme.id,
                    url: res.data.url
                  };
                  setMemes(prevMemes => [
                    ...prevMemes.slice(0, memeIndex),
                    newMeme,
                    ...prevMemes.slice(memeIndex + 1)
                  ]);
                }))
                .catch((error) => console.log(error));
            }

       // import the data from the API
       useEffect(()=> {
              fetch('https://api.imgflip.com/get_memes')
              .then(res => res.json().then(res => {
                     const memes = res.data.memes; 
                     // using state setMemes to set the data
                     setMemes(memes)
                     // catch error
              })).catch((error) => console.log(error));
       },[]);
       
       return (
              memes.length ?
              <div className='container'>
              
              <img className='img' src={memes[memeIndex].url} alt="meme" />

              <input type="text"
              className='memetext'
              placeholder='Top Text'
              value={topText}
              onChange={handleTopTextChange}/>

              <input type="text"
              className='memetext'
              placeholder='Bottom Text'
              value={bottomText}
              onChange={handleBottomTextChange}/>

              <button onClick={handlePrevClick} className="prev-button"> Prev</button>
              <button onClick={handleNextClick} className="Next-button"> Next</button>
              <button onClick={handleGenerateMemeClick} className="generate-button"> Generate Meme</button>
              <hr /> 
              </div> : <>Loading...</>
              
       )
}

export default Meme ;
