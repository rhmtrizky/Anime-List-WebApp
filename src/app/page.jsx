import AnimeList from '@/components/AnimeList';
import CarouselPopulerAnime from '@/components/AnimeList/CarouselPopulerAnime';
import Header from '../components/AnimeList/Header';
import { getAnimeData, getNestedAnimeResponse, reproduce } from '../libs/api';
import authUserSession from '@/libs/auth';
import Image from 'next/image';
import RandomAnime from '@/components/AnimeList/RandomAnime';

const Page = async () => {
  const topAnime = await getAnimeData('top/anime', 'limit=10');

  const user = await authUserSession();

  // recommendation anime
  let recommendedAnime = await getNestedAnimeResponse('recommendations/anime', 'entry');
  recommendedAnime = reproduce(recommendedAnime, 10);

  const theMostPopuler = recommendedAnime.data.slice(0, 4);
  const populerOfTheDay = recommendedAnime.data.slice(6, 10);
  /// --- ///

  return (
    <>
      <section className="m-3">
        <CarouselPopulerAnime data={theMostPopuler} />
      </section>
      <section>
        <Header
          title="The most populer"
          linkHref="/populer"
          linkTitle="See All"
        />
        <AnimeList
          api={topAnime}
          user={user}
        />
      </section>
      {user ? (
        <section>
          <Header title={`For you ${user?.name}`} />
          <RandomAnime />
        </section>
      ) : (
        <section className="m-3">
          <CarouselPopulerAnime data={populerOfTheDay} />
        </section>
      )}

      <section>
        <Header title="Recommendation" />
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Page;
