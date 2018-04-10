import Divider from 'material-ui/Divider'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Header from './components/Header/Header'
import Shelf from './components/Shelf/Shelf'
import SearchPage from './pages/SearchPage/SearchPage'

class App extends Component {

  state = {
    books: []
  }

  componentDidMount () {
    BooksApi.getAll().then(books => {
      this.setState({books: books})
    })
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf
    BooksApi.update(book, shelf).then(() => {
      this.setState(prevState => ({
          books: prevState.books.filter(prevBook => prevBook.id !== book.id).concat([book])
        })
      )
    })
  }

  // TODO - To be implemented to avoid unnecessary renders
  // shouldComponentUpdate = (nextProps, nextState) => {
  //
  //   console.log("nextState", nextState)
  //   console.log("nextProps", nextProps)
  //   console.log(this.props.location)
  //
  //
  //   // return this.state.books !== nextState.books;
  //   return true
  // }

  updateShelf = (book) => {
    const found = this.state.books.find(myBook => myBook.id === book.id)
    return found ? found.shelf : null
  }

  render () {

    const {books} = this.state

    return (
      <div className="app">
        <Header/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Shelf title="Currently Reading"
                   books={books.filter(book => book.shelf === 'currentlyReading')}
                   updateBook={this.updateBook}/>
            <Divider inset={true} style={{backgroundColor: '#1d1508'}}/>
            <Shelf title="Want to read" books={books.filter(book => book.shelf === 'wantToRead')}
                   updateBook={this.updateBook}/>
            <Divider inset={true} style={{backgroundColor: '#1d1508'}}/>
            <Shelf title="Read" books={books.filter(book => book.shelf === 'read')}
                   updateBook={this.updateBook}/>
          </div>
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchPage updateShelf={this.updateShelf} updateBook={this.updateBook}/>
        )}/>
      </div>
    )
  }
}

export default App