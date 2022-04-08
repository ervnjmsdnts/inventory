interface ITable extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TableLayout = ({ children, ...props }: ITable) => {
  return (
    <div className={`flex flex-col ${props}`}>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="drop-shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
