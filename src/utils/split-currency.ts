export function normalizeCurrency(t: string | number, debug = false) {
   t = t.toString();
   let res: string[] = [];

   let current = 0;
   for (let i = t.length - 1; i >= 0; i--) {
      res[current] = res[current] || "";
      res[current] = t[i] + res[current];
      if (res[current].length === 3) current++;
   }

   return res.reverse().join(".") + (debug ? ` (${t})` : "");
}
