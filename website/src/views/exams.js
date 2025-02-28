import React from "react";
import { useTranslation } from "react-i18next";
import RegularContent from "components/subviews";

const Exams = () => {
  const { t } = useTranslation();
  const exams = t("international_exams", { returnObjects: true });

  return (
    <RegularContent>
        <div className="exam-section">
      <h2 className="exam-title">{exams.title}</h2>
      <p className="exam-description">{exams.description}</p>

      <div className="exam-container">
        {exams.languages.english && (
          <div className="exam-card">
            <h3 className="exam-language">{exams.languages.english.title}</h3>
            <p className="exam-language-description">{exams.languages.english.description}</p>
            <img src={require(`assets/media/images/${exams.languages.english.image}`)} alt="English Exams" className="exam-image" />
          </div>
        )}

        {Object.entries(exams.languages).map(([key, data]) => (
          key !== "english" && (
            <div className="exam-card" key={key}>
              <h3 className="exam-language">{data.title}</h3>
              <p className="exam-language-description">{data.description}</p>
              <div className="exam-list">
                {data.exams.map((exam, index) => (
                  <div className="exam-item" key={index}>
                    <img src={require(`assets/media/images/${exam.logo}`)} alt={exam.name} className="exam-logo" />
                    <div>
                      <h4 className="exam-name">{exam.name}</h4>
                      <p className="exam-text">{exam.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
    </RegularContent>
  );
};

export default Exams;
