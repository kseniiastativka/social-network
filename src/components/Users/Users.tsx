import React from "react";
import Paginator from "../common/Paginator/Paginator";
import UserComponent from "./UserComponent";
import { User } from "../../redux/redux-store";

let Users = ({
  users,
  totalUsersCount,
  pageSize,
  currentPage,
  isFollowingInProgress,
  onPageChanged,
  unfollow,
  follow,
}: {
  users: User[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  onPageChanged: (page: number) => void;
  isFollowingInProgress: Array<User["id"]>;
}) => {
  return (
    <div>
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={10}
      />
      {users.map((user) => (
        <UserComponent
          key={user.id}
          user={user}
          follow={follow}
          isFollowingInProgress={isFollowingInProgress}
          unfollow={unfollow}
        />
      ))}
    </div>
  );
};

export default Users;
