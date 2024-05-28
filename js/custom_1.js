$(document).ready(function () {
  let fname = "";
  let lname = "";
  let phone = "";
  let email = "";
  let subject = "";
  let text_message = "";

  $(document).find("#contact_phone").numeric();
  $(document).on("click", "#btn_submit_contact", function (e) {
    e.preventDefault();
    fname = $("#contact_first_name").val();
    lname = $("#contact_last_name").val();
    phone = $("#contact_phone").val();
    email = $("#contact_email").val();
    subject = $("#contact_subject").val();
    text_message = $("#contact_message").val();

    if (fname === null || fname === "") {
      Toastify({
        text: "Please Type First Name",
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
    if (lname === null || lname === "") {
      Toastify({
        text: "Please Type Last Name",
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
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      Toastify({
        text: "Please enter a valid email address",
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
      return;
    }
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
      return;
    }

    if (subject === null || subject === "") {
      Toastify({
        text: "Please Subject",
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
    if (text_message === null || text_message === "") {
      Toastify({
        text: "Please Your Message",
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
    } else {
      const url = "https://newpos.baranh.pk/contact-form";
      const payload = {
        first_name: fname,
        last_name: lname,
        email: email,
        phone: phone,
        subject: subject,
        message: text_message,
        outlet_id: 9,
        company_id: 1,
      };

      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(payload),
        success: function (result) {
          let data = JSON.parse(result);
          if (data.status == true) {
            $(document).find(".msg-alert-1").text(data.message);
            $(document)
              .find(".msg-alert-1")
              .show("fast", function () {});
            setTimeout(function () {
              $(document)
                .find(".msg-alert-1")
                .hide("fast", function () {});
            }, 5000);
            $("#contact_first_name").val("");
            $("#contact_last_name").val("");
            $("#contact_phone").val("");
            $("#contact_email").val("");
            $("#contact_subject").val("");
            $("#contact_message").val("");
          } else {
            $(document).find(".msg-alert").text(data.message);
            $(document)
              .find(".msg-alert")
              .show("fast", function () {});
            setTimeout(function () {
              $(document)
                .find(".msg-alert-1")
                .hide("fast", function () {});
            }, 5000);
          }
        },
      });
    }
  });
});
