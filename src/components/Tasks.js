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
    this.getTravels();
  }

  getTravels = () => {
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
  };

  handleDeleteTask = (e, task) => {
    return this.props
      .deleteTask(task)
      .then(() => this.getTravels())
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { taskName, travelToShow } = this.state;

    this.props
      .createTask(travelToShow, taskName)
      .then((travel) => {
        this.setState({ taskName: "" }, () => this.getTravels());
      })
      .catch((err) => console.log(err));

    this.setState({ taskName: "" });

  };

  handleDoneTask = (e, task) => {
    const { _id, taskName, taskDeadline, assignTo, taskNote, doneTask } = task;
    let doneTaskState = !doneTask;

    const updatedTask = {
      _id,
      taskName,
      taskDeadline,
      assignTo,
      taskNote,
      doneTask: doneTaskState,
    };

    return this.props
      .editTask(updatedTask)
      .then(() => this.getTravels())
      .catch((err) => console.log(err));
  };

  render() {
    let classDone;
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
            this.state.tasksArr.map(
              (eachTask) => { return (
                (eachTask.doneTask
                  ? (classDone = "done")
                  : (classDone = "undone")),
                
                  <li key={eachTask._id}>
                    <div>
                      <p
                        className={classDone}
                        onClick={(e) => this.handleDoneTask(e, eachTask)}
                      >
                        {eachTask.taskName}
                      </p>
                      <button
                        onClick={(e) => this.handleDeleteTask(e, eachTask)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                
              )}
            )}
        </ul>
      </div>
    );
  }
}

export default withAuth(Tasks);
