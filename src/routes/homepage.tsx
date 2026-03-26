import { Link } from 'react-router'
import Navbar from '../components/Navbar'

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Navbar/>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}
