import React from 'react';
import styled from 'styled-components';

import CarouselItem from './CarouselItem.jsx';

//======= STYLES =======//

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const CarouselBox = styled.div`
  width: 80%;
  height: 20%;

  /* Basic rectangular border (use if border-image below does not cooperate with module resizing)*/
  border: 2px solid white;
  padding: 1% 1%;

  /* Ticket-shaped border using border-image (comment out/delete if needed) */
  border: solid;
  border-width: 10px 40px;
  border-image: url("/imgs/ticket-border.png") 9% repeat;
  padding: 1% 0%;
  `
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30%;
  overflow: hidden;
`
const Thumbnail = styled.div`
  flex: 1 0 100%;
  flex-basis: 20%;
  margin-right: 20px;
  background: black;
  order: ${(props) => props.order};
`
const NextButton = styled.button`
  border: none;
  font-size: 1.5em;
  background: none;
  color: white;
  text-align: center;
  margin-left: -2%
  margin-top: 0.3%;
  cursor: pointer;

  :focus {
    outline: none;
  }
`
const PrevButton = styled.button`
  border: none;
  font-size: 1.5em;
  background: none;
  color: white;
  text-align: center;
  margin-right: -2%;
  margin-top: 0.3%;
  cursor: pointer;

  :focus {
    outline: none;
  }
`

//======= COMPONENT =======//

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0
    }
  }

  getOrder(itemIndex) {
    const { position } = this.state
    const { videos } = this.props
    const numItems = videos.length || 1

    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position)
    }
    return itemIndex - position
  }

  nextSlide() {
    const { position } = this.state
    const { videos } = this.props
    const numItems = videos.length || 1
    this.setState({
      position: position === numItems - 1 ? 0 : position + 1
    })
  }

  prevSlide() {
    const { position } = this.state
    const { videos } = this.props
    const numItems = videos.length || 1
    this.setState({
      position: position === 0 ? numItems - 1 : position - 1
    })
  }

  render() {
    const {videos, handleThumbClick} = this.props;

    return(
      <Wrapper>
         <PrevButton onClick={() => {
            this.prevSlide();
          }}>
          <i className="fas fa-angle-left"></i>
        </PrevButton>
        <CarouselBox>
          <ItemContainer>
          {videos.map((vid, idx) => {
            return (
              <Thumbnail key={idx} order={this.getOrder(idx)}>
                <CarouselItem  video={vid} handleThumbClick={handleThumbClick}/>
              </Thumbnail>
            )
          })}
          </ItemContainer>
        </CarouselBox>
        <NextButton onClick={() => {
            this.nextSlide();
          }}>
          <i className="fas fa-angle-right"></i>
        </NextButton>
      </Wrapper>
    )
  }
}

export default Carousel;