import React, { Component } from "react";
// import { withServices } from "../lib/Services/ServicesProvider";
import { withAuth } from "../lib/Services/AuthProvider";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelToShow: "",
      tasksArr: [],
      travelId: this.props.match.params.id,
      taskName: "",
    };
  }

  componentDidMount() {
    return this.props
      .getTravelsList()
      .then((resp) =>
        resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
      )
      .then((res) =>
        this.setState({
          tasksArr: res[0].tasks,
          travelToShow: res[0],
          taskName: "",
        })
      )
      .catch((err) => console.log(err));
  }

  // componentDidUpdate() {
  //   return this.props
  //     .getTravelsList()
  //     .then((resp) =>
  //       resp.filter((eachTravel) => eachTravel._id === this.state.travelId)
  //     )
  //     .then((res) =>
  //       this.setState({ tasksArr: res[0].tasks, travelToShow: res[0] })
  //     )
  //     .catch((err) => console.log(err));
  // }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { taskName, travelToShow } = this.state;

    this.props.createTask(travelToShow, taskName);

    this.setState({ taskName: "" });
  };

  // completeTask = (task) => {
  //   let { doneTask } = task;
  //   let taskIsDone = doneTask
  //   // !taskIsDone ? taskIsDone = true : taskIsDone = false 
  //   switch(taskIsDone) {
  //     case true:
  //       taskIsDone = false;
  //       break;
  //     case false: 
  //       taskIsDone = true;
  //       break;
  //     default:
  //       break;
  //   }
  //   console.log('esto', taskIsDone)
  //   this.props.editTask(doneTask)
    

  // };

  render() {
    return (
      <div className="toDoList-container">
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="taskName"
            value={this.state.taskName}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add task" />
        </form>
        <ul>
          {this.state.tasksArr &&
            this.state.tasksArr.map((eachTask) => (
              <li key={eachTask._id}>
                <div>
                  <p>
                    {eachTask.taskName}
                  </p>
                  <button onClick={() => this.props.deleteTask(eachTask)}>
                    X
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withAuth(Tasks);
