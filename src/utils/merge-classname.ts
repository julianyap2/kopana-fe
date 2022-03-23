export function classNames(...names: ClassType[]) {
   return names
      .flatMap((name) => {
         if (typeof name === "string") return name;
         else if (typeof name === "boolean") return;
         else if (typeof name === "number") return name + "";
         return Object.keys(name).map((e) => {
            const v = name[e];
            if (!!v) return e;
         });
      })
      .filter((e) => typeof e === "string")
      .join(" ");
}

export type ClassType = string | boolean | number | ClassDict;

export interface ClassDict {
   [x: string]: boolean;
}
