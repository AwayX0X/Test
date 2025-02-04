// script.js

let currentIndex = 0, currentImages = [], currentDescriptions = [];
let currentCategory = "", currentProductName = "";
let currentColor = ""; // เก็บค่าสีปัจจุบัน
let preloadedData = {}; // เก็บข้อมูลสินค้าที่โหลดไว้ล่วงหน้า

// ฟังก์ชันเคลียร์แคช
function clearCache() {
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
        });
    }
}

// ฟังก์ชันโหลดข้อมูลล่วงหน้า
function preloadData() {
    preloadedData = products; // โหลดข้อมูลสินค้าเก็บไว้ในตัวแปร
}

// ฟังก์ชันโหลดภาพล่วงหน้า
function preloadImages() {
    Object.values(products).forEach(category => {
        category.forEach(product => {
            product.images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
            Object.values(product.colorImages || {}).forEach(src => {
                const img = new Image();
                img.src = src;
            });
        });
    });
}

// ฟังก์ชันเปลี่ยนเส้นทางไป `index.html` ถ้าผู้ใช้เข้าเว็บผิดหน้า
function redirectToHome() {
    const allowedPages = ["index.html", "product.html", ""];
    const currentPage = window.location.pathname.split("/").pop();
    if (!allowedPages.includes(currentPage)) {
        window.location.href = "index.html";
    }
}

// ฟังก์ชันแสดงสินค้าตามหมวดหมู่
function displayProducts(category) {
    console.log(`กำลังโหลดสินค้าในหมวดหมู่: ${category}`);

    const productContainer = document.getElementById(`${category}-products`);
    if (!productContainer) return console.error(`ไม่พบ container ของ ${category}`);

    if (!products[category]) {
        productContainer.innerHTML = "<p>ไม่มีสินค้าในหมวดหมู่นี้</p>";
        return;
    }

    productContainer.innerHTML = products[category].map(product => `
        <div class="product" onclick="goToProductPage('${category}', '${product.name}')">
            <img src="${product.images[0]}" alt="${product.alt}" loading="lazy">
            <h4>${product.name}</h4>
            <p class="price">${product.price} บาท</p>
        </div>
    `).join('');
}

// ฟังก์ชันเปลี่ยนหมวดหมู่สินค้า
// ฟังก์ชันเปลี่ยนหมวดหมู่สินค้า
function changeCategory() {
    let selectedCategory = document.getElementById("categorySelect").value;

    // ซ่อนแท็บทั้งหมดก่อน แล้วแสดงเฉพาะที่เลือก
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });
    document.getElementById(selectedCategory).style.display = "block";

    // ล้างสินค้าก่อนโหลดใหม่
    const productContainer = document.getElementById(`${selectedCategory}-products`);
    if (productContainer) {
        productContainer.innerHTML = "";
        displayProducts(selectedCategory); // โหลดสินค้าใหม่
    }
}


// ฟังก์ชันไปที่หน้าสินค้าเฉพาะตัว
function goToProductPage(category, productName) {
    window.location.href = `product.html?category=${category}&name=${encodeURIComponent(productName)}`;
}

// ฟังก์ชันโหลดรายละเอียดสินค้าใน product.html
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    currentCategory = params.get("category");
    currentProductName = params.get("name");

    console.log(`Loading product: ${currentProductName} from category: ${currentCategory}`);

    if (!currentCategory || !currentProductName || !preloadedData[currentCategory]) {
        console.error("Category หรือ Product ไม่ถูกต้อง");
        return;
    }

    const product = preloadedData[currentCategory].find(p => p.name === currentProductName);
    if (!product) {
        console.error("ไม่พบสินค้าที่ต้องการ");
        return;
    }

    document.getElementById("productTitle").innerText = product.name;
    document.getElementById("productPrice").innerText = `ราคา: ${product.price} บาท`;
    document.getElementById("productDescription").innerText = product.description || "ไม่มีรายละเอียดสินค้า";

    console.log("Images:", product.images);
    if (product.images && product.images.length > 0) {
        document.getElementById("productImage").src = product.images[0];
    } else {
        console.error("ไม่มีภาพสินค้า");
    }

    // โหลดปุ่มเลือกสี
    const colorOptions = document.getElementById("colorOptions");
    colorOptions.innerHTML = "";
    const label = document.createElement("label");
    label.innerHTML = "<strong>เลือกสี:</strong>";
    colorOptions.appendChild(label);

    product.colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-box");
        button.style.backgroundColor = colorToHex(color);
        button.onclick = () => changeColor(color);
        colorOptions.appendChild(button);
    });

    changeColor(product.colors[0]); // ตั้งค่าสีเริ่มต้น
}

// ฟังก์ชันเปลี่ยนสีสินค้า โดยใช้ปุ่ม Next/Prev
function changeColorByButton(step) {
    const product = preloadedData[currentCategory].find(p => p.name === currentProductName);
    if (!product) return;

    const colorKeys = Object.keys(product.colorImages);
    let currentColorIndex = colorKeys.indexOf(currentColor);

    // หาสีใหม่ตามทิศทางที่กด
    let newColorIndex = (currentColorIndex + step + colorKeys.length) % colorKeys.length;
    let newColor = colorKeys[newColorIndex];

    console.log(`เปลี่ยนสีจาก ${currentColor} เป็น ${newColor}`);
    changeColor(newColor);
}

function changeColor(selectedColor) {
    const product = preloadedData[currentCategory].find(p => p.name === currentProductName);
    if (product && product.colorImages[selectedColor]) {
        document.getElementById("productImage").src = product.colorImages[selectedColor];

        // อัปเดตคำอธิบายรูปภาพ
        const colorIndex = product.colors.indexOf(selectedColor);
        document.getElementById("imageDescription").innerText =
            product.imageDescriptions[colorIndex] || "ไม่มีคำอธิบายสำหรับสีนี้";
    }

    // ลบ active class จากทุกปุ่ม
    document.querySelectorAll(".color-box").forEach(btn => {
        btn.classList.remove("active");
    });

    // เพิ่ม active class ให้สีที่ถูกเลือก
    const selectedBox = [...document.querySelectorAll(".color-box")].find(
        box => box.style.backgroundColor === colorToHex(selectedColor)
    );
    if (selectedBox) selectedBox.classList.add("active");

    currentColor = selectedColor;
}


// ฟังก์ชันแปลงชื่อสีเป็นโค้ด HEX
function colorToHex(color) {
    const colorMap = {
        "แดง": "#FF0000", "น้ำเงิน": "#0000FF", "ดำ": "#000000",
        "ขาว": "#FFFFFF", "เขียว": "#008000", "เทา": "#808080"
    };
    return colorMap[color] || color;
}

// ฟังก์ชันย้อนกลับไปยังหน้าหลัก
function goBack() {
    window.location.href = "index.html";
}

// ฟังก์ชันแสดงและซ่อน Loading Screen
function toggleLoading(show) {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.style.display = show ? "flex" : "none";
    }
}

// ฟังก์ชันแสดงผลจำนวนเข้าชม
function displayVisitCount() {
    const visitRef = firebase.database().ref("visitCount");
    
    visitRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("visitCounter").innerText = `จำนวนเข้าชมเว็บไซต์: ${snapshot.val()} ครั้ง`;
        } else {
            document.getElementById("visitCounter").innerText = "ไม่สามารถโหลดจำนวนเข้าชม";
        }
    });
}

function updateVisitCount() {
    console.log("🔄 กำลังอัปเดตจำนวนเข้าชม...");

    if (typeof firebase === "undefined") {
        console.error("❌ Firebase SDK โหลดไม่สำเร็จ!");
        return;
    }

    const visitRef = firebase.database().ref("visitCount");

    visitRef.transaction((currentValue) => {
        console.log("✅ จำนวนเข้าชมก่อนอัปเดต:", currentValue);
        return (currentValue || 0) + 1;
    });

    visitRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
            console.log("✅ จำนวนเข้าชมใหม่:", snapshot.val());
            document.getElementById("visitCounter").innerText = `จำนวนเข้าชมเว็บไซต์: ${snapshot.val()} ครั้ง`;
        } else {
            console.warn("⚠️ ไม่มีข้อมูลจำนวนเข้าชมใน Firebase!");
            document.getElementById("visitCounter").innerText = "ไม่สามารถโหลดจำนวนเข้าชม";
        }
    });
}




// โหลดเมื่อเข้าเว็บ
window.onload = () => {
    updateVisitCount();
    displayVisitCount();
    clearCache();
    redirectToHome();
    toggleLoading(true);

    preloadData();
    preloadImages();

    setTimeout(() => {
        toggleLoading(false);

        if (document.getElementById("productTitle")) {
            loadProductDetails();
        } else {
            displayProducts("mountain-bikes");
        }
    }, 1500);
};
