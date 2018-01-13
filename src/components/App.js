import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import PostList from './PostList'
import PostAdd from './PostAdd'
import PostDetail from './PostDetail'



class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">

          <Route exact path='/' render={() => (
            <PostList />
          )} />
          <Route path='/:category/add' component={PostAdd} />
          <Route exact path='/:category' component={PostList}  />
          <Route exact path='/:category/:id' component={PostDetail} />


        </div>
      </Router>
    );
  }
}

export default App
