import Divider from 'material-ui/Divider'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import BookInfo from './components/bookInfo/BookInfo'
import Header from './components/header/Header'
import SearchPage from './components/searchPage/SearchPage'
import Shelf from './components/shelf/Shelf'

const shelves = [
  {
    title: 'Currently Reading',
    id: 'currentlyReading'
  },
  {
    title: 'Want to Read',
    id: 'wantToRead'
  },
  {
    title: 'Read',
    id: 'read'
  }
]

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
          <div>
            {shelves.map(shelf => (
              <div key={shelf.id}>
                <Shelf
                  title={shelf.title}
                  books={books.filter(book => book.shelf === `${shelf.id}`)}
                  updateBook={this.updateBook}
                />
                <Divider inset={true} style={{backgroundColor: '#1d1508'}}/>
              </div>
            ))}
          </div>
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchPage updateShelf={this.updateShelf} updateBook={this.updateBook}/>
        )}/>
        <Route path="/book/:id" component={BookInfo}/>
      </div>
    )
  }
}

export default App