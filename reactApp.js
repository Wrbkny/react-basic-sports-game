// An App component under which all other components will be added

class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0,
    };
    this.shotSound = new Audio("./assets/audio/backboard.wav");
    this.scoreSound = new Audio("./assets/audio/success.wav");
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;
      this.scoreSound.play();
      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };
  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }
    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div className="picture">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong>
          {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong>
          {this.state.score}
        </div>
        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Wecome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  );
}

function App(props) {
  const rockets = {
    name: "New Jersey Rockets",
    logoSrc: "./assets/images/rocket2.svg",
  };
  const wolves = {
    name: "New York Wolves",
    logoSrc: "./assets/images/wolve.svg",
  };
  const gators = {
    name: "Miami Gators",
    logoSrc: "./assets/images/krokodil.svg",
  };
  const dragons = {
    name: "Utah Dragons",
    logoSrc: "./assets/images/dragon.svg",
  };

  return (
    <div className="App">
      <Game
        venue="Barclays Sports Arena"
        homeTeam={rockets}
        visitingTeam={wolves}
      />
      <Game
        venue="Madison Square Garden"
        homeTeam={gators}
        visitingTeam={dragons}
      />
    </div>
  );
}

// Render the App
ReactDOM.render(<App />, document.getElementById("root"));
