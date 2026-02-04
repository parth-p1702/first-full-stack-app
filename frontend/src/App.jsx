import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");

  const fetchData = async () => {
    await axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.note);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      // UPDATE
      axios
        .patch(`http://localhost:3000/api/notes/${editId}`, {
          title,
          description,
        })
        .then(() => {
          fetchData();
          setEditId("");
          setTitle("");
          setDescription("");
        });
    } else {
      // CREATE
      axios
        .post("http://localhost:3000/api/notes", {
          title,
          description,
        })
        .then(() => {
          fetchData();
          setTitle("");
          setDescription("");
        });
    }
  }

  function handleDelete(Id) {
    axios.delete(`http://localhost:3000/api/notes/${Id}`).then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  return (
    <>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>{editId ? "Update" : "Create"}</button>
      </form>
      <div className="notes">
        {note.map((note) => {
          return (
            <>
              <div className="note">
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <button
                  onClick={() => {
                    handleDelete(note._id);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(note);
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
