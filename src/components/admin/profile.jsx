import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
//import "./profile.css";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

// Styled CircularProgress component
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  circle: {
    strokeWidth: 4,
  },
  circleDeterminate: {
    strokeWidth: 3,
  },
}));

const server = "http://127.0.0.1:8000";
const Profile = ({ profileData, onClose }) => {
  const [traits, setTraits] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedTrait, setSelectedTrait] = useState(null);

  useEffect(() => {
    const fetchTraits = async () => {
      const accessToken = sessionStorage.getItem("access_token");

      try {
        const response = await fetch(
          `${server}/profile/${profileData.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTraits(data);
      } catch (error) {
        console.error("Error fetching traits data:", error);
        setTraits({
          openness: 0,
          conscientiousness: 0,
          extraversion: 0,
          agreeableness: 0,
          neuroticism: 0,
        });
      }
    };

    fetchTraits();
  }, [profileData.user_id]);

  useEffect(() => {
    const targetProgress =
      selectedTab === 0 ? profileData.potential : profileData.competency;
    let currentProgress = 0;
    const increment = 4;
    const interval = 20;

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
  }, [selectedTab, profileData.potential, profileData.competency]);

  const { picture, name, user_id, position, skills, potential, competency } =
    profileData || {
      picture: "",
      name: " ",
      user_id: " ",
      position: " ",
      skills: [],
      potential: 0,
      competency: 0,
    };

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    setProgress(0);
    setSelectedTrait(null); // Reset selected trait when changing tabs
  };

  const handleTraitClick = (trait) => {
    setSelectedTrait(trait);
  };

  const handleCloseDescription = () => {
    setSelectedTrait(null);
  };

  const traitDescriptions = {
    Openness:
      "Openness is a characteristic that includes imagination and insight. The world, other people and an eagerness to learn and experience new things is particularly high for this personality trait. It leads to having a broad range of interests and being more adventurous when it comes to decision making. Anyone low in this trait tends to be viewed with more traditional approaches to life and may struggle when it comes to problem solving outside their comfort zone of knowledge.",
    Conscientiousness:
      "Conscientiousness is a trait that includes high levels of thoughtfulness, good impulse control, and goal-directed behaviors. A highly conscientious person will regularly plan ahead and analyze their own behavior to see how it affects others. People low in conscientiousness tend to dislike structure and schedules, procrastinate on important tasks and fail to complete tasks as well.",
    Extraversion:
      "Extraversion (sometimes referred to as Extroversion) is a trait that many will have come across in their own lives. It’s easily identifiable and widely recognizable as “someone who gets energized in the company of others.” This, amongst other traits which include, talkativeness, assertiveness and high amounts of emotional expressiveness, have made extraverted people widely recognizable over many years of social interaction. The opposite is an introvert. They prefer solitude and have less energy in social situations.",
    Agreeableness:
      "People who exhibit high agreeableness will show signs of trust, altruism, kindness, and affection. Highly agreeable people tend to have high prosocial behaviors which means that they’re more inclined to be helping other people. The opposite to agreeableness is disagreeableness but it manifests in behavior traits that are socially unpleasant. Manipulation and nastiness towards others, a lack of caring or sympathy, a lack of taking interest in others and their problems are all quite common.",
    Neuroticism:
      "Neuroticism is characterized by sadness, moodiness, and emotional instability. It is a physical and emotional response to stress and perceived threats in someone’s daily life. Individuals who exhibit high levels of neuroticism will tend to experience mood swings, anxiety and irritability. Those who rank lower on the neurotic level will exhibit a more stable and emotionally resilient attitude to stress and situations. Low neurotic sufferers also rarely feel sad or depressed and not get involved in mental arithmetic on possible stress-inducing factors.",
  };

  const colors = ["blue", "yellow", "pink", "green", "purple", "yellow"];

  return (
    <div
      className="profile-card"
      style={{ width: "60vw", height: "35vw", border: "1px solid #ccc" }}
    >
      <div className="profile-close-icon">
        <CloseIcon onClick={onClose} />
      </div>
      <div className="profile-header">
        <img src={picture} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{user_id}</p>
          <p className="position">{position}</p>
        </div>
      </div>
      <br />
      <div className="flex flex-col overflow-hidden items-center w-full">
        <div className="flex border bg-gray-200 items-center border rounded-[5px]">
          <button
            onClick={() => handleTabChange(0)}
            className={`px-2 py-1 ${
              selectedTab === 0 ? "bg-white" : "bg-gray-200"
            } w-[150px] border rounded-[5px]`}
          >
            Leadership
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`px-2 py-1 ${
              selectedTab === 1 ? "bg-white" : "bg-gray-200"
            } w-[150px] border rounded-[5px]`}
          >
            Competency
          </button>
        </div>
        <div className="w-full sm:w-[480px]">
          <div className="p-3 w-full items-center justify-center">
            <div className="profile-body">
              <div
                className="progress-circle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20%",
                  height: "20%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <StyledCircularProgress
                  variant="determinate"
                  value={progress}
                  size={150}
                />
                <div className="progress-value">
                  {selectedTab === 0 ? potential : competency}%
                </div>
              </div>
              {selectedTab === 0 && (
                <div className="traits">
                  {!selectedTrait ? (
                    <div className="traits-list">
                      <div
                        className="trait"
                        onClick={() => handleTraitClick("Openness")}
                      >
                        <span>Openness</span>
                        <div className="trait-bar">
                          <div
                            className="trait-progress"
                            style={{
                              width: `${traits.openness}%`,
                              backgroundColor: "#FFF500",
                            }}
                          ></div>
                        </div>
                        <span>{traits.openness}</span>
                      </div>
                      <div
                        className="trait"
                        onClick={() => handleTraitClick("Conscientiousness")}
                      >
                        <span>Conscientiousness</span>
                        <div className="trait-bar">
                          <div
                            className="trait-progress"
                            style={{
                              width: `${traits.conscientiousness}%`,
                              backgroundColor: "#AB40FF",
                            }}
                          ></div>
                        </div>
                        <span>{traits.conscientiousness}</span>
                      </div>
                      <div
                        className="trait"
                        onClick={() => handleTraitClick("Extraversion")}
                      >
                        <span>Extraversion</span>
                        <div className="trait-bar">
                          <div
                            className="trait-progress"
                            style={{
                              width: `${traits.extraversion}%`,
                              backgroundColor: "#FF00B8",
                            }}
                          ></div>
                        </div>
                        <span>{traits.extraversion}</span>
                      </div>
                      <div
                        className="trait"
                        onClick={() => handleTraitClick("Agreeableness")}
                      >
                        <span>Agreeableness</span>
                        <div className="trait-bar">
                          <div
                            className="trait-progress"
                            style={{
                              width: `${traits.agreeableness}%`,
                              backgroundColor: "#52FF00",
                            }}
                          ></div>
                        </div>
                        <span>{traits.agreeableness}</span>
                      </div>
                      <div
                        className="trait"
                        onClick={() => handleTraitClick("Neuroticism")}
                      >
                        <span>Neuroticism</span>
                        <div className="trait-bar">
                          <div
                            className="trait-progress"
                            style={{
                              width: `${traits.neuroticism}%`,
                              backgroundColor: "#00D1FF",
                            }}
                          ></div>
                        </div>
                        <span>{traits.neuroticism}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="trait-description">
                      <div className="td-close-icon">
                        <CloseIcon onClick={handleCloseDescription} />
                      </div>
                      <h3>{selectedTrait}</h3>
                      <br />
                      <p>{traitDescriptions[selectedTrait]}</p>
                    </div>
                  )}
                </div>
              )}
              {selectedTab === 1 && (
                <div className="traits">
                  {skills.map((skill, index) => (
                    <div className="trait" key={index}>
                      <span>{skill[0]}</span>
                      <div className="trait-bar">
                        <div
                          className="trait-progress"
                          style={{
                            width: `${skill[1] * 10}%`,
                            backgroundColor: colors[index % colors.length],
                          }}
                        ></div>
                      </div>
                      <span>{`${skill[1] * 10}%`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
