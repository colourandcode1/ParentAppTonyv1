import React from "react";
import Svg, { Path, Polyline, Circle, Line, Rect, Polygon } from "react-native-svg";

const strokeProps = (color, width = 2) => ({
  stroke: color,
  strokeWidth: width,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
});

export const Icons = {
  Home: ({ active, ...rest }) => {
    const c = active ? "#1B6B4A" : "#94A3B8";
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" {...rest}>
        <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" {...strokeProps(c)} />
        <Polyline points="9 22 9 12 15 12 15 22" {...strokeProps(c)} />
      </Svg>
    );
  },
  Child: ({ active, ...rest }) => {
    const c = active ? "#1B6B4A" : "#94A3B8";
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" {...rest}>
        <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" {...strokeProps(c)} />
        <Circle cx="12" cy="7" r="4" {...strokeProps(c)} />
      </Svg>
    );
  },
  Payments: ({ active, ...rest }) => {
    const c = active ? "#1B6B4A" : "#94A3B8";
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" {...rest}>
        <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" {...strokeProps(c)} />
        <Line x1="1" y1="10" x2="23" y2="10" {...strokeProps(c)} />
      </Svg>
    );
  },
  Messages: ({ active, ...rest }) => {
    const c = active ? "#1B6B4A" : "#94A3B8";
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" {...rest}>
        <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...strokeProps(c)} />
      </Svg>
    );
  },
  Back: (props) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Polyline points="15 18 9 12 15 6" {...strokeProps("currentColor", 2)} />
    </Svg>
  ),
  ChevronRight: (props) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
      <Polyline points="9 18 15 12 9 6" {...strokeProps("#94A3B8")} />
    </Svg>
  ),
  ChevronDown: (props) => (
    <Svg width={12} height={12} viewBox="0 0 24 24" {...props}>
      <Polyline points="6 9 12 15 18 9" {...strokeProps("#94A3B8", 2.5)} />
    </Svg>
  ),
  Bell: (props) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" {...strokeProps("currentColor")} />
      <Path d="M13.73 21a2 2 0 01-3.46 0" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Search: (props) => (
    <Svg width={18} height={18} viewBox="0 0 24 24" {...props}>
      <Circle cx="11" cy="11" r="8" {...strokeProps("#94A3B8")} />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" {...strokeProps("#94A3B8")} />
    </Svg>
  ),
  Plus: (props) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Line x1="12" y1="5" x2="12" y2="19" {...strokeProps("currentColor")} />
      <Line x1="5" y1="12" x2="19" y2="12" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Basket: (props) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Circle cx="9" cy="21" r="1" {...strokeProps("currentColor")} />
      <Circle cx="20" cy="21" r="1" {...strokeProps("currentColor")} />
      <Path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Filter: (props) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
      <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Check: (props) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
      <Polyline points="20 6 9 17 4 12" {...strokeProps("#1B6B4A", 3)} />
    </Svg>
  ),
  Star: (props) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" {...props}>
      <Polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="#F5A623"
        stroke="#F5A623"
        strokeWidth={1}
      />
    </Svg>
  ),
  Clock: (props) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" {...props}>
      <Circle cx="12" cy="12" r="10" {...strokeProps("currentColor")} />
      <Polyline points="12 6 12 12 16 14" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Calendar: (props) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" {...props}>
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" {...strokeProps("currentColor")} />
      <Line x1="16" y1="2" x2="16" y2="6" {...strokeProps("currentColor")} />
      <Line x1="8" y1="2" x2="8" y2="6" {...strokeProps("currentColor")} />
      <Line x1="3" y1="10" x2="21" y2="10" {...strokeProps("currentColor")} />
    </Svg>
  ),
  Wallet: (props) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Rect x="2" y="5" width="20" height="14" rx="2" {...strokeProps("currentColor")} />
      <Path d="M16 12h.01" {...strokeProps("currentColor")} />
    </Svg>
  ),
};

export default Icons;
