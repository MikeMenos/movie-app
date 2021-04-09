import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import Movie from "./components/Movie";
import Header from "./components/Header";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getMovies = useRef(() => {});
  const getMoviesInput = useRef(() => {});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getMoviesInput.current();
      setLoading(false);
    }, 2000);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getMovies.current();
      setLoading(false);
    }, 2000);
  }, []);

  getMovies.current = async () => {
    try {
      await axios.get(FEATURED_API).then((res) => {
        const datares = res.data.results;
        setMovies(datares);
        console.log(datares);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getMoviesInput.current = async () => {
      try {
        await axios.get(SEARCHAPI + search).then((res) => {
          const datares = res.data.results;
          setMovies(datares);
        });
      } catch (e) {
        console.log(e);
      }
    };
    setSearch("");
  };

  return (
    <>
      <Header
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        search={search}
      ></Header>
      {/* <form onSubmit={handleOnSubmit}>
        <input
          className="search"
          placeholder="Search..."
          type="text"
          value={search}
          onChange={handleOnChange}
        />
      </form> */}
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        <Spinner
          animation="grow"
          variant="primary"
          style={{ marginTop: "30px" }}
        ></Spinner>
      </div>
    </>
  );
};

export default App;
