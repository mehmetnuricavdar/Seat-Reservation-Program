(function () {
  ("use strict");

  let reservedSeats = {
    record1: {
      seat: "b19",
      owner: {
        fname: "Joe",
        lname: "Smith",
      },
    },
    record2: {
      seat: "b20",
      owner: {
        fname: "Joe",
        lname: "Smith",
      },
    },
    record3: {
      seat: "b21",
      owner: {
        fname: "Joe",
        lname: "Smith",
      },
    },
    record4: {
      seat: "b22",
      owner: {
        fname: "Joe",
        lname: "Smith",
      },
    },
  };

  // creating seats
  const makeRows = (sectionLength, rowLength, placement) => {
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

    let html = "";
    let counter = 1;
    rows.forEach((row) => {
      switch (placement) {
        case "left":
          html += `<div class="label">${row}</div>`;
          break;
        case "right":
          counter = counter + (rowLength - sectionLength);
          break;
        default:
          counter = counter + (rowLength - sectionLength) / 2;
          break;
      }

      for (let i = 0; i < sectionLength; i++) {
        html += `<div class="a" id="${row + counter}">${counter}</div>`;
        counter++;
      }

      switch (placement) {
        case "left":
          counter = counter + (rowLength - sectionLength);
          break;
        case "right":
          html += `<div class="label">${row}</div>`;
          break;
        default:
          counter = counter + (rowLength - sectionLength) / 2;
          break;
      }
    });

    document.getElementById(placement).innerHTML = html;
  };

  makeRows(3, 15, "left");
  makeRows(3, 15, "right");
  makeRows(9, 15, "middle");

  // getting reserved seats from data

  (function () {
    "use strict";

    for (const key in reservedSeats) {
      if (reservedSeats.hasOwnProperty(key)) {
        const seats = reservedSeats[key].seat;

        document.getElementById(seats).className = "r";
        document.getElementById(seats).innerHTML = "R";
      }
    }
  })();

  // selecting seats
  (function () {
    ("use strict");

    let selectedSeats = [];
    const seats = document.querySelectorAll(".a");

    seats.forEach((seat) => {
      seat.addEventListener("click", (event) => {
        seatSelectionFunction(seat);
      });
    });

    const seatSelectionFunction = (seat) => {
      thisSeat = seat.id;

      if (!selectedSeats.includes(thisSeat)) {
        selectedSeats.push(thisSeat);
        seat.classList.add("s");
      } else {
        const index = selectedSeats.indexOf(thisSeat);
        if (index !== -1) {
          selectedSeats.splice(index, 1);
          seat.classList.remove("s");
        }
      }
    };
  })();
})();
