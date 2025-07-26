type Props = {
  name: string;
  image: string;
  sold: number;
};

const TopSellingItemCard = ({ name, image, sold }: Props) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center text-center">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-full mb-3" />
      <h4 className="text-md font-semibold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">Sold: {sold}</p>
    </div>
  );
};

export default TopSellingItemCard;
