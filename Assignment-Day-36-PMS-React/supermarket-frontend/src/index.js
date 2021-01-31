import React from "react";
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import { render } from "react-dom";
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

// const App1 = () => {
//   const [chosenEmoji, setChosenEmoji] = useState(null);

//   const onEmojiClick = (event, emojiObject) => {
//     setChosenEmoji(emojiObject);
//   };

//   return (
//     <div>
//       <Picker
//         onEmojiClick={onEmojiClick}
//         disableAutoFocus={true}
//         skinTone={SKIN_TONE_MEDIUM_DARK}
//         groupNames={{ smileys_people: "PEOPLE" }}
//       />
//       {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
//     </div>
//   );
// };

// const EmojiData = ({ chosenEmoji }) => (
//   <div>
//     <strong>Unified:</strong> {chosenEmoji.unified}
//     <br />
//     <strong>Names:</strong> {chosenEmoji.names.join(", ")}
//     <br />
//     <strong>Symbol:</strong> {chosenEmoji.emoji}
//     <br />
//     <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
//   </div>
// );

render(<App />, document.getElementById("root"));
