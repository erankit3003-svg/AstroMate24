import React, { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, MapPin, X } from "lucide-react";
import debounce from "lodash/debounce";
import tzlookup from "tz-lookup";
import moment from "moment-timezone";

const API_KEY = "pk.2849ede71a6a636a112ad1ddaf4fde6d"; // LocationIQ key

const BirthPlaceInput = ({ formData, setFormData }) => {
  const [query, setQuery] = useState(formData.place || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  const abortRef = useRef(null);
  const isSelectingRef = useRef(false);

  // 🔹 Debounced search (stable)
  const searchPlaces = useRef(
    debounce(async (q) => {
      if (!q || q.length < 3) return;

      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      try {
        const res = await fetch(
          `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
            q
          )}&format=json&limit=15`,
          { signal: abortRef.current.signal }
        );

        const data = await res.json();

        const formatted = data.map((p) => ({
          id: p.place_id,
          name: p.display_name,
          lat: p.lat,
          lon: p.lon,
          countryCode: p.address?.country_code,
        }));

        const india = formatted.filter((p) => p.countryCode === "in");
        const world = formatted.filter((p) => p.countryCode !== "in");

        setSuggestions([...india, ...world]);
        setOpen(true);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 350)
  ).current;

  // 🔹 Trigger search ONLY on typing
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (query.length >= 3) {
      searchPlaces(query);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [query, searchPlaces]);

  // 🔹 Select handler
  const handleSelect = (place) => {
    isSelectingRef.current = true;

    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    let tz = 5.5;
    try {
      const tzName = tzlookup(lat, lon);
      tz = moment.tz(tzName).utcOffset() / 60;
    } catch {}

    setQuery(place.name);
    setFormData((prev) => ({
      ...prev,
      place: place.name,
      lat,
      lon,
      tzone: tz,
    }));

    setOpen(false);
    setSuggestions([]);
  };

  // 🔹 Clear input
  const handleClear = () => {
    isSelectingRef.current = true;
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    setFormData((prev) => ({
      ...prev,
      place: "",
      lat: "",
      lon: "",
      tzone: 5.5,
    }));
  };

  // 🔹 Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Label className="flex items-center gap-2 mb-1">
        <MapPin className="w-4 h-4" />
        Birth Place
      </Label>

      <div className="relative">
        <Input
          value={query}
          placeholder="Type city (e.g. Mumbai, London)"
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white/50 pr-10"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {loading && (
          <Loader2 className="absolute right-9 top-2.5 w-4 h-4 animate-spin text-primary" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {suggestions.map((p) => (
            <li
              key={p.id}
              onClick={() => handleSelect(p)}
              className="px-4 py-3 cursor-pointer hover:bg-primary/5 text-sm border-b last:border-b-0"
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}

      {open && !loading && suggestions.length === 0 && query.length >= 3 && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-xl p-3 text-sm text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default BirthPlaceInput;
