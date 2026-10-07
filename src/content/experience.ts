import type { Role } from "./types";

// CONTENT.md > Experience, verbatim. Bullet 1 of each role is its one-line summary on Work.
export const roles: readonly Role[] = [
  {
    id: "ezsoft-2025",
    title: "Full Stack Engineer",
    org: "EZ Consultants & ERP Solutions (EZsoft)",
    dates: "March 2025 to present",
    place: "Remote (Islamabad-based software house serving clients internationally)",
    bullets: [
      "Build and maintain EZsoft, a multi-tenant ERP web platform across finance, HR, payroll, sales, stock and POS modules.",
      "Own features end to end: requirements from clients and implementation staff, data model and stored procedures, MVC controllers, front-end screens and production deployment.",
      "Build responsive screens with HTML, CSS, JavaScript, jQuery, Bootstrap and Razor views.",
      "Used AI-assisted development to replace hundreds of manually prepared PDF reports with a feature that generates them in a few clicks, delivered in a few days.",
      "Resolve issues within a four-hour response target; handled 10+ urgent out-of-hours production incidents.",
      "Built finance functionality: General Ledger enhancements, accounts payable/receivable reporting and customer invoice templates.",
      "Write and tune T-SQL queries and stored procedures for reporting and period-end processes.",
      "Modernise legacy screens, review work from junior developers and document systems.",
    ],
    stack: [
      "ASP.NET MVC",
      "VB.NET",
      ".NET Framework",
      "SQL Server",
      "T-SQL",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Razor",
      "Git",
      "JIRA",
    ],
  },
  {
    id: "ezsoft-2021",
    title: "Software Developer",
    org: "EZ Consultants & ERP Solutions (EZsoft)",
    dates: "February 2021 to July 2022",
    place: "Islamabad, Pakistan (on-site)",
    bullets: [
      "Junior developer across the full stack of the EZsoft ERP product.",
      "Built and extended screens and database logic for accounts, payroll, inventory, production and export modules.",
      "Wrote SQL queries, views and stored procedures for data entry, validation and reporting.",
      "Fixed bugs and handled day-to-day support requests in a small Agile team.",
    ],
    stack: ["ASP.NET MVC", "VB.NET", "SQL Server", "JavaScript", "jQuery"],
  },
];

export const currentRole = roles[0];
