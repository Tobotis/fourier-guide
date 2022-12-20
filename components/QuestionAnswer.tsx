import * as React from 'react'
import { arraysEqual } from '../utils/general'
// Interface für Answer-Objekte (Blaupause)
export class Answer {
  correct: boolean
  constructor(correct = false) {
    this.correct = correct
  }
}

// Interface für das übergebene Obeject an den QuestionAnswer-FC
interface Props {
  // question: React.ReactNode
  //answers: Array<Answer>
  children: Array<React.ReactNode>
}

// QuestionAnswer Komponent
const QuestionAnswer: React.FC<Props> = ({ children }: Props) => {
  let question = children[0]
  let answers: Array<any> = children.filter((child: any) => {
    return child.type?.name == 'Answer'
  })

  // Ermitteln der korrekten Antworten
  let correct_answers: Array<boolean> = Array(answers.length).fill(false)
  answers.forEach((answer, index) => {
    if (answer.props['correct']) {
      correct_answers[index] = true
    }
  })
  let correctAnswerCount: number = answers.filter((e) => {
    if (e.props['correct']) {
      return true
    }
  }).length
  // Ab mehr als einer korrekten Antwort, handelt es sich um eine MCQ
  let isMultipleChoice: boolean = correctAnswerCount > 1
  // STATE-Management
  let [result, setResult] = React.useState<string>('')
  let [resultPositive, setResultPositive] = React.useState<boolean>(true)
  let [selectedAnswers, setSelectedAnswers] = React.useState<Array<boolean>>(
    Array(answers.length).fill(false)
  )
  // Wrapper für event der checkbox
  function onTickedWrapper(index: number) {
    return (event: React.BaseSyntheticEvent) => {
      onTicked(event, index)
    }
  }

  // Ausführen beim anklicken einer Antwort
  function onTicked(event: React.BaseSyntheticEvent, index: number) {
    let newTickedAnswers: Array<boolean> = isMultipleChoice
      ? selectedAnswers
      : Array(answers.length).fill(false)
    if (isMultipleChoice) {
      let state: boolean = event.target.checked
      newTickedAnswers[index] = state
    } else {
      newTickedAnswers[index] = true
    }
    setSelectedAnswers(newTickedAnswers)
  }

  function onAnswer() {
    let selectedAnswerCount: number = selectedAnswers.filter((e) => e).length
    if (selectedAnswerCount != correctAnswerCount) {
      setResult(
        'Du hast ' +
          selectedAnswerCount +
          ' statt ' +
          correctAnswerCount +
          ' Antworten ausgewählt.'
      )
      setResultPositive(false)
      return
    }
    if (arraysEqual(selectedAnswers, correct_answers)) {
      setResult('Richtig!')
      setResultPositive(true)
      return
    } else {
      setResult('Dies ist leider nicht korrekt. Probiere es nochmal!')
      setResultPositive(false)
      return
    }
  }
  return (
    <div className="border-2 border-gray-400 p-3 rounded-2xl my-5 w-auto">
      <div className="flex flex-col space-y-0">
        <p className="text-lg p-0 m-0">{question}</p>
        <p className="text-gray-600 text-xs m-0 pt-0">
          Es gibt {correctAnswerCount} korrekte{' '}
          {correctAnswerCount == 1 ? 'Antwort' : 'Antworten'}.
        </p>
      </div>
      <form>
        <div className="pt-3">
          {answers.map((answer, i) => {
            return (
              <div key={i.toString()}>
                <input
                  type={isMultipleChoice ? 'checkbox' : 'radio'}
                  onClick={onTickedWrapper(i)}
                  name="answer"
                />{' '}
                <>{answer.props.children}</>
              </div>
            )
          })}
        </div>
      </form>
      {result != '' ? (
        resultPositive ? (
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

export default QuestionAnswer
