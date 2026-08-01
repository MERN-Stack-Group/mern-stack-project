export default function SearchCard({ item }) {
  return (
    <div className="bg-[#1A0F24] p-6 rounded-xl border border-purple-500">

      <h2 className="text-xl font-bold text-purple-200">
        {item.name}
      </h2>

      <p>{item.role}</p>

      <p>Faculty: {item.faculty}</p>

      <p>Industry: {item.industry}</p>

      <p>Type: {item.type}</p>

    </div>
  );
}