import { useSelector } from "react-redux";

const ProductName = ({ product, isLoggedIn }) => {
  let productName = "";
  if (isLoggedIn) {
    let productN = product.name.split(" ");
    if (productN.length < 2) {
      productName = productN[0].charAt(0);
    }else{
      productName = productN[0].charAt(0) + productN[1].charAt(0);

    }
  }
  return productName.toUpperCase();
};
export default ProductName;
