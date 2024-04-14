import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    prevPrompts,
    prevResults,
  } = React.useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <img src={assets.dr_icon} alt="" className="logo" />
        <img src={assets.user_icon} alt="" className="Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,DR</span>
              </p>
              <p>How can I help you Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>what is latest code for diagnosis in the middle east? </p>
                <img src={assets.compass_icon} alt="" className="Icon" />
              </div>
              <div className="card">
                <p>what is latest code for diagnosis in the middle east? </p>
                <img src={assets.bulb_icon} alt="" className="Icon" />
              </div>
              <div className="card">
                <p>what is latest code for diagnosis in the middle east? </p>
                <img src={assets.message_icon} alt="" className="Icon" />
              </div>
              <div className="card">
                <p>what is latest code for diagnosis in the middle east? </p>
                <img src={assets.code_icon} alt="" className="Icon" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              {prevPrompts.slice(0, -1).map((prevPrompt, index) => (
                <div key={index}>
                  <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{prevPrompt}</p>
                  </div>
                  <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {
                      <p
                        dangerouslySetInnerHTML={{ __html: prevResults[index] }}
                      ></p>
                    }
                  </div>
                </div>
              ))}

              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter the patient case"
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input.trim() && (
                <button disabled={loading} onClick={() => onSent()}>
                  <img src={assets.send_icon} alt="" />
                </button>
              )}
            </div>
          </div>
          <p className="bottom-info">
            This model may display inaccurate info, including info about newer
            medicine refrences, so double-check its response
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
