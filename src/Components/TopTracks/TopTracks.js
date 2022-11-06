export function TopTracks({data, show}) {
  return (
    <div className={`top-tracks${show ? " show" : ""}`}>
      {data.map((song, index) => {
      return <p key={index + 1}>{index + 1}<span>. </span>{song}</p>
      })}
    </div>
  )
}