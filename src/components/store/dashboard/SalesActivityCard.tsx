type SalesCardProps = {
  title: string;
  count: number;
  color?: string;
};

const SalesActivityCard = ({ title, count, color = "blue" }: SalesCardProps) => {
  return (
    <div className={`bg-white p-4 rounded shadow border-t-4 border-${color}-500`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{count}</h2>
    </div>
  );
};

export default SalesActivityCard;
