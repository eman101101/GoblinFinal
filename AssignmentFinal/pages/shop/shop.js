$(document).ready(() => {
    $("#header").load("../../template/header/header.html", () => {
        $("#headerShop")
            .removeClass()
            .addClass("nav-link active text-black fw-bold");
    });
    $("#footer").load("../../template/footer/footer.html", () => {
        $("#footerShop")
            .removeClass()
            .addClass("nav-link active text-black fw-bold");
    });
    $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html");
    
    $(".add-item").click(function() {
        let products = [];
        if (localStorage.getItem("items")) {
            products = JSON.parse(localStorage.getItem("items"));
        }
        const itemElement = $(this).siblings(".card-text").text();
        const itemName = itemElement.split("$")[0];
        const itemPrice = itemElement.split("$")[1];
        const itemImg = $(this).closest('.card').find("img").attr("src");
        let itemExists = false;
        products.forEach((product) => {
            if (product.name === itemName) {
                itemExists = true;
                product.quantity += 1;
            }
        });
        if (!itemExists) {
            products.push({
                name: itemName,
                price: itemPrice,
                quantity: 1,
                image: itemImg
            });
        }
        localStorage.setItem("items", JSON.stringify(products));
        $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html", () => {
            $(".numberOfItems").text(products.length);
        });
        var toastEl = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
    });
});