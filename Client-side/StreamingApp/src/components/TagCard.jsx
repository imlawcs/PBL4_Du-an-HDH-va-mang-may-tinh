import '../assets/css/TagCard.css'


export default function TagCard({name}) {
    return(
      <div className="tag__card league-spartan-semibold fs__small-2">
        <span>{name}</span>
      </div>
    );
}