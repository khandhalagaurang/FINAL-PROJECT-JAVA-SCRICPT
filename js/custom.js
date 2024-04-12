let category = JSON.parse(localStorage.getItem("catInfo"));
let tr = '<li class="control" data-filter="all">all Category</li>';
category.map((i) => {
    tr += `<li class="control" data-filter=".${i.username}" >${i.username}</li>`;
});
document.getElementById("catData").innerHTML = tr;

let product = JSON.parse(localStorage.getItem("prInfo"));
let ctr = '';
category.map((i) => {
    product.filter((j) => {
        if (i.id == j.category) {
            ctr += `<div class="mix col-lg-3 col-md-6 ${i.username}">
        <div class="product-item">
            <figure>
                <img src="${j.image}" alt="">
                <div class="pi-meta">
                    <div class="pi-m-left">
                        <img src="img/icons/eye.png" alt="">
                        <p>quick view</p>
                    </div>
                    <div class="pi-m-right">
                        <img src="img/icons/heart.png" alt="">
                        <p>save</p>
                    </div>
                </div>
            </figure>
            <div class="product-info">
                <h6>${j.name}</h6>
                <p>${j.price}</p>
                <a href="#" class="site-btn btn-line" onclick="addToCart(${j.id})">ADD TO CART</a>
            </div>
        </div>
    </div>`;
        }
    });
})
document.getElementById("product-filter").innerHTML = ctr;

let cart = [];
const addToCart = (id) => {
    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo"));
    let obj = {};
    let image = "";
    let name = "";
    let price = "";

    product.filter((i) => {
        if (i.id == id) {
            image = i.image;
            price = i.price;
            name = i.name;
        }
    });

    if (cartdata != null) {

        let ans = cartdata.filter((i) => {
            return i.id == id;
        });

        if (ans.length > 0) {
            cartdata.map((i) => {
                if (i.id == id) {
                    i.qty += 1;
                    i.total = i.total+i.price
                }
            })

        } else {
            console.log("else part");
            obj = {
                category: cartdata.length + 1,
                id: id,
                image: image,
                name: name,
                price: parseInt(price),
                qty: 1,
                total : parseInt(price)
            }
            cartdata.push(obj);
        }
        localStorage.setItem("addToCartInfo", JSON.stringify(cartdata));

    } else {
        obj = {
            category: 1,
            id: id,
            image: image,
            name: name,
            price: parseInt(price),
            qty: 1,
            total : parseInt(price)
        }

        cart.push(obj);
        localStorage.setItem("addToCartInfo", JSON.stringify(cart));
    }

}

