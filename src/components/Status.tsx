export const OkayStatus: React.FC = ({ children }) => {
  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      {children}
    </span>
  );
};

export const ErrorStatus: React.FC = ({ children }) => {
  return (
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
      {children}
    </span>
  );
};
