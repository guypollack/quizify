import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { ArtistSearchContainer } from "./Components/ArtistSearch/ArtistSearchContainer";
import { SongSearchContainer } from "./Components/SongSearch/SongSearchContainer";
import { Warnings } from "./Components/Warnings/Warnings.js";
import Spotify from "./Utilities/Spotify/Spotify.js";

function App() {
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const [artistSearchSuggestions, setArtistSearchSuggestions] = useState([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(true);
  const [artistId, setArtistId] = useState(null);

  const [topTracks, setTopTracks] = useState([]);
  const [marks, setMarks] = useState({1: "", 2: "", 3: "", 4: "", 5: ""});
  const [score, setScore] = useState(0);

  const [songSearchTerms, setSongSearchTerms] = useState({1:"", 2: "", 3: "", 4: "", 5: ""});
  const [songSearchSuggestions, setSongSearchSuggestions] = useState({1: [], 2: [], 3: [], 4: [], 5: []});
  const [showSongSuggestions, setShowSongSuggestions] = useState({1: true, 2: true, 3: true, 4: true, 5: true});
  const [currentSongInput, setCurrentSongInput] = useState(1);

  const [containsBlanks, setContainsBlanks] = useState(true);
  const [containsDuplicates, setContainsDuplicates] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);

  useEffect(() => {
    Spotify.getAccessToken()
  },[]);

  useEffect(() => {
    if (artistSearchTerm) {
      Spotify.search("artist", artistSearchTerm)
        .then(searchResults => searchResults.artists.items)
        .then(items => {
          setArtistId(items[0].id);
          return items;
        })
        .then(items => items.map(artist => artist.name))
        .then(artists => artists.slice(0,10))
        .then(reducedArtists => reducedArtists.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedArtists => dedupedArtists.filter(artistName => artistName.toLowerCase().includes(artistSearchTerm.toLowerCase())))
        .then(refinedArtists => setArtistSearchSuggestions(refinedArtists));
    }
  },[artistSearchTerm]);

  useEffect(() => {
    setShowArtistSuggestions(!(artistSearchTerm === artistSearchSuggestions[0]));
  },[artistSearchTerm])

  useEffect(() => {
    if (!artistId) return;
    Spotify.getTopTracks(artistId)
      .then(response => response.tracks)
      .then(tracks => tracks.map(track => track.name).slice(0,5))
      .then(reducedTracks => setTopTracks(reducedTracks));
  },[artistId]);

  function updateSongSearchSuggestions(index) {
    if (artistSearchTerm && songSearchTerms[index]) {
      Spotify.songSearch(songSearchTerms[index],artistSearchTerm)
        .then(searchResults => searchResults.tracks.items)
        .then(items => {
          return items.map(song => song.name)
        })
        .then(songs => songs.slice(0,10))
        .then(reducedSongs => reducedSongs.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedSongs => setSongSearchSuggestions(prev => ({...prev, [index]: dedupedSongs})));
    } else {
      setSongSearchSuggestions(prev => ({...prev, [index]: []}));
      // setSongSearchSuggestions(prev => ({...prev}));
    }
  }

  useEffect(() => {
    updateSongSearchSuggestions(currentSongInput);
    // console.log(songSearchTerms[1], songSearchSuggestions[1][0], songSearchTerms[1] === songSearchSuggestions[1][0]);
    Object.keys(showSongSuggestions).forEach(index => setShowSongSuggestions(prev => ({...prev, [index]: !(songSearchTerms[index] === songSearchSuggestions[index][0])})));
  },[songSearchTerms]);

  useEffect(() => {
    Object.keys(songSearchSuggestions).forEach(index => updateSongSearchSuggestions(index));
  },[artistSearchTerm]);

  function markAnswers() {
    Object.keys(songSearchTerms).forEach(index => {
      // alert("index");
      setTimeout(() => {
        console.log(index);
        if (topTracks[index-1] === songSearchTerms[index]) {
          setMarks(prev => ({...prev, [index]: "correct"}));
          setScore(prev => prev + 3);
        } else if (topTracks.includes(songSearchTerms[index])) {
          setMarks(prev => ({...prev, [index]: "wrong-place"}));
          setScore(prev => prev + 1);
        } else {
          setMarks(prev => ({...prev, [index]: "incorrect"}));
        }
      }, 1000 * index);
    })
  }

  useEffect(() => {
    return;
  }, [marks])

  // useEffect(() => {
  //   if (topTracks[currentSongInput-1] === songSearchTerms[currentSongInput]) {
  //     marks[currentSongInput] = "correct";
  //   } else if (topTracks.includes(songSearchTerms[currentSongInput])) {
  //     marks[currentSongInput] = "wrong-place";
  //   } else {
  //     marks[currentSongInput] = "incorrect";
  //   }
  // },[songSearchTerms]);

  useEffect(() => {
    setContainsBlanks([artistSearchTerm, ...Object.values(songSearchTerms)].includes(""));
  },[artistSearchTerm,songSearchTerms]);

  useEffect(() => {
    setContainsDuplicates(Object.values(songSearchTerms).filter((value, index, self) => self.indexOf(value) === index).length < 5);
  },[songSearchTerms])

  useEffect(() => {
    setShowWarnings(false);
  },[artistSearchTerm])

  function handleSubmit(e) {
    e.preventDefault();
    // alert("Quack");
    setShowWarnings(true);
    if (!(containsBlanks || containsDuplicates)) {
      // Insert code for marking
      alert("Now marking");
      markAnswers();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Score: {score}</h1>
      {/* <h1>Contains Blanks: {containsBlanks.toString()}</h1> */}
      {/* <h1>Contains Duplicates: {containsDuplicates.toString()}</h1> */}
      <ArtistSearchContainer searchTerm={artistSearchTerm} setSearchTerm={setArtistSearchTerm} searchSuggestions={artistSearchSuggestions} show={showArtistSuggestions} />
      <SongSearchContainer searchTerms={songSearchTerms} setSearchTerms={setSongSearchTerms} searchSuggestions={songSearchSuggestions} currentSongInput={currentSongInput} setCurrentSongInput={setCurrentSongInput} show={showSongSuggestions} marks={marks} />
      {showWarnings && <Warnings blanks={containsBlanks} dupes={containsDuplicates} />}
      <button type="submit">Submit</button>
    </form>
  )
}

export default App;