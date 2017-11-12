// @flow
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import styles from './PingGraph.css';

type Props = {
  pingsArray: [],
  resetPing: () => void,
  pingInterval: string,
}

class PingGraph extends Component<Props> {
  render() {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.graphContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={this.props.pingsArray}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <XAxis
                dataKey="index"
                hide
              />
              <YAxis
                type="number"
              />
              {/** $FlowFixMe **/}
              <Tooltip content={<CustomTooltip data={this.props.pingsArray} />} />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="linear"
                dataKey="ms"
                animationDuration={Number.parseInt(this.props.pingInterval, 10)}
              />
              <Area
                type="linear"
                dataKey="ms"
                animationDuration={Number.parseInt(this.props.pingInterval, 10)}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.graphFooter}>
          <FlatButton
            primary
            label="RESET"
            onClick={this.props.resetPing}
          />
        </div>
      </div>
    );
  }
}

type TooltipProps = {
  data: [],
  label: any,
  active: boolean | any
};

const CustomTooltip = (props: TooltipProps) => {
  const { data, label, active } = props;
  if (typeof label === 'undefined' || !active)
    return null;
  if (data[label - 1].error)
    return null;
  const ms = data[label - 1].ms;
  const date = new Date(data[label - 1].timestamp);
  return (
    <div className={styles.tooltipContainer}>
      <p className={styles.tooltipLabel}>{`${ms} ms`}</p>
      <p className={styles.tooltipDate}>
        {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      </p>
    </div>
  );
};

export default PingGraph;
