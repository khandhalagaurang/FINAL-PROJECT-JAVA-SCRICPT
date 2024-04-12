let arr = [];

const addData = () => {
    let alldata = JSON.parse(localStorage.getItem("catInfo"));
    const username = document.catfrm.catname.value;
    const catid = document.catfrm.catid.value;

    let catData = {};
    if (catid != '') {
        //update
        alldata.map((i) => {
            if (i.id == catid) {
                i.username = username;
            }
        })
        localStorage.setItem("catInfo", JSON.stringify(alldata));
    } else {
        //insert
        if (alldata != null) {
            catData = {
                id: alldata.length + 1,
                username: username,
            }
            arr = alldata;
        } else {
            //new arr push
            catData = {
                id: 1,
                username: username,
            }
        }
        arr.push(catData);
        localStorage.setItem("catInfo", JSON.stringify(arr));
    };
    document.catfrm.catname.value = "";
    document.catfrm.catid.value = "";

    displayCat();
};

const displayCat = () => {
    let tr = '';
    let alldata = JSON.parse(localStorage.getItem("catInfo"));

        alldata.map((i) => {
            tr += `<tr>
            <td>${i.id}</td>
            <td>${i.username}</td>
            <td>
            <a href="#"  class="btn btn-success" onclick="editData(${i.id})">Edit</a>
            <a href="#"  class="btn btn-danger" onclick="delData(${i.id})">Delete</a>
            <td>
            </tr>`;
        });
        document.getElementById("allCatData").innerHTML = tr;
    }


const delData = (id) => {
    let alldata = JSON.parse(localStorage.getItem("catInfo"));
    alldata.splice(id - 1, 1);
    j = 1;
    alldata.map((i) => {
        i.id = j++;
    });
    localStorage.setItem("catInfo", JSON.stringify(alldata));
    displayCat();
};

const editData = (id) => {
    let alldata = JSON.parse(localStorage.getItem("catInfo"));
    let cat = alldata.filter((i) => {
        return i.id === id;
    })
    document.catfrm.catname.value = cat[0].username;
    document.catfrm.catid.value = cat[0].id;
}
displayCat();


