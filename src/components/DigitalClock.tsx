import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeZone {
  id: string;
  label: string;
  value: string;
}

interface ClockDisplay {
  id: string;
  timeZone: string;
  label: string;
}

const AVAILABLE_TIMEZONES: TimeZone[] = [
  { id: "utc", label: "UTC", value: "UTC" },
  { id: "america-ny", label: "New York", value: "America/New_York" },
  { id: "america-la", label: "Los Angeles", value: "America/Los_Angeles" },
  { id: "america-chicago", label: "Chicago", value: "America/Chicago" },
  { id: "europe-london", label: "London", value: "Europe/London" },
  { id: "europe-paris", label: "Paris", value: "Europe/Paris" },
  { id: "europe-berlin", label: "Berlin", value: "Europe/Berlin" },
  { id: "asia-tokyo", label: "Tokyo", value: "Asia/Tokyo" },
  { id: "asia-singapore", label: "Singapore", value: "Asia/Singapore" },
  { id: "asia-dubai", label: "Dubai", value: "Asia/Dubai" },
  { id: "asia-shanghai", label: "Shanghai", value: "Asia/Shanghai" },
  { id: "asia-hong-kong", label: "Hong Kong", value: "Asia/Hong_Kong" },
  { id: "australia-sydney", label: "Sydney", value: "Australia/Sydney" },
];

export const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clocks, setClocks] = useState<ClockDisplay[]>([
    { id: "local", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, label: "Local Time" },
  ]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(date);
    } catch (error) {
      return "Invalid timezone";
    }
  };

  const formatDate = (date: Date, timeZone: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch (error) {
      return "Invalid timezone";
    }
  };

  const addClock = () => {
    if (!selectedTimeZone) return;

    const timezone = AVAILABLE_TIMEZONES.find((tz) => tz.value === selectedTimeZone);
    if (!timezone) return;

    // Check if this timezone is already added
    if (clocks.some((clock) => clock.timeZone === selectedTimeZone)) {
      return;
    }

    const newClock: ClockDisplay = {
      id: `clock-${Date.now()}`,
      timeZone: selectedTimeZone,
      label: timezone.label,
    };

    setClocks([...clocks, newClock]);
    setSelectedTimeZone("");
  };

  const removeClock = (id: string) => {
    // Don't allow removing the local clock
    if (id === "local") return;
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="w-full space-y-6">
      <Card className="border-border/50 bg-card/30 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle>Digital Clock</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedTimeZone} onValueChange={setSelectedTimeZone}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a timezone to add" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TIMEZONES.map((tz) => (
                  <SelectItem key={tz.id} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={addClock}
              disabled={!selectedTimeZone}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {clocks.map((clock) => (
              <Card
                key={clock.id}
                className={cn(
                  "border-border/50 bg-background/50",
                  clock.id === "local" && "border-primary/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-muted-foreground">
                          {clock.label}
                        </h3>
                        {clock.id === "local" && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Local
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-mono font-bold tabular-nums">
                        {formatTime(currentTime, clock.timeZone)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(currentTime, clock.timeZone)}
                      </div>
                    </div>
                    {clock.id !== "local" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeClock(clock.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
