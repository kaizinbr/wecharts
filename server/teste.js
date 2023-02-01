function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60) > 0 ? Math.floor(minutes / 60) : '';
    console.log(hours)
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    let time = `${(padTo2Digits(hours) !== '00' ? (padTo2Digits(hours) + ':') : '')}${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  
    return time;
  }
console.log(convertMsToTime(4866731));


// return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;