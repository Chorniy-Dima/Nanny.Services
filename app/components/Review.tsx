import Star from "../assets/icons/star.svg?react";

interface SingleReview {
  reviewer: string;
  rating: number;
  comment: string;
}

export const Review = ({ reviewer, rating, comment }: SingleReview) => {
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex flex-row gap-3">
        <div
          className="w-11 h-11 rounded-full bg-pale-red flex items-center justify-center text-red text-lg font-medium"
          aria-hidden
        >
          {reviewer.slice(0, 1)}
        </div>
        <div className="flex flex-col gap-1">
          <cite className="text-base text-black font-medium not-italic leading-5">
            {reviewer}
          </cite>
          <div className="flex flex-row gap-2 items-center px-px">
            <Star />
            <p className="text-sm font-medium">{rating}</p>
          </div>
        </div>
      </figcaption>

      <blockquote>
        <p className="text-black-50 font-normal">{comment}</p>
      </blockquote>
    </figure>
  );
};
