import { Field } from 'formik'
import React, { useState } from 'react'

export const SearchableField = ({
  name,
  placeholder,
  label,
  data,
  defaultValue,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [defaultV, setDefaultV] = useState(defaultValue)
  const [isSelected, setIsSelected] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const keyWordHandler = (e) => {
    const { value } = e.target
    setSearchTerm(value)
    setIsSelected(false)
    if (searchTerm !== '') {
      const Results = data?.filter((Result) => {
        return Object.values(Result)
          .join(' ')
          .replace(/-/g, ' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })
      setSearchResults(Results)
    }
  }

  return (
    <Field name={name}>
      {({ field, meta, form: { setFieldValue, values } }) => {
        return (
          <div className="w-full mb-2">
            <>
              {label ? (
                <label
                  htmlFor={name}
                  className="mb-[16px] text-white text-[14px]"
                >
                  {label}
                </label>
              ) : null}
              <Field
                placeholder={placeholder}
                type="search"
                disabled={disabled}
                name={name}
                className="modal__form-el-field"
                value={
                  isSelected
                    ? data.filter((client) => client.id === values[name])[0]
                        ?.fullName
                    : searchTerm
                    ? searchTerm
                    : defaultV
                }
                onChange={(e) => {
                  setDefaultV('')
                  if (!e?.target?.value) setFieldValue(name, '')
                  keyWordHandler(e)
                }}
              />

              {searchTerm.length > 1 && (
                <div className="relative w-full text-left">
                  {searchResults.length > 0 ? (
                    <ul className="absolute top-0 right-0 left-0 border-0 margin-0 bg-[#171723] pl-0 rounded shadow-md list-none max-h-48 overflow-y-auto z-50">
                      {searchTerm &&
                        searchResults.map((result) => {
                          return (
                            <li
                              onClick={() => {
                                setIsSelected(true)
                                setFieldValue(name, result.id)
                                setSearchTerm('')
                                setSearchResults([])
                              }}
                              key={result.id}
                              className="px-2 py-1.5 cursor-pointer capitalize border-t border-[#323248] hover:bg-[#323248] text-[#92928f]"
                            >
                              {result.fullName}
                            </li>
                          )
                        })}
                    </ul>
                  ) : (
                    <div className="overflow-hidden absolute top-0 right-0 left-0 m-0 border-1 border-[#323248] bg-[#171723] z-50 rounded-md pt-2 px-2.5 pb-3 shadow-md text-[#92928f]">
                      Ooops, No Client match for
                      <strong className="mx-2 text-primary">
                        {searchTerm}
                      </strong>
                      found!
                    </div>
                  )}
                </div>
              )}
            </>
            {meta.touched && meta.error && (
              <div className="error mt-[8px]">{meta.error}</div>
            )}
          </div>
        )
      }}
    </Field>
  )
}
