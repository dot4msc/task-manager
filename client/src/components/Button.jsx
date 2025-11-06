import './Button.css';

export default function Button({text, fn}) {
  return(
    <button onClick={fn}>{text}</button>
  );
}