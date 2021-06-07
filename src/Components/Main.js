import React, { Component } from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';

const tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
    };
  }

  createTask = (task) => {
    if (task.trim() === '') {
      alert("Task can't be empty");
      return;
    }
    tasks.push({ task, isCompleted: false });
    console.log(task);
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  toggleTask = (taskId) => {
    const taskItem = tasks[taskId];
    taskItem.isCompleted = !taskItem.isCompleted;
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  deleteTask = (taskId) => {
    tasks.splice(taskId, 1);
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  editTask = (taskId, task) => {
    const taskItem = tasks[taskId];
    taskItem.task = task;
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  render() {
    return (
      <div className="main">
        <h1>
          <div>
            <img
              src="https://store-images.s-microsoft.com/image/apps.65408.9007199266251942.0c0e7f8d-7313-47d7-83e8-c34fea5d6188.1d03a141-61d5-4864-b738-9e0bb6abab53?mode=scale&q=90&h=200&w=200&background=%23009000"
              alt="logo"
              className="mainLogo"
            />
          </div>
          <div className="mainText">
            TODO app by &nbsp;
            <span>
              <a
                href="https://www.linkedin.com/in/jawahar-babu/"
                target="_blank"
                className="myLink"
              >
                JB
              </a>
            </span>
          </div>
        </h1>
        <div className="content">
          <CreateTask createTask={this.createTask} />
          <br />
          <TaskList
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            toggleTask={this.toggleTask}
          />
        </div>
      </div>
    );
  }
}
