function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        {/* Text */}
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;