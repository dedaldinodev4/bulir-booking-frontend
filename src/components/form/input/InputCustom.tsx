import React, { FC, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", success, error, hint, disabled, ...props }, ref) => {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 ${className}`;

    if (disabled) {
      inputClasses += " text-gray-500 border-gray-300 cursor-not-allowed";
    } else if (error) {
      inputClasses += " text-error-800 border-error-500 focus:ring-error-500/10";
    } else if (success) {
      inputClasses += " text-success-500 border-success-400 focus:ring-success-500/10";
    } else {
      inputClasses += " border-gray-300 focus:border-brand-300 focus:ring-brand-500/10";
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error
                ? "text-error-500"
                : success
                ? "text-success-500"
                : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
