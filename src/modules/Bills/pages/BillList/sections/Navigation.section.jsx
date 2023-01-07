export const Navigation = ({ links, active }) => {
  return (
    <div className="navigation p-3 bg-[#1E1E2D] rounded-lg">
      <div className="bg-[#323248] rounded-lg px-[40px] py-[20px] flex items-center gap-[40px]">
        {links.map((link) => (
          <div
            onClick={link?.onClick}
            key={link?.label}
            className={`text-[14px] ${
              active === link?.label ? 'text-[#3699FF]' : 'text-[#6D6D80]'
            } uppercase cursor-pointer transition-all hover:text-[#3699FF]`}
          >
            {link?.label}
          </div>
        ))}
      </div>
    </div>
  );
};
