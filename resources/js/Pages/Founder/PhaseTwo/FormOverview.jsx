import { AddMoreIconCard } from "@/Components/AddMoreIconCard";
import CustomerDashboard from "@/Pages/CustomerDashboard";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { StepFromLayout } from "./Steps/StepFromLayout";
import { VideoEmbed } from "@/Components/VideoEmbed";
import thumbnail from "../../../images/intro-video.jpeg";
import videosrc from "../../../videos/landing-page-video.mp4";
import PrimaryButton from "@/Components/PrimaryButton";
import { Phase2FormDetails } from "@/Layouts/Phase2FormDetails";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import FoundersListPhase2 from "./Steps/FoundersListPhase2";
import { AddFoundersForm } from "./Steps/AddFoundersForm";
export default function FormOverview({ auth, company_info, step, registration_completed_step, foundersList, listindusties, totalSplits, company_count }) {

    const { data, setData, post, put, processing, errors, reset } = useForm({
        company_id: company_info?company_info.id:'',
        company_name_1: company_info?company_info.company_name_1:'',
        company_name_2: company_info?company_info.company_name_2:'',
        company_name_3: company_info?company_info.company_name_3:'',
        company_industry: company_info?company_info.industry:'',
        company_description: company_info.description?company_info.description:'',
        foundersList: foundersList?foundersList:null,
    });

    const [totalSplit, setTotalSplit] = useState(0);
    const [founderSplitList, setFounderSplitList] = useState(foundersList);

    useEffect(() => {

        console.log(listindusties);
        setData('company_industry',company_info.industry?company_info.industry:'');

        var founderTotalSplit = 0;

        const updatedFoundersList = foundersList.map(obj => {
            if (obj.ownership_percentage === null) {
                obj = { ...obj, ownership_percentage: 0 };
                return obj;
            }
            return obj;
        });
        var totalSplitsNumber = parseInt(totalSplits);
        setTotalSplit(totalSplitsNumber);

        setFounderSplitList(updatedFoundersList);

    }, [company_info]);

    const CheckIndustryName = (e) => {
        const options = Array.from(listindusties).map((option) =>
            option.name.toLowerCase()
        );

        if (!options.includes(e.target.value.toLowerCase())) {
            errors.company_industry = 'Please choose a browser from the list.';
            setData('company_industry', e.target.value);
        } else {
            errors.company_industry = '';
            setData('company_industry', e.target.value);
        }
    }

    const handleSaveAndContinue = () => {
        put(route('founder.dashboard.review-registrationstore', company_info.id));
    }

    const updateSplit = (id, newValue) => {

        if (newValue < 0) {
            return 0;
        }

        var founderTotalSplit = 0;
        const updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {

                obj = { ...obj, ownership_percentage: parseInt(newValue) }
                founderTotalSplit = parseInt(founderTotalSplit?founderTotalSplit:0) + parseInt((obj.ownership_percentage)?(obj.ownership_percentage):0);
                return obj;
            }
            founderTotalSplit = parseInt(founderTotalSplit?founderTotalSplit:0) + parseInt((obj.ownership_percentage)?(obj.ownership_percentage):0);
            return obj;
        });

        setTotalSplit(parseInt(founderTotalSplit));

        setFounderSplitList(updatedFoundersList);
        setData('foundersList',updatedFoundersList);
    };


    const updateManager = (id) => {

        const updatedFoundersList = founderSplitList.map(obj => {

            var managerStatus = obj.manager == 'No Manager' ? 'Manager' : 'No Manager';
            if (obj.id === id) {
                obj = { ...obj, manager: managerStatus }
                return obj;
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
        setData('foundersList',updatedFoundersList);
    }



    const updateVisa = (id) => {
        var updatedFoundersList = founderSplitList.map(obj => {
            var visaStatus = obj.visa_status ? 0 : 1;
            if (obj.id === id) {
                obj = { ...obj, visa_status: visaStatus };
            }
            return obj;
        });

        var updatedVisaCount = updatedFoundersList.reduce((count, obj) => count + obj.visa_status, 0);

        setFounderSplitList(updatedFoundersList);
        setData('foundersList',updatedFoundersList);
    }



    const updateFirstName = (value,id) => {
        var updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, first_name: value };
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
        setData('foundersList',updatedFoundersList);
    }



    const updateLastName = (value,id) => {
        var updatedFoundersList = founderSplitList.map(obj => {
            if (obj.id === id) {
                obj = { ...obj, last_name: value };
            }
            return obj;
        });

        setFounderSplitList(updatedFoundersList);
        setData('foundersList',updatedFoundersList);
    }



    return (
        <CustomerDashboard auth={auth} company_count={company_count}>
            <Phase2FormDetails registration_completed_step={registration_completed_step} step={step} name={auth.user.name}>
                <div className="">
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Company Name</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Please enter three name choices for your company in order of preference</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full flex-nowrap">
                            <p className="text-black text-md">Name Your Company</p>
                            <p className="mt-2 rounded-sm col-12 col-md-12">

                                <TextInput
                                    id="company_name"
                                    name="company_name_1"
                                    value={data.company_name_1}
                                    className="block w-full py-4 mt-2 bg-transparent"
                                    autoComplete="company_name"
                                    placeholder='Company Name Preference 1'
                                    isFocused={false}
                                    onChange={(e) => setData('company_name_1', e.target.value)}
                                />

                                <InputError message={errors.company_name_1} className="mt-2" />
                            </p>
                            <p className="mt-2 rounded-sm col-12 col-md-12">

                                <TextInput
                                    id="company_name"
                                    name="company_name_2"
                                    value={data.company_name_2}
                                    className="block w-full py-4 mt-2 bg-transparent"
                                    autoComplete="company_name"
                                    placeholder='Company Name Preference 2'
                                    isFocused={false}
                                    onChange={(e) => setData('company_name_2', e.target.value)}
                                />

                                <InputError message={errors.company_name_2} className="mt-2" />
                            </p>
                            <p className="mt-2 rounded-sm col-12 col-md-12">

                                <TextInput
                                    id="company_name"
                                    name="company_name_3"
                                    value={data.company_name_3}
                                    className="block w-full py-4 mt-2 bg-transparent"
                                    autoComplete="company_name"
                                    placeholder='Company Name Preference 3'
                                    isFocused={false}
                                    onChange={(e) => setData('company_name_3', e.target.value)}
                                />

                                <InputError message={errors.company_name_3} className="mt-2" />
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-2xl font-extrabold">Company Details</h2>
                            <p className="mt-2 mb-4 text-sm text-gray-500">Please select your industry and enter the description about your company</p>
                        </div>
                        <div className="flex flex-col justify-start w-full h-full">
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-col items-center py-2">
                                    <div className="w-full font-semibold">Company Industry</div>
                                    <div className="w-full">
                                        <select className="block w-full p-4 mt-1 bg-transparent border-gray-300 rounded"
                                        value={data.company_industry}
                                        autoComplete="off"
                                        placeholder='Company Industry'
                                        id="company_description"
                                        name="company_description"
                                        onChange={(e) => CheckIndustryName(e)}
                                        >
                                            {listindusties ? (
                                                listindusties.map((element,index) => {
                                                    return element.name ? (
                                                        <option key={element.name} value={index==0?"":element.name}>
                                                            {element.name}
                                                        </option>
                                                    ) : (
                                                        <></>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </select>


                                        <InputError message={errors.company_industry} className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap py-2">
                                    <div className="w-full font-semibold">Description</div>
                                    <div className="w-full">
                                        <TextareaInput
                                            rows="4"
                                            id="company_description"
                                            name="company_description"
                                            value={data.company_description}
                                            className="block w-full py-4 mt-1 bg-transparent"
                                            autoComplete="company_description"
                                            placeholder='Company Description'
                                            isFocused={false}
                                            onChange={(e) => setData('company_description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-full md:w-3/6">
                                <h2 className="text-2xl font-extrabold">Founders & Ownership</h2>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Enter the legal name of the founders, split the company between the founders and select managers</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="w-full md:w-full">

                                <AddFoundersForm company_info={company_info}/>
                                <div className="flex items-center justify-between pb-4 mt-10">
                                    <p className="font-bold">Split the ownership between the founders</p>
                                    <div className="flex items-center justify-end">
                                        <div className={"w-auto text-center border px-4 rounded" + ((totalSplit == 100) ? " border-green-500 text-green-500 bg-green-200" : " border-red-500 text-red-500 bg-red-200")}>
                                            <span>{totalSplit}% out of 100%</span>
                                        </div>
                                    </div>
                                </div>
                                <FoundersListPhase2 founderSplitList={founderSplitList} updateSplit={updateSplit} updateManager={updateManager} company_id={company_info.id} company_info={company_info}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full py-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-full md:w-3/6">
                                <h2 className="text-2xl font-extrabold">Visa</h2>
                                <p className="mt-2 mb-4 text-sm text-gray-500">Select the founders that require UAE Visa or Emirates ID</p>
                            </div>
                        </div>
                        <div className="w-full mt-2 founder-list">
                            <div className="pb-4 mt-4 rounded-lg">
                                <div className="w-full">
                                    <div className="flex items-center h-16 border-t border-b border-gray-300 md:h-8">
                                        <div className="w-2/3 text-base font-medium">Founder’s Name</div>
                                        <div className="w-1/3 text-base font-medium text-center">Visa / Emirates ID</div>
                                    </div>
                                    {founderSplitList.map((element,index)=>{
                                    return <div key={index} className="flex items-center my-4">
                                            <div className="w-2/3 border-gray-300 rounded">
                                                <p className="flex gap-2 mt-2 rounded-sm col-12 col-md-12">
                                                    <TextInput
                                                        id="first-name"
                                                        name="first-name"
                                                        value={element.first_name}
                                                        className="block w-full py-4 mt-2 bg-transparent"
                                                        placeholder='First Name'
                                                        onChange={(e) => updateFirstName(e.target.value, element.id)}
                                                    />
                                                    <TextInput
                                                        id="last-name"
                                                        name="last-name"
                                                        value={element.last_name}
                                                        className="block w-full py-4 mt-2 bg-transparent"
                                                        placeholder='Last'
                                                        onChange={(e) => updateLastName(e.target.value, element.id)}
                                                    />
                                                </p>
                                            </div>
                                            <div align="center" className="w-1/3 ">
                                                <div className="relative flex justify-center gap-x-3">
                                                    <div className="flex items-center h-6">
                                                        <input
                                                        id="manager"
                                                        name="manager"
                                                        onChange={(e) => updateVisa(element.id)}
                                                        checked={parseInt(element.visa_status)}
                                                        type="checkbox"
                                                        className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-green-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <PrimaryButton
                                    className="justify-center w-full mt-8 text-center"
                                    onClick={() => { handleSaveAndContinue() }}
                                    disabled={totalSplit == 100 ? false : true}
                                >
                                    Save & Continue
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Phase2FormDetails>
        </CustomerDashboard>
    );
};
