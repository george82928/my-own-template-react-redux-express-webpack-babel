import React from "react";
import App from "./App";

describe("<App />", () => {
  it("calls componentDidMount", () => {
    const wrapper = mount(<App />);
    expect(wrapper).to.be.exist;
  });
});
