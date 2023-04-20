$(document).ready(function () {
    // Display the items in the cart
    function displayCartItems() {
        let products = JSON.parse(localStorage.getItem("items"));
        let cartItems = $("#cartItems");
        products.map((product) => {
            cartItems.append(`
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Price: $${product.price}</p>
            <p class="card-text">Quantity: ${product.quantity}</p>
          </div>
        </div>
      </div>
    `);
        });
    }
    displayCartItems();

    // Form validation
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Form is invalid");
        } else {
            console.log("Form is valid, sending email");
            event.preventDefault();
            
            // Get form data
            const firstName = $("#firstName").val();
            const lastName = $("#lastName").val();
            const email = $("#email").val();
            const phone = $("#phone").val();
            const address = $("#address").val();
            const creditCard = $("#creditCard").val();
            const last4Digits = creditCard.slice(-4);
            const blurredCardNumber = `**** **** **** ${last4Digits}`;
            // Get cart items
            const cartItems = JSON.parse(localStorage.getItem("items"));
            // Construct email content
            const emailContent = `
      Order Confirmation:
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}
      Credit Card: ${blurredCardNumber}
      Items Purchased:
      ${cartItems
          .map(
              (item) => `
        ${item.name} - Quantity: ${item.quantity} - Price: $${item.price}
      `
          )
          .join("")}        
    `;

            (function () {
                emailjs.init("Um93CmEGSXGscz_AJ");
            })();

            function sendEmail(firstName, lastName, email, emailContent) {
                const templateParams = {
                    to_name: firstName + " " + lastName,
                    to_email: email,
                    message: emailContent,
                };

                emailjs.send("service_7r0wqgb", "template_k68jl8a", templateParams).then(
                    function (response) {
                        console.log("Email sent successfully!", response.status, response.text);
                    },
                    function (error) {
                        console.log("Failed to send email!", error);
                    }
                );
            }
            // Store purchase data in the database
            storePurchaseData(firstName, lastName, email, phone, address, blurredCardNumber, cartItems);

            // Send the email
            sendEmail(firstName, lastName, email, emailContent);

            // Store Purchase Data

            function storePurchaseData(firstName, lastName, email, phone, address, blurredCardNumber, cartItems) {
                const purchaseData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                    creditCard: blurredCardNumber,
                    items: cartItems,
                };

                // Get a reference to the database
                const db = firebase.database();

                // Generate a unique key for the new purchase
                const newPurchaseKey = db.ref().child("purchases").push().key;

                // Save the purchase data to the database
                db.ref("purchases/" + newPurchaseKey)
                    .set(purchaseData)
                    .then(() => {
                        console.log("Purchase data saved successfully!");
                    })
                    .catch((error) => {
                        console.log("Error saving purchase data");
                        console.log(error);
                    });
            }

            // Store purchase data in the database
            storePurchaseData(firstName, lastName, email, phone, address, blurredCardNumber, cartItems);

            console.log(emailContent);
        }
    });
});
