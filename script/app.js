// CRUD \\
//  GET=>READ
// DELETE=>DELETE
//  PUT=>update
// POST=>CREATE

const $products=document.querySelector("#products");
const $createForm=document.querySelector("#createForm");
const $updateForm=document.querySelector("#updateForm");
const $inputs=$createForm.querySelectorAll(".inputElement");
const $updateInputs=$updateForm.querySelectorAll(".inputElement");


function loadData(){
    
fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products")

.then(response=>response.json())
.then(data =>renderProducts(data))
}
loadData();

const renderProducts=(products)=>{
    products.forEach(product => {
        const $div = document.createElement("div");
        $div.className="card";
        $div.innerHTML=`
            <div class="card__wrapper">
                <div class="card__img">
                    <image width="300" src="${product.image}"/>     
                </div>
                        <h3>${product.title}</h3>
                        <strong>$${product.price}</strong>
                        <p>${product.description.slice(0,80)+"..."}</p>

                        <div class="update__delete">
                        <button data-product-id="${product.id}" class="update">update</button>      
                        <button data-product-id="${product.id}" class="delete">delete</button>
                        </div>      
            </div>
 `
        $products.appendChild($div)
    });
}

const handleCreateNewProduct =(e)=>{
    e.preventDefault();

    const values=Array.from($inputs).map(input=>input.value)
    let product={
        title:values[0],
        image:values[1],
        price:values[2],
        description:values[3]
    }

    fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products", 
        {
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify(product)
        }
    )

    .then(response=>response.json())
    .then(data => {
        window.location.reload()
    })

    
}

const handleUpdateProduct=(e)=>{
    e.preventDefault();
    const id= e.target.dataset.currentUpdateProductId;
        const values=Array.from($updateInputs).map(input=>input.value)
        let product={
            title:values[0],
            image:values[1],
            price:values[2],
            description:values[3]
        }

        fetch(`https://6662ac4162966e20ef097175.mockapi.io/api/products/products/${id}`, 
        {
            method:"PUT",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify(product)
        }
    )

    .then(response=>response.json())
    .then(data => {
        window.location.reload()
    })
}

const handleFillUpdateForm=(e)=>{
    if(e.target.classList.contains("update")){
       const id= e.target.dataset.productId;
       fetch(`https://6662ac4162966e20ef097175.mockapi.io/api/products/products/${id}`)

       .then(response=>response.json())
       .then(data => {
            $updateInputs[0].value=data.title;
            $updateInputs[1].value=data.image;
            $updateInputs[2].value=data.price;
            $updateInputs[3].value=data.description;
            $updateForm.setAttribute("data-current-update-product-id",id)
       })

    }
    
    if(e.target.classList.contains("delete")){
        console.log("salom delete")
        const id=e.target.dataset.productId;
        const userAgree= confirm("Are you sure to delete this product?");
        if(userAgree){
            fetch(`https://6662ac4162966e20ef097175.mockapi.io/api/products/products/${id}`, {method:"DELETE"})

            .then(response=>response.json())
            .then(data =>console.log(data))    
        }
         
    }
    
}
$createForm.addEventListener("submit", handleCreateNewProduct)
$updateForm.addEventListener("submit",handleUpdateProduct)
$products.addEventListener("click",handleFillUpdateForm)