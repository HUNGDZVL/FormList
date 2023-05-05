const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const App = $(".app");
let checkdata = false;
let checkitem = 0;

function start() {
  // gọi hàm render data
  getDataFromJS(renderData);
}
start();
// hàm lấy data từ file js
function getDataFromJS(renderData) {
  let data_ = {};
  data_ = dialog; //get data từ file js
  // gọi data trong file ra đưa vào function để xử lí ra form
  const title = data_.header.title; //
  window.content = data_.content; // lấy phần thông tin thẻ tag
  for (let i = 0; i < content.length; i++) {
    if (content[i].rules) {
      window.requiredWarning = content[i].rules[0].message;
      checkitem++;
    }
  }
  console.log(checkitem);
  //đưa biến required ra ngoài window để validate theo trường hợp
  // goi hàm render data
  renderData(
    title,
    content,
    valiDationForm,
    choseItemOption,
    handleFocusDate,
    checkSubmitForm
  );
}
function renderData(
  title,
  contents,
  valiDationForm,
  choseItemOption,
  handleFocusDate,
  checkSubmitForm
) {
  // tạo thẻ div chứa thẻ form header và tilte,(header của form)
  const divHeader = document.createElement("div");
  divHeader.setAttribute("class", "app__header");
  const blockForm = document.createElement("form");
  blockForm.setAttribute("class", "app__form");
  const headertitle = document.createElement("h3");

  headertitle.innerHTML = title;

  // lồng thẻ vô nhau theo thứ tự, Form > header > contetn
  divHeader.appendChild(headertitle);

  blockForm.appendChild(divHeader);
  // thêm vào Dom
  App.appendChild(blockForm);

  // duyệt qua tất cả thông tin content trong file js
  contents.map((item) => {
    //lấy tất cac các thẻ có tag là input trừ nhưng input có type la file
    if (item.tag == "input" && item.type !== "file") {
      // tạo thẻ bao lấy form và các thẻ con chứa thông tin trong file js
      const divForm = document.createElement("div");
      divForm.setAttribute("class", "form__control");
      // tạo thẻ con chứa trong form với các thông tin từ item (file js)
      const divIcon = document.createElement("div");
      divIcon.innerHTML = `<i class="fas ${item.icon}"></i>`;
      divIcon.setAttribute("class", "icon__form");
      const elementForm = document.createElement(item.tag);
      elementForm.type = item.type;
      // xử lí nếu type == date
      if (item.type == "date") {
        elementForm.type = "text";
      }
      if (item.rules) {
        elementForm.setAttribute("class", "checkrequired");
      }
      // set giá trị có thẻ tag input
      elementForm.name = item.name;
      elementForm.placeholder = item.label;
      elementForm.id = item.id;

      divForm.appendChild(divIcon);
      divForm.appendChild(elementForm);
      // thêm vào Dom theo thứ tự
      blockForm.appendChild(divForm);

      //tạo * để validate
      const spanRequired = document.createElement("span");
      // kiểm tra validation thông qua rules trong item

      if (item.rules !== undefined) {
        // nếu có rules thì validate các item trong list data
        //lấy các type trong rule add thêm * cho các item thỏa mãn rule khác null
        if (item.rules[0].type === "required") {
          spanRequired.classList.add("required");
          spanRequired.innerText = "*";
        }
        // validte form theo từng item trong item khi thỏa rules (*)
        valiDationForm(elementForm, item);
      } //thêm các * trong Dom
      divForm.appendChild(spanRequired);
    }
    // xử lí form hình ảnh
    if (item.id == "licence_code_image") {
      // tạo phần header của form chứa hình ảnh
      const divFormImg = document.createElement("div");
      divFormImg.setAttribute("class", "form__control");
      const itemHeaderImg = document.createElement("div");
      itemHeaderImg.setAttribute("class", "form__headerimg");
      itemHeaderImg.innerHTML = `
        <span><i class="fas ${item.icon}"></i></span>
        <p>${item.label}</p>
        <span><i class="fas fa-file-upload"></i></span>

      `;
      // thêm giá trị con vào form img
      divFormImg.appendChild(itemHeaderImg);
      //them form hình ảnh vô fomr chính
      blockForm.appendChild(divFormImg);
      //block chứa img (body)
      const areaDropImg = document.createElement("div");
      areaDropImg.setAttribute("class", "area-drop-img");
      // tạo thẻ chứa hình ảnh thông tin text khi chưa chọn hình ảnh

      areaDropImg.innerHTML = `
                            <i class="fas fa-file-import"></i>
                            <p>Hãy tải hình ảnh lên để hiển thị</p>
                            <p>Please upload pictures for display</p>
                            `;

      // thêm đoạn text của form vo form chính
      blockForm.appendChild(areaDropImg);
      // tạo thẻ input file để chọn hình ảnh để none để ân trên trình duyệt
      const InputImg = document.createElement("div");
      InputImg.setAttribute("class", "wrapper__img");
      InputImg.innerHTML = `
                        
                        <input style="display:none" id="${item.id}" name="${item.name}" type="${item.type}"
                            accept="${item.upload}" class="form-control image-input" />
                                      
                    `;
      // thêm input vào Dom
      areaDropImg.appendChild(InputImg);
      // xử lí event click chọn img
      const formImgchosen = $(".area-drop-img");
      const fileInput = $(`#${item.id}`);
      // khi click vào đoạn text thì chon tới input file
      formImgchosen.onclick = () => {
        fileInput.click();
      };
      // lấy giá trị input
      fileInput.addEventListener("change", (e) => {
        // neu nhu file có tồn tại thì
        if (e.target.files.length) {
          // lấy ra url của file chọn
          const src = URL.createObjectURL(e.target.files[0]);

          // reset nội dung thẻ areaDrop
          areaDropImg.innerHTML = "";
          //thêm css hình ảnh vô thẻ hiện ra màn hình
          areaDropImg.style.backgroundImage = `url(${src})`;
        }
      });
      // tạo phần footter của form chứa hình ảnh và thêm vào DOm
      const itemFooterImg = document.createElement("div");
      itemFooterImg.setAttribute("class", "form__footerimg");
      itemFooterImg.innerHTML = `
      <p>${item.note}</p>
      `;
      blockForm.appendChild(itemFooterImg);
    }
    // xu lí form co option bằng lái
    if (item.tag == "select-multi") {
      window.textOption = item.label; // lấy phàn text của form thông qa biến local
      const selectOptionsRank = document.createElement("div");
      selectOptionsRank.setAttribute("class", "form__selectOp");
      //tạo thẻ con chứa các thông tin của form chứa option
      const selectItmes = document.createElement("div");
      selectItmes.name = item.name;
      selectItmes.id = item.id;
      selectItmes.innerHTML = `
      <p class="check--item">${item.label} </p>
     
      
      `;
      //thêm validate
      const checkvalue = document.createElement("span");
      checkvalue.setAttribute("class", "requiredd");
      checkvalue.setAttribute("id", "setupvalue");
      checkvalue.textContent = "*";
      // thêm các item vô trong Dom theo thứ tự
      selectOptionsRank.appendChild(selectItmes);
      selectOptionsRank.appendChild(checkvalue);
      blockForm.appendChild(selectOptionsRank);
      // render các option trong item theo thứ tự
      const ListOptions = document.createElement("div");
      ListOptions.setAttribute("class", "list__option");
      ListOptions.innerHTML = item.options
        .map(
          (option, index) =>
            `
        <label>
        <input class="optionRank" type="checkbox" id="option-${index}" value="${option.text}"/>
        <p class="item__list" id="p-${index}">${option.text}</p>
        </label>
      `
        )
        .join("");
      //them optin vào Dom
      blockForm.appendChild(ListOptions);
      // goi Hàm sử lí option
      choseIteminListItems(item);
    }
    // xư lí form phương tiện làm việc
    if (item.tag == "select") {
      const multiSelect = document.createElement("div");
      multiSelect.setAttribute("class", "selectop");
      // render data select ra giao diện
      const selectBox = document.createElement("div");
      selectBox.classList.add("selectBox");
      selectBox.innerHTML = `
          <div class='select-radius' id="${item.id}">
          <p>${item.label}</p>
          <i class="fa-solid fa-sort-down"></i>
          </div>
          <div class="overSelect"></div>
          <span class="select-radius-icon"><i class="fas fa-paper-plane"></i></span>
        `;
      if (item.rules) {
        selectBox.innerHTML = `
            <div class='select-radius' id="${item.id}">
          <p>${item.label}</p>
          <i class="fa-solid fa-sort-down"></i>
          </div>
          <div class="overSelect"></div>
          <span class="requiredd">*</span>
          <span class="select-radius-icon"><i class="fas fa-paper-plane"></i></span>
          `;
      }
      multiSelect.appendChild(selectBox);
      blockForm.appendChild(multiSelect);
      // thêm tag vô DOm
      //toggle option ân hiện option khi click
      selectBox.onclick = function () {
        const toggleoptions = $(".option__item");
        toggleoptions.classList.toggle("toggle");
      };
      //render option ra giao diẹn theo các item có trong file js
      const optionChosen = document.createElement("div");
      optionChosen.setAttribute("class", "option__item");
      optionChosen.innerHTML = item.options
        .map(
          (option, index) =>
            `
        <label for="select-${index}">
        <input class="_radio-input" type="radio" id="select-${index}" value="${option.value}" name="${item.name}" />
       <p> ${option.text}</p></label>
                                    `
        )
        .join("");
      // thêm option vào trong Dom
      multiSelect.appendChild(optionChosen);
      // goi hàm xử lí option vehicle
      choseItemOption(item);
      // render block note phía dưới vehical
      const selectNote = document.createElement("div");
      selectNote.setAttribute("class", "note");
      const contentNote = document.createElement("p");
      contentNote.textContent = item.note;
      selectNote.appendChild(contentNote);
      multiSelect.appendChild(selectNote);
    }
  }); // tạo phàn footer của form
  const formFooter = document.createElement("div");
  formFooter.classList.add("form-footer");
  formFooter.innerHTML = `
            <button>Đóng</button>
            <button class="submit">Thêm</button>`;
  blockForm.appendChild(formFooter);
  formFooter.children[0].onclick = (e) => {
    e.preventDefault(); // ngăn hanh vi mặc dinh của form
  };
  formFooter.children[1].onclick = (e) => {
    e.preventDefault();
  };
  handleFocusDate(); // hàm xử lí date khi focus
  checkSubmitForm(); // gọi hàm submid form
}
// hàm xử lí các item trong option Rank
function choseIteminListItems() {
  const formRank = $("#rank"); // lấy thẻ cha chứa phần tử
  const checkitem = $(".check--item"); // định danh mặc định
  const listItemsrank = $(".list__option"); // thẻ cha chứa option
  formRank.onclick = function () {
    listItemsrank.classList.toggle("toggle"); // đóng mở option
  };
  const itemcheckbox = $$("input[type=checkbox]");
  // lấy tất cả các input type check box để kiểm tra thuộc tính check
  for (let i = 0; i < itemcheckbox.length; i++) {
    itemcheckbox[i].onclick = function () {
      formRank.classList.remove("warning");
      formRank.classList.add("active");
      // gán mỗi item check onclick
      // check xem phần tử nào dc check thì lấy giá trị của phần từ đó thêm vào thẻ Cha chứa nó
      if (itemcheckbox[i].checked) {
        let itemrank = document.createElement("p");
        itemrank.textContent = itemcheckbox[i].value;
        // them id để xíu xóa theo id
        itemrank.setAttribute("id", itemcheckbox[i].id);
        // thêm thẻ p với nội dung của input vào danh sach chứa listItem được chọn
        formRank.appendChild(itemrank);
        checkitem.remove(); // xóa thẻ mặc định
      } else {
        //nếu như hủy check thì xóa luôn phần tử đó đi
        const allPitem = $$("#rank p");
        formRank.classList.remove("active");

        // lấy tất cả các thẻ p trong danh sạchs listitem
        for (let item of allPitem) {
          // nếu như phần tử bị disable checked thì kiểm tra id của phân tử đó vs id của phần tử item trong list
          // nếu trùng thì xóa hản phần tử đó đi
          if (item.id == itemcheckbox[i].id) {
            item.remove();
          }
        }

        // kiểm tra xem nếu không còn phần tử nào thì trở về mặc định
        if (formRank.children.length == 0) {
          formRank.appendChild(checkitem);
        }
      }
    };
  }
}

function choseItemOption(item) {
  let inputname = item.name;
  window.checkPop = item.label;
  const divOption = $("#vehicle > p");
  // lấy  the input vehicle  có option
  const options = $$(`input[name="${inputname}"]`);
  for (let i = 0; i < options.length; i++) {
    // gán event click cho từng option
    options[i].onclick = function () {
      // loai bỏ lựa chọn các input khác và gán giá trị được chọn cho thẻ chả phương tiện di chuyển hiện ra browser
      divOption.textContent = options[i].value;
      const selectradiusactive = $(".select-radius");
      selectradiusactive.classList.add("active");
      selectradiusactive.classList.remove("warning");
      Checkoption.style.color = "black";
      // chỉ cho phép chọn 1 option
      //
      for (let j = i; j < options.length; j++) {
        if (i != j) {
          options[j].checked = false;
        }
      }
    };
  }
}

function handleFocusDate() {
  // ản hiện plachodler input date
  const dateForm = $("#end_date");
  if (dateForm) {
    dateForm.addEventListener("focus", () => {
      dateForm.type = "date"; //hiện date khi focus vô trường
    });
    dateForm.addEventListener("blur", () => {
      dateForm.type = "text";
    });
  }
}

function valiDationForm(elementForm, itemobj) {
  elementForm.addEventListener("blur", function () {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // xử lí trường đơn giản
    if (elementForm.value === "" && elementForm.name != "email") {
      // nếu không phải là gmail thì validate các trường đó
      elementForm.placeholder = itemobj.rules[0].message;
      elementForm.classList.add("warning");
      elementForm.classList.remove("active");
    } else if (elementForm.value !== "") {
      elementForm.classList.remove("warning");
      elementForm.classList.add("active");
    }
    // xử lí form email validate trường email theo regex
    if (elementForm.name === "email" && regex.test(elementForm.value)) {
      elementForm.classList.add("active");
      elementForm.classList.remove("warning");
    } else if (!regex.test(elementForm.value) && elementForm.name === "email") {
      elementForm.placeholder = itemobj.rules[0].message;
      elementForm.classList.add("warning");
      elementForm.classList.remove("active");
      elementForm.value = "";
    }
  });
  // xử lí hành vi focus
  elementForm.addEventListener("focus", () => {
    checkdata = true; // điều kiện check data trong input để submir
    elementForm.classList.add("active");
    elementForm.classList.remove("warning");

    elementForm.placeholder = itemobj.label;
  });
}

function checkSubmitForm() {
  const submitForm = $(".submit");
  window.Checkoption = $("#vehicle p"); // đặt biến global để lấy text

  submitForm.addEventListener("click", function () {
    // check all form bằng nút submit

    const checkWaring = $$(".warning"); // lấy tất cả warning để check
    // check data input khi submit va lay data input khi validate succes
    if (checkWaring.length > 0 && checkdata == true) {
      console.log("nhập lại"); // neu có warning thì cảnh báo
    } else if (checkWaring && checkdata == true) {
      // không có warning thi xuất data từ form
      const valueinputs = $$("input.active");
      // lay tất cả giá trị thẻ input có active
      let arrvalue = []; // dặt biến lưu data

      for (let i = 0; i < valueinputs.length; i++) {
        // lấy tất cả thẻ input các class là active
        let name = valueinputs[i].name;
        let valueip = {
          [name]: valueinputs[i].value,
        };
        // push key và value của từng input vô mảng
        arrvalue.push(valueip);
      }
      // lấy tất cả input không có active

      const inputnumberinfo = $("#verify_code"); // duyẹt trường có id là verify và push value vô mảng
      if (inputnumberinfo) {
        if (inputnumberinfo.value) {
          let name1 = inputnumberinfo.name;
          let valuenumber = {
            [name1]: inputnumberinfo.value,
          };
          arrvalue.push(valuenumber);
        }
      }

      // lay thẻ div có id la rank và class là active

      // push tiếp value trường có id la rank và class là active vô mảng
      const idRank = $("#rank.active");
      if (idRank) {
        const tagPs = idRank.querySelectorAll("p");
        for (let i = 0; i < tagPs.length; i++) {
          let valuerank = {
            rank: tagPs[i].textContent,
          };
          arrvalue.push(valuerank);
        }
      }
      // kiểm tra thẻ div xem có img hay không nếu có thì lấy url của img đó
      const divImg = $(".area-drop-img");
      // lay style tag div
      if (divImg) {
        var styleDivImg = window.getComputedStyle(divImg);
        var backgroundImg = styleDivImg.getPropertyValue("background-image");
      }
      if (backgroundImg) {
        // Loại bỏ những ký tự không cần thiết trong chuỗi giá trị
        const url = backgroundImg
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");
        let valueimg = {
          url_img: url,
        };
        // push value url hình ảnh vô mảng
        arrvalue.push(valueimg);
      } else {
        console.log("Không tìm thấy hình ảnh");
      }
      // lấy phương tiện di chuyển
      //push tiếp giá trị vô mảng
      const divVehicle = $("#vehicle");
      if (divVehicle) {
        const tagPvehicle = divVehicle.querySelector("p");
        let valuevehical = {
          valueVehicle: tagPvehicle.textContent,
        };
        arrvalue.push(valuevehical); // nếu độ dài mảng lớn hơn 3 phần tử thì sẽ xuất mảng bơi vì trong form có 3 trường k bắt buộc validate
        if (arrvalue.length >= checkitem) console.log(arrvalue);
      }
    }

    //check option ranked để validate
    const parenOption = $("#rank");
    if (parenOption) {
      const checkItemOption = parenOption.querySelector("p");
      // lấy thẻ p trong tag cha chứa nó
      const checkOP = checkItemOption.textContent.trim();
      if (checkOP == textOption.trim()) {
        // kiểm tra giá trị trong thẻ nếu là mặc định trong data.js thì add warning
        parenOption.classList.add("warning");
      } else if (checkOP !== textOption.trim()) {
        parenOption.classList.remove("warning"); // xóa warning khi có data option
      }
    }
    // duyệt qa tất cả tag input trừ verify

    const formInputs = $$('input.checkrequired:not([name="verify_code"])');
    for (let item of formInputs) {
      // check input ẩn của img để k cho add remove,
      //nếu data trong các trương bị trống thì sẽ add warning cảnh cáo
      if (item.value == "" && item.name != "licence_code_image") {
        item.classList.add("warning");
        item.placeholder = requiredWarning;
      }
      // gắn điều kiện cho trường chọn phương tiện để check value mặc đinh của nó có hay không
      if (Checkoption && Checkoption.textContent == checkPop) {
        Checkoption.textContent = "Hãy chọn phương tiện";
        Checkoption.style.color = "red";
      }
    }
  });
}
