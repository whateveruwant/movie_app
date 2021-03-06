import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  //Render: componentWillMount() -> render() -> componentDidMount()
  //Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  //state는 setState를 통해 수정이 가능하고 수정이 이루어질때마다 render()함수가 자동으로 호출된다.
  state = {}

  //Render
  componentWillMount(){
    //api요청작업
    //console.log('will mount')
  }
  render() {
    //데이터관련작업
    //console.log('did render')
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies():'Loading'}
      </div>
    );
  }
  componentDidMount(){
    //console.log('did mount')
    //setTimeout(()=>{this.setState({greeting:'Hello Again!'})},5000)
    //this.setState({greeting:'Hello Again!'})

    this._getMovies();
  }

  //Update

  //UserFunctions
  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      console.log(movie)
      return <Movie
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
}

export default App;
