import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { ArtistSearchContainer } from "./Components/ArtistSearch/ArtistSearchContainer";
import { SongSearchContainer } from "./Components/SongSearch/SongSearchContainer";
import { Warnings } from "./Components/Warnings/Warnings.js";
import { TopTracks } from "./Components/TopTracks/TopTracks";
import Spotify from "./Utilities/Spotify/Spotify.js";
import { ImagesContainer } from "./Components/Images/ImagesContainer.js"

function App() {
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const [artistSearchSuggestions, setArtistSearchSuggestions] = useState([]);
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(true);
  const [artistId, setArtistId] = useState(null);
  const [previousArtists, setPreviousArtists] = useState([]);
  const [isArtistValid, setIsArtistValid] = useState(false);
  const [artistImages, setArtistImages] = useState([]);

  const [topTracks, setTopTracks] = useState([]);
  const [marks, setMarks] = useState({1: "", 2: "", 3: "", 4: "", 5: ""});
  const [currentScore, setCurrentScore] = useState(0);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState({});

  const [songSearchTerms, setSongSearchTerms] = useState({1:"", 2: "", 3: "", 4: "", 5: ""});
  const [songSearchSuggestions, setSongSearchSuggestions] = useState({1: [], 2: [], 3: [], 4: [], 5: []});
  const [showSongSuggestions, setShowSongSuggestions] = useState({1: true, 2: true, 3: true, 4: true, 5: true});
  const [currentSongInput, setCurrentSongInput] = useState(1);
  const [areSongsValid, setAreSongsValid] = useState({1: false, 2: false, 3: false, 4: false, 5: false});
  const [areAllSongsValid, setAreAllSongsValid] = useState(false);

  const [containsBlanks, setContainsBlanks] = useState(true);
  const [containsDuplicates, setContainsDuplicates] = useState(true);
  const [previousArtistSelected, setPreviousArtistSelected] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(false);

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
        // .then(dedupedArtists => dedupedArtists.filter(artistName => artistName.toLowerCase().includes(artistSearchTerm.toLowerCase())))
        .then(dedupedArtists => setArtistSearchSuggestions(dedupedArtists));
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
      Spotify.songSearch(songSearchTerms[index].replace("'",""),artistSearchTerm)
        .then(searchResults => searchResults.tracks.items)
        .then(items => {
          return items.map(song => song.name)
        })
        .then(songs => songs.slice(0,10))
        .then(reducedSongs => reducedSongs.filter((value, index, self) => self.indexOf(value) === index))
        .then(dedupedSongs => setSongSearchSuggestions(prev => ({...prev, [index]: [...dedupedSongs, ...topTracks.filter(track => !dedupedSongs.includes(track))]})));
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
        // console.log(index);
        if (topTracks[index-1] === songSearchTerms[index]) {
          setMarks(prev => ({...prev, [index]: "correct"}));
          // setCurrentScore(prev => prev + 3);
          setScore(prev => prev + 3);
        } else if (topTracks.includes(songSearchTerms[index])) {
          setMarks(prev => ({...prev, [index]: "wrong-place"}));
          // setCurrentScore(prev => prev + 1);
          setScore(prev => prev + 1);
        } else {
          setMarks(prev => ({...prev, [index]: "incorrect"}));
        }
        // console.log("XYZ  "+currentScore);
      }, 1000 * index);
    })
    setTimeout(() => {
      setShowTopTracks(true);
    }, 6000)
  }

  function addArtistImage(artist) {
    Spotify.search("artist", artist)
    .then(searchResults => searchResults.artists.items)
    .then(items => {
      setArtistImages(prev => [...prev, { url: items[0].images[0].url, name: artistSearchTerm }]);
    })
  }

  useEffect(() => {
    setContainsBlanks([artistSearchTerm, ...Object.values(songSearchTerms)].includes(""));
  },[artistSearchTerm,songSearchTerms]);

  useEffect(() => {
    setContainsDuplicates(Object.values(songSearchTerms).filter((value, index, self) => self.indexOf(value) === index).length < 5);
  },[songSearchTerms])

  useEffect(() => {
    setShowWarnings(false);
  },[artistSearchTerm])

  useEffect(() => {
    setPreviousArtistSelected(previousArtists.includes(artistSearchTerm));
  },[artistSearchTerm])

  useEffect(() => {
    // console.log(artistSearchTerm);
    // console.log(artistSearchSuggestions);
    setIsArtistValid(artistSearchSuggestions.includes(artistSearchTerm))
  },[artistSearchTerm],[artistSearchSuggestions]);

  useEffect(() => {
    Object.values(songSearchTerms).forEach((song, index) => {
      Spotify.songSearch(song.replace("'",""),artistSearchTerm)
        .then(searchResults => searchResults.tracks.items)
        .then(items => items.map(item => item.name))
        .then(songNames => {
          // console.log(songNames);
          // console.log(index + 1, [...songNames, ...topTracks]);
          // console.log([...songNames, ...topTracks].includes(songSearchTerms[index + 1]));
          setAreSongsValid(prev => ({...prev, [index + 1]: [...songNames, ...topTracks].includes(songSearchTerms[index + 1])}))
        })
      })
    },[songSearchTerms,artistSearchTerm]);

  useEffect(() => {
    setAreAllSongsValid(Object.values(areSongsValid).every(value => value));
  },[areSongsValid]);

  useEffect(() => {
    setScores(prev => {
      const previousScore = Object.values(prev).slice(0,previousArtists.length).reduce((total, current) => total + current, 0);
      return {...prev, [previousArtists.length]: score - previousScore};
    })
  },[score, previousArtists]);
  
  function handleSubmit(e) {
    e.preventDefault();
    // alert("Quack");
    setShowWarnings(true);
    if (!(containsBlanks || containsDuplicates || previousArtistSelected || !isArtistValid || !areAllSongsValid)) {
      // Insert code for marking
      // alert("Now marking");
      document.getElementById("submit-button").disabled = true;
      markAnswers();
      setTimeout(() => {
        addArtistImage(artistSearchTerm);
      }, 6900);
      setPreviousArtists(prev => [...prev, artistSearchTerm]);
      setTimeout(() => {
        setArtistSearchTerm("");
        setArtistSearchSuggestions([]);
        setSongSearchTerms({1:"", 2: "", 3: "", 4: "", 5: ""});
        setSongSearchSuggestions({1: [], 2: [], 3: [], 4: [], 5: []});
        setMarks({1: "", 2: "", 3: "", 4: "", 5: ""});
        // setCurrentScore(0);
        setShowTopTracks(false);
        document.getElementById("submit-button").disabled = false;
      }, 10000);
    }
  }

  // function tester() {
  //   setTimeout(() => {
  //     console.log(currentScore);
  //   }, 4000)
  // }

  // useEffect(() => {
  //   console.log(currentScore);
  // },[currentScore]);

  // useEffect(() => {
  //   console.log(scores);
  // },[scores]);


  // useEffect(() => {
  //   console.log(artistImages);
  // },[artistImages]);

  return (
    <div className="flex-container">
      <div>
        <h1 className="score">Score: {score}</h1>
        {/* <h1>Current points: {currentScore}</h1> */}
        {/* <h2>Valid? {isArtistValid.toString()}  {areAllSongsValid.toString()}</h2> */}
        {/* <h1>Contains Blanks: {containsBlanks.toString()}</h1> */}
        {/* <h1>Contains Duplicates: {containsDuplicates.toString()}</h1> */}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <div>
          <ArtistSearchContainer searchTerm={artistSearchTerm} setSearchTerm={setArtistSearchTerm} searchSuggestions={artistSearchSuggestions} show={showArtistSuggestions} />
        </div>
        <div>
          <SongSearchContainer searchTerms={songSearchTerms} setSearchTerms={setSongSearchTerms} searchSuggestions={songSearchSuggestions} currentSongInput={currentSongInput} setCurrentSongInput={setCurrentSongInput} show={showSongSuggestions} marks={marks} disabled={!isArtistValid} />
        </div>
        <div className="submit-button-container">
          <button type="submit" id="submit-button">CHECK MY ANSWERS</button>
          {showWarnings && <Warnings artist={artistSearchTerm} blanks={containsBlanks} dupes={containsDuplicates} previousArtist={previousArtistSelected} artistValid={isArtistValid} songsValid={areAllSongsValid} />}
          <TopTracks data={topTracks} show={showTopTracks} />
        </div>
      </form>
      <div className="images-container">
        <ImagesContainer imageData={artistImages} scores={scores} />
      </div>
    </div>
  )
}

export default App;