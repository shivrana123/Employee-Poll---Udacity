import { useState, useEffect } from "react";
import QuestionRow from "./QuestionRow";

const Home = (props) => {
  console.log(props);
  const { authedUser, users, questions } = props;
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([]);

  useEffect(() => {
    let answered = [];
    let unAnswered = [];
    for (const id in questions) {
      const question = questions[id];
      const voted = question.optionOne.votes
        .concat(question.optionTwo.votes)
        .some((id) => id === authedUser);
      voted ? answered.push(question) : unAnswered.push(question);
    }
    const sorted = (arr) => arr.sort((a, b) => b.timestamp - a.timestamp);
    setAnsweredQuestions(sorted(answered));
    setUnAnsweredQuestions(sorted(unAnswered));
  }, [authedUser, questions]);
  return (
   
    <>
    <div className="table" style={{
      
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      fontSize: '30px',
      textAlign: 'center',
      alignItems: 'center',
      
  }}>
    <div>
      <p >Unanswered Questions</p>  
    </div>
<div>
    {unAnsweredQuestions.map((question) => {
                      return <QuestionRow key={question.id}  question={question} users={users} />;
                    })}
   </div>
      <p>Answered Questions</p>  
    <div>
    {answeredQuestions.map((question) => {
                      return <QuestionRow key={question.id}  question={question} users={users} />;
                    })}
    </div>
   </div>
</>
  );
};

export default Home;
