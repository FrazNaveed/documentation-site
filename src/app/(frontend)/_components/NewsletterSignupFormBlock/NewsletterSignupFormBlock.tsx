'use client'

import { useState } from 'react'
import { ValidationError, useForm } from '@formspree/react'
import cx from 'classnames'
import Button from 'src/app/(frontend)/_components/Button'
import type { INewsletterSignupFormBlock } from '@/payload-types'
import styles from './NewsletterSignupFormBlock.module.scss'

export type NewsletterSignupFormBlockProps = INewsletterSignupFormBlock & {
  className?: string
}

export default function NewsletterSignupFormBlock({ title, className }: NewsletterSignupFormBlockProps) {
  const formId = 'xxxxxxxx' // TODO: Get Form ID and field names
  const [state, handleSubmit, reset] = useForm(formId)
  const [profileValue, setProfileValue] = useState<string>('')
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfileValue(e.target.value)
  }
  const sepcifyProfileHidden = profileValue !== 'Other'
  const companyHidden = !(
    profileValue === 'Web developer'
    || profileValue === 'Web3 infrastructure provider'
    || profileValue === 'Web3 VC / professional investor'
    || profileValue === 'Journalist'
  )
  const companySizeHidden = profileValue !== 'Web developer'
  const industryHidden = profileValue !== 'Web developer'
  return (
    <section className={className}>
      <div className={styles.grid}>
        {title && <h2 className={styles.formBlockTitle}>{title}</h2>}
      </div>
      <div className={styles.formWrap}>
        {state.succeeded ? (
          <div className={styles.grid}>
            <div className={styles.successMessage}>
              <p>Thanks! Form submitted.</p>
              <Button type='button' onClick={reset} text='Reset form' buttonStyle='black' />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={cx(styles.grid, styles.form)}>
            <p className={styles.sectionLabel}>
              Your Contact Info
            </p>
            <div className={cx(styles.formSection, styles.formSection__col1)}>
              <label htmlFor={`fname${formId}`}>
                <span className={styles.label}>First name*:</span>
                <input placeholder='First Name*' id={`fname${formId}`} type='text' name='fname' aria-required='true' />
              </label>
              <ValidationError field='fname' prefix='First Name' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col2)}>
              <label htmlFor={`lname${formId}`}>
                <span className={styles.label}>Last name*:</span>
                <input placeholder='Last Name*' id={`lname${formId}`} type='text' name='lname' aria-required='true' />
              </label>
              <ValidationError field='lname' prefix='Last Name' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col1)}>
              <label htmlFor={`email${formId}`}>
                <span className={styles.label}>Your email*:</span>
                <input placeholder='Your email*' id={`email${formId}`} type='email' name='email' aria-required='true' />
              </label>
              <ValidationError field='email' prefix='Email' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col2)}>
              <label htmlFor={`country${formId}`}>
                <span className={styles.label}>Country*:</span>
                <div className={styles.customSelect}>
                  <select name='country' id={`country${formId}`} aria-required='true' defaultValue=''>
                    <option value=''>
                      Country*
                    </option>
                    <option value='Afghanistan'>
                      Afghanistan
                    </option>
                    <option value='Albania'>
                      Albania
                    </option>
                    <option value='Algeria'>
                      Algeria
                    </option>
                    <option value='Andorra'>
                      Andorra
                    </option>
                    <option value='Angola'>
                      Angola
                    </option>
                    <option value='Antigua and Barbuda'>
                      Antigua and Barbuda
                    </option>
                    <option value='Argentina'>
                      Argentina
                    </option>
                    <option value='Armenia'>
                      Armenia
                    </option>
                    <option value='Australia'>
                      Australia
                    </option>
                    <option value='Austria'>
                      Austria
                    </option>
                    <option value='Azerbaijan'>
                      Azerbaijan
                    </option>
                    <option value='The Bahamas'>
                      The Bahamas
                    </option>
                    <option value='Bahrain'>
                      Bahrain
                    </option>
                    <option value='Bangladesh'>
                      Bangladesh
                    </option>
                    <option value='Barbados'>
                      Barbados
                    </option>
                    <option value='Belarus'>
                      Belarus
                    </option>
                    <option value='Belgium'>
                      Belgium
                    </option>
                    <option value='Belize'>
                      Belize
                    </option>
                    <option value='Benin'>
                      Benin
                    </option>
                    <option value='Bhutan'>
                      Bhutan
                    </option>
                    <option value='Bolivia'>
                      Bolivia
                    </option>
                    <option value='Bosnia and Herzegovina'>
                      Bosnia and Herzegovina
                    </option>
                    <option value='Botswana'>
                      Botswana
                    </option>
                    <option value='Brazil'>
                      Brazil
                    </option>
                    <option value='Brunei'>
                      Brunei
                    </option>
                    <option value='Bulgaria'>
                      Bulgaria
                    </option>
                    <option value='Burkina Faso'>
                      Burkina Faso
                    </option>
                    <option value='Burundi'>
                      Burundi
                    </option>
                    <option value='Cabo Verde'>
                      Cabo Verde
                    </option>
                    <option value='Cambodia'>
                      Cambodia
                    </option>
                    <option value='Cameroon'>
                      Cameroon
                    </option>
                    <option value='Canada'>
                      Canada
                    </option>
                    <option value='Central African Republic'>
                      Central African Republic
                    </option>
                    <option value='Chad'>
                      Chad
                    </option>
                    <option value='Chile'>
                      Chile
                    </option>
                    <option value='China'>
                      China
                    </option>
                    <option value='Colombia'>
                      Colombia
                    </option>
                    <option value='Comoros'>
                      Comoros
                    </option>
                    <option value='Congo, Democratic Republic of the'>
                      Congo, Democratic Republic of the
                    </option>
                    <option value='Congo, Republic of the'>
                      Congo, Republic of the
                    </option>
                    <option value='Costa Rica'>
                      Costa Rica
                    </option>
                    <option value='Côte d’Ivoire'>
                      Côte d’Ivoire
                    </option>
                    <option value='Croatia'>
                      Croatia
                    </option>
                    <option value='Cuba'>
                      Cuba
                    </option>
                    <option value='Cyprus'>
                      Cyprus
                    </option>
                    <option value='Czech Republic'>
                      Czech Republic
                    </option>
                    <option value='Denmark'>
                      Denmark
                    </option>
                    <option value='Djibouti'>
                      Djibouti
                    </option>
                    <option value='Dominica'>
                      Dominica
                    </option>
                    <option value='Dominican Republic'>
                      Dominican Republic
                    </option>
                    <option value='East Timor (Timor-Leste)'>
                      East Timor (Timor-Leste)
                    </option>
                    <option value='Ecuador'>
                      Ecuador
                    </option>
                    <option value='Egypt'>
                      Egypt
                    </option>
                    <option value='El Salvador'>
                      El Salvador
                    </option>
                    <option value='Equatorial Guinea'>
                      Equatorial Guinea
                    </option>
                    <option value='Eritrea'>
                      Eritrea
                    </option>
                    <option value='Estonia'>
                      Estonia
                    </option>
                    <option value='Eswatini'>
                      Eswatini
                    </option>
                    <option value='Ethiopia'>
                      Ethiopia
                    </option>
                    <option value='Fiji'>
                      Fiji
                    </option>
                    <option value='Finland'>
                      Finland
                    </option>
                    <option value='France'>
                      France
                    </option>
                    <option value='Gabon'>
                      Gabon
                    </option>
                    <option value='The Gambia'>
                      The Gambia
                    </option>
                    <option value='Georgia'>
                      Georgia
                    </option>
                    <option value='Germany'>
                      Germany
                    </option>
                    <option value='Ghana'>
                      Ghana
                    </option>
                    <option value='Greece'>
                      Greece
                    </option>
                    <option value='Grenada'>
                      Grenada
                    </option>
                    <option value='Guatemala'>
                      Guatemala
                    </option>
                    <option value='Guinea'>
                      Guinea
                    </option>
                    <option value='Guinea-Bissau'>
                      Guinea-Bissau
                    </option>
                    <option value='Guyana'>
                      Guyana
                    </option>
                    <option value='Haiti'>
                      Haiti
                    </option>
                    <option value='Honduras'>
                      Honduras
                    </option>
                    <option value='Hungary'>
                      Hungary
                    </option>
                    <option value='Iceland'>
                      Iceland
                    </option>
                    <option value='India'>
                      India
                    </option>
                    <option value='Indonesia'>
                      Indonesia
                    </option>
                    <option value='Iran'>
                      Iran
                    </option>
                    <option value='Iraq'>
                      Iraq
                    </option>
                    <option value='Ireland'>
                      Ireland
                    </option>
                    <option value='Israel'>
                      Israel
                    </option>
                    <option value='Italy'>
                      Italy
                    </option>
                    <option value='Jamaica'>
                      Jamaica
                    </option>
                    <option value='Japan'>
                      Japan
                    </option>
                    <option value='Jordan'>
                      Jordan
                    </option>
                    <option value='Kazakhstan'>
                      Kazakhstan
                    </option>
                    <option value='Kenya'>
                      Kenya
                    </option>
                    <option value='Kiribati'>
                      Kiribati
                    </option>
                    <option value='Korea, North'>
                      Korea, North
                    </option>
                    <option value='Korea, South'>
                      Korea, South
                    </option>
                    <option value='Kosovo'>
                      Kosovo
                    </option>
                    <option value='Kuwait'>
                      Kuwait
                    </option>
                    <option value='Kyrgyzstan'>
                      Kyrgyzstan
                    </option>
                    <option value='Laos'>
                      Laos
                    </option>
                    <option value='Latvia'>
                      Latvia
                    </option>
                    <option value='Lebanon'>
                      Lebanon
                    </option>
                    <option value='Lesotho'>
                      Lesotho
                    </option>
                    <option value='Liberia'>
                      Liberia
                    </option>
                    <option value='Libya'>
                      Libya
                    </option>
                    <option value='Liechtenstein'>
                      Liechtenstein
                    </option>
                    <option value='Lithuania'>
                      Lithuania
                    </option>
                    <option value='Luxembourg'>
                      Luxembourg
                    </option>
                    <option value='Madagascar'>
                      Madagascar
                    </option>
                    <option value='Malawi'>
                      Malawi
                    </option>
                    <option value='Malaysia'>
                      Malaysia
                    </option>
                    <option value='Maldives'>
                      Maldives
                    </option>
                    <option value='Mali'>
                      Mali
                    </option>
                    <option value='Malta'>
                      Malta
                    </option>
                    <option value='Marshall Islands'>
                      Marshall Islands
                    </option>
                    <option value='Mauritania'>
                      Mauritania
                    </option>
                    <option value='Mauritius'>
                      Mauritius
                    </option>
                    <option value='Mexico'>
                      Mexico
                    </option>
                    <option value='Micronesia, Federated States of'>
                      Micronesia, Federated States of
                    </option>
                    <option value='Moldova'>
                      Moldova
                    </option>
                    <option value='Monaco'>
                      Monaco
                    </option>
                    <option value='Mongolia'>
                      Mongolia
                    </option>
                    <option value='Montenegro'>
                      Montenegro
                    </option>
                    <option value='Morocco'>
                      Morocco
                    </option>
                    <option value='Mozambique'>
                      Mozambique
                    </option>
                    <option value='Myanmar (Burma)'>
                      Myanmar (Burma)
                    </option>
                    <option value='Namibia'>
                      Namibia
                    </option>
                    <option value='Nauru'>
                      Nauru
                    </option>
                    <option value='Nepal'>
                      Nepal
                    </option>
                    <option value='Netherlands'>
                      Netherlands
                    </option>
                    <option value='New Zealand'>
                      New Zealand
                    </option>
                    <option value='Nicaragua'>
                      Nicaragua
                    </option>
                    <option value='Niger'>
                      Niger
                    </option>
                    <option value='Nigeria'>
                      Nigeria
                    </option>
                    <option value='North Macedonia'>
                      North Macedonia
                    </option>
                    <option value='Norway'>
                      Norway
                    </option>
                    <option value='Oman'>
                      Oman
                    </option>
                    <option value='Pakistan'>
                      Pakistan
                    </option>
                    <option value='Palau'>
                      Palau
                    </option>
                    <option value='Panama'>
                      Panama
                    </option>
                    <option value='Papua New Guinea'>
                      Papua New Guinea
                    </option>
                    <option value='Paraguay'>
                      Paraguay
                    </option>
                    <option value='Peru'>
                      Peru
                    </option>
                    <option value='Philippines'>
                      Philippines
                    </option>
                    <option value='Poland'>
                      Poland
                    </option>
                    <option value='Portugal'>
                      Portugal
                    </option>
                    <option value='Qatar'>
                      Qatar
                    </option>
                    <option value='Romania'>
                      Romania
                    </option>
                    <option value='Russia'>
                      Russia
                    </option>
                    <option value='Rwanda'>
                      Rwanda
                    </option>
                    <option value='Saint Kitts and Nevis'>
                      Saint Kitts and Nevis
                    </option>
                    <option value='Saint Lucia'>
                      Saint Lucia
                    </option>
                    <option value='Saint Vincent and the Grenadines'>
                      Saint Vincent and the Grenadines
                    </option>
                    <option value='Samoa'>
                      Samoa
                    </option>
                    <option value='San Marino'>
                      San Marino
                    </option>
                    <option value='Sao Tome and Principe'>
                      Sao Tome and Principe
                    </option>
                    <option value='Saudi Arabia'>
                      Saudi Arabia
                    </option>
                    <option value='Senegal'>
                      Senegal
                    </option>
                    <option value='Serbia'>
                      Serbia
                    </option>
                    <option value='Seychelles'>
                      Seychelles
                    </option>
                    <option value='Sierra Leone'>
                      Sierra Leone
                    </option>
                    <option value='Singapore'>
                      Singapore
                    </option>
                    <option value='Slovakia'>
                      Slovakia
                    </option>
                    <option value='Slovenia'>
                      Slovenia
                    </option>
                    <option value='Solomon Islands'>
                      Solomon Islands
                    </option>
                    <option value='Somalia'>
                      Somalia
                    </option>
                    <option value='South Africa'>
                      South Africa
                    </option>
                    <option value='Spain'>
                      Spain
                    </option>
                    <option value='Sri Lanka'>
                      Sri Lanka
                    </option>
                    <option value='Sudan'>
                      Sudan
                    </option>
                    <option value='Sudan, South'>
                      Sudan, South
                    </option>
                    <option value='Suriname'>
                      Suriname
                    </option>
                    <option value='Sweden'>
                      Sweden
                    </option>
                    <option value='Switzerland'>
                      Switzerland
                    </option>
                    <option value='Syria'>
                      Syria
                    </option>
                    <option value='Taiwan'>
                      Taiwan
                    </option>
                    <option value='Tajikistan'>
                      Tajikistan
                    </option>
                    <option value='Tanzania'>
                      Tanzania
                    </option>
                    <option value='Thailand'>
                      Thailand
                    </option>
                    <option value='Togo'>
                      Togo
                    </option>
                    <option value='Tonga'>
                      Tonga
                    </option>
                    <option value='Trinidad and Tobago'>
                      Trinidad and Tobago
                    </option>
                    <option value='Tunisia'>
                      Tunisia
                    </option>
                    <option value='Turkey'>
                      Turkey
                    </option>
                    <option value='Turkmenistan'>
                      Turkmenistan
                    </option>
                    <option value='Tuvalu'>
                      Tuvalu
                    </option>
                    <option value='Uganda'>
                      Uganda
                    </option>
                    <option value='Ukraine'>
                      Ukraine
                    </option>
                    <option value='United Arab Emirates'>
                      United Arab Emirates
                    </option>
                    <option value='United Kingdom'>
                      United Kingdom
                    </option>
                    <option value='United States'>
                      United States
                    </option>
                    <option value='Uruguay'>
                      Uruguay
                    </option>
                    <option value='Uzbekistan'>
                      Uzbekistan
                    </option>
                    <option value='Vanuatu'>
                      Vanuatu
                    </option>
                    <option value='Vatican City'>
                      Vatican City
                    </option>
                    <option value='Venezuela'>
                      Venezuela
                    </option>
                    <option value='Vietnam'>
                      Vietnam
                    </option>
                    <option value='Yemen'>
                      Yemen
                    </option>
                    <option value='Zambia'>
                      Zambia
                    </option>
                    <option value='Zimbabwe'>
                      Zimbabwe
                    </option>
                  </select>
                </div>
              </label>
              <ValidationError field='country' prefix='Country' errors={state.errors} className={styles.error} />
            </div>
            <p className={styles.sectionLabel}>
              Flare interests
            </p>
            <div className={cx(styles.formSection, styles.formSection__col1)}>
              <label htmlFor={`profile${formId}`}>
                <span className={styles.label}>Profile type*:</span>
                <div className={styles.customSelect}>
                  <select onChange={handleProfileChange} name='profile' id={`profile${formId}`} aria-required='true' defaultValue=''>
                    <option value=''>
                      Profile type*
                    </option>
                    <option value='Web developer'>
                      Web developer
                    </option>
                    <option value='Web3 enthusiast/ retail investor'>
                      Web3 enthusiast/ retail investor
                    </option>
                    <option value='Web3 infrastructure provider'>
                      Web3 infrastructure provider
                    </option>
                    <option value='Web3 VC / professional investor'>
                      Web3 VC / professional investor
                    </option>
                    <option value='Journalist'>
                      Journalist
                    </option>
                    <option value='Student'>
                      Student
                    </option>
                    <option value='Other'>
                      Other
                    </option>
                  </select>
                </div>
              </label>
              <ValidationError field='profile' prefix='Profile' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: companyHidden })}>
              <label htmlFor={`company${formId}`}>
                <span className={styles.label}>Company:</span>
                <input placeholder='Company' id={`company${formId}`} type='text' name='company' disabled={companyHidden} />
              </label>
              <ValidationError field='company' prefix='Company' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col1, { [styles.hide]: companySizeHidden })}>
              <label htmlFor={`companySize${formId}`}>
                <span className={styles.label}>Company Size:</span>
                <div className={styles.customSelect}>
                  <select name='companySize' id={`companySize${formId}`} defaultValue='' disabled={companySizeHidden}>
                    <option value=''>
                      Company Size
                    </option>
                    <option value='Just me'>
                      Just me
                    </option>
                    <option value='Start-up'>
                      Start-up
                    </option>
                    <option value='Scale-up'>
                      Scale-up
                    </option>
                    <option value='Medium-size company'>
                      Medium-size company
                    </option>
                    <option value='Enterprise'>
                      Enterprise
                    </option>
                  </select>
                </div>
              </label>
              <ValidationError field='companySize' prefix='Company Size' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: industryHidden })}>
              <label htmlFor={`industry${formId}`}>
                <span className={styles.label}>Industry:</span>
                <div className={styles.customSelect}>
                  <select name='industry' id={`industry${formId}`} defaultValue='' disabled={industryHidden}>
                    <option value=''>
                      Industry
                    </option>
                    <option value='Web3 native'>
                      Web3 native
                    </option>
                    <option value='Art'>
                      Art
                    </option>
                    <option value='Construction and home improvement'>
                      Construction and home improvement
                    </option>
                    <option value='Entertainment/Gaming'>
                      Entertainment/Gaming
                    </option>
                    <option value='Financial services'>
                      Financial services
                    </option>
                    <option value='Government/public service'>
                      Government/public service
                    </option>
                    <option value='Health and Care'>
                      Health and Care
                    </option>
                    <option value='Manufacturing/Agricultural'>
                      Manufacturing/Agricultural
                    </option>
                    <option value='Professional services (consultancy, law practice, accountancy..)'>
                      Professional services (consultancy, law practice, accountancy..)
                    </option>
                    <option value='Retail'>
                      Retail
                    </option>
                    <option value='Tech provider'>
                      Tech provider
                    </option>
                    <option value='Transport'>
                      Transport
                    </option>
                    <option value='Retired'>
                      Retired
                    </option>
                    <option value='Other'>
                      Other
                    </option>
                  </select>
                </div>
              </label>
              <ValidationError field='industry' prefix='Industry' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__col2, { [styles.hide]: sepcifyProfileHidden })}>
              <label htmlFor={`specifyProfile${formId}`}>
                <span className={styles.label}>Specify Profile:</span>
                <input placeholder='Specify Profile' id={`specifyProfile${formId}`} type='text' name='specifyProfile' disabled={sepcifyProfileHidden} />
              </label>
              <ValidationError field='specifyProfile' prefix='Specify Profile' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.formSection, styles.formSection__colWide)}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>
                  Consent*
                </legend>
                <label htmlFor={`consent${formId}`} className={styles.checkboxLabel}>
                  <input id={`consent${formId}`} type='checkbox' name='consent' aria-required='true' className={styles.checkbox} />
                  <div>
                    <p className={styles.consentText}>Yes, I agree to receive email communications from Flare.*</p>
                    <p className={styles.consentNotice}>We will never share your email address with anyone else.</p>
                  </div>
                </label>
              </fieldset>
              <ValidationError field='consent' prefix='Consent' errors={state.errors} className={styles.error} />
            </div>
            <div className={cx(styles.submitWrap)}>
              <Button type='submit' disabled={state.submitting} text={state.submitting ? 'Sending...' : 'Send'} />
              <ValidationError errors={state.errors} className={styles.error} />
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
