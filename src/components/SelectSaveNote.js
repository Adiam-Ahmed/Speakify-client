import { useState } from 'react';


const SelectSaveNote = ({ booksList, onSelectBook }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedBook, setSelectedBook] = useState('');

    return (
        <div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Save Notes</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                </label>
            </div>
            {isChecked && (
                <select
                    className="select select-primary w-full max-w-xs"
                    value={selectedBook}
                    onChange={(e) => {
                        setSelectedBook(e.target.value);
                        onSelectBook && onSelectBook(e.target.value); 
                    }}
                >
                    <option value="" disabled>
                        Select to which book to save
                    </option>
                    {booksList.length > 0 ? (
                        booksList.map((book) => (
                            <option key={book.id} value={book.title}>
                                {book.title}
                            </option>
                        ))
                    ) : (
                        <option disabled>No Books currently</option>
                    )}
                </select>
            )}
        </div>
    );
};

export default SelectSaveNote;