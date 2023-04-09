import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const joinClassNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

function Child ({nestIndex, control, register, defaultValues, getValues, setValue, errors,  watch, reset}) {
  const [currentModeTab, setCurrentModeTab] = useState(0);

  const { fields, append, remove } = useFieldArray({
    name: `companyList${nestIndex}.companyModesDetail`,
    control,
  });

  console.log("field nested", fields);

  const selectedCompany = useWatch({
    control,
    name: `companyList`
  });
  console.log("child selectedCompany", selectedCompany);

  useEffect(() => {

  }, [selectedCompany]);
  
  function changeModeTab(item, index) {
    setCurrentModeTab(index);
  }

  return (
    <div>
        <ul className="d-flex my-2" style={{ listStyle: 'none' }}>
          {selectedCompany[nestIndex].modes.map((item, index) => (
            <li
              key={`${index} ${item}`}
              style={
                currentModeTab === index
                  ? { borderBottom: '2px solid lightblue' }
                  : { borderBottom: 'none' }
              }
              className={joinClassNames('py-2,  mx-2')}
            >
              <div onClick={() => changeModeTab(item, index)}>
                <span className="fw-bold">{item}</span>
              </div>
            </li>
          ))}
        </ul>

        {selectedCompany[nestIndex].modes.map((item, i) => (
            <div key={i} className={joinClassNames(
                (currentModeTab === i) ? "d-block" : "d-none",
                "my-2", "list-group", "list-group-flush", "border-0")}>
                <div className="list-group-item">
                    <h5 className="card-title"> {item}</h5>
                    <div className="form-row">
                        <div className="form-group col-6">
                        <label>Name</label>
                        <input
                            name=""
                            {...register(`companyList[${nestIndex}].companyModesDetail[${i}].name`)}
                            type="text"
                            className={`form-control`}
                        />
                        {/* <div className="invalid-feedback">
                            {errors.tickets?.[i]?.name?.message}
                        </div> */}
                        </div>
                        <div className="form-group col-6">
                        <label>Email</label>
                        <input
                            name=""
                            {...register(`companyList[${nestIndex}].companyModesDetail[${i}].email`)}
                            type="text"
                            className={`form-control`}
                        />
                        {/* <div className="invalid-feedback">
                            {errors.tickets?.[i]?.email?.message}
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        ))}

        <div className="card-footer text-center border-top-0">
          <button type="submit" className="btn btn-primary mx-2">
            Submit
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="btn btn-secondary mx-2"
          >
            Reset
          </button>
        </div>
    </div>
  );
}

export default Child;
