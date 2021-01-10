
import react, { useState } from "react";
import '../App.css';
import { Container, Row, Col } from 'react-grid-system';
function Omdb(promps) {
    const [serachRslt, setSerachRslt] = useState([]);

    const inputHandle = (e) => {
        promps.setinputText(e.target.value);
    }

    const onAdd = (m) => {
        promps.setMovies([...promps.movies, m]);
    }

    const onRemove = (m) => {
        var filter = promps.movies.filter(movie => {
            return movie.imdbID != m.imdbID;
        });
        promps.setMovies(filter);
    }

    function checkExist(d) {
        for (let index = 0; index < promps.movies.length; index++) {
            if (promps.movies[index].imdbID === d.imdbID) {
                return true;
            }
        }
        return false;
    }

    const clickHandle = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${promps.inputText}&apikey=15ffabba&type=movie`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                if (response.Response === 'False') {
                    setSerachRslt([]);
                }
                else {
                    setSerachRslt(response.Search);
                }
            })
            .catch(({ message }) => {
            })
        promps.setinputText("");
    }

    return (
        <div className="omdb">
            <Container>
                <Row>
                    <Col sm={12}>
                        <header className="App-header">
                            <h1>OMDB Search</h1>
                        </header>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        {promps.movies.length > 4 ?
                            <div className="nominationLimit">
                                You already select 5 items.</div>
                            : <form>
                                <input value={promps.inputText} onChange={inputHandle} type="text" className="todo-input" />
                                <button onClick={clickHandle} className="todo-button" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>}
                    </Col>
                    <Col sm={6}>
                        <div className="nominationTitle">
                            Nomination List</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div className="omdb-container">
                            {serachRslt.length > 0 ?
                                <ul className="omdb-list">
                                    {serachRslt.map(rslt =>
                                        <li key={rslt.imdbID}>
                                            <Row>
                                                <Col sm={6}>
                                                    {rslt.Title}<br />
                                                    {rslt.Year}<br />
                                                    {!checkExist(rslt) && promps.movies.length < 5 ? <i className="fas fa-plus-square" onClick={() => onAdd(rslt)}></i> : <i className="fas fa-plus-square dis"></i>}
                                                </Col>
                                                <Col sm={5}>
                                                    <img className="moviePoster" src={`${rslt.Poster}`} />
                                                </Col>
                                            </Row>
                                        </li>
                                    )}
                                </ul> :
                                <p> There is no result found, Please try to search..</p>
                            }
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="omdb-container">
                            <ul className="omdb-list">
                                {promps.movies.length > 0 ?
                                    <div>
                                        {promps.movies.map(movie =>

                                            <li key={movie.imdbID}>
                                                <Row>
                                                    <Col sm={6}>
                                                        {movie.Title}<br />
                                                        {movie.Year}<br />
                                                        <i className="fas fa-minus-square" onClick={() => onRemove(movie)}></i>
                                                    </Col>
                                                    <Col sm={5}>
                                                        <img className="moviePoster" src={`${movie.Poster}`} />
                                                    </Col>
                                                </Row>
                                            </li>
                                        )}</div> :
                                    (<p>Please choose your 5 nominees</p>)}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Omdb;
