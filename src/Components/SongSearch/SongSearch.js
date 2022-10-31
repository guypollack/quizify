export function SongSearch({searchTerm, searchSuggestions, onChange, onFocus, inputNumber, show, mark, disabled}) {
  return (
    <div className="song-search">
      <input className={mark} autoComplete="off" id={inputNumber} type="text" list={show ? `song-selection-data-${inputNumber}` : null} placeholder={`Guess ${inputNumber}`} value={searchTerm} onChange={onChange} onFocus={onFocus} disabled={disabled}></input>
      <div className="tick-container">
        <p>✓</p>
      </div>
      <div className="squiggle-container">
        <p>~</p>
      </div>
      <div className="cross-container">
        <p>X</p>
      </div>
      <datalist id={`song-selection-data-${inputNumber}`}>
        {searchSuggestions.map(suggestion => {
          return <option key={suggestion} value={suggestion} />
        })}
      </datalist>
    </div>
  )
}