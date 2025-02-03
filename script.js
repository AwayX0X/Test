// script.js

let currentIndex = 0; // ตำแหน่งของรูปที่แสดงอยู่
let currentImages = []; // รายการรูปของสินค้าที่เลือก

// ฟังก์ชันแสดงสินค้าจากหมวดหมู่
function displayProducts(category) {
    const productContainer = document.getElementById(`${category}-products`);
    productContainer.innerHTML = ''; // เคลียร์เนื้อหาก่อน

    const categoryProducts = products[category];

    categoryProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.alt}" onclick="openModal('${category}', '${product.name}')">
            <h4>${product.name}</h4>
            <p class="price">${product.price} บาท</p>
        `;
        productContainer.appendChild(productElement);
    });
}
// ฟังก์ชันเปลี่ยนหมวดหมู่เมื่อเลือกจาก Select
function changeCategory() {
    let selectedCategory = document.getElementById("categorySelect").value;
    
    // ซ่อนทุกหมวดหมู่
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });

    // แสดงหมวดหมู่ที่เลือก
    document.getElementById(selectedCategory).classList.add("active");

    // โหลดสินค้าตามหมวดหมู่ที่เลือก
    displayProducts(selectedCategory);
}
// ฟังก์ชันเปิด Modal และโหลดรูปของสินค้านั้น ๆ
function openModal(category, productName) {
    const product = products[category].find(p => p.name === productName); // ค้นหาสินค้าที่ถูกเลือก
    if (!product) return; // ป้องกันข้อผิดพลาดหากหาไม่เจอ
    
    currentImages = product.images; // โหลดรายการรูปของสินค้านั้น
    currentIndex = 0; // รีเซ็ต index

    updateModalImage(); // แสดงรูปแรก
    document.getElementById("myModal").style.display = "block";
}

// ฟังก์ชันอัปเดตรูปใน Modal
function updateModalImage() {
    let modalImg = document.getElementById("modalImg");
    let captionText = document.getElementById("caption");
    
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentIndex];
        captionText.innerHTML = `รูปที่ ${currentIndex + 1} / ${currentImages.length}`;
    }
}

// ฟังก์ชันเลื่อนรูปภาพ
function nextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateModalImage();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateModalImage();
    }
}

// ฟังก์ชันปิด Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// ฟังก์ชันแสดง Loading Screen
function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
}

// ฟังก์ชันซ่อน Loading Screen
function hideLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";
}

// โหลดสินค้าหมวดหมู่แรกหลังจากโหลดเสร็จ
window.onload = () => {
    showLoadingScreen(); // แสดงหน้าจอโหลด

    setTimeout(() => {
        hideLoadingScreen(); // ซ่อนหน้าจอโหลด
        displayProducts('mountain-bikes'); // โหลดสินค้าหมวดแรก
    }, 1500); // ตั้งเวลาโหลด 1.5 วินาที
};
