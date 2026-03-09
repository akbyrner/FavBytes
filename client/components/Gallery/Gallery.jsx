import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import GalleryItem from './GalleryItem';

export default function Gallery({ dishes = [], setSelectedDish, setView }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={25}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {dishes.map((dish) => (
        <SwiperSlide key={dish._id}>
          <GalleryItem
            title={dish.name}
            thumbnail={dish.imageUrl}
            item={dish}
            onClick={() => {
              setSelectedDish(dish);
              setView('ImagePage');
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
