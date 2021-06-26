// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import "./index.css";
const documentRoot = document.getElementById("main");

const numbers = [
  {
    id: "clear",
    val: "ac",
  },
  {
    id: "del",
    val: "del",
  },
  {
    id: "seven",
    val: "7",
  },
  {
    id: "eight",
    val: "8",
  },
  {
    id: "nine",
    val: "9",
  },
  {
    id: "four",
    val: "4",
  },
  {
    id: "five",
    val: "5",
  },
  {
    id: "six",
    val: "6",
  },
  {
    id: "one",
    val: "1",
  },
  {
    id: "two",
    val: "2",
  },
  {
    id: "three",
    val: "3",
  },
  {
    id: "zero",
    val: "0",
  },
  {
    id: "decimal",
    val: ".",
  },
];
const operators = [
  {
    id: "divide",
    val: "/",
  },
  {
    id: "multiply",
    val: "*",
  },
  {
    id: "subtract",
    val: "-",
  },
  {
    id: "add",
    val: "+",
  },
  {
    id: "equals",
    val: "=",
  },
];
let input = [];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: "0",
      lastOperator: undefined,
      lastPressed: undefined,
    };
  }
  handleClick = (e) => {
    let { innerText } = e.target;
    let { currentNumber, lastOperator } = this.state;
    switch (innerText) {
      case "AC": {
        this.setState({
          currentNumber: "0",
        });
        input = [];
        break;
      }
      case ".": {
        if (!currentNumber.includes(".")) {
          this.setState({
            currentNumber: currentNumber + innerText,
          });
          input.push(innerText);
        }
        break;
      }
      case "=": {
        if (input[0] !== "/" && input[0] !== "*") {
          if (
            Boolean(
              operators.find(function (element) {
                return element.val === input[input.length - 1];
              })
            )
          ) {
            input.pop();
          }
          let evaluated = eval(input.join(""));
          this.setState({
            currentNumber: evaluated,
            lastOperator: undefined,
          });
          input.push("=", evaluated);
        }
        break;
      }
      default: {
        console.log(lastOperator, innerText);
        if (input.includes("=")) {
          this.setState({
            currentNumber: innerText,
            lastOperator: innerText,
          });
          input = [input[input.length - 1], innerText];
          return;
        }

        if (
          Boolean(
            operators.find(function (element) {
              return element.val === innerText;
            })
          )
        ) {
          if ((lastOperator && innerText === "-") || !lastOperator) {
            this.setState({
              currentNumber: innerText,
              lastOperator: innerText,
            });
            input.push(innerText);
          } else {
            this.setState({
              currentNumber: innerText,
              lastOperator: innerText,
            });
            input.pop();

            if (
              Boolean(
                operators.find(function (element) {
                  return element.val === input[input.length - 1];
                })
              )
            ) {
              input.pop();
            }
            input.push(innerText);
          }

          return;
        }

        if (currentNumber === "0" || lastOperator) {
          this.setState({
            currentNumber: innerText,
            lastOperator: undefined,
          });
        } else {
          this.setState({
            currentNumber: currentNumber + innerText,
            lastOperator: undefined,
          });
        }
        input.push(innerText);
      }
    }
  };
  render() {
    let { currentNumber } = this.state;
    return (
      <div className="calculatrice-container">
        <div className="input-ouput">
          <div className="ouput">
            <span>{input.join(" ")}</span>
          </div>
          <div id="display">
            <span>{currentNumber}</span>
          </div>
        </div>
        <div className="calculatrice-pad">
          <div className="operateur">
            {operators.map((ops, id) => {
              return (
                <span
                  id={ops.id}
                  key={id}
                  className="text-white border rounded-circle "
                  onClick={this.handleClick}
                >
                  {ops.val}
                </span>
              );
            })}
          </div>
          <div className="numbers">
            {numbers.map((num, id) => {
              return (
                <span
                  id={num.id}
                  key={id}
                  className="text-white border rounded-circle "
                  onClick={this.handleClick}
                >
                  {num.val}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, documentRoot);
