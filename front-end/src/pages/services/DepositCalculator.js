import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

// Data for interest rates and deposit amounts
const depositPlans = {
  "12 Months @ 8.5%": { rate: 0.085 },
  "24 Months @ 9%": { rate: 0.09 },
  "36 Months @ 10%": { rate: 0.10 },
  "60 Months @ 10.5%": { rate: 0.105 },
  "99 Months Double": { rate: 1.0 },
};

const DepositCalculator = ({ close }) => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState("12 Months @ 8.5%");
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateMaturityAmount = () => {
    const selectedPlan = depositPlans[duration];
    let calculatedAmount;

    if (duration === "99 Months Double") {
      calculatedAmount = amount * 2;
    } else {
      const interest = selectedPlan.rate;
      const timeInYears = parseInt(duration.split(" ")[0]) / 12;
      calculatedAmount = amount * Math.pow(1 + interest, timeInYears);
    }

    setMaturityAmount(calculatedAmount.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <button onClick={close} style={styles.closeButton}>✖</button>
      <h2 style={styles.title}>Deposit Calculator</h2>
      <div style={styles.inputGroup}>
        <label>Deposit Amount (₹):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Select Duration:</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={styles.input}
        >
          {Object.keys(depositPlans).map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>
      <button onClick={calculateMaturityAmount} style={styles.button}>
        Calculate
      </button>
      {maturityAmount && (
        <div style={styles.result}>
          <h3>Maturity Amount: ₹{maturityAmount}</h3>
        </div>
      )}
    </div>
  );
};

const EMICalculator = ({ close }) => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [term, setTerm] = useState(12);
  const [emi, setEMI] = useState(null);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emiAmount = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                      (Math.pow(1 + monthlyRate, term) - 1);
    setEMI(emiAmount.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <button onClick={close} style={styles.closeButton}>✖</button>
      <h2 style={styles.title}>EMI Calculator</h2>
      <div style={styles.inputGroup}>
        <label>Principal Amount (₹):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(parseFloat(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Rate of Interest (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Term (Months):</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(parseInt(e.target.value))}
          style={styles.input}
        />
      </div>
      <button onClick={calculateEMI} style={styles.button}>
        Calculate EMI
      </button>
      {emi && (
        <div style={styles.result}>
          <h3>Monthly EMI: ₹{emi}</h3>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [showDepositCalculator, setShowDepositCalculator] = useState(false);
  const [showEMICalculator, setShowEMICalculator] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowEMICalculator(!showEMICalculator)}
        style={styles.floatingButton}
        title="Open EMI Calculator"
      >
        <FontAwesomeIcon icon={faCalculator} />
      </button>

      {showEMICalculator && (
        <div style={styles.floatingCalculator}>
          <EMICalculator close={() => setShowEMICalculator(false)} />
        </div>
      )}

      <button
        onClick={() => setShowDepositCalculator(!showDepositCalculator)}
        style={styles.floatingButton}
        title="Open Deposit Calculator"
      >
        <FontAwesomeIcon icon={faCalculator} />
      </button>

      {showDepositCalculator && (
        <div style={styles.floatingCalculator}>
          <DepositCalculator close={() => setShowDepositCalculator(false)} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    position: "relative",
    zIndex: 10,
  },
  title: {
    marginBottom: "15px",
    fontSize: "1.5em",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#333",
  },
  floatingButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "15px",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
    transition: "transform 0.2s",
  },
  floatingCalculator: {
    position: "fixed",
    top: "100px",
    left: "20px",
    zIndex: 1000,
  },
  closeButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default App;
