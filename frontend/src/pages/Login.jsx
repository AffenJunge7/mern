import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>
          Please enter your Credentials!
        </p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className='form-controll' id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" className='form-controll' id="password" name="password" value={password} placeholder="Choose a password" onChange={onChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login