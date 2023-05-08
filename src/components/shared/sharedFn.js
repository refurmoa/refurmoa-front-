export const getDdayArray = (destination_date_ms) => {
  const today = new Date().getTime();
  const diff = destination_date_ms - today;

  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { day: day, hours: hours, minutes: minutes, seconds: seconds };
};
