import { Link } from 'react-router'

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}
