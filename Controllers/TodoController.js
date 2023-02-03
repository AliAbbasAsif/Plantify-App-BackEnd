const TodoModel = require("../models/Crud");
const TodoController = {
  getTodo: (request, response) => {
    TodoModel.find({}, (error, data) => {
      if (error) {
        response.json({
          message: `Internal Error: ${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully Get`,
          status: true,
          data: data,
        });
      }
    });
  },
  AddTodo: (request, response) => {
    const body = request.body;
    if (!body.todo) {
      response.json({
        message: "Required Fields Are Missing",
        status: false,
      });
    }
    const objtoSend = {
      todo: body.todo,
    };
    TodoModel.create(objtoSend, (error, data) => {
      if (error) {
        response.json({
          message: `Internal Error: ${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully send`,
          status: true,
          data,
        });
      }
    });
    console.log(body, "body");
  },
  EditTodo: (request, response) => {
    const body = request.body;
    console.log(body);
    if (!body.todo) {
      response.json({
        message: "Required Fields Are Missing",
        status: false,
      });
    }
    const objtoSend = {
      todo: body.todo,
    };
    TodoModel.findByIdAndUpdate(body.id, objtoSend, (error, data) => {
      if (error) {
        response.json({
          message: `Internal Error: ${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully send`,
          status: true,
          data,
        });
      }
    });
    console.log(body, "body");
  },
  DeleteTodo: (request, response) => {
    const { id } = request.params;
    TodoModel.findByIdAndDelete(id, (error, data) => {
      if (error) {
        response.json({
          message: `Internal Error: ${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully Deleted`,
          status: true,
          data: data,
        });
      }
    });
  },
};

module.exports = TodoController