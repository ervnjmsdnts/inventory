import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CreateUserModal } from "./UserModals";

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">User</h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add User
      </button>
      <CreateUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default UserHeader;
