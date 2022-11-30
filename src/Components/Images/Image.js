export function Image({name, url, visibility, score}) {
  if (visibility === "visible") {
    return (
      <div className="artist-image-container">
        <img className="artist-image" src={url} />
        <p>{name}</p>
        <p>{score}/15</p>
        {/* <p>{visibility}</p> */}
      </div>)
  }
}