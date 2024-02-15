import TextInput from "@/Components/TextInput";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function FoundersList ({founderSplitList,updateSplit,updateManager}) {


    return (<><div className="p-4 rounded-lg">
    <table className="w-full table-auto">
        <thead>
            <tr>
                <th align="start">Name</th>
                <th>Split</th>
                <th>Manager</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {founderSplitList.map((element,index)=>{
        return <tr key={index} className="border rounded">
                    <td className="p-2">{element.first_name +" "+ element.last_name}</td>
                    <td  align="center" className="p-2">
                        <TextInput
                            type="number"
                            id={"split-"+element.id}
                            name={"split_["+element.id+"]"}
                            value={element.ownership_percentage}
                            className="w-20"
                            autoComplete="split"
                            placeholder='Split'
                            isFocused={false}
                            onChange={(e) => updateSplit(element.id, e.target.value)}
                        /><span className="p-3">%</span>
                    </td>
                    <td align="center">
                        <div className="relative flex justify-center gap-x-3">
                            <div className="flex items-center h-6">
                                <input
                                id="manager"
                                name="manager"
                                onChange={(e) => updateManager(element.id)}
                                checked={element.manager}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                    </td>
                    <td align="center">{index!=0?<Link href={route('founder.dasshboard.founderdelete',{'id':element.id})}><FontAwesomeIcon icon={faTrashAlt} /></Link>:<></>}</td>
            </tr>
    })}


        </tbody>
    </table></div></>
    );
};
