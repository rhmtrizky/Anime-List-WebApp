import Link from 'next/link';

const { getAnimeData } = require('@/libs/api');

const RandomAnime = async () => {
  const getRandomAnime = await getAnimeData('random/anime');
  return (
    <div className="flex min-w-full flex-col px-3">
      <div className="h-4/5 rounded w-full">
        <div className="relative">
          <img
            className="object-cover w-full rounded"
            src={getRandomAnime.data.images?.webp?.large_image_url}
            alt={getRandomAnime.data.title}
          />
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-color-dark opacity-70"></div>
          <div className=" absolute bottom-8 left-8 font-bold text-3xl flex flex-col gap-3">
            <h3 className="underline decoration-wavy text-color-primary">{getRandomAnime.data.title}</h3>
            <div className="flex gap-3">
              <Link href={`/anime/${getRandomAnime.data.mal_id}`}>
                <button className="btn btn-primary border-none bg-color-accent text-color-dark font-bold w-24 hover:bg-color-accent2 transition-all">View</button>
              </Link>
              <Link href={getRandomAnime.data.url}>
                <button className="btn btn-outline font-bold w-24 hover:transition-all">Watch</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomAnime;
