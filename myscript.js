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
    // created empty array to put selected seats here
    let selectedSeats = [];

    // adding event listeners every seats

    const seats = document.querySelectorAll(".a");
    seats.forEach((seat) => {
      seat.addEventListener("click", (event) => {
        seatSelectionFunction(seat);
      });
    });

    // selection function
    const seatSelectionFunction = (seat) => {
      const thisSeat = seat.id;
      const index = selectedSeats.indexOf(thisSeat);
      if (!seat.classList.contains("r")) {
        if (index === -1) {
          selectedSeats.push(thisSeat);
          seat.classList.add("s");
        } else {
          selectedSeats.splice(index, 1);
          seat.classList.remove("s");
        }
      }

      // CREATING MESSAGE ABOUT SELECTED SEATS
      const chosenSeat = selectedSeats
        .toString()
        .toUpperCase()
        .replace(/,/g, ", ")
        .replace(/,(?=[^,]*$)/, " and");

      const seatElement = document.getElementById("selectedseats");
      if (selectedSeats.length === 1) {
        seatElement.innerHTML = `You have selected seat: ${chosenSeat} `;
      } else {
        seatElement.innerHTML = `You have selected seats: ${chosenSeat} `;
      }
      handleConfirm();
    };

    // hiding or showing form
    document.getElementById("reserve").addEventListener("click", (event) => {
      event.preventDefault();
      const element = document.getElementById("resform");
      if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });

    document.getElementById("cancel").addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("resform").style.display = "none";
    });

    const handleConfirm = () => {
      if (selectedSeats.length > 0) {
        document.getElementById("confirmres").style.display = "block";
      } else {
        document.getElementById("confirmres").style.display = "none";
        document.getElementById(
          "selectedseats"
        ).innerHTML = `You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.`;
        document.getElementById("error").addEventListener("click", (event) => {
          event.preventDefault();
          const element = (document.getElementById("resform").style.display =
            "none");
        });
      }
    };

    // sending form
    const form = document.getElementById("confirmres");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      processReservation();
    });
    const processReservation = () => {
      const hardCodedRecords = Object.keys(reservedSeats).length;
      const fname = document.getElementById("fname").value;
      const lname = document.getElementById("lname").value;
      let counter = 1;
      let nextRecord = "";

      selectedSeats.forEach((seat) => {
        document.getElementById(seat).className = "r";
        document.getElementById(seat).innerHTML = "R";

        nextRecord = `record${hardCodedRecords + counter}`;
        reservedSeats[nextRecord] = {
          seat: seat,
          owner: {
            fname: fname,
            lname: lname,
          },
        };
        counter++;
      });
      document.getElementById("resform").style.display = "none";
      selectedSeats.forEach((seat) => {
        document.getElementById(seat).removeEventListener();
      });
      selectedSeats = [];
    };
    handleConfirm();
  })();
})();
