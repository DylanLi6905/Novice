import { Link } from "react-router";
import { useAuth } from "../features/auth/components/useAuth";
import { trpcClient } from "../trpcClient";
import styles from "./Navbar.module.css";

const navbarLinks = [
    { label: "Home", href: "/" },
    { label: "Find a Coach", href: "/find-coach" },
    { label: "Dashboard", href: "/dashboard" },
];

type NavbarProps = {
    theme?: "light" | "dark";
};

export default function Navbar({ theme = "dark" }: NavbarProps) {
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
        <nav className={styles.navbar} data-theme={theme}>
            <Link className={styles.brand} to="/">
                novice
            </Link>

            <div className={styles.linkGroup}>
            {navbarLinks.map((link) => (
                <Link
                    key={link.href}
                    to={link.href}
                    className={styles.navLink}
                >
                    {link.label}
                </Link>
            ))}
            </div>

            <div className={styles.actionGroup}>
            {user ? (
                <>
                    <span className={styles.status}>Logged in</span>
                    <button
                        className={styles.actionButton}
                        onClick={() => void handleLogout()}
                        type="button"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button
                    className={styles.actionButton}
                    onClick={() => void handleLogin()}
                    type="button"
                >
                    Sign up
                </button>
            )}
            </div>
        </nav>
    );
}
