const HARDCODED_SCHEMA_LIST =
 [
  {
    "id": 131,
    "name": "RECONCILIATION",
    "time_created": "2025-04-20T11:36:03.602674Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "مفاصاحساب",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "TYPE & '_' & GET_DATE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 66,
    "name": "INSTALLMENTS",
    "time_created": "2024-07-20T08:05:59.402644Z",
    "time_updated": "2025-07-19T10:23:38.525443Z",
    "description": "اقساط",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "NUM & '_' & DATE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 25,
    "name": "STACKHOLDERS_ATTACH",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": "2025-02-21T07:10:55.918747Z",
    "description": "پیوست ها",
    "meta": {
      "apps": [],
      "isBase": true,
      "displayField": "TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 27,
    "name": "STACKHOLDER_AUTHSIGN",
    "time_created": "2024-06-12T12:12:39.624658Z",
    "time_updated": "2025-08-04T13:10:20.691109Z",
    "description": "صاحبان امضای مجاز",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 152,
    "name": "PERSON_OTHER",
    "time_created": "2025-05-13T06:08:10.595212Z",
    "time_updated": null,
    "description": "شخصیت مرتبط",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "PERSON_NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 153,
    "name": "PERSON_RELATION",
    "time_created": "2025-05-13T06:13:48.325945Z",
    "time_updated": null,
    "description": "شخصیت مرتبط",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "PERSON_RELATION_NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 151,
    "name": "CORR_REF",
    "time_created": "2025-05-13T06:06:09.651842Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "مرجع نامه",
    "meta": {
      "apps": [
        "correspondance"
      ],
      "isBase": true,
      "displayField": "id",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 130,
    "name": "PROPERTY",
    "time_created": "2025-04-20T11:34:34.112628Z",
    "time_updated": "2025-07-19T10:23:38.525443Z",
    "description": "مدیریت املاک",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "DELIVERY_DATE & '_' & TOTAL_AMNT",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 72,
    "name": "INVOICE_TYPE",
    "time_created": "2024-07-21T11:31:08.584027Z",
    "time_updated": "2025-05-26T10:40:48.831624Z",
    "description": "انواع صورت وضعیت",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "TITLE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 155,
    "name": "MOM",
    "time_created": "2025-05-14T05:12:13.328446Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "صورتجلسات",
    "meta": {
      "apps": [
        "correspondance"
      ],
      "isBase": false,
      "displayField": "SUBJECT & '_' & $jalali(DATE)",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 51,
    "name": "CONTRACT",
    "time_created": "2024-07-09T11:12:51.021993Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "قرارداد",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": false,
      "displayField": "TITLE & '_' & NO_CONTR",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 172,
    "name": "CBT_HS_C007_BASE",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": null,
    "description": "HSE چک لیست ",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": true,
      "displayField": "TITLE_ITEM",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 170,
    "name": "CAT_INC_HSE",
    "time_created": "2025-08-30T07:12:17.195126Z",
    "time_updated": "2025-10-20T13:39:52.283436Z",
    "description": "دسته بندی سانحه",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": true,
      "displayField": "LABEL",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 79,
    "name": "PRICE_LIST_PRICE",
    "time_created": "2024-07-27T09:46:21.104152Z",
    "time_updated": "2024-11-02T09:55:06.970706Z",
    "description": "قیمت فهرست بها",
    "meta": {
      "apps": [],
      "isBase": false,
      "displayField": "CODE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 162,
    "name": "RECIEVE_IT",
    "time_created": "2025-05-25T06:56:34.960877Z",
    "time_updated": null,
    "description": "دریافت/پرداخت انفورماتیک",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "REC_FOR & '_' & REC_TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 125,
    "name": "INSURANCE_EXT",
    "time_created": "2025-02-16T07:54:40.546760Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "تمدید بیمه تامین اجتماعی",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "DATE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 74,
    "name": "INVOICE",
    "time_created": "2024-07-22T06:00:44.754907Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "صورت وضعیت",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "NUM & '_' & $jalali(DATE_SENT_CONTRACTOR)",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 166,
    "name": "ITEM_HSE",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": "2025-10-20T13:39:52.283436Z",
    "description": "HSE آیتم ",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": true,
      "displayField": "SUBJECT",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 46,
    "name": "STACKHOLDER",
    "time_created": "2024-07-09T08:25:09.914636Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "ذینفعان",
    "meta": {
      "apps": [],
      "isBase": false,
      "displayField": "PERSON_NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 163,
    "name": "WARNING_HSE",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": "2025-10-20T13:39:52.283436Z",
    "description": "هشدار",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": false,
      "displayField": "TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 173,
    "name": "CBT_HS_C007",
    "time_created": "2025-08-30T07:12:17.195126Z",
    "time_updated": null,
    "description": "چک لیست بازرسی آشپزخانه",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": false,
      "displayField": "DATE_CREATED",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 157,
    "name": "GUESTS",
    "time_created": "2025-05-21T05:32:04.593827Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "مدعوین",
    "meta": {
      "apps": [
        "correspondance"
      ],
      "isBase": true,
      "displayField": "NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 102,
    "name": "GUARANTEES",
    "time_created": "2025-02-15T10:46:19.294042Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "تضامین",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "'تاریخ اعتبار :' & $jalali(VALIDITY_DATE)",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 148,
    "name": "RESPONSIBLE",
    "time_created": "2025-05-03T10:18:24.860720Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "مسئول پروژه",
    "meta": {
      "apps": [
        "project"
      ],
      "isBase": true,
      "displayField": "PERSON",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 156,
    "name": "ADDENDUM",
    "time_created": "2025-05-19T07:24:01.524016Z",
    "time_updated": "2025-07-19T10:23:38.525443Z",
    "description": "متمم/الحاقیه",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "TITLE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 167,
    "name": "RECEIVE_IT",
    "time_created": "2025-08-30T07:12:17.195126Z",
    "time_updated": null,
    "description": "دریافت/پرداخت انفورماتیک",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "REC_FOR & '_' & REC_TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 154,
    "name": "CORRESPONDANCE",
    "time_created": "2025-05-13T06:22:43.904735Z",
    "time_updated": "2025-08-27T06:58:00.211929Z",
    "description": "مکاتبات",
    "meta": {
      "apps": [
        "correspondance"
      ],
      "isBase": false,
      "displayField": "SUBJECT & '-' & SYSTEM_NO_RECORD",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 26,
    "name": "STACKHOLDER_DEGREE",
    "time_created": "2024-06-12T12:12:26.400509Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "مدارک تحصیلی",
    "meta": {
      "apps": [],
      "isBase": true,
      "displayField": "DGREE_TITLE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 78,
    "name": "PRICE_LIST_DES",
    "time_created": "2024-07-27T09:39:59.564068Z",
    "time_updated": "2024-11-02T09:55:06.970706Z",
    "description": "شرح فهرست بها",
    "meta": {
      "apps": [],
      "isBase": true,
      "displayField": "TITLE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 42,
    "name": "PROJECT",
    "time_created": "2024-06-15T12:32:23.584567Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "پروژه",
    "meta": {
      "apps": [
        "project"
      ],
      "isBase": false,
      "displayField": "NAME",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 48,
    "name": "PREPAYMENT",
    "time_created": "2024-07-09T10:56:22.253094Z",
    "time_updated": "2025-08-04T13:10:20.691109Z",
    "description": "پیش پرداخت",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "'(' & NO_INSTLL & ')'&'-' & INSTLL_AMNT[0].IRR",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 159,
    "name": "FACTOR",
    "time_created": "2025-06-01T11:37:51.758484Z",
    "time_updated": "2025-08-06T11:36:01.247309Z",
    "description": "فاکتور",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": " $jalali(SENT_DATE) &'-'& FACTOR_NO ",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 150,
    "name": "CORR_ATTACH",
    "time_created": "2025-05-13T06:05:17.632358Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "پیوست مستندات",
    "meta": {
      "apps": [
        "correspondance"
      ],
      "isBase": true,
      "displayField": "id",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 158,
    "name": "RECEIVE",
    "time_created": "2025-05-25T06:56:34.960877Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "دریافت/پرداخت",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "REC_FOR & '_' & REC_TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 101,
    "name": "GUARANTEE_EXT",
    "time_created": "2025-02-15T10:40:57.889761Z",
    "time_updated": "2025-07-19T10:23:38.525443Z",
    "description": "تمدید ضمانت نامه",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "DATE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 128,
    "name": "ADJUSTMENT",
    "time_created": "2025-04-20T11:19:09.199570Z",
    "time_updated": "2025-07-19T10:23:38.525443Z",
    "description": "تعدیل",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "ADJ_TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 168,
    "name": "INCIDENT_HSE",
    "time_created": "2025-08-30T07:12:17.195126Z",
    "time_updated": "2025-10-25T11:06:12.489399Z",
    "description": "سانحه",
    "meta": {
      "apps": [
        "HSE"
      ],
      "isBase": false,
      "displayField": "TYPE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 160,
    "name": "CONTRACT_IT",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": "2025-12-01T11:56:30.598037Z",
    "description": "قرارداد انفورماتیک",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": false,
      "displayField": "TITLE & '_' & NO_CONTR",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 129,
    "name": "DELIVERY",
    "time_created": "2025-04-20T11:25:38.687844Z",
    "time_updated": "2025-07-26T14:23:28.941848Z",
    "description": "تحویل",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "Type & '_' & DATE",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 161,
    "name": "INVOICE_IT",
    "time_created": "2024-06-12T12:12:17.101067Z",
    "time_updated": "2025-08-20T12:12:33.285941Z",
    "description": "صورت وضعیت انفورماتیک",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "NUM & '_' & $jalali(UNTIL_FUNC_DATE) & '_' & (SUM_CNFRMED_EMPLYR =null ? 0 : SUM_CNFRMED_EMPLYR.amount)",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  },
  {
    "id": 126,
    "name": "INSURANCE",
    "time_created": "2025-02-16T08:04:20.975285Z",
    "time_updated": "2025-08-27T09:47:07.924667Z",
    "description": "بیمه تامین اجتماعی",
    "meta": {
      "apps": [
        "contract"
      ],
      "isBase": true,
      "displayField": "CONTR_ROW",
      "recursive": false
    },
    "created_user": "Roozbeh Amidi"
  }
]

export default HARDCODED_SCHEMA_LIST