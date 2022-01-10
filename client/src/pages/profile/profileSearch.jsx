import React, { useEffect } from "react";

import Pagination from "../../components/pagination";
import Loading from "../../components/card/loadingCard";
import ErrorMessage from "../../components/card/errorCard";
import useProfile from "./hooks/useProfile";
const Book = ({ search }) => {
  const { loading, profiles, searchAction } = useProfile();
  useEffect(() => {
    searchAction(search);
  }, [search]);
  return (
    <div className="Main-content-books">
      {loading ? (
        <Loading />
      ) : profiles.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <ErrorMessage variant="warning">
            The result you were looking for could not be found.
          </ErrorMessage>
        </div>
      ) : (
        <div className="Main-content-user-item">
          <Pagination itemsPerPage={10} items={profiles} itemType="profiles" />
        </div>
      )}
    </div>
  );
};
export default Book;
