import{j as e,d as r}from"./app-Dua9E37O.js";import o from"./Dashboard-DatwvVPW.js";import{S as n}from"./SecondaryButton-CWqNjcUs.js";import"./AuthenticatedLayout-IZYydvq6.js";import"./ApplicationLogo-BgesrP0X.js";import"./ResponsiveNavLink-ByNM-lV1.js";import"./transition-DG8urZhM.js";function f({auth:d,industries:t}){const i=()=>{location.replace(route("admin.dashboard.addindustry"))};return e.jsx(o,{auth:d,children:e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-4",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"flex flex-row",children:e.jsxs("div",{className:"flex flex-col justify-between w-full p-6 border-r-2 border-gray-200",children:[e.jsxs("div",{className:"flex justify-between mb-10",children:[e.jsx("h2",{className:"text-4xl",children:"View Industry"}),e.jsx(n,{onClick:i,children:"Add Industry"})]}),e.jsx("div",{className:"mb-10",children:e.jsx("div",{className:"relative overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Industry Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Edit"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Delete"})]})}),e.jsx("tbody",{children:t.map((s,a)=>e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap",children:s.name}),e.jsx("td",{className:"px-6 py-4",children:e.jsx(r,{href:route("admin.dashboard.editindustry",{id:s.id}),className:"inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25",children:"Edit"})}),e.jsx("td",{className:"px-6 py-4",children:e.jsx(r,{href:route("admin.dashboard.destroyindustry",{id:s.id}),className:"inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25",children:"Remove"})})]},a))})]})})})]})})})})})})}export{f as default};