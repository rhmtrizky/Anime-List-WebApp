import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Pagination = ({ page, setPage, lastPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };
  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  const countLastPage = lastPage - page;
  const handleLastPage = () => {
    setPage((prevState) => prevState + countLastPage);
  };

  const handleFirstPage = () => {
    setPage(lastPage - (lastPage - 1));
  };
  return (
    <div className="flex flex-col justify-center align-center">
      <div className="flex justify-center items-center gap-6 my-7">
        {page <= 1 ? (
          <button
            disabled={true}
            className="text-color-primary text-2xl"
            onClick={handlePrevPage}
          >
            <GrFormPrevious />
          </button>
        ) : (
          <button
            className="text-color-accent text-2xl"
            onClick={handlePrevPage}
          >
            <GrFormPrevious />
          </button>
        )}

        <p className="text-color-dark text-15px bg-color-accent font-bold px-3 rounded">
          {page} of {lastPage}
        </p>
        {page >= lastPage ? (
          <button
            className="text-color-primary text-2xl"
            onClick={handleNextPage}
          >
            <GrFormNext />
          </button>
        ) : (
          <button
            className="text-color-accent text-2xl"
            onClick={handleNextPage}
          >
            <GrFormNext />
          </button>
        )}
      </div>
      {page <= lastPage && page >= lastPage / 2 ? (
        <button
          className="text-color-accent text-xl pb-5"
          onClick={handleFirstPage}
        >
          Back to first page
        </button>
      ) : (
        <button
          className="text-color-accent text-xl pb-5"
          onClick={handleLastPage}
        >
          Go to last page
        </button>
      )}
    </div>
  );
};
export default Pagination;
