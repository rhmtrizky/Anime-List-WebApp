import { getAnimeData } from '@/libs/api';
import YoutubePlayer from '@/components/Utilities/YoutubePlayer';
import Image from 'next/image';
import CollectionButton from '@/components/AnimeList/CollectionButton';
import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';

const DetailAnime = async ({ params: { id } }) => {
  const detailAnime = await getAnimeData(`anime/${id}`);
  const user = await authUserSession();
  const collection = await prisma.collection.findFirst({
    where: {
      anime_mal_id: id,
      user_email: user?.email,
    },
  });
  console.log('check collection', collection);
  return (
    <>
      <div className="flex flex-col p-3">
        <div className="flex p-3 justify-between">
          <h1 className="text-color-primary text-2xl">{detailAnime.data.title}</h1>
          {!collection && (
            <CollectionButton
              anime_mal_id={id}
              user_email={user.email}
              anime_image={detailAnime?.data?.images?.webp?.image_url}
              anime_title={detailAnime?.data?.title}
            />
          )}
        </div>
        <div className="flex gap-4 overflow-x-auto text-color-primary py-2 mt-2">
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Score</p>
            <p className="font-bold text-xl">{detailAnime.data.score}</p>
          </div>
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Rank</p>
            <p className="font-bold text-xl">{detailAnime.data.rank}</p>
          </div>
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Popular</p>
            <p className="font-bold text-xl">{detailAnime.data.popularity}</p>
          </div>
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Favorite</p>
            <p className="font-bold text-xl">{detailAnime.data.favorites}</p>
          </div>
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Members</p>
            <p className="font-bold text-xl">{detailAnime.data.members}</p>
          </div>
          <div className="border-2 border-color-accent px-10 py-1 flex flex-col items-center justify-center rounded">
            <p>Episodes</p>
            <p className="font-bold text-xl">{detailAnime.data.episodes}</p>
          </div>
        </div>

        <div className="pt-4 flex gap-2 text-color-primary sm:flex-nowrap flex-wrap">
          <Image
            className="w-full rounded object-cover"
            src={detailAnime.data.images.webp.image_url}
            alt={detailAnime.data.images.jpg.image_url}
            height="350"
            width="350"
          />
          <p className="text-justify">{detailAnime.data.synopsis}</p>
        </div>
      </div>

      <div>
        <YoutubePlayer youtubeId={detailAnime.data?.trailer?.youtube_id} />
      </div>
    </>
  );
};
export default DetailAnime;
