export const usersTimeZoneOffset = () => {
  const timeZoneOffset = 0 - (new Date().getTimezoneOffset() / 60);
  return timeZoneOffset; // returns the offset in hours
}

export const currTimeDiffByZone = (fromTimeZoneOffset, toTimeZoneOffset ) => {
  const currDate = new Date();
  const currTime = currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
  
  // returns currTime if the timezones are the same (no offset)
  if ( fromTimeZoneOffset === toTimeZoneOffset ) return currTime; 
  
  const currTimeDiff = (fromTimeZoneOffset - toTimeZoneOffset); 
  currDate.setHours(currDate.getHours() + currTimeDiff);
  const adjustedTime = currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
  return adjustedTime// returns the offset time
}

export const currDateDiffByZone = (toTimeZoneOffset, fromTimeZoneOffset = usersTimeZoneOffset() ) => {

  const currDate = new Date();
  
  // returns currTime if the timezones are the same (no offset)
  if ( fromTimeZoneOffset === toTimeZoneOffset ) return currDate; 
  
  const currTimeDiff = (fromTimeZoneOffset - toTimeZoneOffset); 
  currDate.setHours(currDate.getHours() + currTimeDiff);
  return currDate// returns the offset time
}