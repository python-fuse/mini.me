interface NavTooltipProps {
  title: string;
  isExpanded: boolean;
  show: boolean;
}

const NavTooltip: React.FC<NavTooltipProps> = ({ title, isExpanded, show }) => {
  return (
    <>
      {!isExpanded && show && (
        <div className="absolute bg-black  text-white text-xs p-2 rounded-md left-12 text-nowrap origin-right">
          {title}
        </div>
      )}
    </>
  );
};
export default NavTooltip;
