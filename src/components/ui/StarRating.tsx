import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <span className="star-rating" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`star-rating__star ${i < rating ? "star-rating__star--filled" : ""}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
