import AnimeList from '@/components/AnimeList';
import Header from '../components/AnimeList/Header';
import { getAnimeData, getNestedAnimeResponse, reproduce } from '../libs/api';
import authUserSession from '@/libs/auth';
import Image from 'next/image';

const Page = async () => {
  const topAnime = await getAnimeData('top/anime', 'limit=10');
  let recommendedAnime = await getNestedAnimeResponse('recommendations/anime', 'entry');
  recommendedAnime = reproduce(recommendedAnime, 10);
  const user = await authUserSession();

  const populerOfTheDay = recommendedAnime.data.slice(3, 11);
  console.log('populerOfTheDay', populerOfTheDay);

  return (
    <>
      <div className="md:flex sm:flex hidden carousel rounded-box m-3 relative">
        <div className="carousel-item w-full h-full flex justify-center items-center">
          {populerOfTheDay.map((item) => (
            <div className="relative">
              <img
                className="bg-cover bg-center"
                src={item.images.webp.image_url}
                alt="Burger"
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-color-secondary opacity-60"></div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <Header
          title="Paling Populer"
          linkHref="/populer"
          linkTitle="Lihat Semua"
        />
        <AnimeList
          api={topAnime}
          user={user}
        />
      </section>
      <section>
        <Header title="Rekomendasi" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Page;
