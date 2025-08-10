import React from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoginButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="login-button"
      type="submit"
    >
      Login
    </button>
  );
}
