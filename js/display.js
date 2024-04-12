const viweToCard = () => {
    let dtr = '';
    let total=0;
    let alltotal=""
    let cartdata = JSON.parse(localStorage.getItem("addToCartInfo"));
    cartdata.map((i) => {
        dtr += `<tr>
        <td class="product-col">
        <img src="${i.image}" alt="">
        <div class="pc-title">
            <h4>${i.name}</h4>
        </div>
    </td>
    <td class="price-col">${i.price}</td>
    <td class="quy-col">
        <div class="quy-input">
            <div class="qty">${i.qty}</div> 
        </div>
    </td>
    <td class="text-center" ><i class="bi bi-x-circle" id="del" onclick="delData(${i.id})"></i></td>
    <td class="total-col">${i.total}</td>

        </tr>`;
        total+=i.total;
    });
     alltotal+=`<span>${total}</span>`
    document.getElementById("display").innerHTML = dtr;
    document.getElementById("alltotal").innerHTML = alltotal;


}

const delData = (id) => {
    let alldata = JSON.parse(localStorage.getItem("addToCartInfo"));
    alldata.splice(id - 1, 1);
    j = 1;
    alldata.map((i) => {
        i.id = j++;
    });
    localStorage.setItem("addToCartInfo", JSON.stringify(alldata));
    viweToCard()

};

viweToCard()

