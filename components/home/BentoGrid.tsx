import React from 'react';

interface BentoGridProp {
  children: React.ReactNode[];
}

export const BentoGrid: React.FC<BentoGridProp> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)] w-full">
      {React.Children.map(children, (child, index) => {
        let colSpan = "col-span-1";
        let rowSpan = "row-span-1";

        if (index === 0) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-2";
        } else if (index === 1 || index === 2) {
          colSpan = "md:col-span-1";
          rowSpan = "md:row-span-2";
        } else {
          colSpan = "md:col-span-1";
          rowSpan = "md:row-span-1";
        }

        return (
          <div className={`${colSpan} ${rowSpan} relative group`}>
            {child}
          </div>
        );
      })}
    </div>
  );
};
