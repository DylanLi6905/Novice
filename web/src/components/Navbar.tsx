import { useAuth } from "../features/auth/components/useAuth";
import { trpcClient } from "../trpcClient";

const navbarLinks = [
    {label: "Home", href: "/"},
    {label: "Become an Expert", href: "/expert"},
    {label: "Our Mission", href:"/mission"},
    {label: "Search Bar", href: "/searchbar"},
];

export default function Navbar() {
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        await trpcClient.session.logout.mutate();

        setUser(null);
        window.location.href = "/";
    };

    const handleLogin = async () => {
        const response = await trpcClient.session.oauthRedirectUrl.query();
        window.location.href = response.oauthRedirectUrl;
    };

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flex: 1,
            }}
        >
            {navbarLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    style={{ textDecoration: 'none' }}
                >
                    {link.label}
                </a>
            ))}
            {user ? (
                <>
                    <span>Logged in</span>
                    <button onClick={() => void handleLogout()} type="button">
                        Logout
                    </button>
                </>
            ) : (
                <button
                    onClick={() => void handleLogin()}
                    type="button"
                    style={{
                        padding: '5px 10px',
                        
                    }}
                >
                    Login
                </button>
            )}
        </nav>
    );
}
