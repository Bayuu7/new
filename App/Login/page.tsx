import React, { useState, useEffect } from 'react';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import LoginButton from './components/LoginButton';
import ForgotPassword from './components/ForgotPassword';
import RegisterLink from './components/RegisterLink';
import '../styles/login.css';

function generateRainDrops(count: number) {
  const drops = [];
  for (let i = 0; i < count; i++) {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${0.5 + Math.random() * 0.5}s`,
      animationDelay: `${Math.random() * 5}s`,
      height: `${10 + Math.random() * 20}px`,
      opacity: 0.3 + Math.random() * 0.5,
    };
    drops.push(<div key={i} className="rain-drop" style={style} />);
  }
  return drops;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rainDrops, setRainDrops] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setRainDrops(generateRainDrops(100));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login with Email: ${email} Password: ${password}`);
    // implement login logic here
  };

  return (
    <>
      <div className="rain">{rainDrops}</div>
      <div className="login-container" style={{ position: 'relative', zIndex: 1 }}>
        <form onSubmit={handleLogin}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <LoginButton onClick={() => {}} disabled={!email || !password} />
        </form>
        <div>
          <ForgotPassword />
          <RegisterLink />
        </div>
      </div>
      <div className="footer">© 2025 DSRT All Rights Reserved</div>
    </>
  );
}
