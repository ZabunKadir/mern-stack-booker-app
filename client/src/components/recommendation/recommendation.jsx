import React, { useState, useEffect } from "react";
import RecommendationCard from "./recommendationCard";
import RecommendationHooks from "./hooks/useRecommendation";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/swiper.scss";

SwiperCore.use([Pagination, Navigation]);

const Recommendation = ({ number }) => {
  const { recommendationList } = RecommendationHooks();
  const [list, setList] = useState({});
  const [viewNumber, setViewNumber] = useState(3);
  useEffect(() => {
    if (number) {
      setViewNumber(number);
    }
  }, [number]);
  useEffect(() => {
    if (recommendationList) {
      setList(recommendationList);
    }
  }, [recommendationList]);
  return (
    <div className="Recommendation">
      <div className="Recommendation-title">
        <h4>Recommended For You</h4>
      </div>
      <div className="Recommendation-books">
        <Swiper
          slidesPerView={viewNumber}
          spaceBetween={30}
          slidesPerGroup={viewNumber}
          loop={true}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          className="Recommendation-books-swiper"
        >
          {list?.list?.map((item) =>
            item ? (
              <SwiperSlide>
                <RecommendationCard book={item}></RecommendationCard>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
      <div className="Recommentadion-shelf">
        <div className="Recommendation-shelf-bottom"></div>
        <div className="Recommendation-shelf-support">
          <div className="Recommendation-shelf-support-item"></div>
          <div className="Recommendation-shelf-support-item"></div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
