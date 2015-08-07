function metersToMiles(distance_m) {
  return distance_m / 1609.34;
}


function formatDuration(ms) {
  var duration = moment.duration(ms, 'ms'),
      hours = (duration.asHours() >= 1) ? Math.floor(duration.asHours()) + ' h ' : '',
      minutes = duration.minutes() + ' min';
  return hours + minutes;
}
