import React from 'react';
import { Link } from 'react-router-dom';


const BookList = ({booklist}) => {
    return (
        <div>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Books
                </div>
                <div className="collapse-content">
                    {booklist.length > 0 ? (
                        booklist.map((book) => (
                            <div className="flex flex-col w-full" key={book.id}>
                                <Link to={`/profile/book/${book.id}`}>
                                    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">{book.title}</div>
                                </Link>
                                <div className="divider divider-primary"></div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <li>No Books currently</li>
                        </div>
                    )}
                </div>
            </div>
            
            
        </div>
    );
};

export default BookList;