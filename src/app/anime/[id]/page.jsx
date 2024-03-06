import { getAnimeData } from '@/libs/api';
import YoutubePlayer from '@/components/Utilities/YoutubePlayer';
import Image from 'next/image';
import CollectionButton from '@/components/AnimeList/AddCollectionButton';
import authUserSession from '@/libs/auth';
import prisma from '@/libs/prisma';
import CommentInput from '@/components/AnimeList/CommentInput';
import Comment from '@/components/AnimeList/Comment';

const DetailAnime = async ({ params: { id } }) => {
  const detailAnime = await getAnimeData(`anime/${id}`);
  const user = await authUserSession();

  const getUser = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });
  const collection = await prisma.collection.findFirst({
    where: {
      anime_mal_id: id,
      userId: user?.id,
    },
  });

  return (
    <div className="flex flex-col p-3 min-h-screen gap-5">
      <div className="pt-4 flex gap-4 text-color-primary sm:flex-nowrap flex-wrap w-full">
        <div className="md:w-1/5 sm:w-2/5 w-full">
          <Image
            className="w-full rounded object-cover"
            src={detailAnime.data.images.webp.image_url}
            alt={detailAnime.data.images.jpg.image_url}
            height="500"
            width="500"
          />
        </div>
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-color-primary text-3xl font-bold">{detailAnime?.data?.title}</h1>
                <div>
                  {!collection && (
                    <CollectionButton
                      anime_mal_id={id}
                      anime_image={detailAnime?.data?.images?.webp?.image_url}
                      anime_title={detailAnime?.data?.title}
                      userId={getUser?.id}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <h3 className="font-semibold text-color-primary2">Duration :</h3>
                  <h3>{detailAnime?.data?.duration}</h3>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-semibold text-color-primary2">Genre :</h3>
                  {detailAnime?.data?.genres.map((genre) => (
                    <h3>{genre.name}</h3>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-color-primary2">Synopsis :</h3>
              <p className="text-justify">{detailAnime.data.synopsis}</p>
              <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-3 text-color-primary py-2 mt-2">
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Score</p>
                  <p className="font-bold text-xl">{detailAnime.data.score}</p>
                </div>
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Rank</p>
                  <p className="font-bold text-xl">{detailAnime.data.rank}</p>
                </div>
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Popular</p>
                  <p className="font-bold text-xl">{detailAnime.data.popularity}</p>
                </div>
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Favorite</p>
                  <p className="font-bold text-xl">{detailAnime.data.favorites}</p>
                </div>
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Members</p>
                  <p className="font-bold text-xl">{detailAnime.data.members}</p>
                </div>
                <div className="border-2 border-color-accent px-5 py-1 flex flex-col items-center justify-center rounded">
                  <p>Episodes</p>
                  <p className="font-bold text-xl">{detailAnime.data.episodes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Comment
          anime_mal_id={id}
          user_image={user?.image}
          user={getUser}
        />
        <CommentInput
          anime_mal_id={id}
          anime_title={detailAnime?.data?.title}
          userId={getUser.id}
        />
      </div>

      <div>
        <YoutubePlayer youtubeId={detailAnime.data?.trailer?.youtube_id} />
      </div>
    </div>
  );
};
export default DetailAnime;
