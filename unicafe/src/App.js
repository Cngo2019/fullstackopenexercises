import { useState } from 'react'


const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick} >
        {text}
      </button>
    </div>
  )
}

const Display = ({ text, myValue }) => {
  return (
    <div>
      {text} {myValue}
    </div>
  )
}

const ShowStats = ({ good, bad, neutral }) => {
  const all = good + neutral + bad
  const positive = good / (neutral + bad + good)
  const average = (good + (bad * -1)) / (good + neutral + bad)
  if (!Number.isFinite(positive) || !Number.isFinite(average) || Number.isNaN(average) || Number.isNaN(positive) || all == 0) {
    return (
      <div>
        <p> No Available Stats </p>
      </div>
    )
  }
  return (
    <div>
        <Display text ={"good"} myValue = {good}/>
        <Display text ={"neutral"} myValue = {neutral}/>
        <Display text ={"bad"} myValue = {bad}/>

        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = () => {
    setGood(good + 1)
  }

  const changeNeutral = () => {
    setNeutral(neutral + 1)
  }

  const changeBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Button
       handleClick={changeGood}
       text={"good"}
      />

      <Button
       handleClick={changeNeutral}
       text={"neutral"}
      />

      <Button
       handleClick={changeBad}
       text={"bad"}
      />

      <ShowStats 
          good={good}
          bad={bad}
          neutral={neutral}
      />
    </div>
  )
}

export default App