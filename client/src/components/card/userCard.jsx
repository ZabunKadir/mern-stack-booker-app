const UserCard = ({ user }) => {
  const path = "/profile/" + `${user._id}`;
  return (
    <div className="UserCard">
      <a href={path}>
        <div className="UserCard-content">
          <div className="UserCard-content-image">
            <img src={user.image} alt="profile" />
          </div>
          <div className="UserCard-content-information">
            <div className="UserCard-content-information-name">
              {user?.name} {user?.surname}
            </div>
            <div className="UserCard-content-information-total">
              Total Books: <span> {user?.readBooks.length}</span>
            </div>
          </div>
          <div className="UserCard-content-button">
            <button>Profile {">"}</button>
          </div>
        </div>
      </a>
    </div>
  );
};
export default UserCard;
