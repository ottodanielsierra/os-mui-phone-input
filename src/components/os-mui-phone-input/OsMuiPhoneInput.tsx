import React from 'react'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import CountryCodeSelect from './CountryCodeSelect'
import { countryCodes } from './countryCodes';

type Props = TextFieldProps & {
  onChange?: (value:any) => void
}

export default function OsMuiPhoneInput({onChange,...rest}: Props) {

  const phoneField:any = React.useRef(null);
  const [value, setValue] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");

  function handleOnChangeCountryCode(dial_code:string) {
    setCountryCode(dial_code);
    // Si el campo tiene datos      
    if (value) {
      // Si hay un dial_code reemplazarlo      
      if (countryCode) {
        let newValue = value.replace(countryCode, dial_code);
        phoneField.current.value = newValue;
        setValue(newValue);
        return;
      }
    }
    //Si el campo de teléfono esta vacío simplemente setear el valor
    phoneField.current.value = dial_code;
    setValue(dial_code);    
  }

  function handleOnChangeInput(event:any) {
    setValue(event.target.value);
    validateCountryCode(event.target.value);
  }

  function validateCountryCode(phoneNumber:string) {
    //Si el número ingresado tiene más de +16642755185 (12) caracteres entonces validar solo los caracteres antes de los últimos 10
    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.substring(0, phoneNumber.length - 10);
    }
    //filtrar el código
    let code:any[] = countryCodes.filter((value) => value.dial_code == phoneNumber)
    //Si se encuentra valor retornar ese
    if (code.length) {
      setCountryCode(code[0].dial_code);
    }
  }

  return (
    <TextField      
      ref={phoneField}
      onChange={v => {onChange && onChange(v); handleOnChangeInput(v)}}
      value={value}
      type="tel"
      {...rest}
      InputProps={{
        startAdornment: <InputAdornment position="start"><CountryCodeSelect codeValue={countryCode} onChange={handleOnChangeCountryCode}></CountryCodeSelect></InputAdornment>,
      }}/>
  )
}