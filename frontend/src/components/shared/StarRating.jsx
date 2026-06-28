import { Star } from "lucide-react";

export default function StarRating({ rating, onRate, interactive = false }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          disabled={!interactive}
          className={`transition ${
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          }`}
        >
          <Star
            size={16}
            className={star <= (rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}