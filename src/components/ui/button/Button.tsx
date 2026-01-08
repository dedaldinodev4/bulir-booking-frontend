import React, {
  ReactNode,
  forwardRef,
  ButtonHTMLAttributes,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      size = "md",
      variant = "primary",
      startIcon,
      endIcon,
      className = "",
      disabled,
      type = "button",
      ...rest
    } = props;

    const sizeClasses = {
      sm: "px-4 py-3 text-sm",
      md: "px-5 py-3.5 text-sm",
    };

    const variantClasses = {
      primary:
        "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
      outline:
        "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
          ${className}`}
        {...rest}
      >
        {startIcon && <span>{startIcon}</span>}
        {children}
        {endIcon && <span>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
