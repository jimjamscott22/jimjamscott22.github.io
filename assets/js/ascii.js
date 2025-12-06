document.addEventListener("DOMContentLoaded", () => {
  const frames = [
`   _____         _        _       
  |  __ \\       | |      | |      
  | |__) |__  __| |_ __ _| |_ ___ 
  |  ___/ _ \\/ _\` | '__| | __/ _ \\
  | |  |  __/ (_| | |  | | || (_) |
  |_|   \\___|\\__,_|_|  |_|\\__\\___/`,

`   _____         _        _       
  |  __ \\       | |      | |      
  | |__) |__  __| | |    | |_ ___ 
  |  ___/ _ \\/ _\` | |    | __/ _ \\
  | |  |  __/ (_| | |    | || (_) |
  |_|   \\___|\\__,_|_|    |_|\\__\\___/`
  ];

  let idx = 0;
  const ascii = document.getElementById("ascii-banner");

  setInterval(() => {
    ascii.textContent = frames[idx];
    idx = (idx + 1) % frames.length;
  }, 700);
});
