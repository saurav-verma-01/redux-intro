import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
};

// store.dispatch({ type: "account/deposit", payload: 500 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 250 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 2000, purpose: "Buy a Car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

//
//  Customer Store
//

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "account/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
};

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// Account Dispatchers

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1500));
store.dispatch(withdraw(400));
store.dispatch(requestLoan(50000, "Home Loan"));
store.dispatch(payLoan());
console.log(store.getState());

// Customer Dispatchers

store.dispatch(createCustomer("Saurav Verma", "125478963254"));
console.log(store.getState());

store.dispatch(deposit(5000));
console.log(store.getState());
