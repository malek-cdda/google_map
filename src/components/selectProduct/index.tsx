const Index = ({ data, setProduct }: any) => {
  return (
    <div>
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="border border-blue-400 rounded-md mt-3 p-4 mx-3 cursor-pointer"
          onClick={(e) => {
            setProduct(item);
          }}
        >
          <span className="text-black font-bold text-xl mr-5">
            {item?.title}
          </span>
          <span> {item?.price}</span>
        </div>
      ))}
    </div>
  );
};

export default Index;
