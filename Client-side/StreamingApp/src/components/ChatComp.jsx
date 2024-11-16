import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/ChatComp.css'
import BtnIcon from './BtnIcon';
import IconCard from './IconCard';
import { faCrown, faDiamond, faVideo, faWrench } from '@fortawesome/free-solid-svg-icons';

export default function ChatComp(props) {
    const getRandomHexColor = () => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${('000000' + color).slice(-6)}`;
    };
    const renderBadge = () => {
        switch (props.badge) {
            case 'moderator':
                return (
                    <>
                        <FontAwesomeIcon icon={faWrench} style={{
                            color: "#fff",
                            backgroundColor: "#228B22",
                            padding: '0.3rem',
                            alignSelf: 'center',
                            borderRadius: '0.2em'
                        }} />&emsp;
                    </>
                );
            case 'owner':
                return (
                    <>
                        <FontAwesomeIcon icon={faVideo} style={{
                            color: "#fff",
                            backgroundColor: "crimson",
                            padding: '0.3rem',
                            alignSelf: 'center',
                            borderRadius: '0.2em',
                        }} />&emsp;
                    </>
                );
            case 'vip':
                return (
                    <>
                        <FontAwesomeIcon icon={faDiamond} style={{
                            color: "#fff",
                            backgroundColor: "#FF3FCF",
                            padding: '0.3rem',
                            alignSelf: 'center',
                            borderRadius: '0.2em',
                        }} />&emsp;
                    </>
                );
            default:
                return null;
        }
    };
    return(
        <>
        <div className="chat__comp">
            <span className="league-spartan-light fs__normal-2 citizenship">&ensp;{props.timeStamp}&ensp;</span>
            {props.badge && renderBadge()}
            <span className="league-spartan-semibold fs__normal-2 citizenship">
                {props.userName}:&emsp;
            </span>
            <span className="league-spartan-regular fs__normal-2 citizenship">
                {props.chatContext}
            </span>
            &emsp;
        </div>
        </>
    );
}