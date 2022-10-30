export function Warnings({artist, blanks, dupes, previousArtist}) {
  return previousArtist ? <p>You have already guessed {artist}'s top tracks</p> : (
    <div>
      {blanks && <p>Contains blanks</p>}
      {dupes && <p>Contains dupes</p>}
    </div>
  );
}