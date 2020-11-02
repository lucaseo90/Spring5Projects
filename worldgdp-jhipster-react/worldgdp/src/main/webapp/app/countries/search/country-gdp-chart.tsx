import {VictoryChart, VictoryLine} from "victory";
import React from "react";

class CountryGdpChart extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryLine
          data={
            [
              {x: 1, y: 2},
              {x: 2, y: 3},
              {x: 3, y: 5},
              {x: 4, y: 4},
              {x: 5, y: 7}
            ]}
        />
      </VictoryChart>
    );
  }
}

export default CountryGdpChart;
