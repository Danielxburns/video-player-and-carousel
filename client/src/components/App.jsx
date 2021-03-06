import React from 'react';
import styled from 'styled-components';

import VideoPlayer from './VideoPlayer.jsx';
import Carousel from './Carousel.jsx';
import sampleData from '../sampleData.js';

//======= STYLES =======//
const Wrapper = styled.div`
  background-color:  #4C4C4C;
  width: 60%;
  padding: 10px;
`

//======= COMPONENT =======//

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieTitle: sampleData.name,
      videos: sampleData.associatedVideos,
      playerVideo: sampleData.associatedVideos[0]
    }
  }

  handleThumbClick(video) {
    this.setState({
      playerVideo: video
    })
  }

  getAssocVideos(id) {
    return fetch(`http://localhost:3333/associatedVideos?movieID=${id}`, {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Cache-Control":"no-cache"
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let videoData = data[0];
      this.setState({
        movieTitle: videoData.name,
        videos: videoData.associatedVideos,
        playerVideo: videoData.associatedVideos[0]
      })
    })
  }

  componentDidMount() {
    this.getAssocVideos(this.props.movieID);
  }

  render() {
    const {movieTitle, playerVideo, videos} = this.state;

    return (
      <Wrapper>

        <VideoPlayer movieTitle={movieTitle} video={playerVideo}/>
        <Carousel videos={videos} handleThumbClick={this.handleThumbClick.bind(this)}/>

      </Wrapper>
    )
  }
}

export default App;