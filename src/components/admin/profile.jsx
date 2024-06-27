import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/system";
import "./profile.css";

// Styled CircularProgress component
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  circle: {
    strokeWidth: 6, // Increase the border size here
  },
  circleDeterminate: {
    strokeWidth: 5, // Ensure the border size is consistent for determinate variant
  },
}));

const Profile = ({ profileData }) => {
  const [selectedButton, setSelectedButton] = useState("Leadership"); // Set "Leadership" as the default selected button
  const [progress, setProgress] = useState(0); // Initialize progress to 0

  useEffect(() => {
    // Animate the progress value
    const targetProgress = 78;
    let currentProgress = 0;
    const increment = 4;
    const interval = 20; // ms

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        clearInterval(timer);
      }
      setProgress(currentProgress);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Ensure profileData has default values to avoid undefined errors
  const {
    picture,
    name,
    id,
    position,
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism,
    skills,
  } = profileData || {
    picture: "",
    name: "Unknown",
    id: "N/A",
    position: "N/A",
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    skills: [],
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const colors = ["blue", "yellow", "pink", "green", "purple", "yellow"];
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={picture} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{id}</p>
          <p className="position">{position}</p>
        </div>
      </div>
      <div className="button-group">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={() => handleButtonClick("Leadership")}
            style={{
              backgroundColor:
                selectedButton === "Leadership" ? "inherit" : "lightgray",
            }}
          >
            Leadership
          </Button>
          <Button
            onClick={() => handleButtonClick("Competency")}
            style={{
              backgroundColor:
                selectedButton === "Competency" ? "inherit" : "lightgray",
            }}
          >
            Competency
          </Button>
        </ButtonGroup>
      </div>
      <div className="profile-body">
        <div className="progress-circle">
          <StyledCircularProgress
            variant="determinate"
            value={progress}
            size={120}
          />
          <div className="progress-value">{progress}%</div>
        </div>
        <div className="traits">
          {selectedButton === "Leadership" ? (
            <>
              <div className="trait">
                <span>Openness</span>
                <div className="trait-bar">
                  <div
                    className="trait-progress"
                    style={{
                      width: `${openness}%`,
                      backgroundColor: "#FFF500",
                    }}
                  ></div>
                </div>
                <span>{openness}%</span>
              </div>
              <div className="trait">
                <span>Conscientiousness</span>
                <div className="trait-bar">
                  <div
                    className="trait-progress"
                    style={{
                      width: `${conscientiousness}%`,
                      backgroundColor: "#AB40FF",
                    }}
                  ></div>
                </div>
                <span>{conscientiousness}%</span>
              </div>
              <div className="trait">
                <span>Extraversion</span>
                <div className="trait-bar">
                  <div
                    className="trait-progress"
                    style={{
                      width: `${extraversion}%`,
                      backgroundColor: "#FF00B8",
                    }}
                  ></div>
                </div>
                <span>{extraversion}%</span>
              </div>
              <div className="trait">
                <span>Agreeableness</span>
                <div className="trait-bar">
                  <div
                    className="trait-progress"
                    style={{
                      width: `${agreeableness}%`,
                      backgroundColor: "#52FF00",
                    }}
                  ></div>
                </div>
                <span>{agreeableness}%</span>
              </div>
              <div className="trait">
                <span>Neuroticism</span>
                <div className="trait-bar">
                  <div
                    className="trait-progress"
                    style={{
                      width: `${neuroticism}%`,
                      backgroundColor: "#00D1FF",
                    }}
                  ></div>
                </div>
                <span>{neuroticism}%</span>
              </div>
            </>
          ) : (
            <>
              {skills.map((skill, index) => (
                <div className="trait" key={index}>
                  <span>{skill[0]}</span>
                  <div className="trait-bar">
                    <div
                      className="trait-progress"
                      style={{
                        width: `${skill[1] * 10}%`, // Multiply by 10 and add % here
                        backgroundColor: colors[index % colors.length], // Use modulo to cycle through colors
                      }}
                    ></div>
                  </div>
                  <span>{`${skill[1] * 10}%`}</span>{" "}
                  {/* Display the percentage value */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
