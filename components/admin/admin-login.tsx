"use client";

import { useState } from "react";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/orbit/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, remember }),
    });
    const data = (await response.json()) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(data.error || "Invalid username or password");
      return;
    }
    window.location.assign("/admin");
  }

  return (
    <div className="admin-login-stage">
      <div
        className="admin-login-photo"
        style={{ backgroundImage: "url(/brand/hero-uhd-office.jpg)" }}
      />
      <div className="admin-login-shade" />
      <div className="admin-login-grid">
        <div className="admin-login-copy">
          <img src="/brand/logo-official-gold.png" alt="Global Orbit" className="admin-login-mark" />
          <h1>
            Welcome <span>Back</span>
          </h1>
          <p>Access your admin panel and manage your business with confidence.</p>
          <div className="admin-login-pills">
            {[
              ["Total Control", "📊"],
              ["Secure Access", "🛡️"],
              ["Easy Management", "⚙️"],
              ["All in One Place", "☁️"],
            ].map(([label, icon]) => (
              <div key={label} className="admin-login-pill">
                <span>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="admin-login-card">
          <img src="/brand/logo-official-gold.png" alt="" className="admin-login-card-mark" />
          <h2>Admin Login</h2>
          <p className="admin-login-sub">Sign in to access your dashboard</p>
          <form onSubmit={onSubmit} autoComplete="off">
            <label>
              <span className="sr-only">Email or Username</span>
              <span className="admin-login-icon">✉</span>
              <input
                name="admin-user"
                type="text"
                required
                autoComplete="off"
                placeholder="Email or Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">Password</span>
              <span className="admin-login-icon">🔒</span>
              <input
                name="admin-pass"
                type={show ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="button" className="admin-login-eye" onClick={() => setShow((v) => !v)} aria-label="Toggle password">
                {show ? "🙈" : "👁"}
              </button>
            </label>
            <div className="admin-login-row">
              <label className="admin-login-remember">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                Remember me
              </label>
              <span className="admin-login-forgot">Forgot password?</span>
            </div>
            <button type="submit" className="admin-login-submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign In"}
              <span>→</span>
            </button>
            {error ? <p className="admin-login-error">{error}</p> : null}
          </form>
          <div className="admin-login-or">OR</div>
          <p className="admin-login-secure">
            <span>🛡️</span> Secure & Protected
            <small>Your data is encrypted and safe with us.</small>
          </p>
        </div>
      </div>
    </div>
  );
}
