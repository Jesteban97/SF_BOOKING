import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface ContactPreferenceProps {
    setPreferences: Dispatch<SetStateAction<string[]>>;
    preferences: string[];
  }
const ContactPreference:React.FC<ContactPreferenceProps> = ({preferences,setPreferences}) => {

    const onpreferencesChange = (e: CheckboxChangeEvent) => {
        let _preferences = [...preferences];

        if (e.checked)
            _preferences.push(e.value);
        else
            _preferences.splice(_preferences.indexOf(e.value), 1);

        setPreferences(_preferences);
    }

    return (
        <div className="card flex flex-wrap justify-content-center gap-3 m-3">
            <div className="flex align-items-center">
                <Checkbox inputId="email" name="preferences" className='' value="email" onChange={onpreferencesChange} checked={preferences.includes('email')} />
                <label htmlFor="email" className="ml-2">Correo Eléctronico</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="sms" name="preferences" className='' value="sms" onChange={onpreferencesChange} checked={preferences.includes('sms')} />
                <label htmlFor="sms" className="ml-2">SMS</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="both" name="preferences" className='' value="ambos" onChange={onpreferencesChange} checked={preferences.includes('ambos')} />
                <label htmlFor="both" className="ml-2">Ambos</label>
            </div>
        </div>
    )
}

export default ContactPreference
