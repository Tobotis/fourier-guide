import { type } from 'os'
import * as React from 'react'
import { arraysEqual } from '../utils/general.jsx'

/* Beispiel-Nutzung:

<Quiz>
  Wie findest du dieses Quiz?
  <Answer>Gut</Answer>
  <Answer correct={true}>Schlecht</Answer>
</Quiz>

*/

export class Answer {
  text
  correct

  constructor(text: string, correct = false) {
    this.text = text
    this.correct = correct
  }
}

const Quiz: React.FC = ({ children }: any) => {
  let [result, setResult]: any = React.useState('')
  let [result_positive, setResult_positive]: any = React.useState(true)

  function onTickedWrapper(index: number) {
    return (event: React.BaseSyntheticEvent) => {
      onTicked(event, index)
    }
  }

  function onTicked(event: React.BaseSyntheticEvent, index: number) {
    let state: boolean = event.target.checked
    let copy: Array<boolean> = selected_answers
    copy[index] = state
    set_selected_answers(copy)
  }

  function onAnswer() {
    // Richtige Anzahl prüfen
    let selected_answer_count: number = selected_answers.filter((e) => e).length
    if (selected_answer_count != correct_answer_count) {
      setResult(
        'Du hast ' +
          selected_answer_count +
          ' statt ' +
          correct_answer_count +
          ' Antworten ausgewählt.'
      )
      setResult_positive(false)
      return
    }

    if (arraysEqual(selected_answers, correct_answers)) {
      setResult('Richtig!')
      setResult_positive(true)
      return
    } else {
      setResult('Dies ist leider nicht korrekt. Probiere es nochmal!')
      setResult_positive(false)
      return
    }
  }

  let elements: Array<any> = children.props.children
  let question: string = elements[0]
  let answers: Array<any> = elements.filter((e) => {
    return typeof e == typeof {}
  })

  let [selected_answers, set_selected_answers] = React.useState(
    Array(answers.length).fill(false)
  )

  let correct_answers: Array<boolean> = Array(answers.length).fill(false)

  answers.forEach((answer, index) => {
    if (answer.props['correct']) {
      correct_answers[index] = true
    }
  })

  let correct_answer_count = answers.filter((e) => {
    let props = e.props
    if (props['correct']) {
      return true
    }
  }).length

  return (
    <div className="border-2 border-gray-400 p-3 rounded-2xl my-5 w-auto">
      <div className="flex flex-col space-y-0">
        <p className="text-lg p-0 m-0">{question}</p>
        <p className="text-gray-600 text-xs m-0 pt-0">
          Es gibt {correct_answer_count} korrekte{' '}
          {correct_answer_count == 1 ? 'Antwort' : 'Antworten'}.
        </p>
      </div>
      <div className="pt-3">
        {answers.map((e, i) => {
          return (
            <div>
              <input
                type="checkbox"
                onClick={onTickedWrapper(i)}
                value={selected_answers[i]}
              />{' '}
              {e.props.children}
            </div>
          )
        })}
      </div>
      {result != '' ? (
        result_positive ? (
          <div className={'text-xs text-green-500'}>{result}</div>
        ) : (
          <div className={'text-xs text-red-700'}>{result}</div>
        )
      ) : (
        <></>
      )}

      <button type="button" onClick={onAnswer} className="mt-3">
        <div className="bg-sky-500 text-white rounded-lg px-2 py-1">
          Antworten
        </div>
      </button>
    </div>
  )
}

export default Quiz
