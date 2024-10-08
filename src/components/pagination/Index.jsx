////styles
import "./styles.scss";

const Pagination = ({ setPaginationData, paginationData }) => {
  const Increment = () => {
    if (paginationData?.index + 1 < paginationData?.totalPages) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index + 1,
      });
    }

    // setPageIndex(PageIndex + 1);
  };
  const Decrement = () => {
    if (paginationData?.index > 0) {
      setPaginationData({
        ...paginationData,
        index: paginationData?.index - 1,
      });
    }
    // setPageIndex(PageIndex - 1);
  };
  const ResetCounter = () => {
    setPaginationData({ ...paginationData, index: 0 });
  };

  const LastCounter = () => {
    setPaginationData({
      ...paginationData,
      index: paginationData?.totalPages - 1,
    });
  };
  return (
    <>
      <div className="pagination">
        <ul className="pagination-rounded">
          <ul>
            <li
              role="presentation"
              aria-hidden="true"
              className="page-item disabled"
            >
              <span className="backward-pagination" onClick={ResetCounter}>
                «
              </span>
            </li>
            <li className="page-item disabled">
              <span className="backward-pagination" onClick={Decrement}>
                ‹
              </span>
            </li>
            <li role="presentation" className="page-item active">
              <button className="page-index-btn">
                {paginationData?.index + 1}
              </button>
            </li>
            <li className="page-item disabled">
              <span className="forward-pagination" onClick={Increment}>
                ›
              </span>
            </li>
            <li className="page-item disabled">
              <span className="forward-pagination" onClick={LastCounter}>
                »
              </span>
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
