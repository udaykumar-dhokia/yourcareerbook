import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h1>yourcareerbook.com</h1>
      </div>
      <div className="">
        <h1>{user?.fullName}</h1>
      </div>
    </div>
  );
};

export default UserNavbar;
