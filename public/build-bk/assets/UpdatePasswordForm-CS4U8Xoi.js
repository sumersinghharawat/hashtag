import{r as i,W as v,j as s}from"./app-Dua9E37O.js";import{I as n}from"./InputError-ByHvJBQW.js";import{I as d}from"./InputLabel-CKWKhzbh.js";import{P as g}from"./PrimaryButton-HjmmXOXh.js";import{T as c}from"./TextInput-DGpXq45j.js";import{q as _}from"./transition-DG8urZhM.js";function S({className:m="",profileUser:w=null}){const p=i.useRef(),l=i.useRef(),{data:e,setData:a,errors:o,put:f,reset:t,processing:x,recentlySuccessful:j}=v({current_password:"",password:"",password_confirmation:""}),h=r=>{r.preventDefault(),f(route("password.update"),{preserveScroll:!0,onSuccess:()=>t(),onError:u=>{u.password&&(t("password","password_confirmation"),p.current.focus()),u.current_password&&(t("current_password"),l.current.focus())}})};return s.jsxs("section",{className:m,children:[s.jsxs("header",{children:[s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Update Password"}),s.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Ensure your account is using a long, random password to stay secure."})]}),s.jsxs("form",{onSubmit:h,className:"mt-6 space-y-6",children:[w.roles[0]==="founder"&&s.jsxs("div",{children:[s.jsx(d,{htmlFor:"current_password",value:"Current Password"}),s.jsx(c,{id:"current_password",ref:l,value:e.current_password,onChange:r=>a("current_password",r.target.value),type:"password",className:"block w-full mt-1",autoComplete:"current-password"}),s.jsx(n,{message:o.current_password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(d,{htmlFor:"password",value:"New Password"}),s.jsx(c,{id:"password",ref:p,value:e.password,onChange:r=>a("password",r.target.value),type:"password",className:"block w-full mt-1",autoComplete:"new-password"}),s.jsx(n,{message:o.password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(d,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(c,{id:"password_confirmation",value:e.password_confirmation,onChange:r=>a("password_confirmation",r.target.value),type:"password",className:"block w-full mt-1",autoComplete:"new-password"}),s.jsx(n,{message:o.password_confirmation,className:"mt-2"})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(g,{disabled:x,children:"Save"}),s.jsx(_,{show:j,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{S as default};