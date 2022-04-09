import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'

function GoalItem({goal}) {


  const [goalData, setGoalData] = useState(goal)

  const dispatch = useDispatch()

  const onDelete = () => {
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
      <div className="">
        <Link to={`/goals/${goal._id}`}>Details</Link>
      </div>
      <div>
        {new Date(goal.createdAt).toLocaleString('de-DE')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={onDelete} className="close">X</button>
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