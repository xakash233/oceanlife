"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styles from "./login.module.css";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.webp"
            alt="Ocean Logo"
            width={200}
            height={80}
            className={styles.logo}
            priority
          />
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
        </form>

        <Link href="/admin/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginPage;
