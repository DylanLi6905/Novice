import { useAuth } from "../features/auth/components/Authentication";

const navbarLinks= [
    {label: "Home", href: "/"},
    {label: "Become an Expert", href: "/expert"},
    {label: "Our Mission", href:"/mission"},
    {label: "Search Bar", href: "/searchbar"},
]

export default function Navbar() {
    const { user } = useAuth()
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '12px 0',
            }}
        >
            {navbarLinks.map((link) => (
                <a key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                    {link.label}
                </a>
            ))}
            {user ? (<span>Logged in</span>) : (<a href="http://localhost:8001/api/auth/login">Login</a>)}
        </nav>
    )
}
