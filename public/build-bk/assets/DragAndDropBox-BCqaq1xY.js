import{r as l,W as H,j as e}from"./app-Dua9E37O.js";import{I as $}from"./InputError-ByHvJBQW.js";import{F as q,i as z}from"./index-DB2y4TTu.js";import{M as G}from"./Modal-BH2AXVDb.js";import"./TextInput-DGpXq45j.js";import{S as J}from"./SecondaryButton-CWqNjcUs.js";import{D as K}from"./DangerButton-CY9V5gMY.js";const w="/build/assets/file-icon-CF0IduWB.svg",se=({company_info:o,document_type:c,uploaded_document_file:f,uploaded_document_file_name:h,founder_id:r,updatedocument:p,upload_status:i=!0})=>{const[x,g]=l.useState(!1),[v,N]=l.useState(f),[j,C]=l.useState(h),{data:n,setData:m,post:S,errors:k,progress:I,processing:U,preserveScroll:L,delete:T}=H({document_type:c||"",company_id:o?o.id:"",document_file:null,founder_id:r||0});l.useEffect(()=>{N(f),C(h),n.document_type=c,n.founder_id=r||0,n.company_id=o.id});const[D,y]=l.useState(I),[B,b]=l.useState(!1),d=l.useRef(null),R=s=>{s.preventDefault()},E=s=>{s.preventDefault();const t=s.dataTransfer.files[0];if(t){const a=new DataTransfer;a.items.add(t),d.current.files=a.files,F(s)}},M=s=>{s.target.files[0]&&F(s)},O=s=>{x||d.current.click()},F=async s=>{const t=d.current.files[0];if(t)try{n.document_file=t,await A(s)}catch(a){console.error(a)}},A=async s=>{b(!0);try{await S(route("founder.dashboard.upload-document",o.id),{preserveScroll:s.target,onUploadProgress:t=>{const a=Math.round(t.loaded*100/t.total);y(a)},onFinish:()=>{m("founder_id",r||0),m("company_id",o.id),m("document_type",c)}})}catch(t){console.error("Error during file upload:",t)}finally{console.log(n),b(!1),y(0),p()}},P=s=>{g(!0)},W=s=>{s.preventDefault(),T(route("founder.dashboard.upload-documentdelete",{id:o.id,document_type:c,founder_id:r||0}),{preserveScroll:s.target,onSuccess:()=>{console.log(n),p(),u()}})},u=()=>{g(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-black text-md",children:"Upload File"}),e.jsxs("div",{className:"flex items-center justify-center w-full h-auto bg-white border border-gray-600 border-dashed rounded cursor-pointer drop-box",onDragOver:s=>i?R(s):{},onDrop:s=>i?E(s):{},onClick:s=>i?O():{},children:[e.jsx("input",{type:"file",onChange:s=>M(s),style:{display:"none"},ref:d,disabled:!i}),j?e.jsxs("div",{className:"flex items-center justify-between w-full gap-2 p-14",children:[e.jsxs("a",{href:v,className:"flex items-center gap-2",target:"_blank",children:[e.jsx("img",{src:w,alt:"File Icon",style:{height:40,width:40}}),e.jsx("span",{children:j})]}),i?e.jsx(q,{icon:z,className:"w-3 h-3 p-1 text-white bg-red-600 border rounded-full cursor-pointer",onClick:s=>{s.stopPropagation(),P()}}):e.jsx(e.Fragment,{})]}):e.jsxs("div",{className:"flex flex-col items-center justify-center p-8 text-center",children:[e.jsx("img",{src:w,alt:"File Icon",style:{height:40,width:40}}),e.jsx("h3",{children:"Drag & Drop Here"}),e.jsx("h3",{children:"Or"}),e.jsx("span",{className:"font-bold text-primary",children:"Browse"})]}),B&&e.jsxs("div",{style:{marginTop:"10px",width:"100%"},children:[e.jsx("div",{style:{width:"100%",backgroundColor:"#f3f3f3",borderRadius:"5px"},children:e.jsx("div",{style:{width:`${D}%`,height:"20px",backgroundColor:"#4caf50",borderRadius:"5px",transition:"width 0.5s"}})}),e.jsxs("p",{children:[D,"%"]})]})]}),e.jsx($,{message:k.document_file,className:"mt-2"})]}),e.jsx(G,{show:x,onClose:u,children:e.jsxs("form",{onSubmit:W,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to document?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once you deleted, Document delete permanently from us."}),e.jsxs("div",{className:"flex justify-end mt-6",children:[e.jsx(J,{onClick:u,children:"Cancel"}),e.jsx(K,{className:"rounded-full ms-3",disabled:U,children:"Delete Document"})]})]})})]})};export{se as D};