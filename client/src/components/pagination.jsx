import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import BookCard from "./card/bookCard.jsx";
import ListCard from "./card/listCard.jsx";
import UserCard from "./card/userCard.jsx";
function Items({ currentItems, grid, itemType, profile, buttonType, toggle }) {
  const itemControl = () => {
    if (currentItems) {
      if (itemType === "book") {
        return currentItems?.map((item) => (
          <BookCard book={item} key={item._id} grid={grid}></BookCard>
        ));
      } else if (itemType === "profile") {
        return currentItems?.map((item, index) => (
          <ListCard
            items={item}
            number={index + 1}
            key={item._id}
            currentProfile={profile}
            buttonType={buttonType}
          ></ListCard>
        ));
      } else if (itemType === "profiles") {
        return currentItems?.map((item, index) => (
          <UserCard user={item} number={index + 1} key={index + 1}></UserCard>
        ));
      } else {
        return;
      }
    }
  };
  return <>{itemControl()}</>;
}

function PaginatedItems({
  itemsPerPage,
  items,
  grid,
  itemType,
  profile,
  buttonType,
  toggle,
}) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [takenItem, setTakenItem] = useState([]);
  const setItem = async (item) => {
    if (item) {
      await setTakenItem(Object.values(item));
    } else {
      return;
    }
  };
  useEffect(() => {
    setItem(items);
  }, [items]);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(takenItem?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(takenItem?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, takenItem]);

  const handlePageClick = (event, toggle) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    if (!toggle) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Items
        currentItems={currentItems}
        grid={grid}
        itemType={itemType}
        profile={profile}
        buttonType={buttonType}
      />
      <div className="Pagination-main-paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={(e) => handlePageClick(e, toggle)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          activeLinkClassName="Pagination-button-active"
          pageClassName="Pagination-button"
          nextClassName="Pagination-span"
          previousClassName="Pagination-span"
          containerClassName="Pagination"
        />
      </div>
    </>
  );
}
export default PaginatedItems;
