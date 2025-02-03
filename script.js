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
// ฟังก์ชันเปิดแท็บ
function openTab(tabName) {
    var contents = document.querySelectorAll('.tab-content');
    contents.forEach(function(content) {
        content.classList.remove('active');
    });

    var activeTab = document.getElementById(tabName);
    activeTab.classList.add('active');

    // แสดงสินค้าของหมวดหมู่ที่เลือก
    displayProducts(tabName);

    // จัดการแท็บที่ถูกเลือก
    var buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(function(button) {
        button.classList.remove('active'); // ลบคลาส active จากทุกปุ่ม
    });
    var activeButton = document.querySelector('button[onclick="openTab(\'' + tabName + '\')"]');
    activeButton.classList.add('active'); // เพิ่มคลาส active ให้กับปุ่มที่เลือก
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

// โหลดสินค้าหมวดหมู่แรกเมื่อเปิดเว็บ
window.onload = () => {
    displayProducts('mountain-bikes'); // โหลดสินค้าหมวดแรก
};
