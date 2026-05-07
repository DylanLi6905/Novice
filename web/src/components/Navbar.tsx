import { useAuth } from "../features/auth/components/useAuth";
import { trpcClient } from "../trpcClient";
import styles from "./Navbar.module.css";

const navbarLinks = [
    { label: "Home", href: "/" },
    { label: "Become an Expert", href: "/expert" },
    { label: "Our Mission", href: "/mission" },
    { label: "Search Bar", href: "/searchbar" },
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
            <a className={styles.brand} href="/">
                novice
            </a>

            <div className={styles.linkGroup}>
            {navbarLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className={styles.navLink}
                >
                    {link.label}
                </a>
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
