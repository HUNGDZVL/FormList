let dialog = {
  header: {
    title: "Cáº­p nháº­t Doanh nghiá»‡p",
  },

  content: [
    {
      tag: "input",

      type: "hidden",

      name: "id_up",

      disabled: true,

      id: "id_up",
    },

    {
      tag: "select",

      name: "type_company_up",

      id: "type_company_up",

      label: "KhÃ¡ch hÃ ng lÃ ",

      icon: "fa-tags",

      rules: [
        {
          type: "required",

          message: "TrÆ°á»ng báº¯t buá»™c",
        },
      ],

      options: [{ value: "63U87639", text: "63U87639" }],
    },

    {
      tag: "select",

      name: "parent_id_up",

      id: "parent_id_up",

      label: "Quáº£n lÃ½ bá»Ÿi",

      icon: "fa-tags",

      // rules: [

      //   {

      // 	type: "required",

      // 	message: "TrÆ°á»ng báº¯t buá»™c"

      //   }

      // ],

      options: [],
    },

    {
      tag: "input",

      name: "shortname_up",

      id: "shortname_up",

      label: "TÃªn khÃ¡ch hÃ ng",

      icon: "fa-address-card",

      rules: [
        {
          type: "required",

          message: "TrÆ°á»ng báº¯t buá»™c",
        },
      ],
    },

    {
      tag: "input",

      name: "fullname_up",

      id: "fullname_up",

      label: "TÃªn Ä‘áº§y Ä‘á»§",

      icon: "fa-address-card",
    },

    {
      tag: "input",

      name: "address_up",

      id: "address_up",

      label: "Äá»‹a chá»‰",

      icon: "fa-map-marked-alt",
    },

    {
      tag: "input",

      name: "website_up",

      id: "website_up",

      label: "Website",

      icon: "fa-pager",
    },

    {
      tag: "input",

      type: "number",

      name: "hotline_up",

      id: "hotline_up",

      label: "Sá»‘ Ä‘iá»‡n thoáº¡i",

      icon: "fa-phone",
    },

    {
      tag: "input",

      name: "taxcode_up",

      id: "taxcode_up",

      label: "MÃ£ sá»‘ thuáº¿",

      icon: "fa-id-card-alt",
    },

    {
      tag: "input",

      name: "email_up",

      id: "email_up",

      label: "Email",

      icon: "fa-envelope-square",
    },

    {
      tag: "select",

      name: "active_up",

      id: "active_up",

      label: "Tráº¡ng thÃ¡i",

      icon: "fa-star",

      rules: [
        {
          type: "required",

          message: "TrÆ°á»ng báº¯t buá»™c",
        },
      ],

      options: [
        { value: "63U87639", text: "63U87639" },
        { value: "43J43434", text: "63U87639" },
        { value: "34L23232", text: "63U87639" },
      ],
    },
  ],
};
