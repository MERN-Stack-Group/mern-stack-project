import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-surface border border-border rounded shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-6 py-4 border-b border-border ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardSection = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-border last:border-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
