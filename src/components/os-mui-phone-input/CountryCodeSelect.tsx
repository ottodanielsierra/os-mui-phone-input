import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { countryCodes } from "./countryCodes";
import "./css/flag-icons.css"

type Props = {
  onChange: (code:string) => void,
  codeValue?:string
}

export default function CountryCodeSelect({codeValue, onChange}: Props) {

  function handleSelectOnChange(event:SelectChangeEvent) {
    onChange(event.target.value);
  }

  let menuItems = countryCodes.map((countryCode) => {
    return <MenuItem value={countryCode.code} key={countryCode.code}><span className={"fi fi-" + countryCode.code.toLowerCase()} style={{marginRight: 10}}></span> {countryCode.name}</MenuItem>
  });

  return (
    <FormControl variant='standard'>      
      <Select
        disableUnderline={true}
        defaultValue={""}
        value={codeValue}
        onChange={handleSelectOnChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(selected:any) => {
          if (selected) {
            let code:any[] = countryCodes.filter((value) => value.code == selected)
            return <span className={"fi fi-" + code[0].code.toLowerCase()}></span>
          }          
          return <span className={"fi fi-xx"}></span>
        }}>
        <MenuItem disabled value="">
          <span className={"fi fi-xx"} style={{marginRight: 10}}></span> <em>Country Code</em>
        </MenuItem>
        { menuItems }
      </Select>
    </FormControl>
  )
}