import{W as _,r as m,j as e}from"./app-Dua9E37O.js";import"./SelectInput-ByoqYoTU.js";import P from"./Dashboard-DatwvVPW.js";import{ApplicationLayout as D}from"./ApplicationLayout-ZYWLnT7R.js";import{M as E}from"./Modal-BH2AXVDb.js";import{I}from"./InputLabel-CKWKhzbh.js";import{T as A}from"./TextareaInput-CxZk8yxh.js";import{I as k}from"./InputError-ByHvJBQW.js";import{S as q}from"./SecondaryButton-CWqNjcUs.js";import{F as n,f as r}from"./index-DB2y4TTu.js";import"./AuthenticatedLayout-IZYydvq6.js";import"./ApplicationLogo-BgesrP0X.js";import"./ResponsiveNavLink-ByNM-lV1.js";import"./transition-DG8urZhM.js";import"./ApplicationHeader-CjB_Va0g.js";import"./index-D8bVqLcy.js";function te({auth:x,company_info:t,children:M}){const{data:a,setData:o,post:U,put:g,processing:N,errors:w,reset:O}=_({application_form_field_id:null,description:null,status:null}),[b,u]=m.useState(!1),[p,v]=m.useState({});m.useEffect(()=>{if(t){const l=(t==null?void 0:t.application_fields)||[],i={};l.forEach(s=>{const{application_form_field_name:y,application_form_field_value:F,id:R,varification_status:S,founder_id:d,agent_id:C,description:V}=s;if(d!=null&&d!=0){const f=d;i[f]=[...i[f]||[],{id:R,name:y,value:F,status:S,founder_id:d,agent_id:C,description:V}]}}),v(i)}},[t]);const j=(l,i)=>{a.status=l,a.application_form_field_id=i,a.description=null,u(!0)},c=()=>{u(!1)},h=l=>{l.preventDefault(),o("description",l.target.value),g(route("admin.dashboard.viewrequestupdate",{id:t.id}),{preserveScroll:!1,onSuccess:()=>{c()}})};return e.jsxs(P,{auth:x.user,children:[e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-4",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"p-10",children:e.jsxs("div",{className:"flex flex-col justify-between px-4 sm:px-0",children:[e.jsxs("div",{className:"w-4/5",children:[e.jsx("h3",{className:"text-base font-semibold leading-7 text-gray-900",children:"Applicant Information"}),e.jsx("p",{className:"max-w-2xl mt-1 text-sm leading-6 text-gray-500",children:"Personal details and application."})]}),e.jsx(D,{company_id:t==null?void 0:t.id,rejected_fields_count:t==null?void 0:t.rejected_fields_count,children:e.jsx("div",{className:"flex flex-col w-full",children:Object.keys(p).map((l,i)=>e.jsxs("div",{children:[e.jsxs("div",{className:"mt-4",children:[e.jsxs("h2",{className:"text-xl font-semibold leading-7 text-gray-900",children:["Shareholder Details ",l]}),e.jsxs("p",{className:"max-w-2xl mt-1 text-sm leading-6 text-gray-500 border-b border-gray-200",children:["Shareholder Name: ",t.founders[i].first_name," ",t.founders[i].last_name]})]}),p[l].map(s=>e.jsxs("div",{className:"flex items-center border-b border-gray-200",children:[e.jsx("div",{className:"flex flex-col w-full",children:s.name=="manager"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Shareholder Role"}),e.jsx("p",{className:"text-md",children:s.value}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="ownership_percentage"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Shareholder Own"}),e.jsxs("p",{className:"text-md",children:[s.value,"%"]}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="Valid Passport Copy"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Valid Passport Copy"}),e.jsx("p",{className:"text-md",children:s.value?e.jsx("a",{href:s.value,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline",children:"View Document"}):"No"}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="UAE Visa Page"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"UAE Visa Page"}),e.jsx("p",{className:"text-md",children:s.value?e.jsx("a",{href:s.value,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline",children:"View Document"}):"No"}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="Address Proof Copy"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Address Proof Copy"}),e.jsx("p",{className:"text-md",children:s.value?e.jsx("a",{href:s.value,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline",children:"View Document"}):"No"}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="visa_status"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Visa Status"}),e.jsx("p",{className:"text-md",children:s.value==1?"Yes":"No"}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):s.name=="Educational Qualification"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:"Educational Qualification"}),e.jsx("p",{className:"text-md",children:s.value?e.jsx("a",{href:s.value,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 underline",children:"View Document"}):"No"}),s.status==="Rejected"?e.jsxs("p",{className:"w-full text-yellow-500",children:[e.jsx(n,{icon:r,className:"w-2 h-2 p-1 text-sm text-white bg-yellow-500 rounded-full"})," ",s.description," "]}):""]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-md",children:s.name}),e.jsx("p",{className:"text-md",children:s.value})]})}),e.jsx("div",{className:"w-1/2",children:e.jsx("div",{className:"flex justify-end gap-2",children:x.user.id!==parseInt(s.agent_id)?e.jsx(e.Fragment,{children:s.status==="Under Review"?e.jsx("p",{className:"px-4 py-2 m-2 text-green-100 rounded-lg bg-yellow-500",children:s.status}):e.jsx("p",{className:"px-4 py-2 m-2 text-green-100 rounded-lg"+(s.status==="Verified"?" bg-green-600":" bg-red-600"),children:s.status})}):e.jsx(e.Fragment,{children:s.status==="Under Review"?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"px-4 py-2 m-2 text-green-100 bg-green-600 rounded-lg",onClick:()=>j("Verified",s.id),children:"Confirm"}),e.jsx("button",{className:"px-4 py-2 m-2 text-red-100 bg-red-600 rounded-lg",onClick:()=>j("Rejected",s.id),children:"Rejected"})]}):e.jsx("p",{className:"px-4 py-2 m-2 text-green-100 rounded-lg"+(s.status==="Verified"?" bg-green-600":" bg-red-600"),children:s.status})})})})]},s.id))]},l))})})]})})})})}),e.jsx(E,{show:b,onClose:c,children:e.jsxs("form",{onSubmit:h,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to change the status?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:a.status=="Verified"?"Please confirm that you want to approve this request.":"Please enter your reason to reject this request."}),a.status=="Rejected"?e.jsxs("div",{className:"mt-6",children:[e.jsx(I,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(A,{id:"description",name:"description",value:a.description?a.description:"",onChange:l=>o("description",l.target.value),required:!0,autoFocus:!0,className:"block w-full mt-1",autoComplete:"current-description",placeholder:"Description"}),e.jsx(k,{message:w.company_status,className:"mt-2"})]}):e.jsx(e.Fragment,{}),e.jsxs("div",{className:"flex justify-end mt-6",children:[e.jsx(q,{onClick:c,children:"Cancel"}),e.jsx("button",{className:"ms-3 py-4 px-6 rounded-full text-white "+(a.status=="Rejected"?"bg-red-600":"bg-secondary"),disabled:N,children:a.status})]})]})})]})}export{te as default};