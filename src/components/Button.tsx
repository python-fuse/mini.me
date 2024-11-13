// Button props
"use client";

import { Button } from "@mui/material";
import Spinner from "./Spinner";

interface ButtonProps {
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MyButton: React.FC<ButtonProps> = ({
  loading,
  className,
  children,
  onClick,
}) => {
  return (
    <Button
      className={`flex items-center normal-case font-normal gap-x-1 ${className}`}
      variant="contained"
      onClick={onClick}
    >
      {loading === true ? <Spinner /> : children}
    </Button>
  );
};
export default MyButton;
