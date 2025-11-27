import { RootState } from "@/store/store";
import { User2 } from "lucide-react";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-primary" href="#">
              <h1 className="text-2xl font-bold">yourcareerbook.com</h1>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-medium">{user?.fullName}</p>
            <User2 />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
