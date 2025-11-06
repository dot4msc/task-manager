import './Button.css';

export default function Button({type, text, fn}) {
  return(
    <button type={type || "button"} onClick={fn}>{text}</button>
  );
}