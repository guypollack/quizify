import { styles } from "./SongSearchStyles.js"

export function SongSearch({searchTerm, searchSuggestions, onChange, onFocus, inputNumber}) {
  return (
    <div>
      <h1>Song Search</h1>
      <input autoComplete="off" id={inputNumber} type="text" list={`song-selection-data-${inputNumber}`} value={searchTerm} onChange={onChange} onFocus={onFocus} style={styles}></input>
      
      <datalist id={`song-selection-data-${inputNumber}`}>
        {searchSuggestions.map(suggestion => {
          // console.log(suggestion);
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}