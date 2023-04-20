$(document).ready(function () {
  let products = [];
  let itemNumber = 0;
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    itemNumber = products.length;
  }
  $(".numberOfItems").text(itemNumber);

  // Update the confirm button text based on the number of items
  function updateConfirmButtonText() {
    if (itemNumber === 0) {
      $('.modal-confirm')
      .text('Continue shopping')
      .on('click', function() {
        $(this).modal('hide');
      })
      .attr('data-bs-dismiss', 'modal');
    
    } else {
      $('.modal-confirm')
      .text('Continue to checkout')
      .on('click', function() {
        $(this).modal('hide');
        window.location.href = '../../pages/checkout/checkout.html';
      })
    }
  }
  updateConfirmButtonText();

  // when the user clicks the shopping cart button, update .modal-body with the items in the cart
  $(".buttonWrapper").click(function () {
    if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));
      let modalBody = $(".modal-body");
      modalBody.empty(); // empty the initial contents of modal body before adding new items

      // render products name, price, and quantity
      products.map((product) => {
        modalBody.append(
          `<div class="productWrapper" id="${product.name}">
            <div id="productInfo">
              <img src="${product.image}" class="productImage" alt="picture of ${product.name}">
              <div class="name">${product.name} - $${product.price}/item</div>
              <div class="quantity">x ${product.quantity}</div>
            </div>
            <div id="actions">
              <button class="btn btn-primary increaseQuantity" id="${product.name}">
                +
              </button>
              <button class="btn btn-danger decreaseQuantity" id="${product.name}">
                -
              </button>
            </div>
          </div>`
        );
      });

      modalBody.append('<div class="total-cost"></div>');

      function updateTotalCost() {
        let totalCost = products.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);

        $(".total-cost").text(`Total Cost: $${totalCost}`);
      }

      updateTotalCost();

      $(".increaseQuantity").click(function () {
        let productName = $(this).attr("id");
        let product = products.find((product) => product.name === productName);
        product.quantity++;
        $(this)
          .closest(".productWrapper")
          .find(".quantity")
          .text(`x ${product.quantity}`);
        localStorage.setItem("items", JSON.stringify(products));
        updateTotalCost();
      });

      $(".decreaseQuantity").click(function () {
        let productName = $(this).attr("id");
        let product = products.find((product) => product.name === productName);
        if (product.quantity > 1) {
          product.quantity--;
          $(this)
            .closest(".productWrapper")
            .find(".quantity")
            .text(`x ${product.quantity}`);
          localStorage.setItem("items", JSON.stringify(products));
        }
        updateTotalCost();
      });
    }
  });
});