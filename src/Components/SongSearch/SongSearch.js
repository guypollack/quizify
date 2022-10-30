import { styles } from "./SongSearchStyles.js"

export function SongSearch({searchTerm, searchSuggestions, onChange, onFocus, inputNumber, showList}) {
  // console.log("I have rendered");
  return (
    <div>
      <h1>Song Search</h1>
      <input autoComplete="off" id={inputNumber} type="text" list={showList ? `song-selection-data-${inputNumber}` : null} value={searchTerm} onChange={onChange} onFocus={onFocus} style={styles}></input>
      
      <datalist id={`song-selection-data-${inputNumber}`}>
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}