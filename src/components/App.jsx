import React, { useState } from "react";
import "../App.css";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [skills, setSkills] = useState([]);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [time, setTime] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("#ff0000");
  const [experience, setExperience] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [terms, setTerms] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSkillChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((item) => item !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleRegister = () => {
    if (!terms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    setRegistered(true);
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setAge("");
    setDOB("");
    setGender("");
    setCourse("");
    setSkills([]);
    setCountry("");
    setAddress("");
    setWebsite("");
    setTime("");
    setFavoriteColor("#ff0000");
    setExperience(0);
    setPhoto(null);
    setTerms(false);
    setRegistered(false);
  };

  return (
    <div className="container">
      <div className="form-box">

        <h2>Registration Form</h2>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
        />

        <label>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Course</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BTech">BTech</option>
          <option value="MBA">MBA</option>
        </select>

        <label>Skills</label>
        <div className="skills">
          <label>
            <input
              type="checkbox"
              checked={skills.includes("Python")}
              onChange={() => handleSkillChange("Python")}
            />
            Python
          </label>

          <label>
            <input
              type="checkbox"
              checked={skills.includes("React")}
              onChange={() => handleSkillChange("React")}
            />
            React
          </label>

          <label>
            <input
              type="checkbox"
              checked={skills.includes("Java")}
              onChange={() => handleSkillChange("Java")}
            />
            Java
          </label>

          <label>
            <input
              type="checkbox"
              checked={skills.includes("C++")}
              onChange={() => handleSkillChange("C++")}
            />
            C++
          </label>
        </div>

        <label>Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>

        <label>Address</label>
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Website</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Favorite Color</label>
        <input
          className="color-input"
          type="color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
        />

        <label>Experience {experience} Years</label>
        <input
          className="range-input"
          type="range"
          min="0"
          max="10"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <label>Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <label className="terms">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          I agree to the Terms and Conditions
        </label>

        <div className="button-group">
          <button onClick={handleRegister}>
            Register
          </button>

          <button onClick={handleReset}>
            Reset
          </button>
        </div>

        {registered && (
          <div className="registered-form">
            <h2>Registered Details</h2>

            {photo && (
              <div className="photo-section">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Profile"
                />
              </div>
            )}

            <p>
              <strong>Full Name:</strong> {fullName}
            </p>

            <p>
              <strong>Email:</strong> {email}
            </p>

            <p>
              <strong>Password:</strong> {password}
            </p>

            <p>
              <strong>Age:</strong> {age}
            </p>

            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>

            <p>
              <strong>Gender:</strong> {gender}
            </p>

            <p>
              <strong>Course:</strong> {course}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {skills.length > 0 ? skills.join(", ") : "None"}
            </p>

            <p>
              <strong>Country:</strong> {country}
            </p>

            <p>
              <strong>Address:</strong> {address}
            </p>

            <p>
              <strong>Website:</strong> {website}
            </p>

            <p>
              <strong>Preferred Time:</strong> {time}
            </p>

            <p>
              <strong>Favorite Color:</strong>{" "}
              <span
                className="color-display"
                style={{ backgroundColor: favoriteColor }}
              ></span>
              {favoriteColor}
            </p>

            <p>
              <strong>Experience:</strong> {experience} Years
            </p>

            <p>
              <strong>Terms Accepted:</strong> Yes
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;