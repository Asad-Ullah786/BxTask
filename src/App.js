import { useState, useEffect } from "react";

function App() {
  const [add, setAdd] = useState(false);
  const [edit, setedit] = useState(false);
  const [books, setBooks] = useState([]);
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [title, setTile] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [pages, setPages] = useState(0);

  const handleCancel = () => {
    setAdd(false);
  };
  const handleCancelEdit = () => {
    setedit(false);
    setAdd(false);
    setTile("");
    setAuthor("");
    setPages("");
    setPublishDate("");
    setId("");
  };
  const handleAddBook = () => {
    setAdd(true);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };

  const handleGetApi = async () => {
    fetch("http://localhost:4200/api/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        if (data.results) {
          setBooks(data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDeleteApi = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:4200/api/delete-book/${bookId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("response", response);

      if (response.ok) {
        console.log("Book deleted successfully:", data.deletedBook);
        handleGetApi();
      } else {
        console.error("Error deleting book:", data.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:4200/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          numberOfPages: pages,
          authorName: author,
          date: publishDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Book added successfully:", data);
      } else {
        console.error("Error adding book:", data.message);
        handleGetApi();
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const handleEditbutton = (item) => {
    setedit(true);
    setTile(item.title);
    setAuthor(item.author);
    setPages(item.Pages);
    setPublishDate(item.publishDate);
    setId(item._id);
  };
  const handleUpdate = async () => {
    try {
      // setedit(true)

      // setTile(item.title)
      // setAuthor(item.author)
      // setPages(item.Pages)
      // setPublishDate(item.publishDate)

      const response = await fetch(
        `http://localhost:4200/api/update-book/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            numberOfPages: pages,
            authorName: author,
            date: publishDate,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Book updated successfully:", data.updatedBook);
        setedit(false);

        setTile("");
        setAuthor("");
        setPages("");
        setPublishDate("");
        setId("");

        handleGetApi();
      } else {
        console.error("Error updating book:", data.message);
        // Handle error cases if necessary
      }
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error cases if necessary
    }
  };
  useEffect(() => {
    handleGetApi();
  }, []);
  return (
    <div className="container">
      <div className="content">
        <h2>MY TASK</h2>
        {add && !edit ? (
          <div className="fom">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  onChange={(e) => setTile(e.target.value)}
                  type="text"
                  placeholder="Enter Title"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Author
                </label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  placeholder="Enter Author"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  No of Pages
                </label>
                <input
                  onChange={(e) => setPages(e.target.value)}
                  type="number"
                  placeholder="Enter Total pages of book"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Publish Date
                </label>
                <input
                  onChange={(e) => setPublishDate(e.target.value)}
                  type="date"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button className="btn btn-primary" onClick={handleAdd}>
                Add
              </button>
              <button onClick={handleCancel} className="btn btn-danger">
                cancle
              </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}

        {/* eidt */}
        {edit ? (
          <div className="fom">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  onChange={(e) => setTile(e.target.value)}
                  type="text"
                  value={title}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter Author"
                  value={author}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  No of Pages
                </label>
                <input
                  type="number"
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="Enter Total pages of book"
                  value={pages}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={publishDate.split("T")[0]}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button onClick={handleUpdate} className="btn btn-primary">
                Update
              </button>
              <button onClick={handleCancelEdit} className="btn btn-danger">
                cancle
              </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}
        {/*  edit*/}
        {/* <h4>Books</h4> */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Pages</th>
              <th scope="col">PublishDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.Pages}</td>
                <td>{item?.publishDate?.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditbutton(item)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteApi(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!edit ? (
          <button onClick={handleAddBook} className="btn btn-success addBtn">
            Add Book
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
