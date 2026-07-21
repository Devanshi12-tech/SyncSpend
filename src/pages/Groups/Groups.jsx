import { useState, useEffect } from "react";
import "./Groups.css";
import { useNavigate } from "react-router-dom";

function Groups() {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");

    if (savedGroups) {
      return JSON.parse(savedGroups);
    }

    return [];
  });

  const [friends] = useState(() => {
  const savedFriends = localStorage.getItem("friends");

  if (savedFriends) {
    return JSON.parse(savedFriends);
  }

  return [];
});

const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  function handleCreateGroup() {
  if (groupName.trim() === "") return;

  const newGroup = {
  id: Date.now(),
  name: groupName,
  members: selectedMembers,
  expenses: [],
  createdAt: new Date().toLocaleDateString(),
};

  setGroups([...groups, newGroup]);
  setGroupName("");
  setSelectedMembers([]);
}

function handleMemberSelection(friend) {
  const alreadySelected = selectedMembers.some(
    (member) => member.id === friend.id
  );

  if (alreadySelected) {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== friend.id)
    );
  } else {
    setSelectedMembers([...selectedMembers, friend]);
  }
}

function handleDeleteGroup(id) {
  const updatedGroups = groups.filter((group) => group.id !== id);
  setGroups(updatedGroups);
}

 return (
  <div className="groups-container">
    <h1 className="groups-title">Groups</h1>
    <br></br>
    <p className="groups-subtitle">
      Create groups for trips, roommates, projects, etc.
    </p>

    <div className="group-form">
      <input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <button onClick={handleCreateGroup}>
        Create Group
      </button>
    </div>

<h2 className="groups-friends-heading">👥 Available Friends</h2>
<p className="groups-friends-subtitle">
  Select the friends you want to add to this group.
</p>

<div className="groups-friends-grid">
  {friends.length === 0 ? (
    <p>No friends added yet.</p>
  ) : (
    friends.map((friend) => (
      <label
        key={friend.id}
        className={`groups-friend-card ${
          selectedMembers.some((member) => member.id === friend.id)
            ? "selected"
            : ""
        }`}
      >
        <div className="groups-friend-info">
          <div className="groups-avatar">
            {friend.name.charAt(0).toUpperCase()}
          </div>

          <span>{friend.name}</span>
        </div>

        <input
          type="checkbox"
          checked={selectedMembers.some(
            (member) => member.id === friend.id
          )}
          onChange={() => handleMemberSelection(friend)}
        />
      </label>
    ))
  )}
</div>
<br></br>
    <div className="group-list">
      {groups.map((group) => (
        <div key={group.id} className="group-card">
          <h3>📁 {group.name}</h3>

          <p>Members: {group.members.length}</p>

          <p>Expenses: {group.expenses.length}</p>

          <p>Created: {group.createdAt}</p>
          
          <button
          onClick={() => navigate(`/groups/${group.id}`)}>
          Open Group
          </button>
          
          <p>
          <button onClick={() => handleDeleteGroup(group.id)}>
            Delete
          </button>
          </p>
        </div>
      ))}
    </div>
  </div>
);
}

export default Groups;

