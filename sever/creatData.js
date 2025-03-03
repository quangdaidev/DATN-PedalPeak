let dsSP = [];
// document.querySelectorAll('.card-hov').forEach(sp=>{
//     let name = sp.querySelector('.title-product').innerText;
//     let price = Number(sp.querySelector('span').innerText.replace('.','').replace('VND','').replace('Giá gốc','').replace('&nbsp;',''));
//     let image = sp.querySelector('img').src.split('/').pop();

document.querySelectorAll('.card-hov').forEach(sp=>{
    let name = sp.querySelector('.title-product').innerText;
    let price = Number(sp.querySelector('span').innerText.replace('.','').replace('VND','').replace('Giá gốc','').replace('&nbsp;',''));
    let image = sp.querySelector('img').src.split('/').pop();
    dsSP.push({
        // id: Math.floor(Math.random()*1000000).toString(),
        category:1,
        name: name,
        old_price:null,
        price: price,
        image: image,
        brand:"",
        desc:"",
    });

    // console.log(name, price, image);
})
console.log(dsSP);

let a = [

]

let b = [

]

let c = [

]

let d = [

]


let e =[

]


let data=[...a,...b,...c,...d,...e];
 console.log(data);

 // Lấy ra các sản phẩm không phải là topping
 // http://localhost:3000/product?type_ne=topping
 // Lấy ra 10 sản phẩm rẻ nhất có giá trên 40000
 // http://localhost:3000/product?price_gt=40000&_sort=price&_limit=10