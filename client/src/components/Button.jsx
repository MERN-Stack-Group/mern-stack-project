import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none rounded";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover border border-transparent",
    secondary:
      "bg-surface hover:bg-surface-hover text-text-primary border border-border",
    ghost:
      "bg-transparent hover:bg-surface-hover text-text-primary border border-transparent",
    danger: "bg-danger text-white hover:bg-danger/90 border border-transparent",
    link: "bg-transparent text-primary hover:text-primary-hover underline-offset-4 hover:underline p-0",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = variant === "link" ? "" : sizes[size] || sizes.md;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
