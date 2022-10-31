import { styles } from "./SongSearchStyles.js";
import "./SongSearch.css";

export function SongSearch({searchTerm, searchSuggestions, onChange, onFocus, inputNumber, show, mark, disabled}) {
  return (
    <div>
      <input className={mark} autoComplete="off" id={inputNumber} type="text" list={show ? `song-selection-data-${inputNumber}` : null} value={searchTerm} onChange={onChange} onFocus={onFocus} disabled={disabled}></input>
      
      <datalist id={`song-selection-data-${inputNumber}`}>
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}