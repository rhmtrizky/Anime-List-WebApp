'use client';

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { CiSearch } from 'react-icons/ci';

const InputNavbar = () => {
  const searchRef = useRef();
  const router = useRouter();
  const handleSearch = (e) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() == '') return;

    if (e.key === 'Enter' || e.type == 'click') {
      e.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <input
        className="px-2 py-1 rounded  w-full"
        // placeholder="search anime"
        placeholder="search anime"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button
        className="absolute end-2 top-1"
        onClick={handleSearch}
      >
        <CiSearch
          size={26}
          className="text-gray-700"
        />
      </button>
    </div>
  );
};

export default InputNavbar;
