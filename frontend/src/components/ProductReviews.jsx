import React, { useState } from "react";
import { assets } from "../assets/assets";

const ProductReviews = ({ description }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (
      !reviewForm.name.trim() ||
      !reviewForm.comment.trim() ||
      reviewForm.rating === 0
    )
      return;

    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ name: "", rating: 0, comment: "" });
  };

  return (
    <div className="mt-20">
      <div className="flex">
        <b
          onClick={() => setActiveTab("description")}
          className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === "description" ? "bg-gray-100" : ""}`}
        >
          Description
        </b>
        <p
          onClick={() => setActiveTab("reviews")}
          className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === "reviews" ? "bg-gray-100" : ""}`}
        >
          Reviews ({reviews.length})
        </p>
      </div>

      {activeTab === "description" ? (
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{description}</p>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 border px-6 py-6 text-sm">
          {/* review list */}
          <div className="flex flex-col">
            {reviews.length === 0 ? (
              <p className="text-gray-400">
                No reviews yet. Be the first to review this product.
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="mb-5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < review.rating
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        alt="star"
                        className="w-3 5"
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 mt-2">{review.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* review form */}
          <form
            onSubmit={handleReviewSubmit}
            className="flex flex-col gap-3 border-t pt-5"
          >
            <p className="font-medium">Write a review</p>
            <input
              type="text"
              name="name"
              value={reviewForm.name}
              onChange={handleReviewChange}
              placeholder="Your name"
              className="border px-3 py-2 text-sm"
              required
            />

            {/* clickable star rating - only click sets fill, no hover effect */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                const filled = starValue <= reviewForm.rating;
                return (
                  <img
                    key={i}
                    src={filled ? assets.star_icon : assets.star_dull_icon}
                    alt={`${starValue} star`}
                    onClick={() => handleStarClick(starValue)}
                    className="w-5 cursor-pointer"
                  />
                );
              })}
            </div>

            <textarea
              name="comment"
              value={reviewForm.comment}
              onChange={handleReviewChange}
              placeholder="Share your thoughts about this product"
              className="border px-3 py-2 text-sm"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 text-sm w-fit cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
