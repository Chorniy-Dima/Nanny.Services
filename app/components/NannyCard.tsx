import avatar from "../assets/img/sample-img.jpg";
import Status from "../assets/icons/status-active.svg?react";
import Pin from "../assets/icons/map-pin.svg?react";
import Star from "../assets/icons/star.svg?react";
import Heart from "../assets/icons/heart.svg?react";
import FilledHeart from "../assets/icons/filled-heart.svg?react";
import { useState } from "react";
import { Review } from "./Review";
import { Appointment } from "./Appointment";

const styles = {
  liStyle:
    "bg-white-bg rounded-full h-10 w-max py-2 px-4 text-[16px] text-black-60 font-medium max-w-132.5 truncate",
  infoStyle: "flex flex-row items-center gap-2 font-medium not-italic",
};

const features = [
  { label: "Age", value: 32, underline: true },
  { label: "Experience", value: "7 years" },
  { label: "Kids Age", value: "6 months to 8 years old" },
  {
    label: "Characters",
    value: "Compassionate, Knowledgeable, Adaptive, Trustworthy",
  },
  { label: "Education", value: "Master's in Child Psychology, CPR Certified" },
];

const reviews = [
  {
    reviewer: "Olga K.",
    rating: 5,
    comment:
      "Anna is wonderful! My kids loved her and she was always punctual.",
  },
  {
    reviewer: "Petr S.",
    rating: 4,
    comment:
      "She's great, but sometimes she had to reschedule on short notice.",
  },
];

export const NannyCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(!isExpanded);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="max-w-296 min-h-79.5 bg-white rounded-3xl p-6 relative">
      <div className="absolute top-6 right-6 flex flex-row gap-10">
        <div className="flex items-center gap-4 [&>span]:text-black-20">
          <address className={styles.infoStyle}>
            <Pin />
            Kyiv, Ukraine
          </address>
          <span aria-hidden="true">│</span>
          <div className={styles.infoStyle}>
            <Star />
            Rating: 4.5
          </div>
          <span aria-hidden="true">│</span>
          <p className={styles.infoStyle}>
            Price / 1 hour: <span className="text-bright-green">15$</span>
          </p>
        </div>

        <button aria-label="Add to favourites" className="cursor-pointer">
          <Heart />
        </button>
      </div>

      <div className="flex flex-row gap-6">
        <div className="max-w-30 max-h-30 rounded-[30px] border border-pale-red p-3">
          <div className="relative">
            <img src={avatar} alt="avatar" />
            <Status className="absolute right-0.5 -top-0.75" />
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-248">
          <div>
            <p className="text-grey text-[16px] leading-normal mb-2">Nanny</p>
            <h3 className="font-medium text-2xl">Maria Kovalenko</h3>
          </div>

          <ul className="flex flex-row flex-wrap gap-2">
            {features.map((item, index) => (
              <li className={styles.liStyle} key={`nanny-${index}`}>
                {item.label}:{" "}
                <span
                  className={`text-black ${item.underline ? "underline" : ""}`}
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-grey text-[16px] ">
            Being with children brings joy to my day. I've worked with children
            of various age groups, including those with special needs. My
            approach is hands-on, engaging, and tailored to each child's unique
            personality
          </p>

          {isExpanded && (
            <ul className="flex flex-col gap-6.25 mt-6">
              {reviews.slice(0, 2).map((item, index) => {
                return (
                  <li key={index} className="list-none">
                    <Review
                      reviewer={item.reviewer}
                      comment={item.comment}
                      rating={item.rating}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="ml-36 pr-5 pb-1 mt-5 flex flex-row justify-between">
        <button className=" cursor-pointer underline" onClick={handleExpand}>
          {!isExpanded ? "Read More" : "Read Less"}
        </button>
        <button
          type="button"
          className="w-55 h-12 justify-self-end bg-red text-white rounded-full flex justify-center items-center cursor-pointer outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Make an appointment
        </button>
      </div>
      {isModalOpen && <Appointment onClose={() => setIsModalOpen(false)} />}
    </article>
  );
};
