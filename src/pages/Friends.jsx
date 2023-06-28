import styles from "./Friends.module.css";
import Header from "../components/General/Header";
import Friend from "../components/Friends/Friend";

import { useUser } from "../contexts/UserContext";
import { getAllUsers, getFriends } from "../utils/apiCalls";
import { useEffect, useState } from "react";
import Input from "../components/General/Input";
import Loader from "../components/General/Loader";

// const dummyData = [
//   {
//     id: 1,
//     photo: "/img/leo.jpg",
//     name: "alansucho38",
//     rating: 4.8,
//     stories: 5,
//   },
//   { id: 2, photo: "/img/leo.jpg", name: "leo2", rating: 4.8, stories: 5 },
//   { id: 3, photo: "/img/leo.jpg", name: "leo3", rating: 4.8, stories: 5 },
//   { id: 4, photo: "/img/leo.jpg", name: "leo4", rating: 4.8, stories: 5 },
//   { id: 5, photo: "/img/leo.jpg", name: "leo5", rating: 4.8, stories: 5 },
// ];

function Friends() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const {
    friends,
    friendsRequestsReceived,
    friendsRequestsSent,
    dispatch,
    id: currentUserId,
  } = useUser();
  const [search, setSearch] = useState("");
  const [filterSelection, setFilterSelection] = useState(0);
  const [sortSelection, setSortSelection] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(
    function () {
      async function fetchFriends() {
        try {
          setIsLoading(true);
          const friendsObj = await getFriends();
          const friendsIds = friendsObj.data.friends.map((friend) => friend.id);
          dispatch({
            type: "user/refreshFriends",
            payload: friendsIds,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchFriends();
    },
    [dispatch]
  );

  useEffect(function () {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const usersObj = await getAllUsers();
        setUsers(usersObj.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(
    function () {
      setFilteredUsers([...users]);
      if (search.length > 0) {
        setFilteredUsers(
          users.filter((user) => {
            if (user.name.includes(search)) return user;
          })
        );
      }
      switch (filterSelection) {
        // get all users
        case 0: {
          setFilteredUsers((filteredUsers) => [...filteredUsers]);
          break;
        }
        case 1: {
          // get only friends
          setFilteredUsers((filteredUsers) =>
            filteredUsers.filter((user) => friends.includes(user.id))
          );
          break;
        }
        case 2: {
          // get only incoming friend requests
          setFilteredUsers((filteredUsers) =>
            filteredUsers.filter((user) =>
              friendsRequestsReceived.includes(user.id)
            )
          );
          break;
        }
        case 3: {
          // get only outgoinng friend requests
          setFilteredUsers((filteredUsers) =>
            filteredUsers.filter((user) =>
              friendsRequestsSent.includes(user.id)
            )
          );
          break;
        }
        case 4: {
          // get all the non-friends
          setFilteredUsers((filteredUsers) =>
            filteredUsers.filter((user) => !friends.includes(user.id))
          );
          break;
        }
        default: {
          setFilteredUsers([...users]);
        }
      }
      switch (sortSelection) {
        // first, sort the friends
        case 0: {
          setFilteredUsers((filteredUsers) =>
            filteredUsers.sort(
              (a, b) => friends.includes(b.id) - friends.includes(a.id)
            )
          );
          // then, sort the friend requests received
          setFilteredUsers((filteredUsers) =>
            filteredUsers.sort((a, b) => {
              if (!friends.includes(b.id) && !friends.includes(a.id)) {
                if (
                  !friendsRequestsReceived.includes(b.id) &&
                  friendsRequestsReceived.includes(a.id)
                ) {
                  return (
                    friendsRequestsReceived.includes(b.id) -
                    friendsRequestsReceived.includes(a.id)
                  );
                }
              }
            })
          );
          // then, sort the friend requests sent
          setFilteredUsers((filteredUsers) =>
            filteredUsers.sort((a, b) => {
              if (
                !friends.includes(b.id) &&
                !friends.includes(a.id) &&
                !friendsRequestsReceived.includes(b.id) &&
                !friendsRequestsReceived.includes(a.id)
              ) {
                if (
                  !friendsRequestsSent.includes(b.id) &&
                  friendsRequestsSent.includes(a.id)
                ) {
                  return (
                    friendsRequestsSent.includes(b.id) -
                    friendsRequestsSent.includes(a.id)
                  );
                }
              }
            })
          );

          break;
        }
        case 1: {
          setFilteredUsers((filteredUsers) =>
            filteredUsers.sort((a, b) => b.rating - a.rating)
          );
          break;
        }
        case 2: {
          setFilteredUsers((filteredUsers) =>
            filteredUsers.sort((a, b) => b.stories - a.stories)
          );
          break;
        }
        default: {
        }
      }
    },
    [
      filterSelection,
      sortSelection,
      users,
      friends,
      friendsRequestsReceived,
      friendsRequestsSent,
      search,
    ]
  );

  return (
    <>
      <Header>Add new friends and see your current ones</Header>
      <div className={styles.selectorContainer}>
        <div className={styles.selector}>Displaying</div>
        <select
          className={styles.selection}
          value={filterSelection}
          onChange={(e) => setFilterSelection(Number(e.target.value))}
        >
          <option value={0}>all</option>
          <option value={1}>friends</option>
          <option value={2}>request received</option>
          <option value={3}>request sent</option>
          <option value={4}>not friends</option>
        </select>
        <div className={styles.selector}>Sort</div>
        <select
          className={styles.selection}
          value={sortSelection}
          onChange={(e) => setSortSelection(Number(e.target.value))}
        >
          <option value={0}>friend status</option>
          <option value={1}>rating</option>
          <option value={2}>number of stories</option>
        </select>
        {/* { field, type, setterFunction, children, id } */}
        <Input
          field={search}
          type="text"
          setterFunction={setSearch}
          id="search"
        >
          Search for a user
        </Input>
      </div>
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Loader size={"big"} />{" "}
          </div>
        )}
        {!isLoading && filteredUsers.length === 0 && (
          <div className={styles.listEmpty}>
            Nothing to display here! Try changing your filtering options
          </div>
        )}
        {!isLoading && filteredUsers.length > 0 && (
          <ul className={styles.list}>
            {filteredUsers
              .map((user) => {
                return (
                  <Friend
                    key={user.id}
                    friend={user}
                    isFriend={friends.includes(user.id)}
                  />
                );
              })

              .filter((element) => element.key !== currentUserId)}
          </ul>
        )}
      </div>
    </>
  );
}

export default Friends;
