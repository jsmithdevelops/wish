
import React, { useState } from 'react';
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);
  const [currentToken, setCurrentToken] = useState(0);
  const [tokenName, setTokenName] = useState('');
  const [selectedTokens, setSelectedTokens] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.scryfall.com/cards/search?q=${tokenName} is:token`)
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.data;
        // const newTokens = searchResults.map((result) => ({
        //   name: result.name,
        //   image: result.image_uris.normal,
        // }));

        const newTokens = searchResults
  .filter(result => result.layout === "token" && result.image_uris) // filter out non-tokens and tokens without image_uris
  .map((result) => ({
    name: result.name,
    image: result.image_uris.normal,
  }));
        

        setTokens(tokens.filter(Boolean).concat(newTokens.filter(Boolean)));
        setTokenName(''); // Reset the input field
        setCurrentToken(tokens.length)//shows new token after you submit 
      })
      .catch((error) => {
        console.error('Error fetching token:', error);
      });
  };

  const handleSelectToken = () => {
    const selectedToken = tokens[currentToken];
    setSelectedTokens([...selectedTokens, selectedToken]);
  };

  const handlePrevToken = () => {
    setCurrentToken(Math.max(currentToken - 1, 0));
  };

  const handleNextToken = () => {
    setCurrentToken(Math.min(currentToken + 1, tokens.length - 1));
  };

  const handleRemoveToken = (index) => {
    setSelectedTokens(selectedTokens.filter((_, i) => i !== index));
  }

  return (
    <div className="app">
      <h1>MTG Tokens</h1>
      <hr></hr>
      <form key={tokens.length} onSubmit={handleSubmit}>
  <label htmlFor="tokenName">Search for a token:</label>
  <input
    type="text"
    id="tokenName"
    value={tokenName}
    onChange={(e) => setTokenName(e.target.value)}
  />
  <button type="submit">Submit</button>
</form>

      <div className="token-display">
        {tokens.length > 0 ? (
          
            <div className='tokenImgContainer'>
             <img
              src={tokens[currentToken].image}
              alt={tokens[currentToken].name}
              style={{ maxWidth: '200px' }}
            />
        
            <div className='prevNextContainer'>
            <button
              className="prev-token"
              onClick={handlePrevToken}
              disabled={currentToken === 0}
            >
              Prev
            </button>
           
            <button
              className="next-token"
              onClick={handleNextToken}
              disabled={currentToken === tokens.length - 1}
            >
              Next
            </button>
            </div>
            <button
              className="select-token"
              onClick={handleSelectToken}
            >
              Select
            </button>
          </div>
        ) : (
          <p>No tokens to display</p>
        )}
      </div>
      <div className="selected-tokens">
        <h2>Selected Tokens</h2>
        {selectedTokens.length > 0 ? (
          selectedTokens.map((token,index) => (
            <div key={token.name}>
              <img src={token.image} alt={token.name} style={{ maxWidth: '200px' }} />
              <p>{token.name}</p>
              <button onClick={() => handleRemoveToken(index)}>Delete</button>
            </div>
          ))
        ) : (
          <div className="noSelectedTokens">
          <p>No tokens selected</p>
          </div>
        )}
      </div>
      <div className='wave'></div>
      <div className='wave'></div>
      <div className='wave'></div>
    </div>
  );
}
export default App;




// import React, { useState } from 'react';
// import './App.css';
// function App() {
//   const [tokens, setTokens] = useState([]);
//   const [currentToken, setCurrentToken] = useState(0);
//   const [tokenName, setTokenName] = useState('');
//   const [selectedTokens, setSelectedTokens] = useState([]);
//   const [showDeleteButton, setShowDeleteButton] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch(`https://api.scryfall.com/cards/search?q=${tokenName} is:token`)
//       .then((response) => response.json())
//       .then((data) => {
//         const searchResults = data.data;

//         const newTokens = searchResults
//           .filter((result) => result.layout === 'token' && result.image_uris)
//           .map((result) => ({
//             name: result.name,
//             image: result.image_uris.normal,
//           }));

//         setTokens(tokens.filter(Boolean).concat(newTokens.filter(Boolean)));
//         setTokenName('');
//         setCurrentToken(tokens.length);
//       })
//       .catch((error) => {
//         console.error('Error fetching token:', error);
//       });
//   };

//   const handleSelectToken = () => {
//     const selectedToken = tokens[currentToken];
//     setSelectedTokens([...selectedTokens, selectedToken]);
//   };

//   const handlePrevToken = () => {
//     setCurrentToken(Math.max(currentToken - 1, 0));
//   };

//   const handleNextToken = () => {
//     setCurrentToken(Math.min(currentToken + 1, tokens.length - 1));
//   };

//   // const handleDeleteToken = (tokenIndex) => {
//   //   const newSelectedTokens = [...selectedTokens];
//   //   newSelectedTokens.splice(tokenIndex, 1);
//   //   setSelectedTokens(newSelectedTokens);
//   // };

//   const handleDeleteToken = (tokenIndex) => {
//     const newSelectedTokens = selectedTokens.filter((_, index) => index !== tokenIndex);
//     setSelectedTokens(newSelectedTokens);
//   };
  
//   return (
//     <div className="app">
//       <h1>MTG Tokens</h1>
//       <hr />
//       <form key={tokens.length} onSubmit={handleSubmit}>
//         <label htmlFor="tokenName">Search for a token:</label>
//         <input
//           type="text"
//           id="tokenName"
//           value={tokenName}
//           onChange={(e) => setTokenName(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>

//       <div className="token-display">
//         {tokens.length > 0 ? (
//           <div>
//             <div className="tokenImgContainer">
//               <img
//                 src={tokens[currentToken].image}
//                 alt={tokens[currentToken].name}
//                 style={{ maxWidth: '200px' }}
//               />
//             </div>

// <div className='prev-next-parent'>

//             <button
//               className="prev-token"
//               onClick={handlePrevToken}
//               disabled={currentToken === 0}
//             >
//               Prev
//             </button>

//             <button
//               className="next-token"
//               onClick={handleNextToken}
//               disabled={currentToken === tokens.length - 1}
//             >
//               Next
//             </button>
//             </div>
//             <button className="select-token" onClick={handleSelectToken}>
//               Select
//             </button>
//           </div>
//         ) : (
//           <p>No tokens to display</p>
//         )}
//       </div>
//       <div className="selected-tokens">
//         <h2>Selected Tokens</h2>
//         {selectedTokens.length > 0 ? (
//           selectedTokens.map((token, index) => (
//             <div key={index}>
//               <div className='selected-token-img-container'>
//               <img
//                 src={token.image}
//                 alt={token.name}
//                 style={{ maxWidth: '200px' }}
//                 onMouseEnter={() => setShowDeleteButton(true)}
//                 onMouseLeave={() => setShowDeleteButton(false)}
//               />
//               <button
//               className="delete-token-button"
//               onClick={() => handleDeleteToken(index)}
//               style={{display: setShowDeleteButton ? 'block' : 'none'}}
//               >
//                 X
//                 </button>
//                 </div>
//               <p>{token.name}</p>
//               <button onClick={() => handleDeleteToken(index)}>X</button>
//             </div>
//           ))
//         ) : (
//           <p>No tokens selected</p>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   export default App;
  


// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [tokens, setTokens] = useState([]);
//   const [currentToken, setCurrentToken] = useState(0);
//   const [tokenName, setTokenName] = useState('');
//   const [selectedTokens, setSelectedTokens] = useState([]);
//   const [showDeleteButton, setShowDeleteButton] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch(`https://api.scryfall.com/cards/search?q=${tokenName} is:token`)
//       .then((response) => response.json())
//       .then((data) => {
//         const searchResults = data.data;

//         const newTokens = searchResults
//           .filter((result) => result.layout === 'token' && result.image_uris)
//           .map((result) => ({
//             name: result.name,
//             image: result.image_uris.normal,
//           }));

//         setTokens(tokens.filter(Boolean).concat(newTokens.filter(Boolean)));
//         setTokenName('');
//         setCurrentToken(tokens.length);
//       })
//       .catch((error) => {
//         console.error('Error fetching token:', error);
//       });
//   };

//   const handleSelectToken = () => {
//     const selectedToken = tokens[currentToken];
//     setSelectedTokens([...selectedTokens, selectedToken]);
//   };

//   const handlePrevToken = () => {
//     setCurrentToken(Math.max(currentToken - 1, 0));
//   };

//   const handleNextToken = () => {
//     setCurrentToken(Math.min(currentToken + 1, tokens.length - 1));
//   };

//   const handleDeleteToken = (tokenIndex) => {
//     const newSelectedTokens = [...selectedTokens];
//     newSelectedTokens.splice(tokenIndex, 1);
//     setSelectedTokens(newSelectedTokens);
//   };

//   const handleMouseEnter = () => {
//     setShowDeleteButton(true);
//   };

//   const handleMouseLeave = () => {
//     setShowDeleteButton(false);
//   };

//   return (
//     <div className="app">
//       <h1>MTG Tokens</h1>
//       <hr />
//       <form key={tokens.length} onSubmit={handleSubmit}>
//         <label htmlFor="tokenName">Search for a token:</label>
//         <input
//           type="text"
//           id="tokenName"
//           value={tokenName}
//           onChange={(e) => setTokenName(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>

//       <div className="token-display">
//         {tokens.length > 0 ? (
//           <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//             <div className="tokenImgContainer">
//               <img
//                 src={tokens[currentToken].image}
//                 alt={tokens[currentToken].name}
//                 style={{ maxWidth: '200px' }}
//               />
//               {showDeleteButton && (
//                 <button
//                   className="delete-token"
//                   onClick={() => handleDeleteToken(currentToken)}
//                 >
//                   X
//                 </button>
//               )}
//             </div>
//             <button
//               className="prev-token"
//               onClick={handlePrevToken}
//               disabled={currentToken === 0}
//             >
//               Prev
//             </button>

//             <button
//               className="next-token"
//               onClick={handleNextToken}
//               disabled={currentToken === tokens.length - 1}
//             >
//               Next
//             </button>
//             <button className="select-token" onClick={handleSelectToken}>
//               Select
//             </button>
//           </div>
//         ) : (
//           <p>No tokens to display</p>
//         )}
//       </div>

//       <div className="selected-tokens">
//     <h2>Selected Tokens:</h2>
//     {selectedTokens.length > 0 ? (
//       <ul>
//         {selectedTokens.map((token, index) => (
//           <li key={index}>
//             {token.name}
//             <button onClick={() => handleDeleteToken(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <p>No tokens selected</p>
//     )}
//   </div>
// </div>
// );
// }

// export default App;
