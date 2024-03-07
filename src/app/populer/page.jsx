'use client';

import AnimeList from '@/components/AnimeList';
import HeaderMenu from '@/components/Utilities/HeaderMenu';
import Pagination from '@/components/Utilities/Pagination';
import { useState, useEffect } from 'react';
import { getAnimeData } from '../../libs/api';

const Populer = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]);

  const fetchData = async () => {
    const dataAnime = await getAnimeData('top/anime', `page=${page}`);
    setTopAnime(dataAnime);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen">
      <HeaderMenu title={`Anime Terpopuler #${page}`} />
      <AnimeList api={topAnime} />
      <Pagination
        page={page}
        setPage={setPage}
        lastPage={topAnime.pagination?.last_visible_page}
      />
    </div>
  );
};

export default Populer;
