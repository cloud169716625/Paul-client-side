import { useSelector } from "react-redux";

const UserName = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  let userName = "";
  if (isLoggedIn) {
    let userN = user.fullName.split(" ");
    if (userN.length < 2) {
      userName = userN[0].charAt(0);
    }else{
      userName = userN[0].charAt(0) + userN[1].charAt(0);

    }
  }
  return userName.toUpperCase();
};
export default UserName;
