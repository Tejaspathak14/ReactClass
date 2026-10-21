import React, { useState } from "react";

const Reg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    gender: "",
    course: "",
    skills: [],
    country: "",
    address: "",
    website: "",
    time: "",
    color: "#000000",
    experience: 0,
    terms: false,
    photo: null,
  });

  // Handle Textbox, Select, Radio, etc.
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "terms") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle Multiple Checkboxes
  const handleSkills = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter(
          (skill) => skill !== value
        ),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Reg Data:");
    console.log(formData);

    alert("Reg Successful!");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      dob: "",
      gender: "",
      course: "",
      skills: [],
      country: "",
      address: "",
      website: "",
      time: "",
      color: "#000000",
      experience: 0,
      terms: false,
      photo: null,
    });
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow p-4">

        <h2 className="text-center bg-warning p-2 mb-4">
         Registration Form
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Text Box */}
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Number */}
          <div className="mb-3">
            <label className="form-label">
              Age
            </label>

            <input
              type="number"
              name="age"
              className="form-control"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Radio Button */}
          <div className="mb-3">
            <label className="form-label d-block">
              Gender
            </label>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="form-check-input"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-check-input"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="Other"
                className="form-check-input"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Other
              </label>
            </div>
          </div>

          {/* Select / Options */}
          <div className="mb-3">
            <label className="form-label">
              Select Course
            </label>

            <select
              name="course"
              className="form-select"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">
                -- Select Course --
              </option>

              <option value="React">
                React.js
              </option>

              <option value="Java">
                Java
              </option>

              <option value="Python">
                Python
              </option>

              <option value="Flutter">
                Flutter
              </option>

              <option value="Node">
                Node.js
              </option>
            </select>
          </div>

          {/* Multiple Checkboxes */}
          <div className="mb-3">
            <label className="form-label d-block">
              Skills
            </label>

            <div className="form-check">
              <input
                type="checkbox"
                value="Java"
                className="form-check-input"
                checked={formData.skills.includes("Java")}
                onChange={handleSkills}
              />

              <label className="form-check-label">
                Java
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                value="React"
                className="form-check-input"
                checked={formData.skills.includes("React")}
                onChange={handleSkills}
              />

              <label className="form-check-label">
                React
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                value="Python"
                className="form-check-input"
                checked={formData.skills.includes("Python")}
                onChange={handleSkills}
              />

              <label className="form-check-label">
                Python
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                value="Flutter"
                className="form-check-input"
                checked={formData.skills.includes("Flutter")}
                onChange={handleSkills}
              />

              <label className="form-check-label">
                Flutter
              </label>
            </div>
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">
              Country
            </label>

            <select
              name="country"
              className="form-select"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">
                -- Select Country --
              </option>

              <option value="India">
                India
              </option>

              <option value="USA">
                USA
              </option>

              <option value="UK">
                UK
              </option>

              <option value="Canada">
                Canada
              </option>
            </select>
          </div>

          {/* Textarea */}
          <div className="mb-3">
            <label className="form-label">
              Address
            </label>

            <textarea
              name="address"
              className="form-control"
              rows="4"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* URL */}
          <div className="mb-3">
            <label className="form-label">
              Website
            </label>

            <input
              type="url"
              name="website"
              className="form-control"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Time */}
          <div className="mb-3">
            <label className="form-label">
              Preferred Time
            </label>

            <input
              type="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* Color */}
          <div className="mb-3">
            <label className="form-label">
              Favorite Color
            </label>

            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          {/* Range */}
          <div className="mb-3">
            <label className="form-label">
              Experience: {formData.experience} Years
            </label>

            <input
              type="range"
              name="experience"
              className="form-range"
              min="0"
              max="20"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label">
              Upload Photo
            </label>

            <input
              type="file"
              name="photo"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="terms"
              className="form-check-input"
              checked={formData.terms}
              onChange={handleChange}
              required
            />

            <label className="form-check-label">
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Buttons */}
          <div className="text-center">

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              Register
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Reg;