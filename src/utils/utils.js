import React from 'react'

/**
 * Returns an img tag with a book's cover or a placeholder image
 *
 * @param book
 * @returns {}
 */

export const bookImage = (book) => {
  return (book.imageLinks && book.imageLinks.thumbnail) ?
    <img src={`${book.imageLinks.thumbnail}`} alt="Book Cover"/> :
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/128px-No_image_available.svg.png"
      alt="No book cover"/>
}