import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSingleGoal } from "../features/goals/goalSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft } from 'react-icons/fa'


function GoalDetails() {

  const dispatch = useDispatch()
  const params = useParams()


  const { goals } = useSelector((state) => state.goals)

  useEffect(()=> {
    dispatch(getSingleGoal(params.id))
  },[])


  return (
    <>
      <div className="">
        <div className="">
          <Link to='/'>
            <FaArrowLeft />
          </Link>
        </div>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" value={goals._id} id="id" name="id" />
        </div>
        <div className="form-group">
          <label htmlFor="user">User:</label>
          <input type="text" value={goals.user} id="user" name="user" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <input type="text" value={goals.text} id="text" name="text" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Created:</label>
          <input type="text" value={new Date(goals.createdAt).toLocaleString('DE-de')} id="text" name="text" disabled />
        </div>
      </div>
    </>
  )
}

export default GoalDetails