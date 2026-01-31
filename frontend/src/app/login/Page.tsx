import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { loginEmail, loginGoogle } from '../../features/auth/services/AuthService';

export default function Login() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      const user = await loginEmail(email, password);
      setUser(user);               
      router.push('/tasks');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginGoogle();
      setUser(user);               
      router.push('/tasks');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleEmailLogin}>
        Login
      </button>

      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}