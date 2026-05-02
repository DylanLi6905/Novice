import { Link } from 'react-router'
import Navbar from '../components/Navbar'

export default function Homepage() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Novice</h1>
        <Navbar />
      </div>
        <p
        style = {{
          textAlign: 'center',
        }}
        >Book your expert
        </p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}
