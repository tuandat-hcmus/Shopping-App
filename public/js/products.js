// let categories = [
//   { id: "C104", name: "Đồng hồ" },
//   { id: "C102", name: "Bách hóa" },
//   { id: "C101", name: "Thể thao" },
//   { id: "C103", name: "Nhà cửa và đời sống" },
// ];

// let products = [
//   {
//     id: "SP002",
//     name: "Đồng hồ sp",
//     price: 100000,
//     stock: 20,
//     image: "",
//     categoryId: "C101",
//   },
//   {
//     id: "SP001",
//     name: "Bách hóa sp",
//     price: 100000,
//     stock: 20,
//     image: "",
//     categoryId: "C103",
//   },
//   {
//     id: "SP004",
//     name: "Thể thao sp",
//     price: 100000,
//     stock: 20,
//     image: "",
//     categoryId: "C101",
//   },
//   {
//     id: "SP003",
//     name: "Nhà cửa và đời sống sp",
//     price: 100000,
//     stock: 20,
//     image: "",
//     categoryId: "C104",
//   },
// ];
/*
Fix:
.image -> .Anh[0]
.id -> .MaSP
.name -> .Ten
.price -> .DonGia
.stock -> .SoLuongTon
chuyển populateCategoryOptions, updateTable vào main
các hàm updateImagePreview, confirmDeleteProduct, addProduct
*/

async function updateTable() {
  let tableBody = $("#productTable tbody").html("");

  // products.sort((a, b) => a.MaSP.localeCompare(b.MaSP));

  products.forEach((product, index) => {
    if (!product.Anh || product.Anh.length === 0) {
      product.Anh = ['/img/logo_hcmus.png'];
    }
    let row = tableBody[0].insertRow(index);
    row.innerHTML = `<td>${index + 1}</td>
                     <td>${product.MaSP}</td>
                     <td>${product.Ten}</td>
                     <td>${product.DonGia}</td>
                     <td>${product.SoLuongTon}</td>
                     <td>${product.TenLoai}</td>
                     <td><img src="${product.Anh[0]}" alt="" class = "product_img"></td>
                     <td> 
                        <i class='bx bx-edit text-info cursor-pointer' role="button" onclick="editProduct(${index})" title="Edit"></i>
                        <i class='bx bx-trash text-danger cursor-pointer' role="button" onclick="deleteProduct(${index})" title="Delete"></i>
                     </td>`;
  });
}

// function getCategoryNameById(categoryId) {
//   const category = categories.find((c) => c.MaSP === categoryId);
//   return category ? category.Ten : "N/A";
// }


function populateCategoryOptions() {
  let categorySelect = $("#productCategory");
  categorySelect.empty();
  categories.forEach(category => {
    categorySelect.append(`<option value="${category.MaLoai}">${category.TenLoai}</option>`);
  });
}
// populateCategoryOptions();

function addNewProduct() {
  $("#modalTitle").text("Thêm sản phẩm");
  resetForm();
  $("#editIndex").val("-1");
  showForm();
}

function resetForm() {
  $("#productForm")[0].reset();
  $(".error-message").text("");
  // $("#imagePreview").attr("src", "");
  $("#imagePreview").html("");
}

function editProduct(index) {
  resetForm();
  $("#modalTitle").text("Chỉnh sửa sản phẩm");
  $("#editIndex").val(index);
  let product = products[index];
  $("#productName").val(product.Ten);
  $("#productPrice").val(product.DonGia);
  $("#productStock").val(product.SoLuongTon);
  $("#productCategory").val(product.MaLoai);
  // console.log(product.Anh[0]);
  // $("#imagePreview").attr("src", product.Anh[0]);
  const imagePreview = $('#imagePreview').html("");
  if (product.Anh.length !== 0) {
    for (let i = 0; i < product.Anh.length; i++) {
      imagePreview.append(`<img class="mt-2" style="max-width: 100px; max-height: 100px;" src="${product.Anh[i]}" >`)
    }
  } else {
    $("#imagePreview").html("");
  }
  showForm();
}

function submitEditForm(index) {
  let newname = $("#newName").val().trim();

  if (newname) {
    categories[index].Ten = newname;
    updateTable();
    hideForm();
  }
}

let deletionIndex;
function deleteProduct(index) {
  deletionIndex = index;
  let productName = products[index].Ten;
  $("#productToDelete").text(productName);
  $("#deleteProductBtn").data("index", index);
  // console.log(index);
  $("#deleteConfirmationModal").modal("show");
  $("#comfirmDeleteProductBtn").attr('onclick', `confirmDeleteProduct(${index})`);
}

async function confirmDeleteProduct(index) {
  // let index = $("#deleteProductBtn").data("index");
  const result = await deleteProducts(products[index].MaSP, products[index].Anh);
  if (result) {
    products.splice(deletionIndex, 1);
    await updateTable();
  }
  else {
    // Handle delete error
  }
}

function validateInput(inputId, errorId, errorMessage) {
  let value = $(inputId).val().trim();
  let errorElement = $(errorId);

  if ($(inputId).prop("required") && !value) {
    displayError(errorElement, errorMessage);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}

function displayError(errorElement, errorMessage) {
  errorElement.text(errorMessage);
}

function hideError(errorElement) {
  $(errorElement).text("");
}

$("#productName").on("blur", function () {
  validateInput("#productName", "#productNameError", "Tên sản phẩm trống!");
  hideError("#productNameError");
}).on("focus", function () {
  hideError("#productNameError");
});

$("#productPrice").on("blur", function () {
  validateInput("#productPrice", "#productPriceError", "Giá trống!");
  hideError("#productPriceError");
}).on("focus", function () {
  hideError("#productPriceError");
});

$("#productStock").on("blur", function () {
  validateInput("#productStock", "#productStockError", "Số lượng tồn trống!");
  hideError("#productStockError");
}).on("focus", function () {
  hideError("#productStockError");
});

$("#productCategory").on("blur", function () {
  validateInput("#productCategory", "#productCategoryError", "Loại trống!");
  hideError("#productCategoryError");
}).on("focus", function () {
  hideError("#productCategoryError");
});


function submitForm() {
  let isValid = true;

  isValid = validateInput("#productName", "#productNameError", "Tên sản phẩm trống!") && isValid;
  isValid = validateInput("#productPrice", "#productPriceError", "Giá trống!") && isValid;
  isValid = validateInput("#productStock", "#productStockError", "Số lượng tồn trống!") && isValid;
  isValid = validateInput("#productCategory", "#productCategoryError", "Loại trống!") && isValid;

  if (isValid) {
    let index = $("#editIndex").val();
    let newName = $("#productName").val().trim();

    if (isProductNameExist(newName, index)) {
      displayError($("#productNameError"), "Sản phẩm đã tồn tại!");
      return;
    } else {
      hideError("#productNameError");
    }
    if (index === "-1") {
      addProduct();
    } else {
      editExistingProduct(index);
    }

    $("#productFormModal").modal("hide");
  }
}

function isProductNameExist(newName, currentIndex) {
  return products.some((product, index) =>
    index != currentIndex && product.Ten.trim() === newName);
  ;
}

async function addProduct() {
  // Upload
  const files = $("#productImage")[0].files;
  let filenames = (await uploadImages(files)).filenames;
  const path = "/img/products/";
  for (let i = 0; i < filenames.length; i++) {
    filenames[i] = path + filenames[i];
  }

  let MaLoai = parseInt($("#productCategory").val());
  let TenLoai = categories[0].TenLoai;
  categories.forEach(categories => {
    if (categories.MaLoai === MaLoai) TenLoai = categories.TenLoai;
  });

  let product = {
    MaSP: "0",
    Ten: $("#productName").val().trim(),
    DonGia: parseInt($("#productPrice").val()),
    SoLuongTon: parseInt($("#productStock").val()),
    MaLoai: MaLoai,
    TenLoai: TenLoai,
    // Anh: $("#imagePreview").attr("src") || "",
    Anh: filenames,
  };
  const resutl = await addProducts(product.Ten, product.DonGia, product.SoLuongTon, product.Anh, product.MaLoai);
  if (!resutl) {
    // Handle insert error here
  }
  else product.MaSP = resutl.MaSP;
  products.push(product);
  await updateTable();
  onImageChangeFlag = false;
}

async function editExistingProduct(index) {
  let product = products[index];
  // Get old srcs
  let srcArray = product.Anh;

  if (onImageChangeFlag) {   // Romove old images
    await removeImages(srcArray);
    const files = $("#productImage")[0].files;
    let filenames = (await uploadImages(files)).filenames;
    const path = "/img/products/";
    for (let i = 0; i < filenames.length; i++) {
      filenames[i] = path + filenames[i];
    }
    srcArray = filenames;
  }
  else {
    srcArray = $('#imagePreview img').map(function () {
      return $(this).attr('src');
    }).get();
  }

  product.Ten = $("#productName").val().trim();
  product.DonGia = parseInt($("#productPrice").val());
  product.SoLuongTon = parseInt($("#productStock").val());
  product.MaLoai = parseInt($("#productCategory").val());
  // product.Anh = $("#imagePreview").attr("src") || "";
  product.Anh = srcArray || "";

  await updateProducts(products[index].MaSP, product);
  await updateTable();
  onImageChangeFlag = false;
}
function showForm() {
  $("#productFormModal").modal("show");
}

function hideForm() {
  $("#productFormModal").modal("hide");
}

function updateImagePreview(input) {
  // const imagePreview = document.getElementById("imagePreview");
  // const file = input.files[0];
  const imagePreview = $('#imagePreview').html("");
  const file = input.files;

  // if (file) {
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     imagePreview.src = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // } else {
  //   imagePreview.src = "";
  // }
  if (file) {
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.append(`<img class="mt-2" style="max-width: 100px; max-height: 100px;" src="${e.target.result}" >`)
      }
      reader.readAsDataURL(file[i]);
    }
  }
  onImageChangeFlag = true;
}

function changeState() {
  onImageChangeFlag = false;
}

async function main() {
  data = await getProducts("Tất cả", 1);
  products = data.data;
  categories = (await getCategories()).categories;
  populateCategoryOptions();
  await updateTable();
}
let data;
let products;
let categories;
let onImageChangeFlag = false;
main();