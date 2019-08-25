function App() {
  return (
    React.createElement(Calculator, null));

}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      decimalToggle: '',
      formula: '',
      previousResult: '' };


    this.clearDisplay = this.clearDisplay.bind(this);
    this.numberInput = this.numberInput.bind(this);
    this.operator = this.operator.bind(this);
    this.totalNumbers = this.totalNumbers.bind(this);

  }

  clearDisplay() {
    console.log(`clear called`);
    this.setState({
      display: 0,
      decimalToggle: '',
      formula: '',
      previousResult: '' });

  }


  operator(event) {

    let formulaCheck = this.state.formula;

    let formulaLastCharacter = formulaCheck[formulaCheck.length - 1];

    let formula2ndLastCharacter = formulaCheck[formulaCheck.length - 2];

    let operatorCheck = /[\+\-\*\/]/;

    let test = operatorCheck.test(formulaLastCharacter);

    let test2nd = operatorCheck.test(formula2ndLastCharacter);

    if (test === true) {


      let newFormula = '';

      if (event.target.value !== '-') {

        formulaCheck = formulaCheck.slice(0, -1);
        let lastInString = formulaCheck[formulaCheck.length - 1];

        if (test2nd) {
          let formulaTrim = this.state.formula;
          formulaTrim = formulaTrim.slice(0, -2);
          formulaTrim = `${formulaTrim}${event.target.value}`;
          this.setState({
            formula: formulaTrim });

          return;
        }

        newFormula = `${formulaCheck}${event.target.value}`;
      } else {
        newFormula = `${this.state.formula}${event.target.value}`;
      }

      this.setState({
        formula: newFormula });


      return;
    }

    let formula = `${this.state.formula}${event.target.value}`;

    this.setState({
      formula: formula,
      display: ' ',
      decimalToggle: '' },
    () => console.log(this.state.formula));

  }


  totalNumbers() {
    let result = math.evaluate(this.state.formula);
    this.setState({
      display: result,
      previousResult: result,
      formula: result });

  }

  numberInput(inputNumber) {

    if (inputNumber === '.') {
      let newDisplay = `${this.state.display}.`;
      this.setState({
        decimalToggle: 1,
        display: newDisplay });


    }

    if (this.state.display === 0) {
      this.setState({
        display: inputNumber,
        formula: inputNumber });

    } else if (this.state.display !== 0) {
      let newDisplay = `${this.state.display}${inputNumber}`;
      let newFormula = `${this.state.formula}${inputNumber}`;
      this.setState({
        display: newDisplay,
        formula: newFormula });

    }

  }

  render() {
    return (
      React.createElement("div", { className: "calculator" },
      React.createElement("div", { className: "calculator__container" },
      React.createElement(CalculatorDisplay, { formula: this.state.formula, display: this.state.display }),

      React.createElement("div", { className: "calculator__keys__empty_space calculator__empty__top" }, " "),
      React.createElement("button", { className: "button button--clear", id: "clear", onClick: this.clearDisplay }, "C"),
      React.createElement("button", { className: "button button--divide", id: "divide", onClick: this.operator, value: "/" }, " / "),
      React.createElement("button", { onClick: () => this.numberInput(7), className: "button", id: "seven" }, "7"),
      React.createElement("button", { onClick: () => this.numberInput(8), className: "button", id: "eight" }, "8"),
      React.createElement("button", { onClick: () => this.numberInput(9), className: "button", id: "nine" }, "9"),
      React.createElement("button", { className: "button", id: "multiply", onClick: this.operator, value: "*" }, "*"),

      React.createElement("button", { onClick: () => this.numberInput(4), className: "button", id: "four" }, "4"),
      React.createElement("button", { onClick: () => this.numberInput(5), className: "button", id: "five" }, "5"),
      React.createElement("button", { onClick: () => this.numberInput(6), className: "button", id: "six" }, "6"),
      React.createElement("button", { className: "button", id: "subtract", onClick: this.operator, value: "-" }, "-"),

      React.createElement("button", { onClick: () => this.numberInput(1), className: "button", id: "one" }, "1"),
      React.createElement("button", { onClick: () => this.numberInput(2), className: "button", id: "two" }, "2"),
      React.createElement("button", { onClick: () => this.numberInput(3), className: "button", id: "three" }, "3"),
      React.createElement("button", { className: "button", id: "add", onClick: this.operator, value: "+" }, "+"),

      React.createElement("div", { className: "calculator__keys__empty_space" }),
      React.createElement("button", { onClick: () => this.numberInput(0), id: "zero", class: "button button--zero" }, "0"),
      React.createElement("button", { onClick: () => this.numberInput('.'), className: "button", id: "decimal", disabled: this.state.decimalToggle }, "."),
      React.createElement("button", { className: "button", id: "equals", onClick: this.totalNumbers }, "="))));



  }}


function CalculatorDisplay(props) {
  return (
    React.createElement("div", { className: "display__holder" },
    React.createElement("p", { id: "formula", className: "display__holder__formula" }, props.formula),
    React.createElement("p", { id: "display", className: "display__holder__value" }, props.display)));


}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));