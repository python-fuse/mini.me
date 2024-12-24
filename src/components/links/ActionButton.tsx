import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-2 hover:bg-tertiary-600/40 duration-300 bg-accent-600 border border-tertiary text-sm p-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};
export default ActionButton;
