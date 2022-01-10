import React, { useEffect } from "react";

import Pagination from "../../components/pagination";
import Loading from "../../components/card/loadingCard";
import BookHooks from "./hooks/bookHooks";
import { BOOK_PER_PAGE } from "../../utils/constants";
import ErrorMessage from "../../components/card/errorCard";
const Book = ({ pageGrid, search }) => {
  const { loading, books, searchAction } = BookHooks();
  useEffect(() => {
    searchAction(search);
  }, [search]);
  return (
    <div className="Main-content-books">
      {loading ? (
        <Loading />
      ) : books.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <ErrorMessage variant="warning">
            The result you were looking for could not be found.
          </ErrorMessage>
        </div>
      ) : (
        <div className="Main-content-books-item">
          <Pagination
            itemsPerPage={BOOK_PER_PAGE}
            items={books}
            grid={pageGrid}
            itemType="book"
          />
        </div>
      )}
    </div>
  );
};
export default Book;
