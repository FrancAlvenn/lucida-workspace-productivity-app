import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <button type="button" onClick={signInWithGoogle}>Sign in with Google</button>
    </form>
    </>
  );
}
