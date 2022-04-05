import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const withAuth = (gssp: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const token = context.req.cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
};
