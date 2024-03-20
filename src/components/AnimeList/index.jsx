import Image from 'next/image';
import Link from 'next/link';

const AnimeList = ({ api }) => {
  return (
    <div className="flex gap-5 overflow-x-scroll px-3 md:grid md:grid-cols-5 md:gap-5 sm:grid sm:grid-cols-3 sm:gap-5 md:overflow-x-hidden sm:overflow-x-hidden">
      {api.data?.map((item) => {
        return (
          <div
            className="min-w-[230px] min-h-[300px] bg-color-dark rounded-lg shadow-xl text-color-primary hover:text-color-accent transition-all cursor-pointer"
            key={item.mal_id}
          >
            <Link href={`/anime/${item.mal_id}`}>
              <Image
                className="rounded"
                src={item.images.webp.image_url}
                alt="..."
                height="350"
                width="350"
              />
              <p className="p-4 md:text-md text-sm font-bold">{item.title}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AnimeList;
