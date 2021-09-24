export default [
  {
    group: "/dashboards",
    model: false,
    icon: "mdi mdi-gauge",
    title: "Dashboards",
    class: "two-column",
    to: "/theme/dashboards",
    children: [
      {
        icon: "mdi mdi-adjust",
        title: "Analytical",
        to: "/theme/dashboards/analytical",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Classic",
        to: "/theme/dashboards/classic",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Demographical",
        to: "/theme/dashboards/demographical",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Minimal",
        to: "/theme/dashboards/minimal",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Overview",
        to: "/theme/dashboards/overview",
      },
      {
        icon: "mdi mdi-adjust",
        title: "Ecommerce",
        to: "/theme/dashboards/ecommerce",
      },
    ],
  },

  {
    group: "/apps",
    model: false,
    icon: "mdi mdi-widgets",
    title: "Apps",
    to: "/theme/apps",
    children: [
      {
        icon: "mdi mdi-comment-outline",
        title: "Chat",
        to: "/theme/apps/chat",
      },

      {
        icon: "mdi mdi-calendar",
        title: "Calendar",
        to: "/theme/apps/fullcalendar",
      },
      {
        icon: "mdi mdi-shopping",
        title: "Ecommerce-Shop",
        to: "/theme/apps/shop",
      },
      {
        icon: "mdi mdi-phone-classic",
        title: "Contact",
        to: "/theme/apps/contact",
      },
      {
        icon: "mdi mdi-phone",
        title: "Contact List",
        to: "/theme/apps/contact-list",
      },
      {
        icon: "mdi mdi-phone-voip",
        title: "Contact Grid",
        to: "/theme/apps/contact-grid",
      },
      {
        icon: "mdi mdi-email",
        title: "Email",
        to: "/theme/apps/email/inbox",
      },
      {
        icon: "mdi mdi-playlist-plus",
        title: "Todo",
        to: "/theme/apps/email/todo",
      },
    ],
  },

  {
    group: "/uicomponents",
    model: false,
    icon: "mdi mdi-animation",
    title: "Ui",
    extraclass: "mega-dropdown",
    to: "/theme/components",
    children: [
      {
        title: "Alerts",
        icon: "mdi mdi-alert",
        to: "/theme/components/alerts",
      },
      {
        title: "Avatar",
        icon: "mdi mdi-account-circle",
        to: "/theme/components/avatar",
      },
      {
        title: "Badge",
        icon: "mdi mdi-relative-scale",
        to: "/theme/components/badge",
      },
      {
        title: "Banner",
        icon: "mdi mdi-box-shadow",
        to: "/theme/components/banner",
      },
      {
        title: "Appbar",
        icon: "mdi mdi-arrange-bring-to-front",
        to: "/theme/components/appbar",
      },
      {
        title: "Toolbar",
        icon: "mdi mdi-table-column-plus-after",
        to: "/theme/components/toolbar",
      },
      {
        title: "Systembar",
        icon: "mdi mdi-format-float-left",
        to: "/theme/components/systembar",
      },
      {
        title: "Bottom Navigation",
        icon: "mdi mdi-border-bottom",
        to: "/theme/components/bottomnavigation",
      },
      {
        title: "Bottomsheet",
        icon: "mdi mdi-format-wrap-top-bottom",
        to: "/theme/components/bottomsheet",
      },
      {
        title: "Breadcrumb",
        icon: "mdi mdi-equal",
        to: "/theme/components/breadcrumb",
      },
      {
        title: "Buttons",
        icon: "mdi mdi-toggle-switch",
        to: "/theme/components/buttons",
      },
      {
        title: "Fab",
        icon: "mdi mdi-react",
        to: "/theme/components/fab",
      },
      {
        title: "Cards",
        icon: "mdi mdi-cards-outline",
        to: "/theme/components/cards",
      },
      {
        title: "Carousel",
        icon: "mdi mdi-view-carousel",
        to: "/theme/components/carousel",
      },
      {
        title: "Chips",
        icon: "mdi mdi-checkbox-multiple-blank-outline",
        to: "/theme/components/chips",
      },
      {
        title: "Dialogs",
        icon: "mdi mdi-tablet",
        to: "/theme/components/dialogs",
      },
      {
        title: "Dividers",
        icon: "mdi mdi-bandcamp",
        to: "/theme/components/dividers",
      },
      {
        title: "Expansion Panel",
        icon: "mdi mdi-credit-card-multiple",
        to: "/theme/components/expansionpanel",
      },
      {
        title: "Footer",
        icon: "mdi mdi-view-agenda",
        to: "/theme/components/footer",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi mdi-window-open",
        to: "/theme/components/overflow-buttons",
      },
      {
        title: "Grids",
        icon: "mdi mdi-grid",
        to: "/theme/components/grids",
      },
      {
        title: "Button Group",
        icon: "mdi mdi-hexagon-multiple",
        to: "/theme/components/button-group",
      },
      {
        title: "Chip Group",
        icon: "mdi mdi-image-filter-vintage",
        to: "/theme/components/chip-group",
      },
      {
        title: "Item Group",
        icon: "mdi mdi-layers",
        to: "/theme/components/item-group",
      },
      {
        title: "List Item Group",
        icon: "mdi mdi-playlist-plus",
        to: "/theme/components/listitem-group",
      },
      {
        title: "Slide Group",
        icon: "mdi mdi-recycle",
        to: "/theme/components/slide-group",
      },
      {
        title: "Windows",
        icon: "mdi mdi-window-maximize",
        to: "/theme/components/windows",
      },
      {
        title: "Hover",
        icon: "mdi mdi-white-balance-sunny",
        to: "/theme/components/hover",
      },
      {
        title: "Icons",
        icon: "mdi mdi-unity",
        to: "/theme/components/icons",
      },
      {
        title: "Images",
        icon: "mdi mdi-image-area",
        to: "/theme/components/images",
      },

      {
        title: "Menus",
        icon: "mdi mdi-launch",
        to: "/theme/components/menus",
      },
      {
        title: "Navigation Drawers",
        icon: "mdi mdi-image-broken-variant",
        to: "/theme/components/navigation-drawers",
      },
      {
        title: "Overlay",
        icon: "mdi mdi-arrange-bring-forward",
        to: "/theme/components/overlay",
      },
      {
        title: "Pagination",
        icon: "mdi mdi-book-open-variant",
        to: "/theme/components/pagination",
      },
      {
        title: "Parallex",
        icon: "mdi mdi-book-plus",
        to: "/theme/components/parallex",
      },
      {
        title: "Color Pickers",
        icon: "mdi mdi-grease-pencil",
        to: "/theme/components/color-pickers",
      },
      {
        title: "Date Pickers",
        icon: "mdi mdi-calendar-multiple",
        to: "/theme/components/date-pickers",
      },
      {
        title: "Time Pickers",
        icon: "mdi mdi-clock-fast",
        to: "/theme/components/time-pickers",
      },
      {
        title: "Progress Circular",
        icon: "mdi mdi-compass",
        to: "/theme/components/progress-circular",
      },
      {
        title: "Progress Linear",
        icon: "mdi mdi-crosshairs",
        to: "/theme/components/progress-linear",
      },
      {
        title: "Rating",
        icon: "mdi mdi-star-circle",
        to: "/theme/components/rating",
      },
      {
        title: "Sheet",
        icon: "mdi mdi-table-large",
        to: "/theme/components/sheet",
      },
      {
        title: "SkeletonLoaders",
        icon: "mdi mdi-television-guide",
        to: "/theme/components/skeleton-loaders",
      },
      {
        title: "Snackbar",
        icon: "mdi mdi-trello",
        to: "/theme/components/snackbar",
      },
      {
        title: "Sparkline",
        icon: "mdi mdi-chart-areaspline",
        to: "/theme/components/sparkline",
      },
      {
        title: "Steppers",
        icon: "mdi mdi-chart-gantt",
        to: "/theme/components/steppers",
      },
      {
        title: "Subheaders",
        icon: "mdi mdi-clipboard-outline",
        to: "/theme/components/subheaders",
      },
      {
        title: "Tabs",
        icon: "mdi mdi-sort-variant",
        to: "/theme/components/tabs",
      },
      {
        title: "Timeline",
        icon: "mdi mdi-clock-end",
        to: "/theme/components/timeline",
      },
      {
        title: "Tooltips",
        icon: "mdi mdi-image-filter-vintage",
        to: "/theme/components/tooltips",
      },
      {
        title: "Treeview",
        icon: "mdi mdi-webhook",
        to: "/theme/components/treeview",
      },
      {
        title: "Colors",
        icon: "mdi mdi-format-color-fill",
        to: "/theme/style-animation/colors",
      },
      {
        title: "Content",
        icon: "mdi mdi-blur-linear",
        to: "/theme/style-animation/content",
      },
      {
        title: "Display",
        icon: "mdi mdi-application",
        to: "/theme/style-animation/display",
      },
      {
        title: "Elevation",
        icon: "mdi mdi-assistant",
        to: "/theme/style-animation/levation",
      },
      {
        title: "Flex",
        icon: "mdi mdi-box-cutter",
        to: "/theme/style-animation/flex",
      },
      {
        title: "Float",
        icon: "mdi mdi-alpha",
        to: "/theme/style-animation/float",
      },
      {
        title: "Spacing",
        icon: "mdi mdi-bridge",
        to: "/theme/style-animation/spacing",
      },
      {
        title: "Text",
        icon: "mdi mdi-bowling",
        to: "/theme/style-animation/text",
      },
      {
        title: "Typography",
        icon: "mdi mdi-sort",
        to: "/theme/style-animation/typography",
      },
      {
        title: "Transitions",
        icon: "mdi mdi-text-shadow",
        to: "/theme/style-animation/transitions",
      },
    ],
  },

  {
    group: "/charts",
    model: false,
    icon: "mdi mdi-chart-bar",
    title: "Charts",
    to: "/theme/charts/apexcharts",
  },

  {
    group: "/form-elements",
    model: false,
    icon: "mdi mdi-collage",
    title: "Forms",
    extraclass: "two-column",
    to: "/theme/form-elements",
    children: [
      {
        title: "Autocompletes",
        icon: "mdi mdi-priority-low",
        to: "/theme/form-elements/feautocompletes",
      },
      {
        title: "Combobox",
        icon: "mdi mdi-rounded-corner",
        to: "/theme/form-elements/fecombobox",
      },
      {
        title: "File Inputs",
        icon: "mdi mdi-select-all",
        to: "/theme/form-elements/fefileinputs",
      },
      {
        title: "Inputs",
        icon: "mdi mdi-shape-plus",
        to: "/theme/form-elements/feinputs",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi mdi-toggle-switch-off",
        to: "/theme/form-elements/feoverflowbuttons",
      },
      {
        title: "Selection Controls",
        icon: "mdi mdi-relative-scale",
        to: "/theme/form-elements/feselectioncontrols",
      },
      {
        title: "Selects",
        icon: "mdi mdi-tab-unselected",
        to: "/theme/form-elements/feselects",
      },
      {
        title: "Sliders",
        icon: "mdi mdi-vector-difference-ba",
        to: "/theme/form-elements/fesliders",
      },
      {
        title: "Textareas",
        icon: "mdi mdi-code-greater-than",
        to: "/theme/form-elements/fetextareas",
      },
      {
        title: "Textfields",
        icon: "mdi mdi-border-vertical",
        to: "/theme/form-elements/fetextfields",
      },

      {
        title: "Form Action",
        icon: "mdi mdi-code-equal",
        to: "/theme/form-layouts/flformaction",
      },
      {
        title: "Form Basic",
        icon: "mdi mdi-content-duplicate",
        to: "/theme/form-layouts/flformbasic",
      },
      {
        title: "Form Wizard",
        icon: "mdi mdi-cube-send",
        to: "/theme/form-layouts/formwizard",
      },
      {
        title: "Form Horizontal",
        icon: "mdi mdi-cards-variant",
        to: "/theme/form-layouts/flformhorizontal",
      },
      {
        title: "Form Validation",
        icon: "mdi mdi-credit-card-scan",
        to: "/theme/form-layouts/formvalidation",
      },
      {
        title: "Drag n Drop",
        icon: "mdi mdi-package-variant-closed",
        to: "/theme/extra-components/dragndrop",
      },
      {
        title: "Lists",
        icon: "mdi mdi-format-list-bulleted-type",
        to: "/theme/components/lists",
      },
    ],
  },

  {
    group: "/tables",
    model: false,
    icon: "mdi mdi-table",
    title: "Tables",
    to: "/theme/tables",
    children: [
      {
        title: "Simple Table",
        icon: "mdi mdi-table",
        to: "/theme/tables/tablesimple",
      },
      {
        title: "Datatable",
        icon: "mdi mdi-table-column-width",
        to: "/theme/tables/tabledatatable",
      },
      {
        title: "Data Iterators",
        icon: "mdi mdi-table-edit",
        to: "/theme/tables/tabledataiterators",
      },
    ],
  },

  {
    group: "/extra",
    model: false,
    icon: "mdi mdi-basket",
    title: "Extra",
    to: "/theme/icons",
    children: [
      {
        title: "Boxed Login",
        icon: "mdi mdi-account-key",
        to: "/theme/authentication/boxedlogin",
      },
      {
        title: "Login",
        icon: "mdi mdi-account-key",
        to: "/theme/authentication/fulllogin",
      },
      {
        title: "Boxed Register",
        icon: "mdi mdi-account-plus",
        to: "/theme/authentication/boxedregister",
      },
      {
        title: "Register",
        icon: "mdi mdi-account-plus",
        to: "/theme/authentication/fullregister",
      },
      {
        title: "Error",
        icon: "mdi mdi-alert-outline",
        to: "/theme/authentication/error",
      },
      {
        title: "Material",
        icon: "mdi mdi-emoticon",
        to: "/theme/icons/materialicons",
      },
      {
        title: "Font Awesome",
        icon: "mdi mdi-emoticon-cool",
        to: "/theme/icons/fontawesomeicons",
      },
      {
        title: "Themify",
        icon: "mdi mdi-chart-bubble",
        to: "/theme/icons/themifyicons",
      },
      {
        title: "Simple line",
        icon: "mdi mdi-image-broken-variant",
        to: "/theme/icons/simplelineicons",
      },
    ],
  },
];
