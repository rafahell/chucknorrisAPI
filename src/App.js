import React, { Component } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from './Loading';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      cat: [],
      getCategory: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  getAllCat() {
    axios.get('https://api.chucknorris.io/jokes/categories')
      .then(res => {
        const cat = res.data;
        this.setState({
          cat: cat
        })
        //console.log(res.data)
      })
      .catch(error => this.setState({ error }));
  }

  handleClick(id, e) {
    //alert(id);
    e.preventDefault();
    axios.get('https://api.chucknorris.io/jokes/random?category=' + id)
      .then(res => {
        const getCategory = res.data;
        this.setState({
          getCategory,
          isLoaded: true
        })
        //console.log(res.data)
      })
      .catch(error => this.setState({ error }));

    this.setState({
      isLoaded: false
    })
  }

  //fetch api axios
  getRandomJoke() {
    axios.get(`https://api.chucknorris.io/jokes/random`)
      .then(res => {
        const joke = res.data;
        this.setState({
          joke,
          isLoaded: true,
        })
        //console.log(res.data)
      })
      .catch(error => this.setState({ error, isLoaded: false }));

    this.setState({
      isLoaded: false
    })
  }


  componentDidMount() {
    this.getAllCat();
    this.getRandomJoke();
  }

  render() {
    const { isLoaded, cat, joke, getCategory } = this.state;

    return (
      <div className="App">

        {isLoaded ?
          <Container>
            <Row>
              <Col xs={2} sm={4} md={4} >
                <h2>Choose a Category</h2><br />
                <ul>
                  {cat.map((cats, index) =>
                    <li key={index}>
                      <a role="button" onClick={this.handleClick.bind(this, cats)} href="# "> {cats}</a>
                    </li>
                  )}
                </ul>
              </Col>

              {getCategory ?

                <Col xs={10} sm={6} md={6} key={getCategory.id}>
                  <Card>
                    <Card.Img variant="top" src={getCategory.icon_url} />
                    <Card.Body>
                      <Card.Title>Chuck Norris facts</Card.Title>
                      <Card.Text>
                        {getCategory.value}<br />
                      </Card.Text>
                      <p className="small">Category: {getCategory.categories}</p>
                    </Card.Body>

                  </Card>
                </Col>
                :

                <Col xs={10} sm={6} md={6} key={joke.id}>
                  <Card>
                    <Card.Img variant="top" src={joke.icon_url} />
                    <Card.Body>
                      <Card.Title>Chuck Norris facts</Card.Title>
                      <Card.Text>
                        {joke.value}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

              }
            </Row>
          </Container >

          : <Loading message="Loading..." />
        }




      </div>
    );
  }
}

export default App;
