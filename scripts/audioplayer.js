/*-- Playlists --*/
var selectionPlaylist1 = ["nanahatsuji.mp3", "thankyoumusic.mp3", "moonsong.mp3"];
var selectionPlaylist2 = [];
var selectionPlaylist3 = [];
var selectionPlaylist4 = [];

/*-- Metadata Dictionaries (TO BE REPLACED WITH JSON) --*/
var metadataLookup = {
  "nanahatsuji.mp3": {"name": "Nana Hatsuji", "artist": "ScenarioArt", "album": "The Perfect Insider", "img": "talking.jpg"},
  "thankyoumusic.mp3": {"name": "Thank You Music!", "artist": "Mikoto-P", "album": "Hatsune Miku: Magical Mirai", "img": "MiraiAlbumArt.png"},
  "moonsong.mp3": {"name": "Moonsong", "artist": "Studio Pixel", "album": "Cave Story Soundtrack", "img": "CaveStoryArt.jpg"}
}

/*-- Globals --*/
var playlist = ["nanahatsuji.mp3", "thankyoumusic.mp3", "moonsong.mp3"];
var index = 0;
var indexBuffer1 = 1;
var indexBuffer2 = 2;


/*======================================*/
/*=========== Player Methods ===========*/
/*======================================*/


/*-- Update Player Function: Updates player everytime a song is ready to be played --*/
function updatePlayer(){

  // Check to see if buffers are in bounds.
  if(indexBuffer1 >= playlist.length ){
    indexBuffer1 = indexBuffer1 - playlist.length;
  }
  else if(indexBuffer1 < 0 ){
    indexBuffer1 = playlist.length + indexBuffer1;
  }
  if(indexBuffer2 >= playlist.length ){
    indexBuffer2 = indexBuffer2 - playlist.length;
  }
  else if(indexBuffer2 < 0 ){
    indexBuffer2 = playlist.length + indexBuffer2;
  }

  //Update Player title, artist, album, images
  document.getElementById('songName').innerHTML = metadataLookup[playlist[index]]["name"];
  document.getElementById('artistName').innerHTML = metadataLookup[playlist[index]]["artist"];
  document.getElementById('album').innerHTML = metadataLookup[playlist[index]]["album"];
  document.getElementById('coverArt').src = "img/albumArt/" + metadataLookup[playlist[index]]["img"];
  document.getElementById('sideArt1').src = "img/albumArt/" + metadataLookup[playlist[indexBuffer1]]["img"];
  document.getElementById('sideArt2').src = "img/albumArt/" + metadataLookup[playlist[indexBuffer2]]["img"];
}

/*-- Update Song Function: Pauses current song and loads x song --*/
function updateSong(x){
  document.getElementById('aSong').pause();
  document.getElementById('aSong').removeAttribute("src");
  document.getElementById('aSong').src = "music/" + playlist[x];
  document.getElementById('aSong').load();
}

/*-- Play Function: Plays loaded track --*/
function playSong(){
  document.getElementById('aSong').play();
}

/*-- Pause Function: Pauses loaded track --*/
function pauseSong(){
  document.getElementById('aSong').pause();
}

/*-- Stop Function: Resets Track --*/
function stopSong(){
  document.getElementById('aSong').load();
  document.getElementById('aSong').pause();
}

/*-- Next Function: Plays the next track on the playlist --*/
function nextSong(){

  //Increments index and buffers
  index++;
  indexBuffer1++;
  indexBuffer2++;

  //Checks if index is within playlist bounds
  if(index >= playlist.length ){
    index = 0;
  }

  updateSong(index);
  playSong();
}

function next2Song(){

  //Increments index and buffers
  index+=2;
  indexBuffer1+=2;
  indexBuffer2+=2;

  //Checks if index is within playlist bounds
  if(index >= playlist.length ){
    index = index - playlist.length;
  }

  updateSong(index);
  playSong();
}

/*-- Prev Function: Plays the previous track on the playlist --*/
function prevSong(){

  //Decrements index and buffers
  index--;
  indexBuffer1--;
  indexBuffer2--;

  //Checks if index is within playlist bounds
  if(index < 0 ){
    index = playlist.length - 1;
  }

  updateSong(index);
  playSong();
}


/*-- Select Song Function: Plays the selected track on the playlist --*/
function selectSong(x){

  //Updates index and buffers
  index = x;
  indexBuffer1 = x + 1;
  indexBuffer2 = x + 2;

  updateSong(index);
  playSong();
}

/*-- Select Playlist Function: Loads the selected playlist and plays the first song on the playlist --*/
function selectPlaylist(x){

  //Sets new index and buffers
  index = 0;
  indexBuffer1 = 1;
  indexBuffer2 = 2;

  //Quick Patch: Its better to store playlists in an array.
  //Chooses playlist based on which x was pressed
  switch (x) {
    case 1:
      playlist = selectionPlaylist1;
      break;
    case 2:
      playlist = selectionPlaylist2;
      break;
    case 3:
      playlist = selectionPlaylist3;
      break;
    case 4:
      playlist = selectionPlaylist4;
      break;
    default:
      playlist = selectionPlaylist1;
      break;
  }

  updateSong(index);
  playSong();
}
