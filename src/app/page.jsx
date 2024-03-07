import AnimeList from '@/components/AnimeList';
import CarouselPopulerAnime from '@/components/AnimeList/CarouselPopulerAnime';
import Header from '../components/AnimeList/Header';
import { getAnimeData, getNestedAnimeResponse, reproduce } from '../libs/api';
import authUserSession from '@/libs/auth';

const Page = async () => {
  const topAnime = await getAnimeData('top/anime', 'limit=10');
  let recommendedAnime = await getNestedAnimeResponse('recommendations/anime', 'entry');
  recommendedAnime = reproduce(recommendedAnime, 10);
  const user = await authUserSession();

  const theMostPopuler = recommendedAnime.data.slice(0, 4);
  const populerOfTheDay = recommendedAnime.data.slice(6, 10);

  return (
    <>
      <section className="m-3">
        <CarouselPopulerAnime data={theMostPopuler} />
      </section>
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
      <section className="m-3">
        <CarouselPopulerAnime data={populerOfTheDay} />
      </section>
      <section>
        <Header title="Rekomendasi" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Page;
