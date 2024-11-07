export const StarPuntuacion = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ))}
    </div>
  );
}