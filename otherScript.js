(function () {
  const rows = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];
  function createSeats(sectionId, start, end) {
    const section = document.getElementById(sectionId);
    for (let i = start; i <= end; i++) {
      const div = document.createElement("div");
      div.id = `a${i}`;
      div.innerText = i;
      section.appendChild(div);
    }
  }
  // Create seats for the left section
  createSeats("left", 1, 3);
  // Create seats for the middle section
  createSeats("middle", 4, 12);
  // Create seats for the right section
  createSeats("right", 13, 15);
  let html = "";
  let counter = 1;
  rows.forEach((row) => {
    html += `<div class="label">${row}</div>`;
    for (let i = 0; i < 3; i++) {
      html += `<div id="${row + counter}">${counter}</div>`;
      counter++;
    }
    counter = counter + 12;
  });
  document.querySelector("#left").innerHTML = html;
  // right side
  html = "";
  counter = 1;
  rows.forEach((row) => {
    counter = counter + 12;
    for (let i = 0; i < 3; i++) {
      html += `<div id="${row + counter}">${counter}</div>`;
      counter++;
    }
    html += `<div class="label">${row}</div>`;
  });
  document.querySelector("#right").innerHTML = html;
  // middle section
  html = "";
  counter = 1;
  rows.forEach((row) => {
    counter = counter + 3;
    for (let i = 0; i < 9; i++) {
      html += `<div id="${row + counter}">${counter}</div>`;
      counter++;
    }
    counter = counter + 3;
  });
  document.querySelector("#middle").innerHTML = html;
})();
