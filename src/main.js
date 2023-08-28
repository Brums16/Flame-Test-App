import './styles.css'
import React, {useState} from 'react'




const Main = () => {

const [flameColorState, setFlameColorState] = useState({color1: 'gold', color2: 'yellow'}) 
const [currentElementState, setCurrentElementState] = useState('none')
const [score, setScore] = useState(0)

// Note for future, setting state works a lot better as one object with 2 colors as properties, rather than changing 2 separate states onClick

const [mode, setMode] = useState('sandbox')




const flameColors = [
    {
        name: 'Lithium',
        symbol: 'Li',
        color: {color1: 'crimson',
                color2: 'lightcoral'}               
    },
    {
        name: 'Sodium',
        symbol: 'Na',
        color: {color1: '#ffff00',
                color2: '#fdfd96'}
    },
    {
        name: 'Potassium',
        symbol: 'K',
        color: {color1: 'mediumpurple',
                color2: 'plum'}
    },
    {
        name: 'Calcium',
        symbol: 'Ca',
        color: {color1: 'darkorange',
                color2: 'orange'}
    },
    {
        name: 'Copper',
        symbol: 'Cu',
        color: {color1: 'green',
                color2: 'lightgreen'}
    },
    {
        name: 'Selenium',
        symbol: 'Se',
        color: {color1: 'blue',
                color2: 'lightblue'}
    }
]


const Button = () => {
    return (
        flameColors.map((element) => 
        <button className="element-button" 
        onClick={() => mode === 'sandbox' ? setFlameColorState(element.color) : checkAnswer(element.name)}>{element.name}</button>
    ))
}

const checkAnswer = (name) => {
    if (name === currentElementState){
        setScore(score+1)
        let randInt = Math.floor(Math.random()*6)
        setFlameColorState(flameColors[randInt].color)
        setCurrentElementState(flameColors[randInt].name)
    }
    else {
        console.log('wrong answer')
        setScore(0)
    }
}   

/* calling the changeMode function makes way more sense, this way I can reset colours to default within the function, rather than just setting the state onclick
with an inline function when clicking the buttons.  also means I can just have one changemode function rather than two separate inline functions! */

const changeMode = () => {
    if (mode === 'sandbox'){
        setMode('test')
        setFlameColorState({color1: 'white', color2: 'white'})
    } 
     else {setMode('sandbox')
        setFlameColorState({color1: 'gold', color2: 'yellow'})
    }
}

const newTest = () => {
    let randInt = Math.floor(Math.random()*6)
    setFlameColorState(flameColors[randInt].color)
    setCurrentElementState(flameColors[randInt].name)
}

// bunsen-div is being made twice for no reason so moving that to a separate component

const Bunsen = () => {
    return (
        <div className="bunsen-div">
                <div className="bunsen-flame" style={{backgroundColor: `${flameColorState.color1}`, border: `10px solid ${flameColorState.color2}`}}>
                </div>
                <div className = "bunsen-tube">               
                </div>
                <div className = "bunsen-stand">                  
                </div>
            </div>
    )
}



if (mode === 'sandbox'){
    return (
        <div className = 'main'>
            <h2>Sandbox Mode</h2>
            <p>Click an element to see its flame color...</p>
        <div className="main-grid">
            <div className="buttons-grid">
            <Button />
            </div>
            <Bunsen />

        </div>
        
        <button onClick={changeMode} class="change-mode-button">Test yourself</button>

        </div>
    )}

if (mode === 'test'){
    return (
        <div className = 'main'>
            <h2>Test Mode</h2>
            <p>Click the right element for each flame color...</p>
            <button onClick={newTest} class="start-test-button">Start!</button>
            <div className ="main-grid">
            <div className ="buttons-grid">
            <Button />
            </div>
            <Bunsen />

            </div>
            <p>Current Streak: {score}</p>
            <button onClick={changeMode} class="change-mode-button">Switch to Sandbox mode</button>
        </div>
        
    )}

}

export default Main