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
          <div className="admin-login-mark-wrap">
            <img src="/brand/logo-official-gold.png" alt="Global Orbit" className="admin-login-mark" />
          </div>
          <p className="admin-login-kicker">Studio console</p>
          <h1>
            Sign in to <span>Global Orbit</span>
          </h1>
          <p>Manage published pages, media, and inbound enquiries from one authenticated workspace.</p>
        </div>
        <div className="admin-login-card">
          <div className="admin-login-card-mark-wrap">
            <img src="/brand/logo-official-gold.png" alt="" className="admin-login-card-mark" />
          </div>
          <h2>Admin access</h2>
          <p className="admin-login-sub">Use your studio credentials. Sessions are httpOnly and signed.</p>
          <form onSubmit={onSubmit}>
            <label>
              Username
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="admin-login-eye"
                onClick={() => setShow((value) => !value)}
                aria-pressed={show}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? "Hide" : "Show"}
              </button>
            </label>
            <label className="admin-login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Keep me signed in for 7 days
            </label>
            <button type="submit" className="admin-login-submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            {error ? (
              <p className="admin-login-error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
