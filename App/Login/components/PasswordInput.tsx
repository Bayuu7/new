import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function PasswordInput({ value, onChange }: Props) {
  return (
    <input
      type="password"
      placeholder="Password"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="password-input"
      required
    />
  );
}
