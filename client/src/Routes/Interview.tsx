import React, { useState } from "react";
import * as ApiService from "../Util/ApiService";
import InterviewForm from "../Components/InterviewForm";
import CompVoice from "../Components/CompVoice";
import Speech from "../Components/Speech";

const Interview: React.FC<InterviewProps> = ({
  currentUser,
  setCurrentUser,
  isAuthenticated,
  handleGetUser,
  handleCreateUser,
}) => {
  const [formValues, setFormValues] = useState<InterviewFormValues>({
    jobLevel: "",
    companyName: "",
    jobField: "",
    jobTitle: "",
  });
  const [showInterviewForm, setShowInterviewForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interviewId, setInterviewId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [interviewData, setInterviewData] = useState<Array<{ question: string; answer: { audioUrl: string; transcript: string } }>>([]);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [userAnswer, setUserAnswer] = useState<{ audioUrl: string; transcript: string } | null>(
    null
  );

  const newInterview = async () => {
    const res = await ApiService.createInterview(
      currentUser.id,
      formValues.jobLevel,
      formValues.companyName,
      formValues.jobField,
      formValues.jobTitle
    );
    if (res.error) {
      console.log(res.error);
    } else {
      setInterviewId(res.interviewId);
    }
  };

  const getFirstQuestion = async () => {
    const res = await ApiService.retrieveFirstQuestion({
      interviewId: interviewId,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${formValues.companyName}. It is for a ${formValues.jobLevel} position in the field of ${formValues.jobField}. Begin by asking an introductory question. After you receive a response from the user, continue asking questions in the style of an interview. If a response requires a follow up, then you can ask a follow up question. However, after two or three follow up questions, go back to asking another original question, in the normal style of an interview.`,
    });
    if (res.error) {
      console.log(res.error);
    } else {
      setQuestion(res.message);
    }
  };

  const getAnotherQuestion = async () => {
    const res = await ApiService.retrieveAnotherQuestion({
      interviewId: interviewId,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${formValues.companyName}. It is for a ${formValues.jobLevel} position in the field of ${formValues.jobField}. Begin by asking an introductory question. After you receive a response from the user, continue asking questions in the style of an interview. If a response requires a follow up, then you can ask a follow up question. However, after two or three follow up questions, go back to asking another original question, in the normal style of an interview.`,
    });
    if (res.error) {
      console.log(res.error);
    } else {
      setQuestion(res.message);
    }
  };

  const handleFormSubmit = async (values: InterviewFormValues) => {
    setFormValues(values);
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview();
    await getFirstQuestion();
  };

  const saveUserResponse = async () => {
    if (userAnswer) {
      const res = await ApiService.updateInterview(
        interviewId,
        question,
        userAnswer.audioUrl,
        userAnswer.transcript,
        "feedback",
        5,
      );
      if (res.error) {
        console.log(res.error);
      } else {
        setInterviewData((prevData) => [...prevData, { question, answer: userAnswer }]);
        if (questionCount < 7) {
          setQuestionCount((count) => count + 1);
          getAnotherQuestion();
        }
      }
    }
  };  

  return (
    <>
      {showInterviewForm && <InterviewForm onFormSubmit={handleFormSubmit} />}
      {formSubmitted && (
        <>
          <CompVoice
            message={question}
            setIsInterviewerSpeaking={setIsInterviewerSpeaking}
          />
          <Speech
            isInterviewerSpeaking={isInterviewerSpeaking}
            onAnswerRecorded={(audioUrl: any, transcript: any) => setUserAnswer({ audioUrl, transcript })}
            onSaveUserResponse={saveUserResponse}
          />
        </>
      )}
    </>
  );
};

export default Interview;
