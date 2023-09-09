import { FC, useEffect } from "react";
import { styles } from "../styles";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { removeMessage } from "../app/features/message/messageSlice";


export const MessageContainer: FC = () => {
    const MESSAGES = useAppSelector(state => state.message);
    console.log(MESSAGES);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000)
    }, [MESSAGES])
  return (
    <div className="fixed right-3 bottom-3 flex flex-col bg-violet-200 bg-opacity-50 shadow-md sm:px-4 px-2 sm:py-4 py-2 sm:w-[280px] xs:w-[180px] w-[120px] gap-3">
      {MESSAGES.map((msg) => (
        <div key={msg.id} className={`${msg.isError ? styles.erroMsg : styles.successMsg}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

const a = 10;

<p>{a}</p>
