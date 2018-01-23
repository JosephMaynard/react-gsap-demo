import React, { Component, Fragment } from "react";
import { TransitionGroup } from "react-transition-group";
import {TweenMax, Elastic} from 'gsap';
import './App.css';

const randomChar = () => (Math.floor(Math.random() * 6) + 5)
    .toString(16)
    .toUpperCase();
const randomHex = () => {
  return `#${randomChar()}${randomChar()}${randomChar()}`
}

class Item extends Component {
  constructor(props){
    super(props);
    this.baBoing = this.baBoing.bind(this);
  }
  componentWillEnter(cb){
    TweenMax.from(this.item, 0.5 + Math.random(), {
      opacity: 0,
      scale: 0,
      x: Math.round((Math.random() - 0.5) * 800),
      y: Math.round((Math.random() - 0.5) * 800),
      rotation: Math.round((Math.random() - 0.5) * 720),
      onComplete() {
        cb();
      },
      ease: Elastic.easeOut
    });
  }
  componentWillLeave(cb){
    TweenMax.to(this.item, 0.5 + Math.random(), {
      opacity: 0,
      scale: 0,
      x: Math.round((Math.random() - 0.5) * 600),
      y: Math.round((Math.random() - 0.5) * 600),
      rotation: Math.round((Math.random() - 0.5) * 720),
      ease: Elastic.easeOut,
      onComplete() {
        cb();
      }
    });
  }
  baBoing(){
    TweenMax.to(this.item, 0.4, {
      scale: Math.random() * 4,
      x: Math.round((Math.random() - 0.5) * 300),
      y: Math.round((Math.random() - 0.5) * 300),
      ease: Elastic.easeOut,
    });
    TweenMax.to(this.item, 0.3, {
      scale: 1,
      x: 0,
      y: 0,
      ease: Elastic.easeOut,
      delay: 0.4,
    });
    
  }
  render(){    
    return <div className="item" ref={element => {
          this.item = element;
        }} onClick={this.baBoing}
        style={{backgroundColor: this.props.colour}}
        >
        {this.props.title}
      </div>;
  }
}

class App extends Component {
  state = {
    items: [],
  }

  render() {
    return <Fragment>
        <div className="item-container">
          <TransitionGroup className="item-wrapper">
            {this.state.items.map(item => (
              <Item
                title={item.title}
                key={item.title}
                colour={item.colour}
              />
            ))}
          </TransitionGroup>
        </div>
        <div className="buttons">
          <button onClick={() => this.setState({
                items: [
                  ...this.state.items,
                  {
                    title:(Math.random() * 1e8)
                    .toString(36)
                    .substring(0, 5)
                    .toUpperCase(),
                    colour: `#${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}${randomChar()}`
                  }
                ]
              })}>
            Add item
          </button>
          <button onClick={() => {
              const items = this.state.items;
              items.shift();
              this.setState({ items });
            }}>
            Remove item
          </button>
        </div>
      </Fragment>;
  }
}

export default App;
