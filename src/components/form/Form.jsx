import React, { useEffect, useRef, useState } from 'react';
import "./Form.css";
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/userSlice';


const Form = () => {
  const dispatch = useDispatch()
  // state of country names in the form of array
  const [countries, setCountries] = useState([]);
  // create profile Url to show image
  // make object of form data
  const [formData, setFormData] = useState(null)
  // make objecct of error
  const [errors, setErrors] = useState(null)
  // array of provinces
  const nepalProvinces = [
    "Province No. 1 (Bagmati)",
    "Province No. 2 (Madhesh)",
    "Province No. 3 (Koshi)",
    "Province No. 4 (Gandaki)",
    "Province No. 5 (Lumbini)",
    "Province No. 6 (Karnali)",
    "Province No. 7 (Sudurpashchim)"
  ];

  // fetch country from the api https://restcountries.com/v3.1/all
  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json()
        let countryNames = data.map(countryData => (countryData.name.common))
        setCountries(countryNames)
      } catch (error) {
        console.log(error);

      }
    }
    fetchCountry();
  }, []);


  // ======= Better way to validate form data use libraries like react-hook-form, Formik ====== //
  //handle inputFields
  const handleInput = (e) => {
    // console.log(formData);
    // check email validation
    if (e.target.name === "email") {
      // regular expressin for testing email is valid or not 
      const regX = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
      // test the email filed is valid or not
      let test = regX.test(e.target.value)
      // if email is valid then set the data to formData in the key pair 
      if (test) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
        // if email is valid then set email error null
        setErrors({ ...errors, [e.target.name]: null })
      }
      else {
        // if email is not valid set email error
        setErrors({ ...errors, [e.target.name]: "Enter valid email!" })
      }
    }
    // check phone validatin
    else if (e.target.name === "phone") {
      // regular expression for phone number
      const regX = /^\+?\d{1,3}?\s?-?\d{9,10}$/;
      // test phone number is valid or not
      let test = regX.test(e.target.value)
      // if phone number is valid then set data to formData
      if (test) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // if phone is valid set phone error null 
        setErrors({ ...errors, [e.target.name]: null })
      }
      else {
        // if phone is not valid set phone errror
        setErrors({ ...errors, [e.target.name]: "Enter valid phone number!" })
      }
      // if phone is less than 7 digit set phone error
      if (e.target.value.trim().length < 7) {
        setErrors({ ...errors, [e.target.name]: "Enter atleast 7 digit!" })
      }
    }
    else if (e.target.name === "profile") {
      let selectedFile = e.target.files[0]
      const url = URL.createObjectURL(selectedFile)
      setFormData(formData => ({ ...formData, [e.target.name]: url }))
      setErrors({ ...errors, profile: "" })
    }

    else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      if (e.target.name === "name") {
        setErrors({ ...errors, name: "" })
      }
      if (e.target.name === "dob") {
        setErrors({ ...errors, dob: "" })
      }
      if (e.target.name === "city") {
        setErrors({ ...errors, city: "" })
      }
      if (e.target.name === "district") {
        setErrors({ ...errors, district: "" })
      }
      if (e.target.name === "province") {
        setErrors({ ...errors, province: "" })
      }

      // console.log(formData);

    }
  }
  // ======= Better way to validate form data use libraries like react-hook-form, Formik ====== //

  // handel sumbit the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData => ({ ...formData, country: formData?.country || "Nepal" }))
    // console.log(!formData?.name);
    if (!formData) {
      setErrors(error => ({ ...error, name: "Name is required!" }))
      setErrors(error => ({ ...error, email: "Email is required!" }))
      setErrors(error => ({ ...error, phone: "Phone number is required!" }))
      setErrors(error => ({ ...error, dob: "Date of birth is required!" }))
      setErrors(error => ({ ...error, city: "City is required!" }))
      setErrors(error => ({ ...error, district: "District is required!" }))
      setErrors(error => ({ ...error, province: "Province is required!" }))
      setErrors(error => ({ ...error, profile: "Profile is required!" }))
    }
    if (!formData?.name)
      setErrors(error => ({ ...error, name: "Name is required!" }))
    if (!formData?.email)
      setErrors(error => ({ ...error, email: "Email is required!" }))
    if (!formData?.phone)
      setErrors(error => ({ ...error, phone: "Phone is required!" }))
    if (!formData?.dob)
      setErrors(error => ({ ...error, dob: "Date of birth is required!" }))
    if (!formData?.city)
      setErrors(error => ({ ...error, city: "City is required!" }))
    if (!formData?.district)
      setErrors(error => ({ ...error, district: "District is required!" }))
    if (!formData?.province)
      setErrors(error => ({ ...error, province: "Province is required!" }))

    if (!formData?.profile)
      setErrors(error => ({ ...error, profile: "Profile is required!" }))
    if (formData.name && formData.email && formData.phone && formData.dob && formData.city && formData.district && formData.province && formData.country && formData.profile) {
      dispatch(addUser({ ...formData, id: Date.now() }))
      setFormData(formData => ({ ...formData, name: "" }))
      setFormData(formData => ({ ...formData, email: "" }))
      setFormData(formData => ({ ...formData, phone: "" }))
      setFormData(formData => ({ ...formData, dob: "" }))
      setFormData(formData => ({ ...formData, city: "" }))
      setFormData(formData => ({ ...formData, district: "" }))
      setFormData(formData => ({ ...formData, province: "" }))
      setFormData(formData => ({ ...formData, country: "" }))
      setFormData(formData => ({ ...formData, profile: null }))

    }
  }

  return (
    <section className="form-component">
      <h2 >Add Records</h2>
      <form
        className="form"
        method='post'
        onSubmit={handleSubmit}
      >
        <div className='input-wrapper'>
          <div className='input-box'>
            <Input
              type="text"
              label="Name"
              placeholder="eg.Dammar Singh Rana"
              name="name"
              value={formData?.name}
              onChange={handleInput}
            />
            {errors?.name && <p className='error'>{errors?.name}</p>}
          </div>
          <div className='input-box'>
            <Input
              type="email"
              label="email"
              placeholder="eg. dammarrana093@gmail.com"
              name="email"
              value={formData?.email}
              onChange={handleInput}
            />
            {errors?.email && <p className='error'>{errors?.email}</p>}
          </div>
          <div className='input-box'>
            <Input
              type="tel"
              label="Phone Number"
              placeholder="eg. +977-9809498493 "
              minLength={7}
              name="phone"
              value={formData?.phone}
              onChange={handleInput}
            />
            {errors?.phone && <p className='error'>{errors?.phone}</p>}

          </div>
          <div className='input-box'>
            <Input
              type="date"
              label="Date of Birth"
              name="dob"
              value={formData?.dob}
              onChange={handleInput}
            />
            {errors?.dob && <p className='error'>{errors?.dob}</p>}
          </div>
          <div className='input-box'>
            <Input
              type="text"
              label="City"
              placeholder="eg. Mahendranagar "
              name="city"
              value={formData?.city}
              onChange={handleInput}
            />
            {errors?.city && <p className='error'>{errors?.city}</p>}

          </div>

          <div className='input-box'>
            <Input
              type="text"
              label="District"
              placeholder="eg. Kanchanpur "
              name="district"
              value={formData?.district}
              onChange={handleInput}
            />
            {errors?.district && <p className='error'>{errors?.district}</p>}
          </div>
          <div className='input-box'>
            <Select
              data={nepalProvinces}
              label="Province"
              name="province"
              value={formData?.province}
              onInput={handleInput}
            />
            {errors?.province && <p className='error'>{errors?.province}</p>}
          </div>
          <div className='input-box'>
            <Select
              data={countries}
              label="Country"
              selectedItem="nepal"
              name="country"
              value={formData?.country}
              onInput={handleInput}

            />
            {errors?.country && <p className='error'>{errors?.country}</p>}
          </div>
          <div className='input-box'>
            {formData?.profile && <div className='profile-box'
            ><img className='profile' src={formData?.profile} />
            </div>}
            <Input type="file" label="Profile Image"
              accept=".png"
              name='profile'

              onChange={handleInput}
            />
            {errors?.profile && <p className='error'>{errors?.profile}</p>}

          </div>
        </div>
        <div className='btn'>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}

export default Form