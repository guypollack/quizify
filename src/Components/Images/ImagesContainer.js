export function ImagesContainer({ imageData, scores }) {
  // console.log(imageData);
  return (
    imageData.map((artist, index) => {
      return (
        <div className="artist-image-container" key={artist.name}>
          <img className="artist-image"  src={artist.url} />
          <p>{artist.name}</p>
          <p>{scores[index + 1]}/15</p>
        </div>)
    })
  )
}