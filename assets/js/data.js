let dialog = {
  header: {
    title: "Thêm tài xế",
  },
  content: [
    {
      tag: "input",
      type: "text",
      name: "fullname",
      id: "fullname",
      label: "Tên tài xế",
      icon: "fa-user",
      rules: [
        {
          type: "required",
          message: "Trường bắt buộc",
        },
      ],
    },
    {
      tag: "input",
      type: "number",
      name: "licence_code",
      id: "licence_code",
      label: "Bằng lái phương tiện",
      icon: "fa-id-card",
      rules: [
        {
          type: "required",
          message: "Trường bắt buộc",
        },
      ],
    },
    {
      tag: "input",
      type: "date",
      name: "end_date",
      id: "end_date",
      label: "Ngày hết hạn bằng lái [ tháng/ngày/năm ]",
      icon: "fa-calendar-alt",
      rules: [
        {
          type: "required",
          message: "Trường bắt buộc",
        },
      ],
    },

    {
      tag: "input",
      type: "number",
      name: "verify_code",
      id: "verify_code",
      label: "Số CMND/CCCD [ Nếu có ]",
      icon: "fa-id-card",
      // rules: [
      // 	{
      // 		type: "required",
      // 		message: "Trường bắt buộc"
      // 	}
      // ],
    },
    {
      tag: "select-multi",
      name: "rank",
      id: "rank",
      label: "Hạng bằng lái [ có thể chọn nhiều ]",
      // rules: [
      // 	{
      // 		type: "required",
      // 		message: "Trường bắt buộc"
      // 	}
      // ],
      options: [
        { value: "C", text: "Hạng C" },
        { value: "D", text: "Hạng D" },
        { value: "E", text: "Hạng E" },
        { value: "FB2", text: "Hạng FB2" },
        { value: "FC", text: "Hạng FC" },
        { value: "FD", text: "Hạng FD" },
        { value: "FE", text: "Hạng FE" },
        { value: "A", text: "Hạng A" },
        { value: "B", text: "Hạng B" },
      ],
    },
    {
      tag: "input",
      type: "file",
      upload: "image/*",
      name: "licence_code_image",
      id: "licence_code_image",
      label: "Hình chụp bằng lái phương tiện [ Mặt trước ]",
      icon: "fa-image",
      note: "[ Hình chụp bằng lái sẽ được dùng để xác minh tài xế ]",
      // rules: [
      // 	{
      // 		type: "required",
      // 		message: "Trường bắt buộc"
      // 	}
      // ],
    },

    {
      tag: "input",
      type: "number",
      name: "phone",
      id: "phone",
      label: "Số điện thoại",
      icon: "fa-phone",
      rules: [
        {
          type: "required",
          message: "Trường bắt buộc",
        },
      ],
    },
    {
      tag: "input",
      type: "text",
      name: "email",
      id: "email",
      label: "@gmail.com",
      icon: "fa-envelope",
      rules: [
        {
          type: "required",
          message: "email không hợp lệ",
        },
      ],
    },
    {
      tag: "select",
      name: "vehicle",
      id: "vehicle",
      label: "Phương tiện làm việc",
      icon: "fa-paper-plane",
      rules: [
        {
          type: "required",
          message: "Trường bắt buộc",
        },
      ],
      note: "Những xe tích truyền hình ảnh về Tổng Cục Đường Bộ yêu cầu tài xế và xe phải được xác minh mới được gán thông tin với nhau",
      options: [
        { value: "63U87639", text: "63U87639" },
        { value: "43J43434", text: "63U87639" },
        { value: "34L23232", text: "63U87639" },
      ],
    },
  ],
};
