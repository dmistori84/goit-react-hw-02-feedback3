import { Component } from "react";
import Feedback from "./Feedback/Feedback";
import Statistics from "./Statistics/Statistics";
import Section from "./Section/Section";
import Notification from "./Notification/Notification";

export class App extends Component {
  state = {
        good: 0,
        neutral: 0,
        bad: 0
  }
  
  handleClick = (event) => {
    const currentBtn = event.target.name;
    this.setState(prevState => ({ [currentBtn]: (prevState[currentBtn] + 1)
    }))
  }

  countTotalFeedback=()=>{
    return (this.state.good + this.state.neutral + this.state.bad)
  }

  countPositiveFeedbackPercentage = () => {
    return 100 * this.state.good / (this.state.good + this.state.neutral + this.state.bad)
  }

  render() { 
    const totalData = this.countPositiveFeedbackPercentage();
    return (
      <div>
        <Section title="Please leave feedback">
          <Feedback onLeaveFeedback={this.handleClick} />
        </Section>
        
        <Section title="Statistics">      
          {totalData ?
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage().toFixed(0)}
            /> :
            <Notification message="There is no feedback" />
          }                 
        </Section>  
      </div>
      
    )          
  }
}

export default App;
