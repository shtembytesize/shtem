import { useEffect, useState } from "react";
import { SurveyDataType, SurveyType } from "../util/types";
import CenteredModal from "./CenteredModal";
import GiftCodeContent from "./GiftCodeContent";
import InputGroup from "./InputGroup";
import MultipleChoice from "./MultipleChoice";

//component for modal with survey on it
export default function SurveyModal(props: {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    survey: SurveyType,
    showCode: boolean,
    setShowCode: (value: boolean) => void,
}) {
    const {isOpen, setIsOpen, survey, showCode, setShowCode} = props;
    const [data, setData] = useState({} as SurveyDataType);

    //helper function for setting a particular key-value pair in data object
    const setValue = (key: string, value: string) => {
        let d = {};
        Object.assign(d, data);
        d = {...d, [key]: value}; //add key-0value pair
        setData(d);
    }

    //function for checking if all questions have a response
    const checkValid = () => {
        let bool = true;
        if (!survey.questions) return false;
        survey.questions.forEach(q => {
            if (!(q.label in data && data[q.label])) {
                bool = false;
                return;
            }
        });
        return bool;
    }

    //add data to localStorage and show gift code
    const handleSubmit = () => {
        if (checkValid()) {
            localStorage.setItem(survey.title, JSON.stringify(data));
            setShowCode(true);
        }
    }

    return (
        <CenteredModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative bg-white container px-8 py-6 rounded-lg w-96 max-h-[80%] overflow-y-auto scrollbar">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-4 text-5xl">
                    ×
                </button>
                {showCode ? (
                    <GiftCodeContent code={survey.code} />
                ) : (
                    <div className="flex flex-col gap-3 items-center text-lg">
                        <h1 className="text-2xl font-bold">
                            {survey.title}
                        </h1>
                        <>
                            {survey.questions && survey.questions.map((q, i) => {
                                if ("options" in q) { //multiple choice
                                    return (
                                        <MultipleChoice
                                            key={i}
                                            label={q.label}
                                            selection={data[q.label]}
                                            callback={(x) => setValue(q.label, x)}
                                            options={q.options}
                                        />
                                    )
                                } else { //short answer
                                    return (
                                        <InputGroup
                                            key={i}
                                            label={q.label}
                                            value={data[q.label] ?? ""}
                                            callback={(x) => setValue(q.label, x)}
                                        />
                                    )
                                }
                            })}
                        </>
                        <button
                            onClick={() => handleSubmit()}
                            className={"px-4 py-2 whitespace-nowrap w-min rounded-lg "
                                + (checkValid() ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400")}>
                            Submit
                        </button>
                        <p className="italic text-red-500">
                            {!checkValid() &&
                                "* Please fill all required fields"
                            }
                        </p>
                    </div>
                )}
            </div>
        </CenteredModal>
    )
}
