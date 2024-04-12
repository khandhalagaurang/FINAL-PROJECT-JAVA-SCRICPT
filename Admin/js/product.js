let catList = JSON.parse(localStorage.getItem("catInfo"));
let tr = `<option>--select category--</option>`;
catList.map((i) => {
    tr += `<option value=${i.id}>${i.username}</option>`
});
let list = document.getElementById("catid").innerHTML = tr;


let prData = [];

const addData = () => {
    let prid = document.prfrm.prid.value;
    let catid = document.prfrm.catid.value;
    let prname = document.prfrm.prname.value;
    let price = document.prfrm.price.value;
    let desc = document.prfrm.desc.value;
    let data = JSON.parse(localStorage.getItem("prInfo"));
    let obj = {};
    let primage = JSON.parse(localStorage.getItem("primage"));
    if (prid != '') {
        data.map((i)=>{
            if (i.id == prid) {
                i.category = catid;
                i.name = prname;
                i.price = price;
                i.description =desc;
                i.image=(primage!=null)?primage:i.image;
            }
        })
        localStorage.setItem("prInfo", JSON.stringify(data));

    } else {    
    if (data != null) {
         
        obj = {
            id: data.length + 1,
            category: catid,
            name: prname,
            price: price,
            description: desc,
            image:primage
        }
        prData = data;
    } else {
        obj = {
            id: 1,
            category: catid,
            name: prname,
            price: price,
            description: desc,
            image:primage
        }
    }
    prData.push(obj);
    localStorage.setItem("prInfo", JSON.stringify(prData));
  
    }
    document.prfrm.prid.value = "";
    document.prfrm.catid.value = "";
    document.prfrm.prname.value = "";
    document.prfrm.price.value = "";
    document.prfrm.desc.value = "";
    document.prfrm.image.src = ""; 
    document.prfrm.reset();
    displayData();

}

const displayData = () => {
    let data = JSON.parse(localStorage.getItem("prInfo"));
    let listdata = "";
    let catdata = JSON.parse(localStorage.getItem("catInfo"));

    data.map((i) => {
        catdata.filter((j) => {
            if (j.id == i.category) {
                return i.cname = j.username
            }
        })

        listdata += `<tr>
                    <td>${i.id}</td>
                    <td>${i.cname}</td>
                    <td>${i.name}</td>
                    <td>${i.price}</td>
                    <td><img src="${i.image}" height="70px" width="70px"></td>
                    <td>
                    <a href="#"  class="btn btn-success" onclick="editData(${i.id})">Edit</a>
                    <a href="#"  class="btn btn-danger" onclick="delData(${i.id})">Delete</a>
                    <td>
                    
                </tr>`
    })
    document.getElementById("allPrData").innerHTML = listdata;

}
const delData = (id) => {
    let data = JSON.parse(localStorage.getItem("prInfo"));

    data.splice(id - 1, 1);
    j = 1;
    data.map((i) => {
        i.id = j++;
    });
    localStorage.setItem("prInfo", JSON.stringify(data));
    displayData();
};
displayData();

const editData = (id) => {
    let alldata = JSON.parse(localStorage.getItem("prInfo"));
    let cat = alldata.filter((i) => {
        return i.id === id;
    })
    document.prfrm.prid.value = cat[0].id;
    document.prfrm.prname.value = cat[0].name;
    document.prfrm.catid.value = cat[0].category;
    document.prfrm.price.value = cat[0].price;
    document.prfrm.desc.value = cat[0].description;
    document.prfrm.image.src = cat[0].image;
    
}

const previewImage=(e)=>{
    var input = e.target;
    var image = document.getElementById('preview');
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function(e) {
          image.src = e.target.result;
          localStorage.setItem("primage",JSON.stringify( e.target.result))
       }
       reader.readAsDataURL(input.files[0]);
    }
 }
displayData();



