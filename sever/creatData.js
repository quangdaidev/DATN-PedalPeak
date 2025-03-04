// let image = sp.querySelectorAll('img').src.split('/').pop();
// id: Math.floor(Math.random()*1000000).toString(),

let dsSP = [];

document.querySelectorAll('.card-hov').forEach(sp=>{
    let name = sp.querySelector('.title-product').innerText;
    let price = Number(sp.querySelector('span').innerText.replace('.','').replace('VND','').replace('Giá gốc','').replace('&nbsp;',''));
    let images = sp.querySelectorAll('img'); 
    let imageSources = [];

    images.forEach(img => {
    let image = img.src.split('/').pop(); 
    imageSources.push(image); 
    });
    dsSP.push({
        category:'67c5c767d0e2d348c2f5b13e',
        name: name,
        old_price:null,
        price: price+'000',
        image:  imageSources,
        color:["white", "blue", "black", "gray"],
        brand:"Vinbike",
        desc:"",
        status:"true",
    });

})
console.log(dsSP);

let a = [
    [
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 4 Disc - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "11790000",
            "image": [
                "2025-escape-4-disc-black.jpg"
            ],         
           "color":["white", "blue", "black", "gray"],
            "brand": "GIANT",
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Roam 3 - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "14790000",
            "image": [
                "2025-roam-3-shellwhite_2.jpg",
                "2025-roam-3-ultranavy_2.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Roam 2 - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "17790000",
            "image": [
                "2025-roam-2-asphaltgreen_2.jpg",
                "2025-roam-2-asphaltgreen-1.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Roam 4 - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "12790000",
            "image": [
                "2025-roam-4-black_2.jpg",
                "2025-roam-4-mars-dust.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring Giant Escape 3 Disc - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "12790000",
            "image": [
                "2025-escape-3-disc-ultranavy_2.jpg",
                "2025-escape-3-disc-mineralgreen.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 2 Disc - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "14790000",
            "image": [
                "2025-escape-2-disc-driedmatcha_2.jpg",
                "2025-escape-2-disc-asphaltgreen_2.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 2 City Disc - Phanh Đĩa, Bánh 700C - 2025",
            "old_price": null,
            "price": "15790000",
            "image": [
                "2025-escape-2-citydisc-asphaltgreen_2.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 2 - Phanh Đĩa, Bánh 700C - 2024",
            "old_price": null,
            "price": "11490000",
            "image": [
                "2024-escape-2-marblegray_2.jpg",
                "2024-escape-2-brown_2.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring LIV Alight 2 - Phanh Đĩa, Bánh 700C - 2024",
            "old_price": null,
            "price": "10990000",
            "image": [
                "2024-alight-2-pink.jpg",
                "2024-alight-2-pink-1.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Revolt-F 1 – Phanh Đĩa, Bánh 700C – 2022",
            "old_price": null,
            "price": "19990000",
            "image": [
                "DM_20241003190545_001.jpg",
                "DM_20241003190545_002.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 1 Disc – Phanh Đĩa, Bánh 700C – 2024",
            "old_price": null,
            "price": "15990000",
            "image": [
                "2024_Escape1Disc_SnowDrift_0.jpg",
                "2024_Escape1Disc_Sandshell_0.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        },
        {
            "category": "67c5c8c5d0e2d348c2f5b13f",
            "name": "Xe Đạp Đường Phố Touring GIANT Escape 2 – Phanh Đĩa, Bánh 700C – 2022",
            "old_price": null,
            "price": "9990000",
            "image": [
                "2022_Escape2_Black-1.jpg",
                "2022_Escape2_Black_0.jpg"         
            ],
            "brand": "GIANT",
            "color":["white", "blue", "black", "gray"],
            "desc": "",
            "status":"true"
        }
    ]
]

let b = [

]

let c = [
]
//xe dap nu
let d = [
    [
        {
            "category": "67c5c92fd0e2d348c2f5b142",
            "name": "Xe Đạp Đường Phố Touring VINBIKE Eva 1 – Bánh 24 Inches",
            "old_price": null,
            "price": "4190000",
            "image": [
                "Eva1_DesertPink.jpg",
                "Eva1_Green-1.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c92fd0e2d348c2f5b142",
            "name": "Xe Đạp Đường Phố Touring VINBIKE Lily 26 – Bánh 26 Inches",
            "old_price": null,
            "price": "3290000",
            "image": [
                "DM_20241003185441_001.jpg",
                "DM_20241003185441_003.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c92fd0e2d348c2f5b142",
            "name": "Xe Đạp Đường Phố Touring VINBIKE Lily 24 – Bánh 24 Inches",
            "old_price": null,
            "price": "2990000",
            "image": [
                "DM_20241003185051_001.jpg",
                "DM_20241003185051_003.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c92fd0e2d348c2f5b142",
            "name": "Xe Đạp Đường Phố Touring VINBIKE Eva – Bánh 26 Inches",
            "old_price": null,
            "price": "4390000",
            "image": [
                "EVA_Pink-1.jpg",
                "Eva_Beige-1-1.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        }
    ]
]

//xe dap tre em
let e =[
    [
        {
            "category": "67c5c767d0e2d348c2f5b13e",
            "name": "Xe Đạp Trẻ Em Youth VINBIKE Rock – Phanh Đĩa, Bánh 20 Inches",
            "old_price": null,
            "price": "3390000",
            "image": [
                "Rock20_Red.jpg",
                "Rock20_LightBlue.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c767d0e2d348c2f5b13e",
            "name": "Xe Đạp Trẻ Em Youth VINBIKE Robo 16 – Bánh 16 Inches",
            "old_price": null,
            "price": "1290000",
            "image": [
                "2131390021-850-1.jpg",
                "2131390022-850-1.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c767d0e2d348c2f5b13e",
            "name": "Xe Đạp Trẻ Em Youth VINBIKE Mochi 16 – Bánh16 Inches",
            "old_price": null,
            "price": "1290000",
            "image": [
                "Vinbike_Mochi16_Green.jpg",
                "Vinbike_Mochi16_Yellow.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        },
        {
            "category": "67c5c767d0e2d348c2f5b13e",
            "name": "Xe Đạp Trẻ Em Youth VINBIKE Mochi 18 – Bánh 18 Inches",
            "old_price": null,
            "price": "1390000",
            "image": [
                "Mochi18_Pink.jpg",
                "Vinbike_Mochi18_Green.jpg"
            ],
            "color": [
                "white",
                "blue",
                "black",
                "gray"
            ],
            "brand": "Vinbike",
            "desc": "",
            "status": "true"
        }
    ]
]



let data=[...a,...b,...c,...d,...e];
 console.log(data);

 // Lấy ra các sản phẩm không phải là topping
 // http://localhost:3000/product?type_ne=topping
 // Lấy ra 10 sản phẩm rẻ nhất có giá trên 40000
 // http://localhost:3000/product?price_gt=40000&_sort=price&_limit=10