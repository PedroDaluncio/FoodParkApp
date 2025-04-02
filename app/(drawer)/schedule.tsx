import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  useColorScheme,
  Appearance,
} from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { Video, ResizeMode } from "expo-av";

// Mock de dados de eventos com URLs de vídeos diretos
const eventsData: Record<
  string,
  { time: string; event: string; videoUrl: string }[]
> = {
  "2025-03-31": [
    {
      time: "10:00",
      event: "Reunião de equipe",
      videoUrl: "https://youtu.be/3IE2W64k0Ys",
    },
    {
      time: "14:00",
      event: "Apresentação de projeto",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
  ],
  "2025-04-01": [
    {
      time: "09:00",
      event: "Entrevista de emprego",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      time: "13:00",
      event: "Almoço com cliente",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    },
  ],
};

const SimpleWeekCalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState("2025-03-31");
  const [events, setEvents] = useState(eventsData[selectedDate]);
  const [selectedEvent, setSelectedEvent] = useState<{
    time: string;
    event: string;
    videoUrl: string;
  } | null>(null);

  // Use state for theme to force re-renders when it changes
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  // Add listener for theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Update isDark when colorScheme changes
  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setEvents(eventsData[day.dateString] || []);
    setSelectedEvent(null);
  };

  const handleEventPress = (event: {
    time: string;
    event: string;
    videoUrl: string;
  }) => {
    setSelectedEvent(event);
  };

  return (
    <CalendarProvider date={selectedDate}>
      <View style={isDark ? styles.containerDark : styles.container}>
        <WeekCalendar
          firstDay={1}
          markedDates={{
            "2025-03-31": {
              selected: selectedDate === "2025-03-31",
              marked: true,
              selectedColor: isDark ? "#0066cc" : "blue",
            },
            "2025-04-01": {
              selected: selectedDate === "2025-04-01",
              marked: true,
              selectedColor: isDark ? "#0066cc" : "blue",
            },
          }}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: isDark ? "#121212" : "#ffffff",
            calendarBackground: isDark ? "#121212" : "#ffffff",
            textSectionTitleColor: isDark ? "#eee" : "#b6c1cd",
            selectedDayBackgroundColor: isDark ? "#0066cc" : "blue",
            selectedDayTextColor: isDark ? "#ffffff" : "#ffffff",
            todayTextColor: isDark ? "#0066cc" : "blue",
            todayBackgroundColor: isDark ? "#333333" : "#e6e6e6",
            dayTextColor: isDark ? "#eee" : "#2d4150",
            textDisabledColor: isDark ? "#444" : "#d9e1e8",
            monthTextColor: isDark ? "#ffffff" : "#2d4150",
            arrowColor: isDark ? "#ffffff" : "#2d4150",
            dotColor: isDark ? "#0066cc" : "blue",
            indicatorColor: isDark ? "#0066cc" : "blue",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "bold",
          }}
          key={isDark ? "dark" : "light"} // Force re-render when theme changes
        />
        <View
          style={isDark ? styles.eventsContainerDark : styles.eventsContainer}
        >
          <Text style={isDark ? styles.headerDark : styles.header}>
            Eventos em {selectedDate}
          </Text>
          {events.length > 0 ? (
            <FlatList
              data={events}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={isDark ? styles.eventItemDark : styles.eventItem}>
                  <Text style={isDark ? styles.timeDark : styles.time}>
                    {item.time}
                  </Text>
                  <Text
                    style={isDark ? styles.eventTextDark : styles.eventText}
                  >
                    {item.event}
                  </Text>
                  <Button
                    title="Assistir vídeo"
                    onPress={() => handleEventPress(item)}
                    color={isDark ? "#0066cc" : "blue"}
                  />
                </View>
              )}
            />
          ) : (
            <Text style={isDark ? styles.noEventsDark : styles.noEvents}>
              Nenhum evento para este dia.
            </Text>
          )}
        </View>

        {selectedEvent && (
          <View
            style={isDark ? styles.videoContainerDark : styles.videoContainer}
          >
            <Text style={isDark ? styles.headerDark : styles.header}>
              Vídeo do Evento
            </Text>
            <Video
              source={{ uri: selectedEvent.videoUrl }} // Passa o URL diretamente para o componente Video
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
            <View style={styles.controlsContainer}>
              {/* Aqui você pode adicionar mais controles se necessário */}
            </View>
          </View>
        )}
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  containerDark: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#121212",
  },
  eventsContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
  },
  eventsContainerDark: {
    marginTop: 20,
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  headerDark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#eee",
  },
  eventItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  eventItemDark: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  time: {
    fontWeight: "bold",
    color: "#333",
  },
  timeDark: {
    fontWeight: "bold",
    color: "#eee",
  },
  eventText: {
    color: "#555",
    marginBottom: 5,
  },
  eventTextDark: {
    color: "#bbb",
    marginBottom: 5,
  },
  noEvents: {
    color: "gray",
  },
  noEventsDark: {
    color: "#888",
  },
  videoContainer: {
    marginTop: 20,
    height: 320,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
  },
  videoContainerDark: {
    marginTop: 20,
    height: 320,
    alignItems: "center",
    backgroundColor: "#242424",
    borderRadius: 8,
    padding: 12,
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  controlsContainer: {
    padding: 10,
  },
});

export default SimpleWeekCalendarExample;
