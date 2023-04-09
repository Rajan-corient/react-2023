import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Child from './Child';

export const joinClassNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

function Parent () {
  const [currentCompanyTab, setCurrentCompanyTab] = useState(0);

  const companyArr = [
    { id: 1, name: `Tata`, value: `tata` },
    { id: 2, name: `Reliance`, reliance: `lcl`},
    { id: 3, name: `Adani`, value: `adani`}
  ]; 

  const modeList = [
    { id: 1, name: `Air`, value: `air` },
    { id: 2, name: `LCL`, value: `lcl` },
    { id: 4, name: `FCL`, value: `fcl`, }
  ];

  const defaultValues = {
    companyList: companyArr.map(item => {
        return {
            company: item.name,
            modes: [],
            companyModesDetail: []
        }
    })
  };

  // functions to build form returned by useForm() and useFieldArray() hooks
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
    watch,
    getValues,
    setValue
  } = useForm({defaultValues});
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'companyList',
    control,
  });

//   watch to enable re-render when ticket number is changed
  const allCompany = watch(`companyList`);
  console.log("parent allCompany", allCompany);


//   const selectedCompany = useWatch({
//     name: `companyList[${currentCompanyTab}]`,
//     control
//   })
//   console.log("parent selectedCompany", selectedCompany);

  useEffect(() => {
    // setValue("companyList", [
    //     ...getValues().companyList,
    //     {
    //       name: "append",
    //       companyModesDetail: [{ name: "append", email: "append" }]
    //     }
    // ]);
  }, [currentCompanyTab]);

  function onSubmit(data) {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
  }

  function changeCompanyTab (item, index) {
    setCurrentCompanyTab(index);
  }  
  
  function onModeSelect (e, index) {
    console.log(1111, e.target.value)
    setValue(`companyList[${index}].companyModesDetail`,
    [...getValues().companyList[index].modes].map(mode => {
      return {
        name: mode, 
        email: "" 
      }
    })
    );
    console.log(22222, getValues());
  }


//   onModeCheck = (e) => {
//     console.log(1111, e.target.value)
//     setValue("companyList", [
//         ...getValues().companyList,
//         {

//             name: getValues().companyList
//             [index].company,
//             modes: [...getValues().companyList[index].modes],
//             companyModesDetail: [...getValues().companyList[index].modes].map(mode => {
//                 return {
//                     name: mode, 
//                     email:"append" 
//                 }
//             })
//         }
//     ]);
//     console.log(22222, getValues())
//   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card m-3">
        <h5 className="card-header">
          React Hook Form 7 - Dynamic Form Example
        </h5>

        <div className='mt-4'>
            <ul className="d-flex" style={{ listStyle: 'none' }}>
            {fields.map((item, i) => (
                <li
                key={`${i}_${item.company}`}
                style={
                    currentCompanyTab === i
                    ? { borderBottom: '2px solid lightblue' }
                    : { borderBottom: 'none' }
                }
                className={joinClassNames('py-2,  mx-2')}
                >
                <div onClick={() => changeCompanyTab(item, i)}>
                    <span className="fw-bold pointer">{item.company}</span>
                </div>
                </li>
            ))}
            </ul>
        </div>
        
        {fields.map((item, index) => (
            <div key={`${index}_${item.name}`} className={ joinClassNames(currentCompanyTab === index ? "d-block" : "d-none")}>
                <div className="d-flex card-body my-2 mx-2">
                { modeList.map((item)=>{
                    return (
                        <>
                            <div className="form-group mx-3">
                                <input
                                type="checkbox"
                                {...register(`companyList[${index}].modes`,     {onChange: (e) => onModeSelect(e, index)}
                                )}
                                id={item.id}
                                value={item.name}
                                aria-describedby="expertise-description"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor={item.id} className="font-medium text-gray-500">
                                    {item.name}
                                </label>
                            </div>
                        </>
                    )
                })
                }
                </div>

                <Child nestIndex={index}
                {...{ control, register, defaultValues, getValues, setValue, errors, watch, reset }} />
            </div>
        ))
        }
      </div>
    </form>
  );
}

export default Parent;
