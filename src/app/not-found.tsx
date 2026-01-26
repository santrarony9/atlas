import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
            <h1 style={{ fontSize: "72px", fontWeight: "bold", color: "#6b2c91" }}>404</h1>
            <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "30px" }}>Page Not Found</h2>
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/" style={{
                display: "inline-block",
                padding: "12px 30px",
                background: "#f5b000",
                color: "#fff",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: "bold"
            }}>
                Back to Home
            </Link>
        </div>
    );
}
