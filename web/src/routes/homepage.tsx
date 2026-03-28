import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'

export default function Homepage() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      <p>{message}</p>
      <Navbar />
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}
