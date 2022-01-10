import { useState, useEffect } from "react";
import Pagination from "../../components/pagination";
import Loading from "../../components/card/loadingCard";
import useProfile from "./hooks/useProfile";
import ErrorMessage from "../../components/card/errorCard";
const List = ({ books, name }) => {
  const [toggle, setToggle] = useState(false);
  const { loading, profile, useWindowDimensions } = useProfile();
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 768) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [width]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : books?.length === 0 ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <ErrorMessage variant="warning">Book Not Found!</ErrorMessage>
        </div>
      ) : (
        <div className="List">
          <div class="List-header">
            <div class="List-header-item">#</div>
            <div class="List-header-item">Book Name</div>
            <div class="List-header-item">Author</div>
            <div class="List-header-item">Book Link</div>
            <div class="List-header-item">Delete & Copy</div>
          </div>
          <div className="List-body">
            <Pagination
              itemsPerPage={5}
              items={books}
              itemType="profile"
              profile={profile}
              buttonType={name}
              toggle={() => toggle}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default List;
