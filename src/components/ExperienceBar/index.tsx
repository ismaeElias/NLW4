export function ExperienceBar(){
  return(
    <header className="experience-bar">
      <span>0 exp</span>
      <div>
        <div style={{width : '50%'}}/>
        <span className="current-experience" style={{left : "50%"}}>300 exp</span>
      </div>
      <span>600 exp</span>
    </header>
  );
}