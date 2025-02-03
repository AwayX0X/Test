// script.js

// ฟังก์ชันแสดงสินค้าจากหมวดหมู่
function displayProducts(category) {
    const productContainer = document.getElementById(`${category}-products`);
    productContainer.innerHTML = ''; // เคลียร์เนื้อหาก่อน

    const categoryProducts = products[category];

    categoryProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.alt}" onclick="openModal(this)">
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

// ฟังก์ชันเปิด Modal
function openModal(imgElement) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// ฟังก์ชันปิด Modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
window.onload = () => {
    displayProducts('mountain-bikes'); // แสดงสินค้าจากหมวดหมู่เริ่มต้น
};
