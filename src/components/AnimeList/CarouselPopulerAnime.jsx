import React from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselPopulerAnime = ({ data }) => (
  <Carousel
    autoplay
    autoplaySpeed={5000}
  >
    {data.map((item, index) => (
      <div
        key={index}
        className="h-4/5 rounded"
      >
        <div className="relative">
          <img
            style={contentStyle}
            className="object-cover w-full rounded"
            src={item.images.webp.image_url}
            alt={item.title}
          />
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-color-dark opacity-70"></div>
          <div className=" absolute bottom-8 left-8 font-bold text-3xl flex flex-col gap-3">
            <h3 className="underline decoration-wavy text-color-primary">{item.title}</h3>
            <div className="flex gap-3">
              <Link href={`/anime/${item.mal_id}`}>
                <button className="btn btn-primary border-none bg-color-accent text-color-dark font-bold w-24 hover:bg-color-accent2 transition-all">View</button>
              </Link>
              <Link href={item.url}>
                <button className="btn btn-outline font-bold w-24 hover:transition-all">Watch</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
);

export default CarouselPopulerAnime;
