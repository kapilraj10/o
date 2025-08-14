const Loan = require("../models/Loan"); 

exports.createLoan = async (req, res) => {
  try {
    const { name, amount, duration, interestRate } = req.body; 

    const monthlyInterestRate = interestRate / 12 / 100; 
    const totalInterest = amount * monthlyInterestRate * duration;
    const totalPayable = amount + totalInterest;

    const paidAmount = parseFloat(req.body.paidAmount || 0);
    const remainingAmount = totalPayable - paidAmount;

    const loan = new Loan({
      name,
      amount,
      duration, 
      interestRate,
      totalInterest,
      totalPayable,
      paidAmount,
      remainingAmount,
      monthlyPayable: totalPayable / duration,
      createdBy: req.user.id,
    });

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const { amount, duration, interestRate, paidAmount } = req.body;

    const monthlyInterestRate = interestRate / 12 / 100;
    const totalInterest = amount * monthlyInterestRate * duration;
    const totalPayable = amount + totalInterest;

    const paid = parseFloat(paidAmount) || 0;
    const remainingAmount = totalPayable - paid;

    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalInterest,
        totalPayable,
        paidAmount: paid,
        remainingAmount,
        monthlyPayable: totalPayable / duration,
      },
      { new: true }
    );

    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
