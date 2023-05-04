const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const App = $(".app");

function start() {
  getDataFromJS(renderData);
}
start();

function getDataFromJS(renderData) {
  let data_ = {};
  data_ = dialog; //get data từ file js
  // gọi data trong file ra đưa vào function để xử lí ra form
  const title = data_.header.title;
  const content = data_.content;
  //đưa biến required ra ngoài window
  window.requiredWarning = content[0].rules[0].message;
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
  // tạo thẻ div chứa thẻ form header và tilte
  const divHeader = document.createElement("div");
  divHeader.setAttribute("class", "app__header");
  const blockForm = document.createElement("form");
  blockForm.setAttribute("class", "app__form");
  const headertitle = document.createElement("h3");

  headertitle.innerHTML = title;

  // lồng thẻ vô nhau theo thứ tự
  divHeader.appendChild(headertitle);
  blockForm.appendChild(divHeader);
  // thêm vào Dom
  App.appendChild(blockForm);

  // duyệt qua tất cả thông tin content trong file js
  contents.map((item) => {
    if (item.tag == "input" && item.type != "file") {
      // tạo thẻ bao lấy form và các thẻ con chứa thông tin trong file js
      const divForm = document.createElement("div");
      divForm.setAttribute("class", "form__control");
      const divIcon = document.createElement("div");
      divIcon.innerHTML = `<i class="fas ${item.icon}"></i>`;
      divIcon.setAttribute("class", "icon__form");
      const elementForm = document.createElement(item.tag);
      elementForm.type = item.type;
      // xử lí nếu type == date
      if (item.type == "date") {
        elementForm.type = "text";
      }
      elementForm.name = item.name;
      elementForm.placeholder = item.label;
      elementForm.id = item.id;

      divForm.appendChild(divIcon);
      divForm.appendChild(elementForm);
      // thêm vào Dom
      blockForm.appendChild(divForm);

      //tạo * để validate
      const spanRequired = document.createElement("span");
      // kiểm tra validation thông qua rules trong item

      if (item.rules !== undefined) {
        if (item.rules[0].type === "required") {
          spanRequired.classList.add("required");
          spanRequired.innerText = "*";
        }
        valiDationForm(elementForm, item);
      }
      divForm.appendChild(spanRequired);
    }

    if (item.tag == "select-multi") {
      window.textOption = item.label;
      const selectOptionsRank = document.createElement("div");
      selectOptionsRank.setAttribute("class", "form__selectOp");
      const selectItmes = document.createElement("div");
      selectItmes.name = item.name;
      selectItmes.id = item.id;
      selectItmes.innerHTML = `
      <p class="check--item">${item.label} </p>
     
      
      `;
      const checkvalue = document.createElement("span");
      checkvalue.setAttribute("class", "requiredd");
      checkvalue.setAttribute("id", "setupvalue");
      checkvalue.textContent = "*";

      selectOptionsRank.appendChild(selectItmes);
      selectOptionsRank.appendChild(checkvalue);
      blockForm.appendChild(selectOptionsRank);

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

      blockForm.appendChild(ListOptions);

      choseIteminListItems(item);
    }

    if (item.tag == "select") {
      const multiSelect = document.createElement("div");
      multiSelect.setAttribute("class", "selectop");

      const selectBox = document.createElement("div");
      selectBox.classList.add("selectBox");
      selectBox.innerHTML = `
          <div class='select-radius' id="${item.id}">
          <p>${item.label}</p>
          <i class="fa-solid fa-sort-down"></i>
          </div>
          <div class="overSelect"></div>
          <span class="requiredd">*</span>
          <span class="select-radius-icon"><i class="fas fa-paper-plane"></i></span>
        `;
      multiSelect.appendChild(selectBox);
      blockForm.appendChild(multiSelect);
      //toggle option
      selectBox.onclick = function () {
        const toggleoptions = $(".option__item");
        toggleoptions.classList.toggle("toggle");
      };
      //render option
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
      multiSelect.appendChild(optionChosen);

      choseItemOption(item);
      // render block note
      const selectNote = document.createElement("div");
      selectNote.setAttribute("class", "note");
      const contentNote = document.createElement("p");
      contentNote.textContent = item.note;
      selectNote.appendChild(contentNote);
      multiSelect.appendChild(selectNote);
    }
  });
  const formFooter = document.createElement("div");
  formFooter.classList.add("form-footer");
  formFooter.innerHTML = `
            <button>Đóng</button>
            <button class="submit">Thêm</button>`;
  blockForm.appendChild(formFooter);
  formFooter.children[0].onclick = (e) => {
    e.preventDefault();
  };
  formFooter.children[1].onclick = (e) => {
    e.preventDefault();
  };
  handleFocusDate();
  checkSubmitForm();
}

function choseIteminListItems() {
  const formRank = $("#rank"); // lấy thẻ cha chứa phần tử
  const checkitem = $(".check--item"); // định danh mặc định
  const listItemsrank = $(".list__option"); // thẻ cha chứa option
  formRank.onclick = function () {
    listItemsrank.classList.toggle("toggle");
  };
  const itemcheckbox = $$("input[type=checkbox]");
  // lấy tất cả các input type check box để kiểm tra thuộc tính check
  for (let i = 0; i < itemcheckbox.length; i++) {
    itemcheckbox[i].onclick = function () {
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
  const options = $$(`input[name="${inputname}"]`);
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = function () {
      // loai bỏ lựa chọn các input khác
      divOption.textContent = options[i].value;
      Checkoption.style.color = "black";
      // chỉ cho phép chọn 1 option
      for (let j = i; j < options.length; j++) {
        if (i != j) {
          options[j].checked = false;
        }
      }
    };
  }
}

function handleFocusDate() {
  const dateForm = $("#end_date");
  dateForm.addEventListener("focus", () => {
    dateForm.type = "date";
  });
  dateForm.addEventListener("blur", () => {
    dateForm.type = "text";
  });
}

function valiDationForm(elementForm, itemobj) {
  elementForm.addEventListener("blur", function () {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (elementForm.value === "" && elementForm.name != "email") {
      elementForm.placeholder = itemobj.rules[0].message;
      elementForm.classList.add("warning");
      elementForm.classList.remove("active");
    } else if (elementForm.value !== "") {
      elementForm.classList.remove("warning");
      elementForm.classList.add("active");
    }

    if (elementForm.name === "email" && regex.test(elementForm.value)) {
      elementForm.classList.add("active");
    } else if (!regex.test(elementForm.value) && elementForm.name === "email") {
      elementForm.placeholder = itemobj.rules[0].message;
      elementForm.classList.add("warning");
      elementForm.classList.remove("active");
      elementForm.value = "";
    }
  });

  elementForm.addEventListener("focus", () => {
    elementForm.classList.add("active");
    elementForm.classList.remove("warning");

    elementForm.placeholder = itemobj.label;
  });
}

function checkSubmitForm() {
  const submitForm = $(".submit");
  window.Checkoption = $("#vehicle p");

  submitForm.addEventListener("click", function () {
    //check option ranked
    const parenOption = $("#rank");

    const checkItemOption = parenOption.querySelector("p");
    const checkOP = checkItemOption.textContent.trim();
    if (checkOP == textOption.trim()) {
      parenOption.classList.add("warning");
      console.log(checkOP, textOption.trim());
    } else if (checkOP !== textOption.trim()) {
      parenOption.classList.remove("warning");
    }
    const formInputs = $$('input:not([name="verify_code"])');
    for (let item of formInputs) {
      if (item.value == "") {
        item.classList.add("warning");
        item.placeholder = requiredWarning;
      }
      if (Checkoption.textContent == checkPop) {
        Checkoption.textContent = "Hãy chọn phương tiện";
        Checkoption.style.color = "red";
      }
    }
  });
}
