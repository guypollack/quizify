export function Warnings({blanks, dupes}) {
  return (
    <div>
      {blanks && <p>Contains blanks</p>}
      {dupes && <p>Contains dupes</p>}
    </div>
  );
}