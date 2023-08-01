import { BlockMath, InlineMath } from 'react-katex';


interface AutoMathProps {
    text: string;
}

const AutoMath: React.FC<AutoMathProps> = ({ text }) => {
    const parts = text.split('$');
    const formattedQuestion = parts.map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>; // Normal text
      } else {
        return <InlineMath math={part} key={index} />; // Math expression
      }
    });
  
    return <p>{formattedQuestion}</p>;
};

export default AutoMath