interface ITable extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TableLayout = ({ children, ...props }: ITable) => {
  return (
    <div className={`flex flex-col ${props}`}>
      <table className="w-2/4 divide-y divide-gray-200 drop-shadow">
        {children}
      </table>
    </div>
  );
};

export default TableLayout;
