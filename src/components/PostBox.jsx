
import React, { useState, useRef } from 'react';
import './PostBox.css';

const mockUsers = ['JohnDoe', 'JaneSmith', 'AliceJohnson', 'BobBrown','dhee','hendrix','yasmine','kane'];

function PostBox() {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState([]); 
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const cursorPosition = e.target.selectionStart;
    const beforeCursor = value.slice(0, cursorPosition);

    if (beforeCursor.endsWith('@')) {
      setDropdownPosition(calculateDropdownPosition(textareaRef.current, cursorPosition));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const calculateDropdownPosition = (textarea, cursorPosition) => {
    const textLines = textarea.value.substr(0, cursorPosition).split('\n');
    const currentLine = textLines[textLines.length - 1];
    const charCount = currentLine.length;

    const lineHeight = 24; 
    const top = (textLines.length - 1) * lineHeight;
    const left = charCount * 8; 

    const { offsetTop, offsetLeft } = textarea;

    return {
      top: offsetTop + top + lineHeight,
      left: offsetLeft + left,
    };
  };

  const handleUserSelect = (user) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const beforeCursor = inputValue.slice(0, cursorPosition - 1);
    const afterCursor = inputValue.slice(cursorPosition);
    const newValue = `${beforeCursor}${user} ${afterCursor}`;
    setInputValue(newValue);
    setShowDropdown(false);
  };

  const handlePost = () => {
    const cleanedMessage = inputValue.replace('@', ''); // Remove "@" symbol
    const newPost = {
      message: cleanedMessage,
      time: new Date().toLocaleString(),
      sender: 'CurrentUser'
    };
    setPosts([...posts, newPost]);
    setInputValue('');
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="App">
      <div className="post-box">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message here..."
        />
        {showDropdown && (
          <div
            className="dropdown"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <input
              type="text"
              placeholder="Search users..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {filteredUsers.map((user) => (
              <div key={user} onClick={() => handleUserSelect(`@${user}`)}>
                {user}
              </div>
            ))}
          </div>
        )}
        <button onClick={handlePost}>Post</button>
      </div>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post.message}</p>
            <p>{post.time}</p>
            <p>Deepak</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostBox;



