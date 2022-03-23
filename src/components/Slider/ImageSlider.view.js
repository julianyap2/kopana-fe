import { useState, useEffect } from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module


const ImageSlider = () => {
  const [foto, setFoto] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getData() {
    try {
      const response = await Kopana.get('/galeri');
      console.log(response);
      setFoto(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        // style={{height:'100%'}}
        navigation
        observeParents={true}
        observer={true}
        autoplay={true}
        slidesPerView={1}
      >
        {foto.data && foto.data.map((d) => (
          <SwiperSlide key={'swiper'}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
              <img src={Kopana.join(d.imageUrl)} alt={d._id} style={{ justifyContent: 'center' }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ImageSlider;
