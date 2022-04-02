import UserHeader from "../components/user/UserHeader";
import UserTable from "../components/user/UserTable";
import { prisma } from "../../lib/prisma";
import { UserProps } from "../types";

const User = (props: UserProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <UserHeader />
      <UserTable users={props.users} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const result = await prisma.user.findMany({
      where: {
        isActive: true,
      },
    });

    const users = JSON.parse(JSON.stringify(result));

    return {
      props: { users },
    };
  } catch (error) {
    console.log(error);
  }
};

export default User;
