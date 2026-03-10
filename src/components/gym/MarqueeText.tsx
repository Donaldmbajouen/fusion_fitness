const MarqueeText = () => {
  const items = [
    "MUSCULATION",
    "•",
    "CARDIO",
    "•",
    "CROSSFIT",
    "•",
    "YOGA",
    "•",
    "BOXING",
    "•",
    "HIIT",
    "•",
    "SPINNING",
    "•",
  ];

  return (
    <div className="py-8 bg-primary overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex">
            {items.map((item, index) => (
              <span
                key={`${groupIndex}-${index}`}
                className="font-display text-4xl md:text-6xl text-primary-foreground mx-4 md:mx-8"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;
