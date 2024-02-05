// Input.tsx
import React, { InputHTMLAttributes, Ref } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  error?: boolean;
}

const Input = React.forwardRef(
  ({ id, type, label, required, error, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {

    return (
      <div className={` ${error ? 'error' : ''}`}>
        <label htmlFor={id}>
          {label} <span className='asterisco'>*</span>
        </label>
        <input
          type={type}
          id={id}
          name={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
