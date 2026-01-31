import { useContext, useState } from 'react';
import { AuthContext } from '../../features/auth/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { loginEmail, loginGoogle } = useContext(AuthContext)!;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      await loginEmail(email, password);
      router.push('/tasks');
    } catch (error) {
      console.error('Login error:', error);
      // You could add error state here
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginGoogle();
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
