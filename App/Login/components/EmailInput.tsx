import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function EmailInput({ value, onChange }: Props) {
  return (
    <input
      type="email"
      placeholder="Email"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="email-input"
      required
    />
  );
}
