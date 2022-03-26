import {
   CSSProperties,
   FormEvent,
   ReactNode,
   useEffect,
   useRef,
} from "react";

export function CheckButton(props: CheckButtonProps) {
   const inpRef = useRef<HTMLInputElement>();

   return (
      <div className="form-group row check-box">
         <span className="checker">
            <input
               ref={inpRef}
               type="checkbox"
               name={props.name}
               style={props.inputStyle}
               value={(props.value ?? false).toString()}
               onChange={(e) => {
                  console.log(!props.value);
                  props.onChange?.(!props.value as any);
               }}
            />
         </span>
         <label
            htmlFor={props.name}
            className="col-sm-2 col-form-label"
            style={props.labelStyle}
         >
            {props.children}
         </label>
      </div>
   );
}

export interface CheckButtonProps {
   name?: string;
   value?: boolean;
   onChange?(check: boolean): void;
   children?: ReactNode;

   style?: CSSProperties;
   inputStyle?: CSSProperties;
   labelStyle?: CSSProperties;
}
