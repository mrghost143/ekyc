const resetInput = (e) => {
  let CursorCaret = e.target.selectionStart;
  let PreviousValue =
    e.target.value.slice(0, CursorCaret - 1) +
    e.target.value.slice(CursorCaret);
  e.target.value = PreviousValue;
  e.target.setSelectionRange(CursorCaret - 1, CursorCaret - 1);
};
export const panInputResist = (e) => {
  let CursorCaret = e.target.selectionStart;
  let afterEnter = e.target.value;
  let PreviousValue =
    e.target.value.slice(0, CursorCaret - 1) +
    e.target.value.slice(CursorCaret);
  let enteredvalue = e.target.value.slice(CursorCaret - 1, CursorCaret);
  if (afterEnter.length > 10) {
    resetInput(e);
  } else {
    if (
      (CursorCaret >= 0 && CursorCaret <= 3) ||
      CursorCaret === 5 ||
      CursorCaret === 10
    ) {
      if (afterEnter.length > PreviousValue.length) {
        if (!enteredvalue.match(/[A-Za-z]/i)) {
          resetInput(e);
        }
      }
    }
    if (CursorCaret === 4) {
      if (afterEnter.length > PreviousValue.length) {
        if (!enteredvalue.match(/[Pp]/i)) {
          resetInput(e);
        }
      }
    }
    if (CursorCaret >= 6 && CursorCaret <= 9) {
      if (afterEnter.length > PreviousValue.length) {
        if (!enteredvalue.match(/[0-9]/i)) {
          resetInput(e);
        }
      }
    }
  }
};
export const panInputResistnotP = (e) => {
  let CursorCaret = e.target.selectionStart;
  let afterEnter = e.target.value;
  let PreviousValue =
    e.target.value.slice(0, CursorCaret - 1) +
    e.target.value.slice(CursorCaret);
  let enteredvalue = e.target.value.slice(CursorCaret - 1, CursorCaret);
  if (afterEnter.length > 10) {
    resetInput(e);
  } else {
    if ((CursorCaret >= 0 && CursorCaret <= 5) || CursorCaret === 10) {
      if (afterEnter.length > PreviousValue.length) {
        if (!enteredvalue.match(/[A-Za-z]/i)) {
          resetInput(e);
        }
      }
    }
    if (CursorCaret >= 6 && CursorCaret <= 9) {
      if (afterEnter.length > PreviousValue.length) {
        if (!enteredvalue.match(/[0-9]/i)) {
          resetInput(e);
        }
      }
    }
  }
};
export const IDInput = (e) => {
  if (e.target.value.length > 20) {
    resetInput(e);
  }
};
export const NumberInput = (e) =>
  (e.target.value = e.target.value.replace(/[^0-9]/g, ""));

export const PhoneNumberInput = (e) => {
  if (e.target.value.length >= 1) {
    if (!["6", "7", "8", "9"].includes(e.target.value.charAt(0))) {
      e.target.value = e.target.value.slice(1, e.target.value.length);
    }
  }
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};
export const NameInput = (e) => {
  if (e.target.value.length >= 1) {
    if (e.target.value.charAt(0) === ".") {
      e.target.value = e.target.value.slice(1, e.target.value.length);
    }
  }
  e.target.value = e.target.value.trimStart();
  e.target.value = e.target.value.replace(/[^A-Za-z.\s]/g, "");
};

export const AadharCheck = (e) => {
  let CursorCaret = e.target.selectionStart;
  let PreviousValue = e.target.value.slice(0, CursorCaret - 1) + e.target.value.slice(CursorCaret);
  let EnteredValue = e.target.value.slice(CursorCaret - 1, CursorCaret);
  if (e.target.value.length < 8 || e.target.selectionStart <= 8) {
      e.target.value = "********";
  } else if (e.target.value.length <= 12) {
      if (!EnteredValue.match(/[0-9]/i)) {
          e.target.value = PreviousValue;
      }
  } else {
      e.target.value = PreviousValue;
  }
};
export const CharInput = (e) =>
  (e.target.value = e.target.value.replace(/[^0-9A-Za-z]/g, ""));

