import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Appearance,
  ScrollView,
} from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
  DateData,
} from "react-native-calendars";
import { Video, ResizeMode } from "expo-av";
import eventsJsonData from "../../assets/database/events.json";

// Definindo interfaces para tipagem
interface Event {
  time: string;
  event: string;
  videoUrl: string;
}

interface EventsRecord {
  [date: string]: Event[];
}

// Type the imported JSON data
const eventsData: EventsRecord = eventsJsonData as EventsRecord;

// Função auxiliar para obter a data atual no formato YYYY-MM-DD
const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Função para gerar objetos markedDates para o calendário
const generateMarkedDates = (
  eventsData: EventsRecord,
  selectedDate: string,
  isDark: boolean
): Record<string, any> => {
  const markedDates: Record<string, any> = {};

  // Marca todas as datas que têm eventos
  Object.keys(eventsData).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: isDark ? "#0066cc" : "blue",
      selected: date === selectedDate,
      selectedColor:
        date === selectedDate ? (isDark ? "#0066cc" : "blue") : undefined,
    };
  });

  return markedDates;
};

const SimpleWeekCalendarExample = () => {
  const today = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState<Event[]>(eventsData[today] || []);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
    setEvents(eventsData[day.dateString] || []);
    setSelectedEvent(null);
  };

  const handleEventPress = (event: Event): void => {
    setSelectedEvent(event);
  };

  // Gerar os markedDates para o calendário
  const markedDates = generateMarkedDates(eventsData, selectedDate, isDark);

  return (
    <ScrollView style={isDark ? styles.containerDark : styles.container}>
      <CalendarProvider date={selectedDate}>
        <View style={styles.calendarContainer}>
          <WeekCalendar
            firstDay={1}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              backgroundColor: isDark ? "#121212" : "#ffffff",
              calendarBackground: isDark ? "#121212" : "#ffffff",
              textSectionTitleColor: isDark ? "#eee" : "#b6c1cd",
              selectedDayBackgroundColor: isDark ? "#0066cc" : "blue",
              selectedDayTextColor: "#ffffff",
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
        </View>

        <View
          style={[
            isDark ? styles.eventsContainerDark : styles.eventsContainer,
            styles.sectionShadow,
          ]}
        >
          <Text
            style={[
              isDark ? styles.headerDark : styles.header,
              styles.sectionTitle,
            ]}
          >
            Eventos em {selectedDate}
          </Text>
          {events.length > 0 ? (
            <View>
              {events.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={isDark ? styles.eventItemDark : styles.eventItem}
                  onPress={() => handleEventPress(item)}
                >
                  <View style={styles.eventContent}>
                    <Text style={isDark ? styles.timeDark : styles.time}>
                      {item.time}
                    </Text>
                    <Text
                      style={isDark ? styles.eventTextDark : styles.eventText}
                    >
                      {item.event}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={isDark ? styles.watchButtonDark : styles.watchButton}
                    onPress={() => handleEventPress(item)}
                  >
                    <Text style={styles.watchButtonText}>Assistir</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={isDark ? styles.noEventsDark : styles.noEvents}>
              Nenhum evento para este dia.
            </Text>
          )}
        </View>

        {selectedEvent && (
          <View
            style={[
              isDark ? styles.videoContainerDark : styles.videoContainer,
              styles.sectionShadow,
            ]}
          >
            <Text
              style={[
                isDark ? styles.headerDark : styles.header,
                styles.sectionTitle,
              ]}
            >
              {selectedEvent.event} - {selectedEvent.time}
            </Text>
            <Video
              source={{ uri: selectedEvent.videoUrl }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.closeButtonText}>Fechar vídeo</Text>
            </TouchableOpacity>
          </View>
        )}
      </CalendarProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#121212",
  },
  calendarContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  eventsContainer: {
    margin: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  eventsContainerDark: {
    margin: 15,
    backgroundColor: "#242424",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  headerDark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#eee",
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  eventItemDark: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#242424",
  },
  eventContent: {
    flex: 1,
  },
  time: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 15,
  },
  timeDark: {
    fontWeight: "bold",
    color: "#eee",
    fontSize: 15,
  },
  eventText: {
    color: "#555",
    marginTop: 4,
    fontSize: 16,
  },
  eventTextDark: {
    color: "#bbb",
    marginTop: 4,
    fontSize: 16,
  },
  watchButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  watchButtonDark: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  watchButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  noEvents: {
    color: "gray",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 16,
  },
  noEventsDark: {
    color: "#888",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 16,
  },
  videoContainer: {
    margin: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  videoContainerDark: {
    margin: 15,
    backgroundColor: "#242424",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  video: {
    width: "100%",
    height: 200,
    marginVertical: 15,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    textAlign: "center",
  },
  sectionShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SimpleWeekCalendarExample;
