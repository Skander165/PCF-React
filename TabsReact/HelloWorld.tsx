import {
  makeStyles,
  shorthands,
  tokens,
  Tab,
  TabList,
  SelectTabData,
  SelectTabEvent,
  TabValue,
  Text,
} from "@fluentui/react-components";
import { Icon } from "@fluentui/react/lib/Icon";

import * as React from "react";

import * as ReactIcons from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
  },
  panels: {
    ...shorthands.padding(0, "10px"),
    "& th": {
      textAlign: "left",
      ...shorthands.padding(0, "30px", 0, 0),
    },
  },
  propsTable: {
    "& td:first-child": {
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      ...shorthands.padding(0, "30px", 0, 0),
    },
  },
  text: {
    ...shorthands.overflow("hidden"),
    width: "50px",
    display: "block",
  },
});
export interface IDefaultProps {
  tabs?: ComponentFramework.WebApi.Entity[];
}

const { CalendarMonthFilled, CalendarMonthRegular, bundleIcon } = ReactIcons;
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const test = "CalendarMonthFilled";
export const Default = (props: IDefaultProps) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = React.useState<
    TabValue | undefined
  >(props.tabs?.[0]?.eytn_name);

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        {props.tabs?.map((tab, index) => (
          <Tab
          icon={<CalendarMonth />}
          key={index}
          id={tab.eytn_name}
          value={tab.eytn_name}
          >
            <Text truncate wrap={false} className={(styles.text, styles.text)}>
              {tab.eytn_name}
            </Text>
          </Tab>
        ))}
      </TabList>
      <div className={styles.panels}>
        {props.tabs?.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            aria-labelledby={tab.eytn_name}
            style={{
              display: selectedValue === tab.eytn_name ? "block" : "none",
            }}
          >
            <Icon iconName="CalendarMonthFilled"></Icon>
            {/* <Text truncate wrap={false} className={styles.text}> */}
            {tab.cr15d_data}
            {/* </Text> */}
          </div>
        ))}
      </div>
    </div>
  );
};
