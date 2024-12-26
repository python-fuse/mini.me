interface CTAProps {
  children: React.ReactNode;
  className?: string;
}

const CTAButton = ({ children, className }: CTAProps) => {
  return (
    <button
      className={`flex items-center bg-primary-300 rounded-2xl border border-primary-300 text-white text-lg gap-x-2 p-4 ${className}`}
    >
      {children}
    </button>
  );
};
export default CTAButton;
