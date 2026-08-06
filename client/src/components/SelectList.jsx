import { useState, useRef, useEffect } from "react";

export default function SelectList({
  handleChange,
  name,
  options = [],
  required = false,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionRefs = useRef([]);

  // Filter the list as the user types
  const filteredFaculties = options.filter((o) =>
    o.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // Handle clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // STRICT ENFORCEMENT: If typed text isn't a valid option, clear it
        if (!options.includes(inputValue)) {
          setInputValue("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, options]);

  // handles the selected option visibilty if outside visible area
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  // Handle selection
  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
    // Pass the selected value to your parent component's handleChange
    if (handleChange) {
      handleChange({ target: { name: name, value: option } });
      console.log(option);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Searchable Input */}
      <input
        required={required}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        className="w-full bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 p-2 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);

          handleChange({
            target: {
              name: name,
              value: e.target.value,
            },
          });
        }}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) => {
              e.preventDefault();

              //mimics a circular list
              return prev < filteredFaculties.length - 1 ? prev + 1 : 0;
            });
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();

            setHighlightedIndex((prev) => {
              return prev > 0 ? prev - 1 : filteredFaculties.length - 1;
            });
          }

          if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();

            handleSelect(filteredFaculties[highlightedIndex]);
          }
        }}
      />

      {/* Pop-down Menu */}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 overflow-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg top-full max-h-60 bg-slate-200 dark:bg-[#111622] z-50">
          {filteredFaculties.length > 0 ? (
            filteredFaculties.map((option, index) => (
              <li
                key={option}
                className={`p-2 cursor-pointer text-slate-700 dark:text-slate-300 transition-colors ${
                  index === highlightedIndex
                    ? "bg-slate-200 dark:bg-[#161d2b]"
                    : "hover:bg-slate-300 dark:hover:bg-[#161d2b]"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault(); // Stops input from losing focus before click registers
                  handleSelect(option);
                }}
                ref={(element) => (optionRefs.current[index] = element)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="p-2 italic text-slate-500 dark:text-slate-400">No matching options</li>
          )}
        </ul>
      )}
    </div>
  );
}
