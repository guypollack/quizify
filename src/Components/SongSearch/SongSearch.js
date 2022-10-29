import { styles } from "./SongSearchStyles.js"

export function SongSearch({searchTerm, searchSuggestions, onChange}) {
  return (
    <div>
      <h1>Song Search</h1>
      <input type="text" list="song-selection-data" value={searchTerm} onChange={onChange} style={styles}></input>

      {/* <datalist id="song-selection-data">
        <option value="A" />
      </datalist> */}

      <datalist id="song-selection-data">
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}