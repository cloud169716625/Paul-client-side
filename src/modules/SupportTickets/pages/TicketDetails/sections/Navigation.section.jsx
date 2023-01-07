export const Navigation = ({ links, active }) => {
  return (
    <div className="bg-[#1E1E2D] rounded-lg mt-[40px]">
      <div className="bg-[#323248] rounded-lg px-[40px] py-[20px] flex items-center gap-[40px]">
        {links.map((link) => (
          <div
            onClick={link?.onClick}
            key={link?.label}
            className={`text-[14px] ${
              active === link?.label ? 'text-[#3699FF]' : 'text-[#6D6D80]'
            } uppercase cursor-pointer transition-all hover:text-[#3699FF]`}
          >
            <span className="inline-block align-middle"> {link?.label}</span>
            <span
              className={`inline-block align-middle text-[10px] ml-[5px] rounded-[5px] text-[#FFFFFF] pl-[8px] pr-[8px] pt-[2px] pb-[2px]
            ${active === link?.label ? 'bg-[#3699FF]' : 'bg-[#6D6D80]'}`}
            >
              {link?.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
