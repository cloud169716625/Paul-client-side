import {
  Dashboard,
  Billing,
  CategoryBox,
  Products,
  Settings,
  Support,
} from "icons";
import { checkModule } from "lib/checkModule";
import { useSelector } from "react-redux";

export const useSidebarData = () => {
  // Ticket Departments Dynamically Being Done Below
  const isAdmin = useSelector(
    (state) => state?.auth?.user?.userRolesResponse?.userRoles
  );
  const isSuperAdmin = isAdmin && isAdmin[1]?.enabled;
  const { userModules } = useSelector((state) => state?.modules);
  const { data } = useSelector((state) => state?.count);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );

  const findModule = (moduleName) =>
    checkModule({ modules: userModules, module: moduleName })?.permissions
      ?.View;
  // Side Bar Data
  const sidebarData = [
    {
      name: "Dashboard",
      module: "Dashboard",
      path: "/client/dashboard",
      show: findModule("Dashboard"),
      icon: (fill) => <Dashboard fill={fill} />,
    },
    {
      name: "Products / Services",
      show: findModule("Products"),
      path: "/client/dashboard/products",
      showTop: false,
      showDropdown: true,
      icon: (fill) => <Products fill={fill} />,
      module: "Products",
      subLinks: [
        {
          name: "Active",
          show: true,
          showTop: false,
          showSide: true,
          count: data?.active >= 0 ? data?.active : null,
          badgeClass: 'bg-[#1C3238] text-[#0BB783]',
          path: "/client/dashboard/products/active",
        },
        {
          name: "Pending",
          show: true,
          showTop: false,
          showSide: true,
          count: data?.pending >=  0 ? data?.pending : null,
          badgeClass: 'bg-[#3A2434] text-[#FFA800]',
          path: "/client/dashboard/products/pending",
        },
        {
          name: "Suspended",
          show: true,
          showTop: false,
          showSide: true,
          count: data?.suspended >=  0 ? data?.suspended : null,
          badgeClass: 'bg-[#3A2434] text-[#F64E60]',
          path: "/client/dashboard/products/suspended",
        },
        {
          name: "Show Cancelled Services",
          show: true,
          showTop: false,
          showSide: true,
          path: "/client/dashboard/products/showcancelled",
        },
        {
          name: "Cancelled",
          show: true,
          showTop: false,
          showSide: true,
          count: data?.cancelled >= 0 ? data?.cancelled : null,
          badgeClass: 'bg-[#323248] text-[#FFFFFF]',
          path: "/client/dashboard/products/cancelled",
        },
      ],
    },
    {
      name: "Orders",
      path: "/client/dashboard/orders",
      count: isSuperAdmin && null,
      show: findModule("Orders"),
      showTop: true,
      showSide: false,
      showDropdown: true,
      icon: (fill) => <CategoryBox fill={fill} />,
    },
    {
      name: "Billing",
      module: "Billing",
      path: "/client/dashboard/billing",
      show: findModule("Orders"),
      count: null,
      icon: (fill) => <Billing fill={fill} />,
      subLinks: [
        {
          name: "Clients",
          count: null,
          path: "/client/dashboard/billing/clients",
          show: findModule("Clients"),
          showDropdown: true,
          showTop: true,
          showSide: false,
        },
        {
          name: "Invoices",
          show: findModule("Invoices"),
          path: "/client/dashboard/billing/invoices",
          showDropdown: true,
          showTop: true,
          showSide: false,
        },
        {
          name: "WHMCS Import Tool",
          show: findModule("WHMCS"),
          showTop: true,
          showSide: false,
          path: "/client/dashboard/billing/WHMCS-import",
        },
        {
          name: "Logs",
          path: "/client/dashboard/billing/logs",
          show: findModule("Logs"),
          showDropdown: true,
          showTop: true,
          showSide: false,
          subLinks: [
            { name: "Logs", path: "/client/dashboard/billing/logs" },
            { name: "Gateway Logs", path: "#" },
          ],
        },
        {
          name: "WebHooks",
          count: null,
          show: findModule("WebHooks"),
          path: "/client/dashboard/billing/webhooks",
        },
      ],
    },
    {
      name: "Support",
      module: "Support",
      count: null,
      show: true,
      showTop: true,
      showSide: false,
      path: "/client/dashboard/support",
      icon: (fill) => <Support fill={fill} />,
      subLinks:[
        {
          name: "Knowledge Base",
          module: "KnowledgeBase",
          show: true,
          showTop: true,
          showSide: false,
          count:
            data?.knowledgeBase?.ReviewedCount > 0
              ? data?.knowledgeBase?.ReviewedCount
              : null,
          path: "/client/dashboard/support/knowledge-base",
          icon: (fill) => <Support fill={fill} />,
          subLinks: [
            {
              name: "Articles",
              count: data?.articlesCount > 0 ? data?.articlesCount : null,
              path: "/client/dashboard/support/knowledge-base/articles",
              show: true,
              showTop: true,
              showSide: false,
              subLinks: [
                {
                  name: "Add New Article",
                  path: "/client/dashboard/support/knowledge-base/articles/add/new",
                },
              ],
            },
          ],
        },
        {
          name: "Support Tickets",
          module: "SupportTicket",
          show: true,
          showTop: true,
          showSide: false,
          path: "/client/dashboard/support/tickets",
          icon: (fill) => <Support fill={fill} />,
        }
      ]
    },
    {
      name: "Settings",
      show: findModule("Settings"),
      module: "Settings",
      path: "/client/dashboard/settings",
      icon: (fill) => <Settings fill={fill} />,
    }
  ];

  return departmentsLoading ? [] : sidebarData;
};
