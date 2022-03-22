import React from 'react'

import Faq from "./Faq.view";
import { StyledFaqList } from "./Faq.styled";

const faqData = [
  { 
    question: "Bagaimana Cara Login?",
    answer: "Frequently Asked Question"
  },
  {
    question: "Testing?",
    answer: "Coffee with fudge ripple, or homemade strawberry."
  }
];

const FaqList = () => {
  return (
    <StyledFaqList>
        <div className={'faqTitle'} id='faqTop'>FAQ</div>
      {faqData.map((faq, i) => (
        <Faq key={"faq_" + i} question={faq.question} answer={faq.answer} />
      ))}
    </StyledFaqList>
  );
};

export default FaqList;