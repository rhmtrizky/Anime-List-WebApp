import { getAnimeData } from '@/libs/api';
import AnimeList from '@/components/AnimeList';
import Header from '@/components/AnimeList/Header';

const Page = async ({ params }) => {
  const keyword = params.keyword;
  const decodedKeyword = decodeURI(keyword);
  const searchAnime = await getAnimeData('anime', `q=${decodedKeyword}`);
  return (
    <section>
      <Header title={`Pencarian untuk "${decodedKeyword}"...`} />
      <AnimeList api={searchAnime} />
    </section>
  );
};

export default Page;
