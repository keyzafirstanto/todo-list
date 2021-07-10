import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../components/TodoItem";
import Axios from "axios";
import { connect } from "react-redux";
import {
  incrementTodoCount,
  changeTodoCount,
  decrementTodoCount,
  fetchTodoGlobal,
} from "../redux/actions/todo";

class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: "",
  };

  // untuk mendapatkan data dari api
  fetchTodo = () => {
    // akan mengirim sebuah promise (.then) setelah melaksanakan http request
    // response dari api akan dikirim di response
    Axios.get("http://localhost:2000/todo")
      .then((response) => {
        console.log(response.data);
        this.setState({ todoList: response.data });
        this.props.changeTodo(response.data.length);
      })
      .catch((err) => {
        alert(`Terjadi kesalahan di server.`);
      });
  };

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
      .then(() => {
        alert("Berhasil delete Todo!");
        this.props.fetchTodoGlobal();
      })
      .catch((err) => {
        alert(`Terjadi kesalahan di server.`);
      });
  };

  // Axios.Patch
  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      isFinished: true,
    })
      .then(() => {
        alert(`Berhasil Complete Todo!`);
        this.props.fetchTodoGlobal();
      })
      .catch((err) => {
        alert(`Terjadi kesalahan di server.`);
      });
  };

  // method
  renderTodoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <TodoItem
          completeTodoHandler={this.completeTodo}
          deleteTodoHandler={this.deleteTodo}
          todoData={val}
        />
      );
    });
  };

  // cara memanipulasi state/ganti value state\
  // .post menambahkan data ada 2 parameter (link db.json dan apa yg mau diinput)
  addTodo = () => {
    Axios.post("http://localhost:2000/todo", {
      activity: this.state.inputTodo,
      isFinished: false,
    })
      .then(() => {
        alert("Berhasil menambahkan Todo!");
        this.props.fetchTodoGlobal();
      })
      .catch((err) => {
        alert(`Terjadi kesalahan di server.`);
      });
  };

  inputHandler = (event) => {
    // event.target.value menyimpan input dari text yg diketik di browser
    this.setState({ inputTodo: event.target.value });
  };

  // componentDidMount biasanya digunakan untuk pengambilan data dari api
  componentDidMount() {
    this.props.fetchTodoGlobal();
  }

  // componentDidUpdate() {
  //   alert(`Component Update`);
  // }

  render() {
    return (
      <div className="container mt-3">
        <button className="btn btn-info text-white" onClick={this.fetchTodo}>
          Get My Todo List {this.props.todoGlobalState.todoCount}
        </button>
        {this.renderTodoList()}
        <div className="mt-3">
          <input onChange={this.inputHandler} className="mx-3" type="text" />
          <button onClick={this.addTodo} className="my-1 btn btn-primary">
            Add Todo
          </button>
          <button
            onClick={this.props.incrementTodo}
            className="btn btn-warning"
          >
            Increment Todo
          </button>
          <button onClick={this.props.decrementTodo} className="btn btn-dark">
            Decrement Todo
          </button>
          <button
            onClick={() => this.props.changeTodo(7)}
            className="btn btn-info"
          >
            Change Todo
          </button>
        </div>
      </div>
    );
  }
}

// menjadikan global state lewat props
const mapStateToProps = (state) => {
  // state = {
  // todo:todo
  // }
  // state.todo.inputCount
  return {
    testingProps: 0,
    todoGlobalState: state.todo,
  };
};

// menjadikan dispatch menjadi props
const mapDispatchToProps = {
  incrementTodo: incrementTodoCount,
  decrementTodo: decrementTodoCount,
  changeTodo: changeTodoCount,
  fetchTodoGlobal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);

// props basically adalah data yg di passing dr parent ke child
// contoh function App()/parent. <TOdoItem> / child
// syntax manggil props : {this.props.namaProps}
// state adalah variable biasa yg menampung brbagai macam data
// syntax manggil state: {this.state.value}
// fungsi axios itu untuk mmbantu kita untuk mengirim request ke sebuah server
// semua function/method yg iinput di onChange pasti auto keisi

// function asynchronous
// a bisa lgsung d tanpa harus nunggu b dan c selesai

// componentDidMount() : ketriger jika component sudah memanggil method render()
// masuk Component -> render -> componentDidMount()

// componentDidUpdate(): ke trigger jika ada pertumbuhan atau perkembangan suatu component
// setState/perubahan props -> render -> componentDidUpdate()
// didalam component didUpdate, berhati2hatilah melakukan setState: jangan staate this.state() didalem
// componentDidUpdate()

// componentWillUnmount() {}: ke trigger jika ada component di hapus (kepanggil duluan)
//  render -> componentWillUnmount() -> component dihapus

// lifecyle methods hanya berlaku di class component

// !method { connect } berfungsi untuk menyambungkan si komponen(TodoPage) kita ke store
// !parameter (state) 114 menyimpan object yg ada di dalam parameter combineReducers
// !PAYLOAD BERGUNA SAAT KITA HENDAK MENGIRIM DARA KEDALAM REDUCER

// action creator(decremeentTodoCount, changeTodoCount, dan incrementTodCOunt) hanya boleh berisi prose synchronous, gaboleh ada proses async
