import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import { trpcClient } from "../trpcClient";



export default function Homepage() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    async function loadMessage() {
      const result = await trpcClient.sayHi.query();
      setMessage(result)
    }
    void loadMessage()
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
