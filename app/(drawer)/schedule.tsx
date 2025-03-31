import React from "react";
import { View, StyleSheet } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

const SimpleWeekCalendarExample = () => {
  // Exemplo simples de datas marcadas
  const markedDates = {
    "2025-03-31": { selected: true, marked: true, selectedColor: "blue" },
    "2025-04-01": { marked: true },
  };

  return (
    <CalendarProvider date={"2025-03-31"}>
      <View style={styles.container}>
        <WeekCalendar firstDay={1} markedDates={markedDates} />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default SimpleWeekCalendarExample;
