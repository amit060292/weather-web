console.log("in here");

// fetch("http://puzzle.mead.io/puzzle")
//   .then(response => {
//     response.json().then(data => {
//       console.log(data);
//     });
//   })
//   .catch(err => console.log(err));

const formSelector = document.querySelector("form");
const para1 = document.getElementById("p1");
const para2 = document.getElementById("p2");

formSelector.addEventListener("submit", e => {
  e.preventDefault();
  const location = document.querySelector("input").value;
  para1.textContent = "Loading......";
  para2.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          console.log(error);
          para1.textContent = error;
        } else {
          const { forecast, location, address } = data;
          console.log(forecast, location, address);
          para1.textContent = `Location - ${location}`;
          para2.textContent = `Forecast - ${forecast.summary}
            temperature - ${forecast.temperature}
          `;
        }
      });
    })
    .catch(err => console.log(err));
});
