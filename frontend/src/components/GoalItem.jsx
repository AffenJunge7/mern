import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'

function GoalItem({goal}) {

  const [goalData, setGoalData] = useState(goal)

  const dispatch = useDispatch()

  useEffect(() => {
    setGoalData(goal)
  },[])

  const onClick = () => {
    dispatch(deleteGoal(goal._id))
  }

  const onChange = (e) => {
    setGoalData((prevState) => (
      {
        ...prevState,
        text: e.target.value
      })
    )
  }

  const onUpdate = (e) => {
    e.preventDefault()

    dispatch(updateGoal({
      id: goal._id,
      text: goalData.text
    }))
  }

  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('de-DE')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={onClick} className="close">X</button>
      <form className="form">
        <div className="form-group">
          <input type="text" defaultValue={goalData.text} onChange={onChange} />
        </div>
        <button className="btn btn-block" onClick={onUpdate}>
          Update
        </button>
      </form>
    </div>
    )
}

export default GoalItem