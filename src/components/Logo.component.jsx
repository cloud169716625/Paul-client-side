import { useSelector } from "react-redux";

const LogoComponent = () => {
  const isLoading = useSelector((state) => state?.brand?.loading);
  const brand = useSelector((state) => state?.brand?.brand);

  if (isLoading) return null;

  return <img src={brand.base64Logo} className="w-20 h-20 mx-auto" alt="" />;
};

export default LogoComponent;
