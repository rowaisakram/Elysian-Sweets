$(document).ready(function () {
  let date = "";
  let timeSlot = "";
  let timeSlotText = "";
  let seats = "";
  let saleNo = "";
  let otpCode = "";
  var availableSeats = "";

  $(document).find("#input_phone").numeric();

  $(document).on("click", "#myBtn1", function (e) {
    e.preventDefault();
    $(document).find("#input_date").val("");
    $(document).find("#timeSlotSelect").empty();
    $(document)
      .find("#timeSlotSelect")
      .append(`<option value="" selected> Select Time</option>`);
    $(document).find("#input_seat").val("");
    $(document).find("#checkReserve_modal").css("display", "flex");
  });

  $(document).on("click", ".close", function (e) {
    e.preventDefault();
    $(document).find(".modal").css("display", "none");
    $("#input_date").prop("disabled", false);
  });
  // var currentDate = new Date();
  // var year = currentDate.getFullYear();
  // var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  // var day = String(currentDate.getDate()).padStart(2, "0");
  // var formattedDate = year + "-" + month + "-" + day;

  // var maxDate = new Date();
  // maxDate.setMonth(maxDate.getMonth() + 1);
  // var maxYear = maxDate.getFullYear();
  // var maxMonth = String(maxDate.getMonth() + 1).padStart(2, "0");
  // var maxDay = String(maxDate.getDate()).padStart(2, "0");
  // var maxFormattedDate = maxYear + "-" + maxMonth + "-" + maxDay;
  // var selectedSlot = null;

  // document.getElementById("input_date").min = formattedDate;
  // document.getElementById("input_date").max = maxFormattedDate;
  //---------------------------------------min date set------------------//
  // date to 21st December 2023
  // var minDate = new Date(2023, 11, 21);
  // var minYear = minDate.getFullYear();
  // var minMonth = String(minDate.getMonth() + 1).padStart(2, "0");
  // var minDay = String(minDate.getDate()).padStart(2, "0");
  // var minFormattedDate = minYear + "-" + minMonth + "-" + minDay;

  // var maxDate = new Date();
  // maxDate.setMonth(maxDate.getMonth() + 2);
  // var maxYear = maxDate.getFullYear();
  // var maxMonth = String(maxDate.getMonth() + 1).padStart(2, "0");
  // var maxDay = String(maxDate.getDate()).padStart(2, "0");
  // var maxFormattedDate = maxYear + "-" + maxMonth + "-" + maxDay;
  // var selectedSlot = null;

  // document.getElementById("input_date").setAttribute("min", minFormattedDate);
  // document.getElementById("input_date").setAttribute("max", maxFormattedDate);

  // var minDate = new Date(2023, 11, 21);
  // var currentDate = new Date();

  // if (minDate <= currentDate) {
  //   minDate = currentDate;
  // }

  // var minYear = minDate.getFullYear();
  // var minMonth = String(minDate.getMonth() + 1).padStart(2, "0");
  // var minDay = String(minDate.getDate()).padStart(2, "0");
  // var minFormattedDate = minYear + "-" + minMonth + "-" + minDay;

  // var maxDate = minDate;
  // maxDate.setMonth(maxDate.getMonth() + 1);
  // var maxYear = maxDate.getFullYear();
  // var maxMonth = String(maxDate.getMonth() + 1).padStart(2, "0");
  // var maxDay = String(maxDate.getDate()).padStart(2, "0");
  // var maxFormattedDate = maxYear + "-" + maxMonth + "-" + maxDay;
  // var selectedSlot = null;

  // document.getElementById("input_date").setAttribute("min", minFormattedDate);

  // document.getElementById("input_date").setAttribute("max", maxFormattedDate);

  var minDate = new Date(2023, 0, 1);
  var newCurrentDate = new Date();

  if (minDate <= newCurrentDate) {
    minDate = newCurrentDate;
  }

  var picker = new Pikaday({
    field: document.getElementById("input_date"),
    format: "D/M/YYYY",
    minDate: minDate,
    maxDate: new Date(
      minDate.getFullYear(),
      minDate.getMonth() + 1,
      minDate.getDate()
    ),
  });

  $(document).on("change", "#input_date", function (e) {
    const url = "https://newpos.baranh.pk/gettimeslotweb";
    const payload = {
      outlet_id: "9",
      date: $(this).val(),
      type: "online",
    };

    selectedSlot = null;

    $.ajax({
      url: url,
      method: "POST",
      data: JSON.stringify(payload),
      success: function (result) {
        let data = JSON.parse(result);

        $("#timeSlotSelect").empty();
        date = "";
        timeSlot = "";
        timeSlotText = "";
        seats = "";
        $("#timeSlotSelect").empty();
        var currentDate = new Date();
        var selectedDate = new Date($("#input_date").val());
        var showAllTimeSlots = selectedDate >= currentDate;

        $.each(data, function (index, item) {
          var openingTime = item.opening_time.split(":");

          var slotHour = parseInt(openingTime[0]);
          var slotMinute = parseInt(openingTime[1]);

          if (
            (showAllTimeSlots ||
              slotHour > currentDate.getHours() ||
              (slotHour === currentDate.getHours() &&
                slotMinute >= currentDate.getMinutes())) &&
            item.booksum < item.seats
          ) {
            if (slotHour > 12) {
              slotHour = slotHour - 12;
              period = "PM";
            } else if (slotHour === 0) {
              slotHour = 12;
              period = "AM";
            } else if (slotHour === 12) {
              period = "PM";
            } else {
              period = "AM";
            }

            var formattedTime =
              slotHour +
              ":" +
              (slotMinute < 10 ? "0" : "") +
              slotMinute +
              " " +
              period;
            $("#timeSlotSelect").append(
              `<option value="${item.id}#${item.seats}#${item.booksum}#${item.discount}">${formattedTime}</option>`
            );
            selectedSlot = item;
          }
        });
      },
    });

    // const url = "https://newpos.baranh.pk/gettimeslotweb";

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     $.each(data,function(index,item){
    //         console.log(item);
    //         $('#timeSlotSelect').empty();
    //         $('#timeSlotSelect').append(
    //             `<option value="${item.id}#${item.seats}#${item.booksum}#${item.discount}"></option>`
    //         );
    //     });
    // })
    // .catch(error => {console.error('There was an error with the fetch operation:', error);});
    $(this).prop("disabled", true);
  });

  $(document).on("click", "#btn_availability", function (e) {
    e.preventDefault();
    date = $(document).find("#input_date").val();
    timeSlot = $(document).find("#timeSlotSelect").val();
    timeSlotText = $(document).find("#timeSlotSelect option:selected").text();
    seats = $(document).find("#input_seat").val();

    if (selectedSlot != null) {
      availableSeats = parseInt(selectedSlot.seats) - selectedSlot.booksum;
    }

    $(document)
      .find(".msg-alert")
      .hide("fast", function () {});
    if (date === null || date === "") {
      Toastify({
        text: "Please Select Date",
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
    } else if (timeSlot === null || timeSlot === "") {
      Toastify({
        text: "Please Select Time Slot",
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
    } else if (seats === null || seats === "") {
      Toastify({
        text: "Please Type No of Seats",
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
    } else if (seats > availableSeats) {
      Toastify({
        text: "Seats are not available!!",
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
    } else {
      const url = "https://newpos.baranh.pk/getavailabilityweb";
      const payload = {
        outlet_id: "9",
        filter_date: date,
        timedropdown: timeSlot,
        seats: seats,
      };

      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(payload),
        success: function (result) {
          let data = JSON.parse(result);
          if (data.status) {
            $(document).find("#checkReserve_modal").css("display", "none");
            let modal = $(document).find("#reservation_modal");
            $(document).find(".msg-alert").text("");
            $(document)
              .find(".msg-alert")
              .hide("fast", function () {});
            modal.find("#selectedDate").text(date);
            modal.find("#selectedTimeSlot").text(timeSlotText);
            modal.find("#selectedSeats").text(seats);
            modal.find("#input_name").val("");
            modal.find("#input_phone").val("");
            modal.find("#input_email").val("");
            modal.find("#input_address").val("");
            modal.css("display", "flex");
          } else {
            $(document).find(".msg-alert").text(data.message);
            $(document)
              .find(".msg-alert")
              .show("fast", function () {});
            setTimeout(function () {
              $(document)
                .find(".msg-alert")
                .hide("fast", function () {});
            }, 5000);
          }
        },
      });
    }
  });

  $(document).on("click", "#btn_makeReserve", function (e) {
    e.preventDefault();

    let name = $("#input_name").val();
    let phone = $("#input_phone").val();
    let email = $("#input_email").val();
    let address = $("#input_address").val();

    if (name === null || name === "") {
      Toastify({
        text: "Please Type name for reservation",
        duration: 2000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
      return;
    }
    // if (phone === null || phone === "") {
    //   Toastify({
    //     text: "Please Type contact no. for reservation",
    //     duration: 2000,
    //     // destination: "https://github.com/apvarun/toastify-js",
    //     newWindow: true,
    //     close: true,
    //     gravity: "top", // `top` or `bottom`
    //     position: "left", // `left`, `center` or `right`
    //     stopOnFocus: true, // Prevents dismissing of toast on hover
    //     style: {
    //       background: "linear-gradient(to right, #ff0000, #8b0000)",
    //     },
    //     // onClick: function(){} // Callback after click
    //   }).showToast();
    // }
    let phoneRegex = /^\d{11}$/;

    if (!phoneRegex.test(phone)) {
      Toastify({
        text: "Please enter a valid 11-digit phone number",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)",
        },
      }).showToast();
      return; // Stop form submission
    }
    // let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if (!emailRegex.test(email)) {
    //   Toastify({
    //     text: "Please enter a valid email address",
    //     duration: 2000,
    //     newWindow: true,
    //     close: true,
    //     gravity: "top",
    //     position: "left",
    //     stopOnFocus: true,
    //     style: {
    //       background: "linear-gradient(to right, #ff0000, #8b0000)",
    //     },
    //   }).showToast();
    //   return; // Stop form submission
    // }
    // if (email === null || email === "") {
    //   Toastify({
    //     text: "Please Type contact email for reservation",
    //     duration: 2000,
    //     // destination: "https://github.com/apvarun/toastify-js",
    //     newWindow: true,
    //     close: true,
    //     gravity: "top", // `top` or `bottom`
    //     position: "left", // `left`, `center` or `right`
    //     stopOnFocus: true, // Prevents dismissing of toast on hover
    //     style: {
    //       background: "linear-gradient(to right, #ff0000, #8b0000)",
    //     },
    //     // onClick: function(){} // Callback after click
    //   }).showToast();
    // }
    // if (address === null || address === "") {
    //   Toastify({
    //     text: "Please Type address",
    //     duration: 2000,
    //     // destination: "https://github.com/apvarun/toastify-js",
    //     newWindow: true,
    //     close: true,
    //     gravity: "top", // `top` or `bottom`
    //     position: "left", // `left`, `center` or `right`
    //     stopOnFocus: true, // Prevents dismissing of toast on hover
    //     style: {
    //       background: "linear-gradient(to right, #ff0000, #8b0000)",
    //     },
    //     // onClick: function(){} // Callback after click
    //   }).showToast();
    // }
    else {
      const url = "https://newpos.baranh.pk/addreservationonlineweb";
      const payload = {
        outlet_id: "9",
        date: date,
        timedropdown: timeSlot,
        seats: seats,
        name: name,
        phone: phone,
        email: email,
        address: address,
        verificationdo: "",
        password: "",
      };

      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(payload),
        success: function (result) {
          let data = JSON.parse(result);
          if (data.status) {
            saleNo = data.id[0].sale_no;
            $(document).find("#reservation_modal").css("display", "none");
            $(document).find(".msg-alert").text("");
            $(document)
              .find(".msg-alert")
              .hide("fast", function () {});
            $("#input_date").prop("disabled", false);
            // $(document).find("#otp-form_modal").css("display", "flex");

            Swal.fire({
              icon: "success",
              title:
                '<span style="color: green;">Reservation Successfully</span>',
              background: "#ffffff",
              // text: "You will recieve an email regarding your reservation",
            });
          } else {
            $(document).find(".msg-alert").text(data.message);
            $(document)
              .find(".msg-alert")
              .show("fast", function () {});
            setTimeout(function () {
              $(document)
                .find(".msg-alert")
                .hide("fast", function () {});
            }, 5000);
          }
        },
      });
    }
  });

  // var otp_inputs = document.querySelectorAll(".otp__digit");
  // var mykey = "0123456789".split("");
  // otp_inputs.forEach((_) => {
  //   _.addEventListener("keyup", handle_next_input);
  // });

  // function handle_next_input(event) {
  //   let current = event.target;
  //   let index = parseInt(current.classList[1].split("__")[2]);
  //   current.value = event.key;

  //   if (event.keyCode == 8 && index > 1) {
  //     current.previousElementSibling.focus();
  //   }
  //   if (index < 4 && mykey.indexOf("" + event.key + "") != -1) {
  //     var next = current.nextElementSibling;
  //     next.focus();
  //   }

  //   var _finalKey = "";
  //   for (let { value } of otp_inputs) {
  //     _finalKey += value;
  //   }

  //   if (_finalKey.length == 4) {
  //     console.log(_finalKey);
  //     otpCode = _finalKey;
  //   }
  // }

  // $(document).on("click", "#otp_cnf", function (e) {
  //   console.log(saleNo);
  //   e.preventDefault();
  //   if (otpCode.length < 4) {
  //     Toastify({
  //       text: "Please enter a 4-digit OTP",
  //       duration: 2000,
  //       newWindow: true,
  //       close: true,
  //       gravity: "top",
  //       position: "center",
  //       stopOnFocus: true,
  //       style: {
  //         background: "linear-gradient(to right, #ff0000, #8b0000)",
  //       },
  //     }).showToast();
  //     return;
  //   } else {
  //     const url = "https://newpos.baranh.pk/verify";
  //     const payload = {
  //       outlet_id: "9",
  //       sale_no: saleNo,
  //       verification_code: otpCode,
  //     };
  //     console.log(payload);

  //     $.ajax({
  //       url: url,
  //       method: "POST",
  //       data: JSON.stringify(payload),
  //       success: function (result) {
  //         let data = JSON.parse(result);
  //         console.log(data);
  //         if (data.status) {
  //           $(document).find(".msg-alert").text("");
  //           $(document)
  //             .find(".msg-alert")
  //             .hide("fast", function () {});
  //           $(document).find("#otp-form_modal").css("display", "none");
  //           Swal.fire({
  //             icon: "success",
  //             title:
  //               '<span style="color: green;">Reservation Successfully</span>',
  //             background: "#ffffff",
  //             text: "You will recieve an email regarding your reservation",
  //           });
  //           otp_inputs.forEach((input) => {
  //             input.value = "";
  //           });
  //         } else {
  //           $(document).find(".msg-alert").text(data.message);
  //           $(document)
  //             .find(".msg-alert")
  //             .show("fast", function () {});
  //           setTimeout(function () {
  //             $(document)
  //               .find(".msg-alert")
  //               .hide("fast", function () {});
  //           }, 5000);
  //           otp_inputs.forEach((input) => {
  //             input.value = "";
  //           });
  //         }
  //       },
  //     });
  //   }
  // });
  $(document).on("click", function (event) {
    if ($(event.target).is("#checkReserve_modal")) {
      $("#checkReserve_modal").hide();
      $("#input_date").prop("disabled", false);
    }
  });
});
