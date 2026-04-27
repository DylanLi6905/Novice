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
    <main
      style={{
        minHeight: '100vh',
        padding: '32px 24px',
        background: '#f8fafc',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <Navbar />

        <section
          style={{
            marginTop: '48px',
            padding: '48px 32px',
            borderRadius: '24px',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              margin: '0 0 12px',
              fontSize: '3rem',
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            Homepage
          </h1>

          <p
            style={{
              margin: '0 0 24px',
              fontSize: '1rem',
              color: '#475569',
            }}
          >
            {message}
          </p>

          <Link
            to="/find-coach"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 24px',
              borderRadius: '999px',
              background: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 10px 24px rgba(37, 99, 235, 0.22)',
            }}
          >
            Find a coach
          </Link>

          <div style={{ marginTop: '20px' }}>
            <Link
              to="/dashboard"
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Go to Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}