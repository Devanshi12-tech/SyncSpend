import { useState, useEffect } from "react";
import "./Friends.css";

function Friends() {
  
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    return savedFriends ? JSON.parse(savedFriends) : [];
  });

  const [friendName, setFriendName] = useState("");
  const [editFriendId, setEditFriendId] = useState(null);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleAddFriend() {
  if (!friendName.trim()) {
    alert("Please enter a friend's name.");
    return;
  }

  if (editFriendId !== null) {
    const updatedFriends = friends.map((friend) =>
      friend.id === editFriendId
        ? {
            ...friend,
            name: friendName,
          }
        : friend
    );

    setFriends(updatedFriends);

    setEditFriendId(null);
    setFriendName("");

    return;
  }

  const friend = {
    id: Date.now(),
    name: friendName,
  };

  setFriends([...friends, friend]);

  setFriendName("");
}

  function handleDeleteFriend(id) {
  const friend = friends.find((friend) => friend.id === id);

  const groups = JSON.parse(localStorage.getItem("groups")) || [];

  const groupsContainingFriend = groups.filter((group) =>
    group.members.some((member) => member.id === id)
  );

  let shouldDelete = true;

  if (groupsContainingFriend.length > 0) {
    const groupNames = groupsContainingFriend
      .map((group) => group.name)
      .join(", ");

    shouldDelete = window.confirm(
      `${friend.name} is a member of:\n\n${groupNames}\n\nDeleting this friend will also remove them from these groups.\n\nDo you want to continue?`
    );
  }

  if (!shouldDelete) return;

  const updatedFriends = friends.filter((friend) => friend.id !== id);
  setFriends(updatedFriends);

  const updatedGroups = groups.map((group) => ({
    ...group,
    members: group.members.filter((member) => member.id !== id),
  }));

  localStorage.setItem("groups", JSON.stringify(updatedGroups));
}

function handleEditFriend(friend) {
  setFriendName(friend.name);

  setEditFriendId(friend.id);
}


  return (
    <div className="friends-page">
      <h1>👥 Friends</h1>

      <div className="friend-form">
        <input
          type="text"
          placeholder="Enter friend's name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />

        <button onClick={handleAddFriend}>
  {editFriendId ? "Update Friend" : "Add Friend"}
</button>
      </div>

      <div className="friends-list">
  {friends.map((friend) => (
    <div className="friend-card" key={friend.id}>
      <div className="avatar">
        {friend.name.charAt(0).toUpperCase()}
      </div>

      <h3>{friend.name}</h3>
         <p>Ready to split expenses 💸</p>


      <div className="friend-buttons">
        <button
  className="edit-btn"
  onClick={() => handleEditFriend(friend)}
>
  ✏ Edit
</button>

        <button className="delete-btn"
         onClick={() => handleDeleteFriend(friend.id)}>
        🗑 Delete
        </button>

      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Friends;