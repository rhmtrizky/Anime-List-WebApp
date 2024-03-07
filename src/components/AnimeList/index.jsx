import Image from 'next/image';
import Link from 'next/link';

const AnimeList = ({ api }) => {
  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 px-3">
      {api.data?.map((item) => {
        return (
          <div
            className="shadow-xl text-color-primary hover:text-color-accent transition-all cursor-pointer"
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
